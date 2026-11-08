import { join } from 'node:path';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import type { KecareContext } from 'kecare';

/**
 * 产物登记表：记录本次生成实际写入磁盘的全部产物文件路径。
 *
 * 产物路径由主题模板（*.article.ts / *.list.ts / *.archives.ts）返回的 fsPath 决定，
 * 生成器无法预知，因此 clean 命令不能靠硬编码目录来清理，只能依赖这里的登记。
 *
 * 生命周期：每次 gen/dev 周期都会创建新的 context，登记表随之在内存中重建；
 * 各模块写盘时调用 register() 登记，emitModuleFinish 结束时统一落盘；
 * clean 命令读取登记表逐文件清理。
 */

type ProductRegistryModule = {
    // 登记一个生成产物文件路径
    register: (fsPath: string) => void;
    // 将登记表落盘到 .kecare/cache/product-registry.json
    save: () => Promise<void>;
};

function createProductRegistry(context: KecareContext): ProductRegistryModule {
    const files: string[] = [];

    return {
        register(fsPath: string) {
            files.push(fsPath);
        },
        async save() {
            // 去重后落盘，避免同一文件被重复登记
            const uniqueFiles = [...new Set(files)];
            if (uniqueFiles.length === 0) return;
            await mkdir(join(context.projectPath, '.kecare', 'cache'), { recursive: true });
            await writeFile(productRegistryPath(context.projectPath), JSON.stringify({ files: uniqueFiles }, null, 2), 'utf-8');
        },
    };
}

// 以 context 为键缓存登记表实例：每次 gen 都会创建新的 context，
// 登记表随 context 重建，避免 dev 多周期间残留上一轮的产物记录
const instances = new WeakMap<KecareContext, ProductRegistryModule>();

export function useProductRegistry(context: KecareContext): ProductRegistryModule {
    let instance = instances.get(context);
    if (!instance) {
        instance = createProductRegistry(context);
        instances.set(context, instance);
    }
    return instance;
}

// 登记表文件路径
export function productRegistryPath(projectPath: string): string {
    return join(projectPath, '.kecare', 'cache', 'product-registry.json');
}

// 读取登记的全部产物路径（clean 命令使用）；文件不存在或损坏时返回空数组
export async function loadProductRegistryFiles(projectPath: string): Promise<string[]> {
    try {
        const raw = await readFile(productRegistryPath(projectPath), 'utf-8');
        const registry = JSON.parse(raw) as { files?: unknown };
        if (!Array.isArray(registry.files)) return [];
        return registry.files.filter((file) => typeof file === 'string' && file.length > 0);
    } catch {
        return [];
    }
}
