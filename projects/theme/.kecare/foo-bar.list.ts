import { join } from 'node:path';
import type { ArticlesRecord, KecareContext } from "kecare";
import { parseDateString } from "kecare";

export const type = 'article-detail';

const ARTICLES_PER_PAGE = 5;
const TARGET_LANGUAGE = 'zh-CN';

export function generator(context: KecareContext, articles: ArticlesRecord) {
    const files: Array<{ fsPath: string, template: string }> = [];
    const zhArticles: Array<unknown> = [];

    for (const articleHash in articles) {
        const articleLanguages = articles[articleHash]!;
        if (articleLanguages[TARGET_LANGUAGE]) {
            zhArticles.push(articleLanguages[TARGET_LANGUAGE]);
        }
    }
    //sort by sticky and date
    zhArticles.sort((a: any, b: any) => {
        const stickyDiff = (b.frontMatter.sticky ?? 0) - (a.frontMatter.sticky ?? 0);
        if (stickyDiff !== 0) {
            return stickyDiff;
        }
        return parseDateString(b.frontMatter.date).getTime() - parseDateString(a.frontMatter.date).getTime();
    });

    const totalArticles = zhArticles.length;
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
                    title: \'首页\',
                })
                const articles = ${JSON.stringify(pageArticles, null, 2)}
                const currentPage = ${pageNumber}
                const totalPages = ${totalPages}
                const totalArticles = ${totalArticles}

                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" :total-articles="totalArticles" />
                </template>
            `,
        });
    }

    return files;
}