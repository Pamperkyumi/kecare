import type { KecareContext, ArchiveArticleData } from "kecare";
import { join } from "node:path";

export const type = 'archives'

export async function generator(context: KecareContext, articles: ArchiveArticleData[]) {

    // 过滤出特定 lang 的文章
    const zhArticles: ArchiveArticleData[] = articles.filter(article => article.lang === 'zh-CN');

    // 按日期排序
    zhArticles.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return {
        fsPath: join(context.projectPath, 'app', 'pages', 'archives.vue'), // 文件生成的路径
        template: `<!-- Generated: ${new Date().toISOString()} -->
        <script setup lang="ts">
        import archivesTheme from '~/components/archive-landing.vue'
        const articles = ${JSON.stringify(zhArticles, null, 2)}
        const totalArticles = ${zhArticles.length}
        useHead({
            title: \'归档喵\',
        })
        </script>
        <template>
        <archivesTheme :articles="articles"
                       :totalArticles="totalArticles"
                       />
        </template>
`
    }
}