import { describe, expect, it } from 'vitest';
import { extraDescFromHtml } from './extra-desc-from-html.ts';

describe('extraDescFromHtml', () => {
    describe('基础功能', () => {
        it('应该从简单 HTML 中提取纯文本', () => {
            const html = '<p>Hello World</p>';
            expect(extraDescFromHtml(html)).toBe('Hello World');
        });

        it('应该处理嵌套的 HTML 标签', () => {
            const html = '<div><p><span>Nested Content</span></p></div>';
            expect(extraDescFromHtml(html)).toBe('Nested Content');
        });

        it('应该处理多个标签', () => {
            const html = '<h1>Title</h1><p>Paragraph</p>';
            expect(extraDescFromHtml(html)).toBe('Title Paragraph');
        });
    });

    describe('空值和边界情况', () => {
        it('应该处理空字符串', () => {
            expect(extraDescFromHtml('')).toBe('');
        });

        it('应该处理只有标签没有内容的 HTML', () => {
            const html = '<div></div><p></p>';
            expect(extraDescFromHtml(html)).toBe('');
        });

        it('应该处理纯文本（无 HTML 标签）', () => {
            const text = 'Just plain text without any tags';
            expect(extraDescFromHtml(text)).toBe('Just plain text without any tags');
        });

        it('应该处理空白字符', () => {
            const html = '<p>   </p>';
            expect(extraDescFromHtml(html)).toBe('');
        });
    });

    describe('长度限制', () => {
        it('应该使用默认长度限制 120', () => {
            const longText = 'a'.repeat(150);
            const html = `<p>${longText}</p>`;
            const result = extraDescFromHtml(html);
            expect(result.length).toBe(123); // 120 + '...'
            expect(result.endsWith('...')).toBe(true);
        });

        it('应该使用自定义长度限制', () => {
            const html = '<p>This is a long text that should be truncated</p>';
            const result = extraDescFromHtml(html, 10);
            expect(result).toBe('This is a...');
        });

        it('当文本长度小于限制时不应截断', () => {
            const html = '<p>Short text</p>';
            expect(extraDescFromHtml(html, 100)).toBe('Short text');
        });

        it('当文本长度等于限制时不应截断', () => {
            const html = '<p>12345</p>';
            expect(extraDescFromHtml(html, 5)).toBe('12345');
        });

        it('截断时应该去除末尾空白', () => {
            const html = '<p>abc   def</p>';
            const result = extraDescFromHtml(html, 5);
            expect(result).toBe('abc d...');
        });
    });

    describe('空白字符处理', () => {
        it('应该将多个空白字符合并为单个空格', () => {
            const html = '<p>Multiple    spaces   here</p>';
            expect(extraDescFromHtml(html)).toBe('Multiple spaces here');
        });

        it('应该处理换行符', () => {
            const html = '<p>Line1\nLine2\nLine3</p>';
            expect(extraDescFromHtml(html)).toBe('Line1 Line2 Line3');
        });

        it('应该处理制表符', () => {
            const html = '<p>Tab\there</p>';
            expect(extraDescFromHtml(html)).toBe('Tab here');
        });

        it('应该去除首尾空白', () => {
            const html = '<p>   trimmed content   </p>';
            expect(extraDescFromHtml(html)).toBe('trimmed content');
        });
    });

    describe('复杂 HTML 处理', () => {
        it('应该处理自闭合标签', () => {
            const html = '<p>Text<br/>More text</p>';
            expect(extraDescFromHtml(html)).toBe('Text More text');
        });

        it('应该处理带属性的标签', () => {
            const html = '<p class="test" id="para">Content</p>';
            expect(extraDescFromHtml(html)).toBe('Content');
        });

        it('应该处理注释', () => {
            const html = '<p>Text<!-- comment -->More</p>';
            expect(extraDescFromHtml(html)).toBe('Text More');
        });

        it('应该处理特殊字符', () => {
            const html = '<p>&lt;script&gt; &amp; &quot;</p>';
            expect(extraDescFromHtml(html)).toBe('&lt;script&gt; &amp; &quot;');
        });
    });
});
