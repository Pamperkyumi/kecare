import { createCodeTransformers } from './code-transformers.ts';
import { createCodeCopyButton } from './code-copy-button.ts';

export async function onMountedSyntaxHighlight(articleElement: HTMLDivElement) {
    const codeElements = articleElement.querySelectorAll('pre > code');
    const { codeToHtml } = await import('shiki');

    // transformers 只需创建一次，所有代码块复用
    const transformers = createCodeTransformers();

    for (const codeElement of codeElements) {
        const classList = codeElement.className.split(' ')
        const langClass = classList.find((cls: string) => cls.startsWith('language-'))
        // 从 class 中拆出语言和 meta 标注：如 "language-js{4}" → lang="js"、meta="{4}"
        // marked 会把围栏语言后的整段信息（含 {行号} 标注）放进 language-xxx class
        let lang = 'text'
        let meta = ''
        if (langClass) {
            const rawLang = langClass.replace('language-', '')
            const metaMatch = rawLang.match(/^([A-Za-z0-9_-]+)(\{.*\})?$/)
            if (metaMatch) {
                lang = metaMatch[1] || 'text'
                meta = metaMatch[2] || ''
            } else {
                // 无法识别的 class（如非法语言 ```1），保留原文交给下方 try/catch 兜底
                lang = rawLang
            }
        }

        // markdown/md 代码块通常用于"展示原始写法"的演示场景（代码框嵌套代码框），
        // 块内的 // [!code focus] 等标注注释是要给读者看的文本，跳过标注 transformers 避免被误处理
        const isMarkdownDemo = lang === 'markdown' || lang === 'md'
        const effectiveTransformers = isMarkdownDemo ? [] : transformers

        // 去掉末尾换行：Markdown 围栏代码块末尾自带 \n，Shiki 会渲染出一个多余的空行，导致行号多计一行
        const code = (codeElement.textContent || '').replace(/\n$/, '');

        let highlightedHtml = '';
        try {
            highlightedHtml = await codeToHtml(code, {
                lang,
                meta: { __raw: meta },
                theme: 'one-dark-pro', // or 亮色主题 one-light
                transformers: effectiveTransformers,
            });
        } catch {
            // Fallback for unknown/invalid languages such as ```1
            highlightedHtml = await codeToHtml(code, {
                lang: 'text',
                meta: { __raw: meta },
                theme: 'one-dark-pro',
                transformers: effectiveTransformers,
            });
        }

        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = highlightedHtml
        const preElement = tempDiv.firstElementChild

        if (!preElement) continue

        // 设置 pre 元素为相对定位，以便放置复制按钮
        if (preElement instanceof HTMLElement) {
            preElement.style.position = 'relative';
            preElement.setAttribute('data-lang', (lang || 'text').toLowerCase());
            preElement.appendChild(createCodeCopyButton(code));
        }

        const parentElement = codeElement.parentElement
        if (parentElement && parentElement.tagName === 'PRE') {
            parentElement.replaceWith(preElement)
        } else {
            codeElement.replaceWith(preElement)
        }
    }
}
