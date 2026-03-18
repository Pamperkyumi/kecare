import { onMountedSidebar } from './sidebar';
import { style } from './style';
import { onMountedSyntaxHighlight } from './syntax-highlight';
import { onMountedTabs } from './tabs';
import { onMountedCopy } from './copy';

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
        mounted: async (title?: string, basePath: string = '/') => {
            await loaded;
            const articleElement = document.querySelector('.kecare')! as HTMLDivElement;
            await onMountedCopy(articleElement, title, basePath);
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
