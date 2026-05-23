// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
