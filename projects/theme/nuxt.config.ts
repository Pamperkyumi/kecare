// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: ['~/assets/tailwind.css'],
    postcss: {
        plugins: {
            '@tailwindcss/postcss': {},
        },
    },
    app: {
        baseURL: '/',
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
                },
            ],
        },
    },
});
