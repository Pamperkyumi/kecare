import type { KecareContext, ArchiveArticleData } from "kecare";
import { join } from "node:path";

export const type = 'archives'

export async function generator(context: KecareContext, articles: ArchiveArticleData[]) {
    // 过滤出特定 lang 的文章
    const zhArticles: ArchiveArticleData[] = articles.filter(article => article.lang === 'zh-CN');

    return {
        fsPath: join(context.projectPath, 'app', 'pages', 'archives.vue'), // 文件生成的路径
        template: `<!-- Generated: ${new Date().toISOString()} -->
        <script setup lang="ts">
        import archivesTheme from '~/components/archive-landing.vue'
        const articles = ${JSON.stringify(zhArticles, null, 2)}
        </script>
        <template>
        <archivesTheme :articles="articles"
                       />
        </template>
`
    }
}