import { type Params } from './__ROOT__.ts';
import consola from 'consola';
import { basename, join, resolve } from 'node:path';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { Glob, YAML } from 'bun';
import { pathToFileURL } from 'node:url';
import type { ArticleVariant, FrontMatter, KecareContext } from 'kecare';
import { isValidDateString } from 'kecare';
import { parseFrontMatter } from '../utils/parse-front-matter.ts';

/**
 * kecare check 命令：项目体检。
 *
 * 把"契约"从文档变成工具——在跑 gen 之前快速发现会静默失败或中途崩掉的问题：
 *   1. 模板契约：*.article.ts / *.list.ts / *.archives.ts 必须导出 generator 函数，
 *      并用最小数据干跑一次验证返回形状（不写盘、不调 LLM）
 *   2. 菜单源文件：*.menu.source.ts 必须能读出 navItems 数组且结构合法
 *   3. 文章 Front Matter：全量扫描校验（不受 markdown-manifest 缓存影响，
 *      这正是 gen 的盲区——缓存命中的文章不会重新校验）
 *   4. 配置文件：kecare.config.ts 的 llm / ThemeConfig 字段完整性
 *
 * 全部检查跑完统一输出，不因单条失败中断；有问题 exit(1)，可挂 pre-commit / CI。
 */

// 与 markdown-driver 一致的语言代码格式
const langCodeRule = /^[a-z]{2,3}(-[A-Z]{0,3})?$/;

// 已知的模板种类标记（article 惯用 'article-detail'，archives 惯用 'archives'）。
// 只标记"明显属于其他模板种类"的值（如 .list.ts 导出 'article-detail'），不强制新约定
const knownTypeKinds: Record<string, string> = {
    'article-detail': 'article',
    'article-list': 'list',
    'archives': 'archives',
};

// 干跑用的最小文章变体：只用于调用模板 generator 验证返回形状，结果全部丢弃
const dummyArticle: ArticleVariant = {
    title: 'check-dry-run',
    lang: 'zh-CN',
    isOriginalLang: true,
    hash: '00000000',
    html: '',
    rawMarkdown: '',
    relativePath: '/check-dry-run.md',
    frontMatter: {
        title: 'check-dry-run',
        menu: '',
        date: '2026-01-01',
        cover: undefined,
        layout: undefined,
        desc: '',
        tags: [],
        translate: ['zh-CN'],
        sticky: 0,
        author: undefined,
        hidden: false,
    } satisfies FrontMatter,
};

