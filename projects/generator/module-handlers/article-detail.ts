import { writeFile, mkdir } from 'node:fs/promises';
import consola from 'consola';
import type { InputDriverOptions } from '../types/input-driver-options';
import { dirname } from 'node:path';

export async function articleDetailModuleHandler(options: InputDriverOptions) {
  const { projectPath, articles, module, tsFile } = options;
  for (const article of articles) {
    try {
      const result = await module.generator({
        projectPath,
        article,
        cards: [],
      });
      consola.info('result:', result);
      const articleDir = dirname(result.path);
      mkdir(articleDir, { recursive: true });
      if (result && result.path && result.template) {
        await writeFile(result.path, result.template, 'utf-8');
        consola.success(`File has been written: ${result.path}`);
      }
    } catch (err: any) {
      consola.error(`Error running generator ${tsFile}`);
      consola.error(err);
    }
  }
}
