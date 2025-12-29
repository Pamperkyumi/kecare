import { marked } from 'marked';
import { basename, join } from 'node:path';
import { readdir, stat, readFile } from 'node:fs/promises';
import type { InputDriverOptions } from '../types/input-driver-options';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { Glob } from 'bun';
import markedKatex from 'marked-katex-extension';

export async function markdownInputDriver(options: InputDriverOptions) {
  marked.use(
    markedKatex({
      throwOnError: false,
      output: 'html',
    }),
  );

  const articlePath = join(options.projectPath, '.kecare', 'articles');

  const MAX_DEPTH = 5;
  const CONCURRENCY = 8;

  async function traverse(dirPath: string, depth: number) {
    // 递归深度限制，防止无限递归
    if (depth > MAX_DEPTH) return;

    // 使用 withFileTypes，避免对每个条目都 stat（性能更好）
    const entries = await readdir(dirPath, { withFileTypes: true });

    const tasks: Array<() => Promise<void>> = [];

    for (const entry of entries) {
      const filename = entry.name;
      const filePath = join(dirPath, filename);

      // 如果是文件夹，递归进去（depth + 1）
      if (entry.isDirectory()) {
        await traverse(filePath, depth + 1);
        continue;
      }

      if (!entry.isFile()) continue;
      if (!filename.endsWith('.md')) continue;

      tasks.push(async () => {
        const fileStat = await stat(filePath);

        const mdContent = await readFile(filePath, 'utf8');
        const { data: frontmatter, content } = matter(mdContent);

        const headings: Array<{ depth: 1; text: string; id: string; children: Array<{ depth: 2; text: string; id: string }> } | { depth: 2; text: string; id: string }> = [];

        let currentH1: { depth: 1; text: string; id: string; children: Array<{ depth: 2; text: string; id: string }> } | null = null;

        const renderer = new marked.Renderer();
        const slugger = new GithubSlugger();

        // HTML标签过滤
        function stripHtmlTags(text: string): string {
          if (!text) return '';
          return text
            .replace(/<[^>]+>/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        }

        renderer.heading = function (token: any) {
          const depth: number = token.depth;

          const rawText: string = this.parser.parseInline(token.tokens ?? []);
          const text: string = stripHtmlTags(rawText);

          const explicitId = (token.id && String(token.id).trim()) || (token.slug && String(token.slug).trim()) || '';

          const headingId: string = explicitId || slugger.slug(text);

          if (depth === 1) {
            const node = {
              depth: 1 as const,
              text,
              id: headingId,
              children: [] as Array<{ depth: 2; text: string; id: string }>,
            };
            headings.push(node);
            currentH1 = node;
          } else if (depth === 2) {
            const node = { depth: 2 as const, text, id: headingId };
            if (currentH1) currentH1.children.push(node);
            else headings.push(node);
          }

          return `<h${depth} id="${headingId}">${text}</h${depth}>\n`;
        };

        const contentHtml = await marked.parse(content, { renderer });
        //如果有hidden字段，直接跳过
        if (frontmatter.hidden === true) {
          return;
        }
        //hash
        const id = Bun.hash.xxHash32(basename(filename, '.md'), 1234).toString(16);
        const title = frontmatter.title || id.replace(/-/g, ' ');
        const coverSrc = frontmatter.coverSrc || 'https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp';
        const author = frontmatter.author || 'Pamper';
        const menu = frontmatter.menu;

        //date
        const normalizeDate = (raw: string | number | Date | undefined): string => {
          if (!raw) return '';
          const date = new Date(raw);
          if (isNaN(date.getTime())) return '';
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
        const date = normalizeDate(frontmatter.date || fileStat.mtimeMs);

        //menu
        const menuKey = menu;
        let menudata = null;
        if (menuKey) {
          const glob = new Glob(`${menuKey}.menu.ts`);
          const menuDir = join(options.projectPath, '.kecare', 'menu');
          const files = Array.from(glob.scanSync({ cwd: menuDir }));
          const [firstFile] = files;
          if (firstFile) {
            const filePath = join(menuDir, firstFile);
            const menuModule = await import(filePath);
            menudata = menuModule.navItems;
          }
        }
        //

        function extraDescFromHtml(contentHtml: string, maxLen = 120): string {
          if (!contentHtml) return '';
          let text = contentHtml.replace(/<[^>]+>/g, ' ');
          text = text.replace(/\s+/g, ' ').trim();
          return text.length > maxLen ? text.slice(0, maxLen).trimEnd() + '...' : text;
        }

        const desc = frontmatter.desc && String(frontmatter.desc).trim().length > 0 ? String(frontmatter.desc).trim() : extraDescFromHtml(contentHtml, 120);

        options.articles.push({
          id,
          title,
          desc,
          coverSrc,
          contentHtml,
          date,
          author,
          to: `/articles/${id}`,
          headings,
          menu,
          menudata,
        });
      });
    }
    for (let i = 0; i < tasks.length; i += CONCURRENCY) {
      const slice = tasks.slice(i, i + CONCURRENCY);
      await Promise.all(slice.map((fn) => fn()));
    }
  }
  await traverse(articlePath, 1);
  //对文章进行排序
  options.articles.sort((a, b) => {
    return b.date.localeCompare(a.date);
  });
}
