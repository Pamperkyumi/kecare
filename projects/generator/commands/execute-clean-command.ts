import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import { dirname, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { rm, rmdir } from 'node:fs/promises';
import { loadMarkdownCache } from '../input-drivers/markdown-driver/__ROOT__.ts';
import { loadProductRegistryFiles, productRegistryPath } from '../utils/product-registry.ts';

export async function executeCleanCommand(params: Params) {
    const projectPath = resolve(params.commands[0] ?? '.');

    consola.info('Project path', projectPath);

    const kecareDir = join(projectPath, '.kecare');
    if (!existsSync(kecareDir)) {
        consola.error('Kecare directory does not exist');
        process.exit(1);
    }

    // 产物路径由主题模板（*.article.ts / *.list.ts / *.archives.ts）的 fsPath 决定，
    // 生成器无法预知，因此不能硬编码清理目录；
    // 从产物登记表与 markdown 缓存清单两处收集真实产物路径
    const registryFiles = await loadProductRegistryFiles(projectPath);
    const manifest = await loadMarkdownCache(join(projectPath, '.kecare', 'cache', 'markdown-manifest.json'));
    const manifestFiles: string[] = [];
    for (const key of Object.keys(manifest.articles)) {
        const entry = manifest.articles[key];
        if (!entry || !Array.isArray(entry.variants)) continue;
        for (const variant of entry.variants) {
            const realFsPaths = variant.__REAL_FS_PATHS__;
            if (!Array.isArray(realFsPaths)) continue;
            for (const realFsPath of realFsPaths) manifestFiles.push(realFsPath);
        }
    }

    // 两处登记合并去重
    const allProductFiles = [...new Set([...registryFiles, ...manifestFiles])];
    if (allProductFiles.length === 0) {
        consola.warn('产物登记为空（可能尚未运行过 gen），仅清理缓存与搜索索引');
    }

    // 逐文件删除产物
    let cleanedCount = 0;
    for (const fsPath of allProductFiles) {
        if (!existsSync(fsPath)) continue;
        await rm(fsPath, { force: true });
        cleanedCount++;
    }
    if (cleanedCount > 0) consola.success(`Cleaned generated files: ${cleanedCount}`);

    // 自下而上清理因产物删除而变空的目录（如 app/pages/articles/<lang>）。
    // rmdir 仅在目录为空时成功，非空目录会失败并被跳过，不会误删主题自己的文件
    const emptyDirCandidates = new Set<string>();
    for (const fsPath of allProductFiles) {
        let dir = dirname(fsPath);
        while (dir.startsWith(projectPath) && dir !== projectPath) {
            emptyDirCandidates.add(dir);
            dir = dirname(dir);
        }
    }
    const sortedDirs = [...emptyDirCandidates].sort((a, b) => b.length - a.length);
    for (const dir of sortedDirs) {
        try {
            await rmdir(dir);
        } catch {
            // 目录非空或已不存在，跳过
        }
    }

    // 搜索索引由 search 模块固定写入 public/articles，整目录清理
    const searchCachePath = join(projectPath, 'public', 'articles');
    await rm(searchCachePath, { recursive: true, force: true });
    consola.success(`Clean search Cache: ${searchCachePath}`);

    // 最后清理缓存文件本身（markdown 缓存清单 + 产物登记表）
    const markdownCachePath = join(projectPath, '.kecare', 'cache', 'markdown-manifest.json');
    await rm(markdownCachePath, { force: true });
    await rm(productRegistryPath(projectPath), { force: true });
    consola.success(`Cleaned markdown cache: ${markdownCachePath}`);
    consola.success(`Cleaned product registry: ${productRegistryPath(projectPath)}`);
}
