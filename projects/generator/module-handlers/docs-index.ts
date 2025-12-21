import { writeFile, mkdir} from 'node:fs/promises';
import consola from 'consola';
import { dirname } from 'node:path';
import type { DocsIndexHandlerOptions } from '../types/input-driver-options';

export async function docsIndexModuleHandler(options:DocsIndexHandlerOptions) {
    const { projectPath,articles,module,tsFile,} = options;
    for (const article of articles){
        try {
            if(typeof module.generator !== 'function'){
                throw new Error(`Module ${tsFile} does not have a generator function`)
            }
            const result = await module.generator({
                projectPath,
                article,
                articles,
            });
            consola.info('result:', result);
            const articleDir = dirname(result.path);
            mkdir(articleDir, { recursive: true });
            if (result && result.path && result.template) {
                const dirPath = dirname(result.path); 
                await mkdir (dirPath, { recursive: true });
                await writeFile(result.path, result.template, 'utf-8');
                consola.success(`File has been written: ${result.path}`);
            }
        } catch (err: any){
            consola.error(`Error running generator ${tsFile}`);
            consola.error(err);
        }
    }
}