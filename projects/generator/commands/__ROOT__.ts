import { argv, } from "node:process";
import { executeInitCommand } from "./execute-init-command.ts";
import { executeIndexCommand } from "./execute-index-command.ts";
import { executeVersionCommand } from "./execute-version-command.ts";
import { executeCleanCommand } from "./execute-clean-command.ts";
import { executeDevCommand } from "./execute-dev-command.ts";
import { executeCheckCommand } from "./execute-check-command.ts";
import { printHelp } from "./help.ts";

export type Params = {
    command: string;
    commands: Array<string>;
    options: Record<string, string | true>;
    raw: Array<string>;
    subCommand?: string; // 新增子命令字段
};

async function __executeCommands(params: Params) {
    // 具体的命令
    if (params.command === 'gen') await executeIndexCommand(params);
    else if (params.command === 'dev') {
        // dev 命令启动监听器后会持续运行，不能执行 process.exit
        await executeDevCommand(params);
        return;
    }
    else if (params.command === 'version') await executeVersionCommand(params);
    else if (params.command === 'init') await executeInitCommand(params);
    else if (params.command === 'clean') await executeCleanCommand(params);
    else if (params.command === 'check') await executeCheckCommand(params);
    else if (params.command === 'help') {
        // help 命令：kecare help [command]
        printHelp(params.commands[0]);
    }
    else if (params.command === 'index') {
        // 无参数运行，打印全局帮助
        printHelp();
    }
    else {
        // 未知命令，打印帮助并以非零码退出
        printHelp(params.command);
        process.exit(1);
    }

    process.exit(0);
}

export async function executeCommands() {
    const params: Params = {
        command: "index",
        commands: [],
        options: {},
        raw: [],
    };
    params.raw = argv.slice(3);

    for (const v of argv.slice(3)) {
        if (v.startsWith("--") && v.includes("=")) {
            const vSplited = v.split("=");
            params.options[vSplited[0]!.slice(2)] = vSplited.slice(1, vSplited.length).join("=");
        } else if (v.startsWith("--")) {
            params.options[v.slice(2)] = "1";
        } else if (v.startsWith("-") && v.includes("=")) {
            const vSplited = v.split("=");
            params.options[vSplited[0]!.slice(1)] = vSplited.slice(1, vSplited.length).join("=");
        } else if (v.startsWith("-")) {
            params.options[v.slice(1)] = "1";
        } else {
            params.commands.push(v);
        }
    }
    if (argv.length === 2) params.command = "index";
    if (argv.length !== 2) params.command = `${argv[2] ?? "index"}`;

    // 处理冒号分隔的子命令
    if (params.command.includes(":")) {
        const parts = params.command.split(":");
        params.command = parts[0]!;
        params.subCommand = parts.slice(1).join(":");
    }

    if (params.command.startsWith("--")) params.command = params.command.slice(2);
    if (params.command.startsWith("-") && params.command !== "-") params.command = params.command.slice(1);

    // 检测 --help / -h 标志：显示对应命令的帮助后退出
    if (params.options['help'] || params.options['h']) {
        printHelp(params.command === 'index' ? undefined : params.command);
        process.exit(0);
    }

    await __executeCommands(params);
}
