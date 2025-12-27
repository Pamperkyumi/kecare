import { join } from 'node:path';
import { PagesListGenerator } from 'kecare-tools';

export const type = 'article-list';

export const generator = PagesListGenerator(async (params) => {
  return {
    path: join(params.projectPath, 'app', 'pages', params.isIndex ? 'index.vue' : `page-${params.page}.vue`),
    template: `\
        <script setup lang="ts">
        import BlogLanding from "../components/blog-landing.vue";
        const articles =  ${JSON.stringify(params.cards, null, 4)}; 
        const page = ${params.page};
        const pageSize = ${params.pageSize};
        const totalPages = ${params.totalPages};
        const totalArticles = ${params.totalArticles};
        const title = ${JSON.stringify(params.listTitle ?? '文章列表')};
        </script>
        <template>
            <BlogLanding
            :articles="articles"
            :page="page"
            :page-size="pageSize"
            :total-pages="totalPages"
            :total-articles="totalArticles"
            :title="title"
            />
        </template>
        `,
  };
});
