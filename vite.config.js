import { defineConfig } from 'vite';

export default defineConfig({
    // 設定 base 路徑為 ./，這樣在 GitHub Pages 部署時資源路徑才會正確
    base: './',
    build: {
        outDir: 'dist',
    }
});
