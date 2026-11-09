import { onMountedSidebar } from './sidebar.ts';
import { style } from './style.ts';
import { onMountedSyntaxHighlight } from './syntax-highlight.ts';
import { onMountedTabs } from './tabs.ts';
import { onMountedCopy } from './copy.ts';
import { onMountedLanguageSwitcher } from './language-switcher.ts';

let instancePromise: ReturnType<typeof createKecareSDK> | null = null; // 缓存 Promise

async function createKecareSDK() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return; // 确保在浏览器环境下运行，在服务端渲染或其他情况下不执行

    await style();

    // 等待页面完全加载
    const loaded = new Promise((resolve) => {
        if (document.readyState === 'complete') resolve(undefined);
        else window.addEventListener('load', resolve, { once: true });
    });

    const kecareSDK = {
        mounted: async (hash?: string, path?: string) => {
            await loaded;
            const articleElement = document.querySelector('.kecare')! as HTMLDivElement;
            await onMountedCopy(articleElement, hash, path);
            await onMountedLanguageSwitcher(articleElement, hash, path);
            await onMountedSidebar(articleElement);
            await onMountedTabs(articleElement);
            await onMountedSyntaxHighlight(articleElement);
        },
    }


    return kecareSDK;
}

export function useKecareSDK() {
    if (!instancePromise) {
        instancePromise = createKecareSDK();
    }
    return instancePromise;
}
