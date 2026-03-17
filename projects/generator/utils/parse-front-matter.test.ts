import { describe, expect, it } from 'vitest';
import { parseFrontMatter } from './parse-front-matter.ts';

describe('parseFrontMatter', () => {
    describe('基础功能', () => {
        it('应该解析标准的 Front Matter', () => {
            const raw = `---
title: Test Article
menu: Test Menu
date: 2024-01-01
---
Content here`;
            expect(parseFrontMatter(raw)).toBe(`title: Test Article
menu: Test Menu
date: 2024-01-01`);
        });

        it('应该处理空内容的 Front Matter（结束分隔符需要在新行）', () => {
            const raw = `---

---
Content here`;
            expect(parseFrontMatter(raw)).toBe('');
        });

        it('应该处理只有空白字符的内容', () => {
            const raw = `---
   
---
Content`;
            expect(parseFrontMatter(raw)).toBe('   ');
        });
    });

    describe('分隔符处理', () => {
        it('应该识别 --- 作为开始分隔符', () => {
            const raw = `---
key: value
---`;
            expect(parseFrontMatter(raw)).toBe('key: value');
        });

        it('应该识别 --- 作为结束分隔符', () => {
            const raw = `---
key: value
---
Body content`;
            expect(parseFrontMatter(raw)).toBe('key: value');
        });

        it('没有开始分隔符时应该返回空字符串', () => {
            const raw = `key: value
---`;
            expect(parseFrontMatter(raw)).toBe('');
        });

        it('没有结束分隔符时应该返回已解析内容', () => {
            const raw = `---
key: value`;
            expect(parseFrontMatter(raw)).toBe('key: value');
        });
    });

    describe('空白字符处理', () => {
        it('应该忽略开始分隔符前的空白', () => {
            const raw = `   
   
---
key: value
---`;
            expect(parseFrontMatter(raw)).toBe('key: value');
        });

        it('应该忽略开始分隔符前的制表符', () => {
            const raw = `\t\t
---
key: value
---`;
            expect(parseFrontMatter(raw)).toBe('key: value');
        });

        it('应该保留内容中的空白字符', () => {
            const raw = `---
key: value
  indented: true
---`;
            expect(parseFrontMatter(raw)).toBe(`key: value
  indented: true`);
        });
    });

    describe('换行符处理', () => {
        it('应该处理 Unix 换行符 (LF)', () => {
            const raw = `---
title: Test
date: 2024-01-01
---`;
            expect(parseFrontMatter(raw)).toBe(`title: Test
date: 2024-01-01`);
        });

        it('应该处理 Windows 换行符 (CRLF)', () => {
            const raw = `---
title: Test\r\ndate: 2024-01-01\r\n---`;
            expect(parseFrontMatter(raw)).toBe(`title: Test
date: 2024-01-01`);
        });

        it('应该处理混合换行符', () => {
            const raw = `---\r\ntitle: Test\ndate: 2024-01-01\r\n---`;
            expect(parseFrontMatter(raw)).toBe(`title: Test
date: 2024-01-01`);
        });

        it('应该正确处理结束分隔符后的换行', () => {
            const raw = `---
key: value
---
Body`;
            expect(parseFrontMatter(raw)).toBe('key: value');
        });
    });

    describe('边界情况', () => {
        it('应该处理空字符串输入', () => {
            expect(parseFrontMatter('')).toBe('');
        });

        it('应该处理只有分隔符的输入', () => {
            expect(parseFrontMatter('---')).toBe('');
        });

        it('应该处理只有开始分隔符的输入', () => {
            expect(parseFrontMatter('---\n')).toBe('');
        });

        it('应该处理多行内容', () => {
            const raw = `---
title: Article
menu: Blog
date: 2024-01-01
translate:
  - en
  - zh
tags:
  - test
  - demo
---`;
            const result = parseFrontMatter(raw);
            expect(result).toContain('title: Article');
            expect(result).toContain('translate:');
            expect(result).toContain('- en');
        });

        it('应该处理包含 --- 的内容（不在行首）', () => {
            const raw = `---
title: Test --- Article
---`;
            expect(parseFrontMatter(raw)).toBe('title: Test --- Article');
        });

        it('应该正确处理内容中只有两个破折号', () => {
            const raw = `---
title: --
---`;
            expect(parseFrontMatter(raw)).toBe('title: --');
        });
    });

    describe('特殊内容', () => {
        it('应该保留 YAML 语法结构', () => {
            const raw = `---
nested:
  key: value
  array:
    - item1
    - item2
---`;
            const result = parseFrontMatter(raw);
            expect(result).toContain('nested:');
            expect(result).toContain('array:');
        });

        it('应该保留引号包裹的值', () => {
            const raw = `---
title: "Quoted Title"
desc: 'Single Quoted'
---`;
            expect(parseFrontMatter(raw)).toBe(`title: "Quoted Title"
desc: 'Single Quoted'`);
        });

        it('应该保留特殊字符', () => {
            const raw = `---
title: Hello, World!
symbols: @#$%^&*()
---`;
            expect(parseFrontMatter(raw)).toBe(`title: Hello, World!
symbols: @#$%^&*()`);
        });
    });
});
