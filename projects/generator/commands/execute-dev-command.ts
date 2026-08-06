import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import { join, resolve } from 'node:path';
import { existsSync, watch } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { Glob } from 'bun';
import { runGeneration } from './run-generation.ts';
import { loadMarkdownCache } from '../input-drivers/markdown-driver/__ROOT__.ts';

/**
 * dev 命令：监听 .kecare/articles 目录，文章变更后触发增量重生成，并对接 Nuxt HMR。
 *
 * 增量策略：每次变更创建新的 KecareContext 重跑 runGeneration 全流程。
 * 未变更文章命中 markdown-manifest 缓存 → 跳过解析/翻译/写盘（仅做内存收集）；
 * 仅变更文章做实活；下游聚合页（list/search/archive）用全量数据重算。
 *
 * 进程模型：
 *   - 默认仅运行 kecare 监听器，用户自行在另一终端运行 nuxt dev（解耦、稳健）。
 *   - --with-nuxt：同时拉起 nuxt dev 子进程，统一管理生命周期。
 *
 * HMR 原理（文件系统解耦）：
 *   Kecare 与 Nuxt 是独立进程，通过文件系统通信：
 *   1. Node.js fs.watch 监听 .kecare/articles/ 目录（recursive），检测 .md 文件变更
 *   2. 400ms debounce 合并编辑器连续保存事件，触发 runDevCycle
 *   3. runDevCycle 调用 runGeneration → 写入 .vue 文件到 app/pages/articles/
 *   4. Vite（Nuxt 内置的 dev server）通过 chokidar 监听 app/pages/ 目录，发现 .vue 文件变化
 *   5. Vite 触发 HMR：分析依赖图 → 确定受影响模块 → 通过 WebSocket 推送增量更新到浏览器
 *   6. 浏览器收到 HMR update 消息 → Vue 组件热替换（保留组件状态）→ 页面无刷新更新
 *
 *   对于新增/删除页面，Nuxt 的 Vite 插件会触发 full-reload 以保证路由表同步。
 *   Kecare 不需要主动"通知"Nuxt —— 只要 .vue 写入 Nuxt 的文件路由目录，Vite 自动感知。
 */
