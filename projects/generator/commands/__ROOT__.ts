import { argv, } from "node:process";
import { executeInitCommand } from "./execute-init-command.ts";
import { executeIndexCommand } from "./execute-index-command.ts";
import { executeVersionCommand } from "./execute-version-command.ts";
import { executeCleanCommand } from "./execute-clean-command.ts";

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
    if (params.command === 'version') await executeVersionCommand(params);
    if (params.command === 'init') await executeInitCommand(params);
    if (params.command === 'clean') await executeCleanCommand(params);

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

    await __executeCommands(params);
}
