process.env.ROLLUP_WASM = 'true';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin, HotPayload } from 'vite';

/**
 * Kecare HMR 日志插件：打印 Vite/Nuxt 在检测到文件变化时触发的 HMR 事件。
 *
 * 当 Kecare 生成器将 .vue 文件写入 app/pages/articles/ 后，
 * Vite 的 chokidar 文件监听器会检测到这些变化，并触发以下流程：
 *   1. handleHotUpdate 被调用（每个变化的文件触发一次）
 *   2. Vite 通过 WebSocket 向浏览器发送 'update' 消息
 *   3. 浏览器中的 HMR runtime 接收消息，执行组件热替换
 *
 * 对于新增/删除的页面文件，Nuxt 的 Vite 插件会触发 full-reload（完全刷新页面）
 * 而非 HMR update，因为路由表需要重建。
 */
function kecareHmrLogger(): Plugin {
    return {
        name: 'kecare-hmr-logger',
        // configureServer 阶段：劫持 HMR WebSocket 消息以打印推送到浏览器的内容
        configureServer(server) {
            // Vite 通过 WebSocket 发送 HMR 消息，劫持 send 方法打印关键消息
            const originalSend = server.ws.send.bind(server.ws);
            server.ws.send = ((payload: HotPayload | string, payload2?: unknown) => {
                // send 有两个重载：send(payload: HotPayload) 和 send(event: string, payload?: any)
                if (typeof payload === 'string') {
                    // 第 2 个重载：send(event, payload)
                } else {
                    // 第 1 个重载：send(payload: HotPayload)
                    const data = payload as unknown as Record<string, unknown>;
                    if (data?.type === 'update') {
                        const updates = data.updates as Array<Record<string, unknown>> | undefined;
                        const paths = updates?.map(u => u.path).join(', ') ?? 'unknown';
                        console.log(`[Nuxt HMR] → 浏览器推送 update: ${paths}`);
                    } else if (data?.type === 'full-reload') {
                        const reason = (data.path ?? '路由表变更') as string;
                        console.log(`[Nuxt HMR] → 浏览器推送 full-reload: ${reason}`);
                    }
                }
                originalSend(payload as string, payload2);
            }) as typeof server.ws.send;
        },
        // handleHotUpdate：每次 Vite 检测到文件变化准备触发 HMR 时调用
        handleHotUpdate(ctx) {
            // 只关注 app/pages/ 下的 .vue 文件（Kecare 生成的目标目录）
            const involvedFiles = ctx.modules.map(m => m.file ?? m.id ?? '').filter(Boolean);
            if (involvedFiles.length > 0) {
                console.log(`[Nuxt HMR] 检测到文件变化，涉及的模块: ${involvedFiles.join(', ')}`);
            }
            // 返回 undefined 表示让 Vite 走默认处理流程
            return undefined;
        },
    };
}

// https://nuxt.com/docs/api/configuration/nuxt-config
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
        plugins: [tailwindcss(), kecareHmrLogger()],
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
