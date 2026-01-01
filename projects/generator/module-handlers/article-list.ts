import { writeFile, mkdir } from 'node:fs/promises';
import type { ArticleListDriverOptions } from '../types/input-driver-options';
import consola from 'consola';
import { dirname } from 'node:path';

export async function articleListModuleHandler(options: ArticleListDriverOptions) {
  const { projectPath, articles, module, tsFile, pageSize = 5, listTitle } = options;
  const totalArticles = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalArticles / pageSize));
  for (let page = 1; page <= totalPages; page++) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const cards = articles.slice(start, end);
    const isIndex = page === 1;
    try {
      if (typeof module.generator !== 'function') {
        throw new Error(`Module ${tsFile} does not have a generator function`);
      }
      const result = await module.generator({
        projectPath,
        page,
        pageSize,
        listTitle,
        cards,
        isIndex,
        totalPages,
        totalArticles,
      });
      consola.info(`result for page ${page}:`, result);
      if (result && result.path && result.template) {
        const dirPath = dirname(result.path);
        await mkdir(dirPath, { recursive: true });
        await writeFile(result.path, result.template, 'utf-8');
        consola.success(`File has been written: ${result.path}`);
      }
    } catch (err: any) {
      consola.error(`Error running generator ${tsFile}`);
    }
  }
}
