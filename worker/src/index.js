export default {
    async fetch(request, env, ctx) {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
        };

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        // Only allow POST requests for the actual proxy logic
        if (request.method !== 'POST') {
            return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
        }

        try {
            const body = await request.json();
            const { type, payload } = body;

            if (type === 'gemini') {
                const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${env.GEMINI_API_KEY}`;
                const response = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: response.status
                });
            }

            if (type === 'elevenlabs-sfx') {
                const response = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
                    method: 'POST',
                    headers: {
                        'xi-api-key': env.ELEVENLABS_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const errText = await response.text();
                    return new Response(errText, { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
                }

                const audioBuffer = await response.arrayBuffer();
                return new Response(audioBuffer, {
                    headers: { ...corsHeaders, 'Content-Type': 'audio/mpeg' },
                    status: response.status
                });
            }

            if (type === 'elevenlabs-music') {
                const response = await fetch('https://api.elevenlabs.io/v1/music', {
                    method: 'POST',
                    headers: {
                        'xi-api-key': env.ELEVENLABS_API_KEY,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const errText = await response.text();
                    return new Response(errText, { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
                }

                const audioBuffer = await response.arrayBuffer();
                return new Response(audioBuffer, {
                    headers: { ...corsHeaders, 'Content-Type': 'audio/mpeg' },
                    status: response.status
                });
            }

            return new Response(JSON.stringify({ error: 'Invalid proxy type' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });

        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    },
};
