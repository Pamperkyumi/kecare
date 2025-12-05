import { marked } from 'marked';
import { basename, join } from 'node:path';
import { readdir, stat, readFile } from 'node:fs/promises';
import type { InputDriverOptions } from '../types/input-driver-options';
import matter from 'gray-matter';

export async function markdownInputDriver(options: InputDriverOptions) {
  const articlePath = join(options.projectPath, '.kecare', 'articles');
  const articleFile = await readdir(articlePath);
  for (const filename of articleFile) {
    const filePath = join(articlePath, filename);
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) continue;
    if (!filename.endsWith('.md')) continue;

    const mdContent = await readFile(filePath, 'utf8');

    // Use the front-matter information
    const { data: frontmatter, content } = matter(mdContent);
    const contentHtml = await marked(content);
    const id = basename(filename, '.md');
    const title = frontmatter.title || id.replace(/-/g, ' ');
    const coverSrc = frontmatter.coverSrc || 'https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp';
    const author = frontmatter.author || 'Pamper';

    // Extract plain text desc from contentHtml when there's no desc property in front-matter
    function extraDescFromHtml(contentHtml: string, maxLen = 120): string {
      if (!contentHtml) return '';
      let text = contentHtml.replace(/<[^>]+>/g, ' ');
      text = text.replace(/\s+/g, ' ').trim();
      if (text.length > maxLen) {
        return text.slice(0, maxLen).trimEnd() + '...';
      }
      return text;
    }
    const descMaxLength = 120;
    const desc = frontmatter.desc && String(frontmatter.desc).trim().length > 0 ? String(frontmatter.desc).trim() : extraDescFromHtml(contentHtml, descMaxLength);

    options.articles.push({
      id,
      title,
      desc,
      coverSrc,
      contentHtml,
      createdAt: fileStat.mtimeMs.toString(), // last modification time
      author,
      to: `/articles/${id}`,
    });
    //console.log("==== HTML FROM MARKED ====");
    //console.log(contentHtml);
  }
}
