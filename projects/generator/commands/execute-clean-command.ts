import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import { join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { rm } from 'node:fs/promises';

export async function executeCleanCommand(params: Params) {
    const projectPath = resolve(params.commands[0] ?? '.');

    consola.info('Project path', projectPath);

    const KecareDir = join(projectPath, '.kecare');
    if (!existsSync(KecareDir)) {
        consola.error('Kecare directory does not exist');
        process.exit(1);
    }

    const generatedArticlesPath = join(projectPath, 'app', 'pages', 'articles');
    const markdownCachePath = join(projectPath, '.kecare', 'cache', 'markdown-manifest.json');
    const searchCachePath = join(projectPath, 'public', 'articles');

    await rm(generatedArticlesPath, { recursive: true, force: true });
    await rm(markdownCachePath, { force: true });
    await rm(searchCachePath, { recursive: true, force: true });
    consola.success(`Cleaned generated articles: ${generatedArticlesPath}`);
    consola.success(`Cleaned markdown cache: ${markdownCachePath}`);
}
