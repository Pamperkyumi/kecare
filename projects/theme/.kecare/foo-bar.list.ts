import { join } from 'node:path';
import type { ArticlesRecord, KecareContext } from "kecare";
import { parseDateString } from "kecare";

export const type = 'article-list';

const ARTICLES_PER_PAGE = 5;
const TARGET_LANGUAGE = 'zh-CN';
// type=guide 的文章不进入落地页列表（详情页 .vue 仍正常构建），仅保留此处指定的一篇
// 按源文件相对路径指定（即 .kecare/articles/ 下的文件名），换指定文章时改这一行即可
const GUIDE_LANDING_EXCEPTION = '/关于我.md';

export function generator(context: KecareContext, articles: ArticlesRecord) {
    const files: Array<{ fsPath: string, template: string }> = [];
    const zhArticles: Array<unknown> = [];

    for (const articleHash in articles) {
        const articleLanguages = articles[articleHash]!;
        const article = articleLanguages[TARGET_LANGUAGE];
        if (!article) continue;
        // guide 类型文章跳过落地页列表，仅 GUIDE_LANDING_EXCEPTION 指定的文章例外
        if (article.frontMatter.type === 'guide' && article.relativePath !== GUIDE_LANDING_EXCEPTION) continue;
        zhArticles.push(article);
    }
    //sort by sticky and date
    zhArticles.sort((a: any, b: any) => {
        const stickyDiff = (b.frontMatter.sticky ?? 0) - (a.frontMatter.sticky ?? 0);
        if (stickyDiff !== 0) {
            return stickyDiff;
        }
        return parseDateString(b.frontMatter.date).getTime() - parseDateString(a.frontMatter.date).getTime();
    });

    const totalPages = Math.ceil(zhArticles.length / ARTICLES_PER_PAGE);
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const startIndex = pageIndex * ARTICLES_PER_PAGE;
        const endIndex = startIndex + ARTICLES_PER_PAGE;
        const pageArticles = zhArticles.slice(startIndex, endIndex);
        const pageNumber = pageIndex + 1;
        const fileName = pageNumber === 1 ? 'index.vue' : `page-${pageNumber}.vue`;

        files.push({
            fsPath: join(context.projectPath, 'app', 'pages', fileName),
            template: `\
                <script setup lang="ts">
                import BlogLanding from "~/components/blog-landing.vue";
                useHead({
                    title: '首页',
                })
                const articles = ${JSON.stringify(pageArticles, null, 2)}
                const currentPage = ${pageNumber}
                const totalPages = ${totalPages}
                const totalArticles = ${zhArticles.length}
                const totalTags = ${context.articleStats?.allTags?.length ?? 0}

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" :total-tags="totalTags" />
                </template>
            `,
        });
    }

    return files;
}