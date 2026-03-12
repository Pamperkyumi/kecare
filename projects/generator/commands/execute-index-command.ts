import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import { join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { executeInputDrivers } from '../input-drivers/__ROOT__.ts';
import type { KecareContext } from 'kecare';
import { emitArticleHandle } from '../module-handler/__ROOT__.ts';

export async function executeIndexCommand(params: Params) {
    // 从命令行参数中获取项目路径（第一个参数）
    let projectPath = resolve(params.commands[0]!);

    // 输出当前使用的项目路径，方便用户确认
    consola.info('Project path', projectPath);

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
    console.log(projectPath);
    await executeInputDrivers(context, emitArticleHandle);
}
