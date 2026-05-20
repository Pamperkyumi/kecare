// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        preset: 'node-server'
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxtjs/color-mode'],
    colorMode: {
        classSuffix: '',
        preference: 'light',
        fallback: 'light',
        storageKey: 'kecare-color-mode',
    },
    css: ['~/assets/tailwind.css'],
    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
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

        },
    },
});
