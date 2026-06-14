import { Glob, YAML } from "bun";
import type { ArticleVariant, FrontMatter, KecareContext } from "kecare";
import { marked } from 'marked';
import { tabsExtension, resetTabsTokenUid } from './markedrenderer/tabs-marked';
import markedKatex from 'marked-katex-extension';
import type { InputDriverChunk } from "../__ROOT__";
import { basename, join } from 'path';
import { parseFrontMatter } from "../../utils/parse-front-matter";
import { extraDescFromHtml } from "../../utils/extra-desc-from-html";
import { useKecareConfig } from "../../utils/kecare-config";
import { translator } from "./translator/translator";
import GithubSlugger from 'github-slugger';
import { parseDateString } from "kecare";
import { useThemeConfig } from "../../utils/theme-config";

export type MarkdownOriginalArticle = ArticleVariant & {
    fsPath: string;
}

export async function markdownInputDriver(context: KecareContext, chunks: Array<InputDriverChunk>): Promise<void> {
    resetTabsTokenUid();
    marked.use({ extensions: [tabsExtension] }, markedKatex({
        throwOnError: false,
        output: 'html',
    }));

    const headingRenderer = new marked.Renderer();
    headingRenderer.heading = function (token: any) {
        const depth = token.depth;
        const rawText = this.parser.parseInline(token.tokens ?? []);
        const text = rawText.replace(/<[^>]+>/g, '').trim();
        const slugger = new GithubSlugger();
        const headingId = slugger.slug(text);
        return `<h${depth} id="${headingId}">${rawText}</h${depth}>\n`;
    };

    const articlePath = join(context.projectPath, '.kecare', 'articles');
    const glob = new Glob(`${articlePath}/**/*.{md,mdx,markdown}`);

    // 处理每篇文章和它的翻译
    for await (const fsPath of glob.scan(".")) chunks.push(async (emitArticleHandle) => {
        const relativePath = fsPath.replace(articlePath, ''); // 相对路径
        const file = Bun.file(fsPath);
        const rawContent = await file.text();
        const frontMatterStr = parseFrontMatter(rawContent);
        let rawFrontMatter = YAML.parse(frontMatterStr) as FrontMatter;
        if (!rawFrontMatter) throw new Error(`[markdown] ${fsPath} 中的 frontmatter 不能为空,请检查文档格式`);
        let rawMarkdown = frontMatterStr ? rawContent.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '') : rawContent;
        const cover = rawFrontMatter.cover
        let finalCover = cover;
        if (!finalCover) {
            const themeConfig = await useThemeConfig(context);
            const images = themeConfig.ImageUrl;
            if (images && images.length > 0) {
                const randomIndex = Math.floor(Math.random() * images.length);
                finalCover = images[randomIndex];
            }
        }


        // 元数据
        const frontMatter: FrontMatter = {
            cover: finalCover,
            layout: rawFrontMatter.layout ?? undefined,
            title: (rawFrontMatter.title ?? basename(fsPath, '.md')).trim(),
            menu: rawFrontMatter.menu ?? undefined,
            tags: rawFrontMatter.tags ?? [],
            desc: rawFrontMatter.desc ?? extraDescFromHtml(rawMarkdown, 120),
            translate: rawFrontMatter.translate ?? ['en-US'], // 翻译数组中的第一个元素，默认为文档自身的语言
            sticky: rawFrontMatter.sticky ?? 0,
            author: rawFrontMatter.author ?? undefined,
            date: rawFrontMatter.date ?? undefined,
            hidden: rawFrontMatter.hidden ?? false,
        }

        // 校验数据是否正确
        if (!frontMatter.title || frontMatter.title === '') throw new Error(`[markdown] ${fsPath} 中的 title 字段不能为空`);
        if (frontMatter.menu !== undefined && typeof frontMatter.menu !== 'string') throw new Error(`[markdown] ${fsPath} 中的 menu 字段必须是字符串数组`);
        if (!Array.isArray(frontMatter.tags)) throw new Error(`[markdown] ${fsPath} 中的 tags 字段必须是数组`);
        if (!Array.isArray(frontMatter.translate)) throw new Error(`[markdown] ${fsPath} 中的 translate 字段必须是数组`);
        if (frontMatter.translate.length < 1) throw new Error(`[markdown] ${fsPath} 中的 translate 字段必须包含至少一个语言`);
        for (const lang of frontMatter.translate) {
            if (typeof lang !== 'string' || !/^[a-z]{2,3}(-[A-Z]{0,3})?$/.test(lang)) throw new Error(`[markdown] ${fsPath} 中的 translate 字段包含无效的语言代码 "${lang}"，期望格式如 "en-US" 或 "zh-CN"`);
        }
        if (frontMatter.author !== undefined && typeof frontMatter.author !== 'string') throw new Error(`[markdown] ${fsPath} 中的 author 字段必须是字符串`);
        if (typeof frontMatter.sticky !== 'number') throw new Error(`[markdown] ${fsPath} 中的 sticky 字段必须是数字`);
        if (!parseDateString(frontMatter.date)) throw new Error(`[markdown] ${fsPath} 中的 date 字段格式错误，期望格式如 "2026-03-01"`);
        if (typeof frontMatter.hidden !== 'boolean') throw new Error(`[markdown] ${fsPath} 中的 hidden 字段必须是布尔值`);
        if (frontMatter.hidden === true) return;
        // 开始处理翻译
        for (const language of frontMatter.translate) {
            // 对于原始语言，直接使用原始内容，无需翻译
            if (language === frontMatter.translate[0]) {
                const html = `<div class="kecare">${await marked.parse(rawMarkdown, { renderer: headingRenderer })}</div>`;
                const desc = frontMatter.desc ?? String(frontMatter.desc).trim().length > 0 ? String(frontMatter.desc).trim() : extraDescFromHtml(html, 120);
                const hash = await Bun.hash.xxHash3(relativePath, 1234n).toString(16).slice(0, 8);
                await emitArticleHandle(context, {
                    lang: language,
                    title: frontMatter.title,
                    html: html,
                    isOriginalLang: true,
                    menu: frontMatter.menu,
                    desc: desc,
                    hash: hash,
                    relativePath,
                    frontMatter,
                    cover: cover,
                    rawMarkdown: rawMarkdown,
                });
                continue;
            }
            const config = await useKecareConfig(context);
            if (!config?.llm) throw new Error('[markdown] 大语言模型配置不能为空，不能自动进行 AI 翻译');
            const translatedMarkdown = await translator({
                llm: config.llm,
                text: rawMarkdown,
                title: frontMatter.title,
                lang: language,
                KecareContext: context,
            });
            const html = `<div class="kecare">${await marked.parse(translatedMarkdown[1], { renderer: headingRenderer })}</div>`;
            const desc = frontMatter.desc ?? String(frontMatter.desc).trim().length > 0 ? String(frontMatter.desc).trim() : extraDescFromHtml(translatedMarkdown[1], 120);
            const hash = await Bun.hash.xxHash3(relativePath, 1234n).toString(16).slice(0, 8);
            await emitArticleHandle(context, {
                lang: language,
                title: translatedMarkdown[0],
                html: html,
                menu: frontMatter.menu,
                isOriginalLang: false,
                desc: desc,
                hash: hash,
                relativePath,
                frontMatter,
                cover: cover,
                rawMarkdown: rawMarkdown,
                translatedMarkdown: translatedMarkdown[1],
            });
            continue
        }
    });
}