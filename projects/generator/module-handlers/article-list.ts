import { writeFile } from 'node:fs/promises';
import type { ArticleListHandlerOptions } from '../types/input-driver-options';
import consola from 'consola';

// 你想想，这个应该传递什么参数进来？
// 1. 页码
// 2. 卡片列表（数组，最多 5 条）
// 3. 是否是首页（页码是否等于 1）
// 4. 其他你觉得需要传递进来的数据…
export async function articleListModuleHandler(options: ArticleListHandlerOptions) {
  const { projectPath, articles, module, tsFile, pageSize = 5, listTitle } = options;
  const totalArticles = articles.length;
  const totalPages = Math.max(1, Math.ceil(totalArticles / pageSize));
  for (let page = 1; page <= totalPages; page++) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const cards = articles.slice(start, end);
    const isIndex = page === 1;
    try {
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
        await writeFile(result.path, result.template, 'utf-8');
        consola.success(`File has been written: ${result.path}`);
      }
    } catch (err: any) {
      consola.error(`Error running generator ${tsFile}`);
    }
  }
}
