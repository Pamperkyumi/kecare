import { renderFilled } from 'oh-my-logo';
/**
 * 命令帮助系统：为 gen/dev/init/clean/version/help 提供统一的帮助输出。
 *
 * 触发方式：
 *   - `kecare`（无参数）→ 打印全局帮助
 *   - `kecare --help` / `kecare -h` → 打印全局帮助
 *   - `kecare <command> --help` → 打印该命令的帮助
 *   - `kecare help [command]` → 打印该命令的帮助
 *   - 未知命令 → 打印全局帮助并退出码 1
 */

type CommandOption = {
    flag: string;
    type: 'flag' | 'value';
    description: string;
};

type CommandExample = {
    command: string;
    description: string;
};

type CommandMeta = {
    name: string;
    summary: string;
    usage: string;
    options: CommandOption[];
    examples: CommandExample[];
};

// 各命令的元数据
const commandsMeta: Record<string, CommandMeta> = {
    gen: {
        name: 'gen',
        summary: '全量生成文章页面（详情页、列表页、归档页、搜索索引、菜单）',
        usage: 'kecare gen <project-path>',
        options: [
            { flag: '--help, -h', type: 'flag', description: '显示该命令的帮助' },
        ],
        examples: [
            { command: 'kecare gen ./projects/theme', description: '生成 theme 项目的全部页面' },
        ],
    },
    dev: {
        name: 'dev',
        summary: '增量开发模式：监听 .kecare/articles 变化，仅重生成受影响文章 + 下游聚合页，对接 Nuxt HMR',
        usage: 'kecare dev <project-path> [options]',
        options: [
            { flag: '--with-nuxt', type: 'flag', description: '同时启动 nuxt dev 子进程（默认仅运行 kecare 监听器）' },
            { flag: '--help, -h', type: 'flag', description: '显示该命令的帮助' },
        ],
        examples: [
            { command: 'kecare dev ./projects/theme', description: '启动监听器，自行在另一终端运行 nuxt dev' },
            { command: 'kecare dev ./projects/theme --with-nuxt', description: '同时启动 kecare 监听器与 nuxt dev' },
        ],
    },
    init: {
        name: 'init',
        summary: '初始化新项目（从 Nuxt Blog 模板克隆、创建空项目或从 GitHub URL 导入）',
        usage: 'kecare init [project-path]',
        options: [
            { flag: '--help, -h', type: 'flag', description: '显示该命令的帮助' },
        ],
        examples: [
            { command: 'kecare init my-blog', description: '在 my-blog 目录初始化项目' },
        ],
    },
    clean: {
        name: 'clean',
        summary: '清理生成的文章页面、搜索索引与 markdown 缓存',
        usage: 'kecare clean <project-path>',
        options: [
            { flag: '--help, -h', type: 'flag', description: '显示该命令的帮助' },
        ],
        examples: [
            { command: 'kecare clean ./projects/theme', description: '清理 theme 项目的生成产物' },
        ],
    },
    version: {
        name: 'version',
        summary: '显示 Kecare 版本号',
        usage: 'kecare version',
        options: [
            { flag: '--help, -h', type: 'flag', description: '显示该命令的帮助' },
        ],
        examples: [
            { command: 'kecare version', description: '输出版本号' },
        ],
    },
    help: {
        name: 'help',
        summary: '显示命令帮助',
        usage: 'kecare help [command]',
        options: [],
        examples: [
            { command: 'kecare help', description: '显示全局帮助' },
            { command: 'kecare help dev', description: '显示 dev 命令的帮助' },
        ],
    },
};

// 命令展示顺序
const commandOrder = ['gen', 'dev', 'init', 'clean', 'version', 'help'];

/**
 * 打印帮助信息。无参数时打印全局帮助，有参数时打印指定命令的详细帮助。
 */
export function printHelp(commandName?: string): void {
    if (commandName && commandName !== 'index') {
        const meta = commandsMeta[commandName];
        if (!meta) {
            console.log(`\n  未知命令: ${commandName}\n`);
            printGlobalHelp();
            return;
        }
        printCommandHelp(meta);
        return;
    }
    printGlobalHelp();
}

function printGlobalHelp(): void {
    console.log('');
    renderFilled('kecare', {
        palette: 'ocean',
        letterSpacing: 1
    });
    console.log('');
    console.log('  用法: kecare <command> [options]');
    console.log('');
    console.log('  命令:');
    // 对齐命令名与摘要
    let maxNameLen = 0;
    for (const n of commandOrder) {
        if (n.length > maxNameLen) maxNameLen = n.length;
    }
    for (const name of commandOrder) {
        const meta = commandsMeta[name]!;
        console.log(`    ${meta.name.padEnd(maxNameLen)}  ${meta.summary}`);
    }
    console.log('');
    console.log('  全局选项:');
    console.log('    --help, -h    显示帮助（可跟在任意命令后）');
    console.log('');
    console.log('  说明:');
    console.log('    dev 模式下，模板/菜单/配置变更不会被监听，需手动重跑 gen 或重启 dev。');
    console.log('    通过 `bun run ./projects/generator/index.ts <command>` 直接调用。');
    console.log('');
}

function printCommandHelp(meta: CommandMeta): void {
    console.log('');
    console.log(`  ${meta.name} — ${meta.summary}`);
    console.log('');
    console.log(`  用法: ${meta.usage}`);
    console.log('');
    if (meta.options.length > 0) {
        console.log('  选项:');
        let maxFlagLen = 0;
        for (const opt of meta.options) {
            if (opt.flag.length > maxFlagLen) maxFlagLen = opt.flag.length;
        }
        for (const opt of meta.options) {
            console.log(`    ${opt.flag.padEnd(maxFlagLen)}  ${opt.description}`);
        }
        console.log('');
    }
    if (meta.examples.length > 0) {
        console.log('  示例:');
        for (const ex of meta.examples) {
            console.log(`    ${ex.command}`);
            console.log(`      ${ex.description}`);
        }
        console.log('');
    }
}
