import { writeFile } from 'node:fs/promises';
import type { InputDriverOptions } from '../types/input-driver-options';
import consola from 'consola';

export async function archivesModuleHandler(options: InputDriverOptions) {
  const { projectPath, articles, module, tsFile, } = options;
  
  try {
    const result = await module.generator({
      projectPath,
      articles,
    });
    
    consola.info('archives result:', result);
    
    if (result && result.path && result.template) {
      await writeFile(result.path, result.template, 'utf-8');
      consola.success(`Archives file has been written: ${result.path}`);
    }
  } catch (err: any) {
    consola.error(`Error running archives generator ${tsFile}`);
    consola.error(err);
  }
}