export async function executeDevCommand(params: Params) {
    // 解析项目路径，默认为当前目录
    const projectPath = resolve(params.commands[0] ?? '.');
    const withNuxt = !!params.options['with-nuxt'];

    consola.info('Project path', projectPath);

    // 校验文章目录存在，早期失败避免启动 watcher 后才发现问题
    const articlesDir = join(projectPath, '.kecare', 'articles');
    if (!existsSync(articlesDir)) {
        consola.error(`Article directory does not exist: ${articlesDir}`);
        process.exit(1);
    }

    // 初始全量生成，确保 dev 启动时产物已存在（nuxt 启动时需要这些页面）
    consola.info('初始生成中...');
    try {
        await runGeneration(projectPath);
    } catch (error) {
        consola.error('初始生成失败:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }

    // 若指定 --with-nuxt，启动 Nuxt 开发服务器子进程
    let childProc: ReturnType<typeof Bun.spawn> | null = null;
    if (withNuxt) {
        consola.info('启动 Nuxt 开发服务器...');
        childProc = Bun.spawn(['bun', 'run', 'dev'], {
            cwd: projectPath,
            stdio: ['inherit', 'inherit', 'inherit'],
        });
    }

    // 监听状态：running 标记当前是否正在跑周期，dirty 标记周期运行中是否又有新变更
    let running = false;
    let dirty = false;
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    // 增量重生成周期：prune 孤儿产物 → 全流程重跑。错误被捕获以保证 watcher 不中断。
    const runDevCycle = async () => {
        if (running) {
            // 周期运行中收到新事件，仅标记脏，等当前周期结束后再跑一次
            dirty = true;
            return;
        }
        running = true;
        try {
            consola.info('检测到文章变更，开始增量重生成...');
            await pruneOrphans(projectPath);
            // ── HMR 第 2 步：runGeneration 将文章转换为 .vue 文件，写入 app/pages/articles/ ──
            // 这些 .vue 位于 Nuxt 的文件路由目录内，Vite 的 chokidar 文件监听器会自动检测到变更，
            // 立即触发 HMR（Hot Module Replacement）向浏览器推送增量更新。
            // 新增/删除页面时 Nuxt 会触发 full-reload 以同步路由表。
            await runGeneration(projectPath);
            // 此时 Vite 已经检测到了 app/pages/ 下的文件变化，Nuxt 已自行触发 HMR
            consola.success('增量重生成完成 —— .vue 已写入，Vite 将自动触发 HMR');
        } catch (error) {
            consola.error('增量重生成失败:', error instanceof Error ? error.message : String(error));
        } finally {
            running = false;
            if (dirty) {
                dirty = false;
                runDevCycle();
            }
        }
    };

    // 400ms debounce：编辑器连续保存会触发多次事件，合并为一次重生成
    const scheduleCycle = () => {
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            debounceTimer = null;
            runDevCycle();
        }, 400);
    };

    // ── HMR 第 1 步：Node.js fs.watch 监听文章源目录 ──
    // recursive 在 Windows 上原生支持，子目录内文章变更也会触发。
    // 回调参数：eventType 为 'change' | 'rename'（Windows 上均为 'change'），filename 为相对路径。
    const watcher = watch(articlesDir, { recursive: true }, (_eventType, filename) => {
        if (!filename) return;
        const name = filename.toString();
        // 只关注 markdown 文件；编辑器临时文件（.md~、.swp、.tmp 等）无 .md 后缀自然被过滤
        if (!/\.(md|mdx|markdown)$/i.test(name)) return;
        consola.info(`[fs.watch] 检测到文章源文件变更: ${name}`);
        // → 进入 debounce → runDevCycle → runGeneration 写入 .vue 到 app/pages/
        // → Vite 的 chokidar 检测到 app/pages/ 下的 .vue 变化 → 触发 HMR → 浏览器热更新
        scheduleCycle();
    });

    // 优雅退出：关闭 watcher、杀掉 nuxt 子进程
    const cleanup = () => {
        watcher.close();
        if (childProc) {
            try { childProc.kill(); } catch { /* 子进程可能已退出，忽略 */ }
        }
        process.exit(0);
    };
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);

    consola.info('Kecare dev 监听中... 按 Ctrl+C 退出');
    if (!withNuxt) {
        consola.info('提示：请在另一个终端运行 nuxt dev 以启用 HMR，或使用 --with-nuxt 自动启动');
    }
}

/**
 * 清理孤儿产物：文章被删除或重命名后，manifest 中残留的 entry 指向的 .vue 文件需要删除。
 * 与 markdown-driver 的 relativePath 计算算法保持一致（fsPath.replace(articlePath, '')）。
 * 该函数仅在 dev 周期内调用，不污染 gen 命令流程。
 */
async function pruneOrphans(projectPath: string) {
    const cachePath = join(projectPath, '.kecare', 'cache', 'markdown-manifest.json');
    const manifest = await loadMarkdownCache(cachePath);

    const articlePath = join(projectPath, '.kecare', 'articles');
    const glob = new Glob(`${articlePath}/**/*.{md,mdx,markdown}`);

    // 收集当前实际存在的文章 relativePath 集合
    const currentPaths = new Set<string>();
    for await (const fsPath of glob.scan('.')) {
        currentPaths.add(fsPath.replace(articlePath, ''));
    }

    let changed = false;
    for (const key of Object.keys(manifest.articles)) {
        // 文章仍存在则跳过
        if (currentPaths.has(key)) continue;

        // 文章已被删除或重命名，清理其生成的 .vue 文件与 manifest entry
        const entry = manifest.articles[key];
        if (entry?.variants) {
            for (const variant of entry.variants) {
                const realFsPath = variant.__REAL_FS_PATHS__;
                if (realFsPath && existsSync(realFsPath)) {
                    await rm(realFsPath, { force: true });
                }
            }
        }
        delete manifest.articles[key];
        changed = true;
        consola.info(`[dev] 清理孤儿产物: ${key}`);
    }

    if (changed) {
        await mkdir(join(projectPath, '.kecare', 'cache'), { recursive: true });
        await writeFile(cachePath, JSON.stringify(manifest, null, 2), 'utf-8');
    }
}
