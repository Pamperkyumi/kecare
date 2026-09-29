process.env.ROLLUP_WASM = 'true';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin, HotPayload } from 'vite';
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/color-mode'],
    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL || '',
            supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || '',
        },
    },
    colorMode: {
        classSuffix: '',
        preference: 'light',
        fallback: 'light',
        storageKey: 'kecare-color-mode',
    },
    css: ['~/assets/tailwind.css'],
    vite: {
        plugins: [tailwindcss(),],
    },
    nitro: {
        prerender: {
            crawlLinks: true,
            routes: ['/'],
        },
    },
    app: {
        baseURL: '/',
        head: {
            titleTemplate: '%s - Pamperのblog',
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
                },
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico',
                }
            ],
            script: [
                {
                    innerHTML: `(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "wvn1575liu");
                        `,
                    type: 'text/javascript',
                }
            ],

        },
    },
});
