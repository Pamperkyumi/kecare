import { join } from 'node:path';
import { cli } from './.commands/utils/cli.ts';
import { readFile, writeFile } from 'node:fs/promises';
import consola from 'consola';
import { $ } from 'bun';
import OpenAI from 'openai';

const mainPackage = 'generator';
const childPackages = ['create-kecare', 'kecare'];

async function getCommitMessage(): Promise<string> {

    const prompt = `
You are an expert software engineer.

Generate a conventional commit message based on the git diff below.

Rules:
- Use Conventional Commits format (feat, fix, chore, refactor, etc.)
- Keep subject line under 72 characters
- No markdown
- Return ONLY the commit message

Git diff:
${await $`git diff --staged`.text()}
`;

    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEPSEEK_API_KEY!,
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek-v4-flash",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
        });
        const commitMessage = completion.choices[0]!.message.content;
        return commitMessage!;
    } catch (error) {
        consola.error(error);
        process.exit(1);
    }
}



async function updatePackage(cwd: string, pkgDirName: string, newVersion: string) {
    const pkgDir = join(cwd, 'packages', pkgDirName);
    const pkgJsonPath = join(pkgDir, 'package.json');

    const pkgJson = JSON.parse(await readFile(pkgJsonPath, 'utf-8'));
    pkgJson.version = newVersion;
    await writeFile(pkgJsonPath, JSON.stringify(pkgJson, null, 2));

    if (pkgDirName === 'create-kecare' || pkgDirName === 'milkio-elecrton') {
        await Bun.write(join(pkgDir, '__VERSION__.mjs'), `export const __VERSION__ = '${newVersion}'`);
    } else {
        await Bun.write(join(pkgDir, '__VERSION__.ts'), `export const __VERSION__ = '${newVersion}'`);
    }
    return pkgJson.name as string;
}

async function main() {
    const cwd = join(process.cwd());
    const packagesToUpdate = [...childPackages];

    if (!mainPackage) {
        consola.error('mainPackage is empty');
        process.exit(1);
    }

    const packageJson = JSON.parse(await readFile(join(cwd, 'projects', mainPackage, 'package.json'), 'utf-8'));

    const LatestVersion = packageJson.version;
    consola.success(`当前版本为: ${LatestVersion}`);

    const packagesTocheck = [...childPackages];
    consola.success(packagesTocheck);
    let newVersion = '';
    while (true) {
        newVersion = (await cli.input('要发布的新版本号是:')) ?? '';

        if (!newVersion) {
            consola.info('版本号不能为空，请重新输入');
            continue;
        }
        if (!/^(\d+)\.(\d+)\.(\d+)((-rc|-beta|-alpha)\.(\d+))?$/.test(newVersion)) {
            console.log('错误的版本号，未能满足正则表达式的校验，请重新输入');
            continue;
        }
        console.clear();
        consola.info(`检查 npm 版本是否存在...`);
        let hasConflict = false;
        for (const packageName of packagesTocheck) {
            const packageJson = JSON.parse(await readFile(join(cwd, 'packages', packageName, 'package.json'), 'utf-8'));

            const res = await $`npm view ${packageJson.name}@${newVersion} --json`
                .nothrow()
                .quiet();
            if (res.exitCode === 0) {
                consola.error(`已存在${packageJson.name}@${newVersion}`);
                hasConflict = true;
                break
            } else {
                consola.success(`可以发布 ${packageJson.name}@${newVersion}`);
            }
        }
        if (hasConflict) {
            consola.warn('检测到至少一个包该版本已存在，请重新输入版本号。');
            continue;
        }
        break;
    }
    if ((await cli.select('是否进行版本号修改', ['是', '否'])) === '是') {
        const mainPkgDir = join(cwd, 'projects', mainPackage);
        const mainPkgJsonPath = join(mainPkgDir, 'package.json');
        const mainPkgJson = JSON.parse(await readFile(mainPkgJsonPath, 'utf-8'));
        mainPkgJson.version = newVersion;
        await writeFile(mainPkgJsonPath, JSON.stringify(mainPkgJson, null, 2));
        consola.success(`已更新 ${mainPackage} -> ${newVersion}`);

        for (const pkg of packagesToUpdate) {
            const name = await updatePackage(cwd, pkg, newVersion);
            consola.success(`已更新 ${name} -> ${newVersion}`);
        }
        consola.success('所有包的版本号已修改');
    }
    if ((await cli.select('是否进行编写发行说明', ['是', '否'])) === '是') {
        // TODO: 实现编写发行说明的功能
    }
    if ((await cli.select('是否进行发布喵', ['是', '否'])) === '是') {
        if ((await cli.select('发布到哪里喵', ['Github', 'Gitee'])) === 'Github') {
            const tag = `v${newVersion}`;
            let commited = false;
            let tagged = false;
            try {
                const tagExists = (await $`git rev-parse -q --verify refs/tags/${tag}`.nothrow()).exitCode === 0;
                if (tagExists) {
                    throw new Error(`fatal: tag '${tag}' already exists (local). 请先删除它或提升版本号喵`);
                }
                await $`git add -A`;
                const commitMessage = await getCommitMessage();
                consola.success(`生成的 commit message: ${commitMessage}`);

                const ok = await cli.select('是否使用这个 commit message ', ['是', '重新生成', '否']);
                if (ok === '是') {
                    await $`git commit -m "${commitMessage!}"`;
                    commited = true;
                }
                if (ok === '否') {
                    throw new Error('用户取消发布喵');
                }

                // await $`git commit -m "${commitMessage!}"`;
                // commited = true;
                await $`git tag -a ${tag} -m ${tag}`;
                tagged = true;
                await $`git push origin HEAD ${tag}`;
                consola.success('发布到Github成功了喵');
            } catch (error) {
                consola.error('发布到Github失败了喵:', error);
                consola.start('开始撤回本次发布改动了喵');
                if (tagged) {
                    await $`git tag -d ${tag}`.nothrow();
                }
                if (commited) {
                    await $`git reset --mixed HEAD~1`.nothrow();
                }
                consola.success('撤回成功了喵');
            }
        }
    }
    if ((await cli.select('是否进行部署gh-pages', ['是', '否'])) === '是') {
        const themeDir = join(cwd, 'projects', 'theme');
        try {
            consola.start('开始部署gh-pages...');
            await $`npx nuxt build --preset github_pages`.cwd(themeDir);
            consola.success('Nuxt 构建完成, 开始部署gh-pages...');
            await $`npx gh-pages --dotfiles -d .output/public`.cwd(themeDir);
            consola.success('部署完成！已经发布到 gh-pages 了耶✌');
        } catch (error) {
            consola.error('部署gh-pages失败了喵:', error);
        }
        process.exit(1);
    }
}
main().catch((error) => {
    console.error('发布过程中出现错误:', error);
    process.exit(1);
});
