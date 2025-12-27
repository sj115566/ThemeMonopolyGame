import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                tool: path.resolve(__dirname, 'tool_theme_creator.html'),
            },
        },
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.png', 'icon.png'],
            manifest: {
                name: "互動複習大富翁",
                short_name: "互動複習大富翁",
                start_url: "./",
                scope: "./",
                display: "standalone",
                orientation: "landscape",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                icons: [
                    {
                        src: "./icon.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,mp3,json}'],
                maximumFileSizeToCacheInBytes: 15 * 1024 * 1024
            }
        }),
        {
            name: 'save-theme-plugin',
            configureServer(server) {
                server.middlewares.use(async (req, res, next) => {
                    if (req.url === '/api/save-theme' && req.method === 'POST') {
                        let body = '';
                        req.on('data', chunk => { body += chunk; });
                        req.on('end', async () => {
                            try {
                                const data = JSON.parse(body);
                                const { id, name, description, cover, themeJs, themeListJs, questionsJson } = data;

                                const themeDir = path.join(__dirname, 'public', 'modules', id);
                                const imgDir = path.join(themeDir, 'img');
                                const soundDir = path.join(themeDir, 'sound');

                                // Create directories
                                if (!fs.existsSync(themeDir)) fs.mkdirSync(themeDir, { recursive: true });
                                if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
                                if (!fs.existsSync(soundDir)) fs.mkdirSync(soundDir, { recursive: true });

                                // Write theme.js
                                fs.writeFileSync(path.join(themeDir, 'theme.js'), themeJs);

                                // Write questions.json if provided
                                if (questionsJson) {
                                    fs.writeFileSync(path.join(themeDir, 'questions.json'), questionsJson);
                                }

                                // Update theme_list.js
                                const listPath = path.join(__dirname, 'public', 'modules', 'theme_list.js');
                                let listContent = fs.readFileSync(listPath, 'utf8');

                                // Check if ID already exists
                                if (listContent.includes(`id: "${id}"`)) {
                                    // Update existing entry (basic replacement)
                                    const regex = new RegExp(`\\{\\s*id: "${id}"[\\s\\S]*?\\},`, 'g');
                                    listContent = listContent.replace(regex, themeListJs);
                                } else {
                                    // Append to the list before the closing bracket
                                    const lastBracketIndex = listContent.lastIndexOf('];');
                                    listContent = listContent.slice(0, lastBracketIndex) + '    ' + themeListJs + '\n' + listContent.slice(lastBracketIndex);
                                }

                                fs.writeFileSync(listPath, listContent);

                                res.statusCode = 200;
                                res.end(JSON.stringify({ success: true }));
                            } catch (error) {
                                res.statusCode = 500;
                                res.end(JSON.stringify({ error: error.message }));
                            }
                        });
                        return;
                    }
                    next();
                });
            }
        }
    ]
});

