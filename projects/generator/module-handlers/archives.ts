import { writeFile,mkdir } from 'node:fs/promises';
import type { InputDriverOptions } from '../types/input-driver-options';
import consola from 'consola';
import { dirname } from 'node:path';

export async function archivesModuleHandler(options: InputDriverOptions) {
  const { projectPath, articles, module, tsFile, } = options;
  
  try {
    if (typeof module.generator !== 'function'){
      throw new Error(`Module ${tsFile} does not have a generator function`);
    }
    const result = await module.generator({
      projectPath,
      articles,
    });
    
    consola.info('result:', result);
    
    if (result && result.path && result.template) {
      const dirPath = dirname(result.path);
      await mkdir (dirPath, { recursive: true });
      mkdir(dirPath, { recursive: true });
      await writeFile(result.path, result.template, 'utf-8');
      consola.success(`File has been written: ${result.path}`);
    }
  } catch (err: any) {
    consola.error(`Error running generator ${tsFile}`);
    consola.error(err);
  }
}