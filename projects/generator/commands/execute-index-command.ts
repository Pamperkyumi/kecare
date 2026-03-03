import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import { join } from 'node:path';
import { getThemePath } from './config-utils.ts';
import { existsSync } from 'node:fs';
import { executeInputDrivers } from '../input-drivers/__ROOT__.ts';
import type { KecareContext } from '../types.ts';
import { emitArticleHandle } from '../module-handler/__ROOT__.ts';

export async function executeIndexCommand(params: Params) {
    // 从命令行参数中获取项目路径（第一个参数）
    let projectPath = params.commands[0];

    // 如果没有提供路径，尝试从配置中读取
    // 这允许用户使用 `kecare add <path>` 预先保存路径，后续无需重复输入
    if (!projectPath) {
        // 尝试获取已保存的主题路径
        projectPath = await getThemePath() ?? undefined

        // 如果既没有命令行参数，也没有保存的路径，提示用户并退出
        if (!projectPath) {
            consola.error('No theme path specified, and no saved path found');
            consola.info('Please use `kecare add <path>` to save the theme path');
            consola.info('or specify the path directly: kecare gen <path>');
            process.exit(1);
        }
    }

    // 输出当前使用的项目路径，方便用户确认
    consola.info('Project path', projectPath);

    // 验证项目路径是否存在
    if (!(await existsSync(projectPath))) {
        consola.error('Project path does not exist');
        consola.info('Please save the correct path using `kecare add <path>` first.');
        process.exit(1);
    }

    // 构建 .kecare 目录路径
    // .kecare 是项目的配置和数据目录，包含文章、模板等资源
    const KecareDir = join(projectPath, '.kecare');
    if (!(await existsSync(KecareDir))) {
        consola.error('Kecare directory does not exist');
        process.exit(1);
    }

    // 构建文章目录路径
    // articles 子目录用于存储所有的文章内容
    const articlePath = join(KecareDir, 'articles');
    if (!(await existsSync(articlePath))) {
        consola.error('Article directory does found,no articles will be processed');
        process.exit(1);
    }

    // 扫描文章列表
    const context: KecareContext = {
        projectPath,
    }
    await executeInputDrivers(context, emitArticleHandle);
}