export async function executeCheckCommand(params: Params) {
    const projectPath = resolve(params.commands[0] ?? '.');
    consola.info('Project path', projectPath);

    const kecareDir = join(projectPath, '.kecare');
    if (!existsSync(kecareDir)) {
        consola.error('Kecare directory does not exist');
        process.exit(1);
    }

    const context: KecareContext = { projectPath };

    // 问题收集：全部检查跑完后统一输出，不中断后续检查
    const problems: string[] = [];

    // ============ 1. 模板契约检查 ============
    let templateCount = 0;
    const templateKinds: Array<{ kind: string; pattern: string }> = [
        { kind: 'article', pattern: '**/*.article.ts' },
        { kind: 'list', pattern: '**/*.list.ts' },
        { kind: 'archives', pattern: '**/*.archives.ts' },
    ];
    for (const { kind, pattern } of templateKinds) {
        const glob = new Glob(pattern);
        for await (const rel of glob.scan({ cwd: kecareDir, onlyFiles: true })) {
            templateCount++;
            const abs = join(kecareDir, rel);

            // 模块必须能加载（语法错误在这里暴露，而不是 gen 中途崩掉）
            let mod: any;
            try {
                mod = await import(pathToFileURL(abs).href);
            } catch (error) {
                problems.push(`✗ [${kind}] ${rel}: 模块加载失败 - ${error instanceof Error ? error.message : String(error)}`);
                continue;
            }

            // generator 是驱动器唯一的硬性要求：缺失时 gen 会静默跳过该模板
            if (typeof mod.generator !== 'function') {
                problems.push(`✗ [${kind}] ${rel}: 未导出 generator 函数，gen 时该模板会被静默跳过`);
                continue;
            }

            // type 自描述检查：值明显属于其他模板种类时点名（典型复制粘贴错误）
            if (typeof mod.type === 'string' && knownTypeKinds[mod.type] !== undefined && knownTypeKinds[mod.type] !== kind) {
                problems.push(`✗ [${kind}] ${rel}: type 声明为 '${mod.type}'，属于 ${knownTypeKinds[mod.type]} 模板的标记，疑似复制粘贴错误`);
            }

            // 干跑：用最小数据调用一次 generator，验证可执行且返回形状满足驱动器的消费要求
            try {
                if (kind === 'article') {
                    const result = await mod.generator(context, dummyArticle);
                    if (typeof result !== 'object' || result === null || !result.fsPath || !result.urlPath || !result.template) {
                        problems.push(`✗ [${kind}] ${rel}: generator 返回值缺少 fsPath / urlPath / template`);
                    }
                } else if (kind === 'list') {
                    const result = await mod.generator(context, {});
                    const results = Array.isArray(result) ? result : [result];
                    for (const item of results) {
                        if (typeof item !== 'object' || item === null || !item.fsPath || !item.template) {
                            problems.push(`✗ [${kind}] ${rel}: generator 返回的产物条目缺少 fsPath / template`);
                            break;
                        }
                    }
                } else {
                    const result = await mod.generator(context, []);
                    if (typeof result !== 'object' || result === null || !result.fsPath || !result.template) {
                        problems.push(`✗ [${kind}] ${rel}: generator 返回值缺少 fsPath / template`);
                    }
                }
            } catch (error) {
                problems.push(`✗ [${kind}] ${rel}: generator 干跑执行失败 - ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    }

    // ============ 2. 菜单源文件检查 ============
    let menuCount = 0;
    const menusDir = join(kecareDir, 'menus');
    if (existsSync(menusDir)) {
        const menuGlob = new Glob('**/*.menu.source.ts');
        for await (const rel of menuGlob.scan({ cwd: menusDir, onlyFiles: true })) {
            menuCount++;
            const abs = join(menusDir, rel);

            let mod: any;
            try {
                mod = await import(pathToFileURL(abs).href);
            } catch (error) {
                problems.push(`✗ [menu] ${rel}: 模块加载失败 - ${error instanceof Error ? error.message : String(error)}`);
                continue;
            }

            // 与 menu.ts 的读取方式一致：navItems 或 default
            const navItems: unknown = mod.navItems ?? mod.default;
            if (!Array.isArray(navItems)) {
                problems.push(`✗ [menu] ${rel}: 无法读取 navItems（需导出 navItems 数组或 default 数组）`);
                continue;
            }

            // 递归校验菜单项结构：分组需 items 数组，叶子需 text 字符串
            const invalidItems: string[] = [];
            const walkNavItems = (items: any[], prefix: string) => {
                for (let i = 0; i < items.length; i++) {
                    const item = items[i]!;
                    if (typeof item !== 'object' || item === null) {
                        invalidItems.push(`${prefix}[${i}] 不是对象`);
                        continue;
                    }
                    if ('items' in item) {
                        if (!Array.isArray(item.items)) {
                            invalidItems.push(`${prefix}[${i}].items 不是数组`);
                            continue;
                        }
                        walkNavItems(item.items, `${prefix}[${i}].items`);
                    } else {
                        if (typeof item.text !== 'string') {
                            invalidItems.push(`${prefix}[${i}] 叶子节点缺少 text 字符串`);
                        }
                    }
                }
            };
            walkNavItems(navItems, 'navItems');
            for (const invalid of invalidItems) problems.push(`✗ [menu] ${rel}: ${invalid}`);
        }
    }

    // ============ 3. 文章 Front Matter 检查 ============
    // 校验规则与 markdown-driver 一致；区别在于不受内容缓存影响，全量扫描
    let articleCount = 0;
    const articlesDir = join(kecareDir, 'articles');
    if (existsSync(articlesDir)) {
        const articleGlob = new Glob('**/*.{md,mdx,markdown}');
        for await (const rel of articleGlob.scan({ cwd: articlesDir, onlyFiles: true })) {
            articleCount++;
            const abs = join(articlesDir, rel);

            let rawContent: string;
            try {
                rawContent = await readFile(abs, 'utf-8');
            } catch (error) {
                problems.push(`✗ [markdown] ${rel}: 文件读取失败 - ${error instanceof Error ? error.message : String(error)}`);
                continue;
            }

            const frontMatterStr = parseFrontMatter(rawContent);
            if (!frontMatterStr) {
                problems.push(`✗ [markdown] ${rel}: 缺少 front matter（需以 --- 开头的 YAML 块）`);
                continue;
            }

            let rawFrontMatter: any;
            try {
                rawFrontMatter = YAML.parse(frontMatterStr);
            } catch (error) {
                problems.push(`✗ [markdown] ${rel}: YAML 解析失败 - ${error instanceof Error ? error.message : String(error)}`);
                continue;
            }
            if (rawFrontMatter === null || rawFrontMatter === undefined || typeof rawFrontMatter !== 'object') {
                problems.push(`✗ [markdown] ${rel}: front matter 不能为空`);
                continue;
            }

            // title：缺省回退文件名（与 driver 一致），但类型必须是字符串
            if (rawFrontMatter.title !== undefined && typeof rawFrontMatter.title !== 'string') {
                problems.push(`✗ [markdown] ${rel}: title 字段必须是字符串`);
            } else {
                const titleFallback = rawFrontMatter.title ?? basename(abs, '.md');
                if (String(titleFallback).trim() === '') {
                    problems.push(`✗ [markdown] ${rel}: title 字段不能为空`);
                }
            }

            if (rawFrontMatter.menu !== undefined && typeof rawFrontMatter.menu !== 'string') {
                problems.push(`✗ [markdown] ${rel}: menu 字段必须是字符串`);
            }

            // tags：缺省视为 []（与 driver 一致），提供时必须是数组
            if (rawFrontMatter.tags !== undefined && !Array.isArray(rawFrontMatter.tags)) {
                problems.push(`✗ [markdown] ${rel}: tags 字段必须是数组`);
            }

            // translate：缺省视为 ['en-US']（与 driver 一致），提供时校验数组与语言代码
            if (rawFrontMatter.translate !== undefined) {
                if (!Array.isArray(rawFrontMatter.translate)) {
                    problems.push(`✗ [markdown] ${rel}: translate 字段必须是数组`);
                } else if (rawFrontMatter.translate.length < 1) {
                    problems.push(`✗ [markdown] ${rel}: translate 字段必须包含至少一个语言`);
                } else {
                    for (const lang of rawFrontMatter.translate) {
                        if (typeof lang !== 'string' || !langCodeRule.test(lang)) {
                            problems.push(`✗ [markdown] ${rel}: translate 字段包含无效的语言代码 "${lang}"，期望格式如 "en-US" 或 "zh-CN"`);
                            break;
                        }
                    }
                }
            }

            if (rawFrontMatter.author !== undefined && typeof rawFrontMatter.author !== 'string') {
                problems.push(`✗ [markdown] ${rel}: author 字段必须是字符串`);
            }

            if (rawFrontMatter.sticky !== undefined && rawFrontMatter.sticky !== null && typeof rawFrontMatter.sticky !== 'number') {
                problems.push(`✗ [markdown] ${rel}: sticky 字段必须是数字`);
            }

            // date：唯一必填字段，缺失或格式错误都会中断生成
            if (!isValidDateString(String(rawFrontMatter.date ?? ''))) {
                problems.push(`✗ [markdown] ${rel}: date 字段缺失或格式错误，期望格式如 "2026-03-01"`);
            }

            if (rawFrontMatter.hidden !== undefined && typeof rawFrontMatter.hidden !== 'boolean') {
                problems.push(`✗ [markdown] ${rel}: hidden 字段必须是布尔值`);
            }
        }
    }

    // ============ 4. 配置文件检查 ============
    let configChecked = false;
    const configPath = join(kecareDir, 'kecare.config.ts');
    if (existsSync(configPath)) {
        configChecked = true;

        let mod: any;
        try {
            mod = await import(pathToFileURL(configPath).href);
        } catch (error) {
            problems.push(`✗ [config] kecare.config.ts: 模块加载失败 - ${error instanceof Error ? error.message : String(error)}`);
            mod = undefined;
        }

        if (mod) {
            // kecareConfig：校验 llm 字段（与 kecare-config.ts / translator 的硬性要求一致）
            if (typeof mod.kecareConfig === 'function') {
                try {
                    const config = await mod.kecareConfig(context);
                    if (config?.llm) {
                        if (!config.llm.model) problems.push('✗ [config] kecare.config.ts: llm.model 不能为空');
                        if (!config.llm.apiKey) problems.push('✗ [config] kecare.config.ts: llm.apiKey 不能为空，翻译文章时生成会中断');
                        if (!config.llm.apiBaseUrl) problems.push('✗ [config] kecare.config.ts: llm.apiBaseUrl 不能为空');
                        if (config.llm.provider !== undefined && !['OpenAI', 'Anthropic'].includes(config.llm.provider)) {
                            problems.push(`✗ [config] kecare.config.ts: llm.provider "${String(config.llm.provider)}" 不受支持（仅 OpenAI / Anthropic）`);
                        }
                    }
                } catch (error) {
                    problems.push(`✗ [config] kecare.config.ts: kecareConfig() 执行失败 - ${error instanceof Error ? error.message : String(error)}`);
                }
            }

            // ThemeConfig：随机封面依赖 ImageUrl 非空数组（与 theme-config.ts 的校验一致）
            if (typeof mod.ThemeConfig === 'function') {
                try {
                    const themeConfig = await mod.ThemeConfig();
                    if (!Array.isArray(themeConfig?.ImageUrl) || themeConfig.ImageUrl.length === 0) {
                        problems.push('✗ [config] kecare.config.ts: ThemeConfig.ImageUrl 不能为空');
                    }
                } catch (error) {
                    problems.push(`✗ [config] kecare.config.ts: ThemeConfig() 执行失败 - ${error instanceof Error ? error.message : String(error)}`);
                }
            }
        }
    }

    // ============ 汇总输出 ============
    consola.info(`模板 ${templateCount} 个 / 菜单 ${menuCount} 个 / 文章 ${articleCount} 篇${configChecked ? ' / 配置 1 份' : ''}`);

    if (problems.length > 0) {
        for (const problem of problems) console.log(problem);
        consola.error(`发现 ${problems.length} 个问题`);
        process.exit(1);
    }

    consola.success('检查通过：模板 / 菜单 / 文章 / 配置 均符合契约');
}
