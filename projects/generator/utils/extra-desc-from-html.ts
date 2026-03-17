/**
 * 从 html 中提取简介
 * 即获取 html 中的纯文本内容，并且只截取指定长度的字符串，用于在文章列表页显示简介
 * @param contentHtml
 * @param maxLen
 * @returns
 */
export function extraDescFromHtml(contentHtml: string, maxLen = 120): string {
    if (!contentHtml) return '';

    let text = contentHtml;

    // 移除 HTML 标签
    text = text.replace(/<[^>]+>/g, ' ');

    // 移除 Markdown 标题语法 # ## ###
    text = text.replace(/^#{1,6}\s+/gm, ' ');

    // 移除 Markdown 粗体 **text** 和 __text__
    text = text.replace(/\*\*|__/g, '');

    // 移除 Markdown 斜体 *text* 和 _text_
    text = text.replace(/\*|_/g, '');

    // 移除 Markdown 代码块 ```...```
    text = text.replace(/```[\s\S]*?```/g, ' ');

    // 移除 Markdown 行内代码 `code`
    text = text.replace(/`([^`]+)`/g, '$1');

    // 移除 Markdown 链接 [text](url)，保留文本
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    // 移除 Markdown 图片 ![alt](url)
    text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, ' ');

    // 移除 Markdown 无序列表标记 - + *
    text = text.replace(/^[\s]*[-+*]\s+/gm, ' ');

    // 移除 Markdown 有序列表标记 1. 2. 等
    text = text.replace(/^[\s]*\d+\.\s+/gm, ' ');

    // 移除 Markdown 引用标记 >
    text = text.replace(/^[\s]*>\s*/gm, ' ');

    // 移除 Markdown 分隔线 --- *** ___
    text = text.replace(/^[\s]*[-*_]{3,}[\s]*$/gm, ' ');

    // 清理多余空白
    text = text.replace(/\s+/g, ' ').trim();

    return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + '...' : text;
}