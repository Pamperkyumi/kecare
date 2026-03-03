/**
 * 从 html 中提取简介
 * 即获取 html 中的纯文本内容，并且只截取指定长度的字符串，用于在文章列表页显示简介
 * @param contentHtml 
 * @param maxLen 
 * @returns 
 */
export function extraDescFromHtml(contentHtml: string, maxLen = 120): string {
    if (!contentHtml) return '';
    let text = contentHtml.replace(/<[^>]+>/g, ' ');
    text = text.replace(/\s+/g, ' ').trim();
    return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + '...' : text;
}