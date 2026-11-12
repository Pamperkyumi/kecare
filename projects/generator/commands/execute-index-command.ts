import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import { resolve } from 'node:path';
import { runGeneration } from './run-generation.ts';

export async function executeIndexCommand(params: Params) {
    // 从命令行参数中获取项目路径（第一个参数）
    if (!params.commands[0]) {
        consola.error('Project path is required. Usage: kecare gen <project-path>');
        process.exit(1);
    }
    const projectPath = resolve(params.commands[0]);

    // 输出当前使用的项目路径，方便用户确认
    consola.info('Project path', projectPath);

    // 执行生成流程，校验/生成失败时打印错误并退出
    try {
        await runGeneration(projectPath);
    } catch (error) {
        consola.error(error instanceof Error ? error.message : String(error));
        consola.info('提示：可运行 kecare check <project-path> 快速体检模板与文章配置');
        process.exit(1);
    }
}
