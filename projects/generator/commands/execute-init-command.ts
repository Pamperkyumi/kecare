import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { cli } from '../utils/cli.ts';
import { execSync } from 'node:child_process';

// // 模板配置
// const TEMPLATES = [
//     {
//         name: 'Nuxt',
//         description: 'Kecare 默认主题模板',
//         repo: 'https://github.com/kecare/kecare-theme-default.git',
//     },
//     {
//         name: 'Blog',
//         description: 'Kecare 博客主题模板',
//         repo: 'https://github.com/kecare/kecare-theme-blog.git',
//     },
//     {
//         name: 'Docs',
//         description: 'Kecare 文档主题模板',
//         repo: 'https://github.com/kecare/kecare-theme-docs.git',
//     },
// ];

export async function executeInitCommand(params: Params) {
    consola.info('Welcome to Use Kecare UwU I love U');

    // 1. 获取项目路径
    const defaultPath = params.commands[0] || '.';

    const projectPath = resolve(defaultPath);
    console.log(projectPath);

    // // 检查路径是否已存在
    // if (existsSync(projectPath)) {
    //     consola.error(`路径已存在: ${projectPath}`);
    //     process.exit(1);
    // }

    // 2. 选择模板
    const selectedTemplateStr = await cli.select('请选择模板', ['Nuxt Blog', 'Empty Project', 'Import from GitHub URL']);

    console.log(selectedTemplateStr);
    if (selectedTemplateStr === 'Nuxt Blog') {
        console.log('Nuxt Blog');
        console.log('正在从 Nuxt Blog 模板克隆...');
        try {
            execSync(`git clone https://github.com/Pamperkyumi/kecare-template-nuxt.git "${projectPath}"`, {
                stdio: 'inherit',
            });
            consola.success(`项目初始化完成: ${projectPath}`);
            console.log('正在安装依赖性...');
            execSync(`npm install`, {
                stdio: 'inherit',
            });
            console.log('接下来请运行:');
            console.log(`  cd ${projectPath}`);
            console.log('  npm run dev');
        } catch (error) {
            consola.error('克隆模板失败，请检查网络连接或 Git 是否已安装');
            process.exit(1);
        }
    }
    if (selectedTemplateStr === 'Empty Project') {
        console.log('Empty Project');
        console.log('正在创建空项目...');
        try {
            execSync(`mkdir -p "${projectPath}"`, {
                stdio: 'inherit',
            });
            consola.success(`项目初始化完成: ${projectPath}`);
        } catch (error) {
            consola.error('创建空项目失败，请检查网络连接或 Git 是否已安装');
            process.exit(1);
        }
    }
    if (selectedTemplateStr === 'Import from GitHub URL') {
        console.log('Import from GitHub URL');
        console.log('请输入 GitHub URL:');
        const url = await cli.input('请输入 GitHub URL');
        console.log(url);
        try {
            execSync(`git clone ${url} "${projectPath}"`, {
                stdio: 'inherit',
            });
            consola.success(`项目初始化完成: ${projectPath}`);
        } catch (error) {
            consola.error('克隆模板失败，请检查网络连接或 Git 是否已安装');
            process.exit(1);
        }
    }


    // // 获取选中的模板
    // const selectedIndex = templateChoices.indexOf(selectedTemplateStr);
    // const selectedTemplate = TEMPLATES[selectedIndex];

    // if (!selectedTemplate) {
    //     consola.error('模板选择失败');
    //     process.exit(1);
    // }

    // consola.start(`正在从 ${selectedTemplate.repo} 克隆模板...`);


    // // 3. 克隆模板
    // try {
    //     execSync(`git clone ${selectedTemplate.repo} "${projectPath}"`, {
    //         stdio: 'inherit',
    //     });
    //     consola.success(`项目初始化完成: ${projectPath}`);
    //     consola.info('接下来请运行:');
    //     consola.info(`  cd ${projectPath}`);
    //     consola.info('  pnpm install');
    //     consola.info('  pnpm dev');
    // } catch (error) {
    //     consola.error('克隆模板失败，请检查网络连接或 Git 是否已安装');
    //     process.exit(1);
    // }
}