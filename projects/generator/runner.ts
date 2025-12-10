import consola from 'consola';
import { exists, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import type { Article } from './types/article';
import { inputDrivers } from './input-drivers/__EXPORTS__';
import { moduleHandlers } from './module-handlers/__EXPORTS__';

export async function run(projectPath: string) {
  consola.info('Project path', projectPath);

  const articlePath = join(projectPath, '.kecare', 'articles');
  if (!(await exists(articlePath))) {
    consola.error('Article directory not found');
    process.exit(1);
  }
  const articles: Array<Article> = [];

  for (const inputDriver of inputDrivers) {
    await inputDriver({
      projectPath,
      articles,
      tsFile: '',
      module: undefined,
    });
  }

  if (!(await exists(projectPath)) || !(await exists(join(projectPath, '.kecare')))) {
    consola.error('.kecare directory does not exist');
    process.exit(1);
  }

  // Read entries under .kecare and collect template files ending with `.gen.ts`.
  const kecareDirInfo = await readdir(join(projectPath, '.kecare'));
  consola.info('All files', kecareDirInfo);
  const genTsFileList: Array<string> = [];
  for (const dirname of kecareDirInfo) {
    const fileStat = await stat(join(projectPath, '.kecare', dirname));
    if (!fileStat.isFile()) continue;
    if (!dirname.endsWith('.gen.ts')) continue;
    genTsFileList.push(dirname);
  }
  consola.info('Template list', genTsFileList);

  for (const tsFile of genTsFileList) {
    const modulePath = join(projectPath, '.kecare', tsFile);
    const module = await import(modulePath);
    if (module.type && module.type in moduleHandlers) {
      await (moduleHandlers as any)[module.type]({
        articles,
        projectPath,
        module,
        tsFile,
      });
    } else {
      throw new Error(`未知的类型: ${module?.type}`);
    }
  }
}
