import consola from 'consola';
import { exists, readdir} from 'node:fs/promises';
import { join } from 'node:path';
import type { Article } from './types/article';
import { inputDrivers } from './input-drivers/__EXPORTS__';
import { moduleHandlers } from './module-handlers/__EXPORTS__';

export async function run(projectPath: string) {
  consola.info('Project path', projectPath);

  if(!(await exists(projectPath))){
    consola.error('Project path does not exist');
    process.exit(1);
  }

  const KecareDir = join(projectPath, '.kecare');
  if(!(await exists(KecareDir))){
    consola.error('Kecare directory does not exist')
    process.exit(1);
  }

  const articlePath = join(KecareDir, 'articles')
  if(!(await exists(articlePath))){
    consola.error('Article directory does found,no articles will be processed')
    process.exit(1);
  }
  const articles: Array<Article> = [];

  for (const inputerDriver of inputDrivers){
    try {
      await inputerDriver({
        projectPath,
        articles,
        tsFile: '',
        module: undefined
    });
    } catch (error){
      consola.error(`input driver failed: ${error}`)
    }
  }

  // Read entries under .kecare and collect template files ending with `.gen.ts`.
  const kecareDirPath = join(projectPath, '.kecare')
  const kecareDirInfo = await readdir(kecareDirPath, { withFileTypes: true })
  consola.info(`All files: ${kecareDirInfo.map(item => item.name)}`)

  const genTsFileList = kecareDirInfo.filter(item => item.isFile() && item.name.endsWith('.gen.ts')).map(item => item.name)
  consola.info(`Template files: ${genTsFileList}`)  

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
      throw new Error(`unknown module type: ${module?.type}`);
    }
  }
}
