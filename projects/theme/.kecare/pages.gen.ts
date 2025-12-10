import { join } from 'node:path';
import { defineArticleListGenerator } from 'kecare-tools';

export const type = 'article-list';

export const generator = defineArticleListGenerator(async (params) => {
  const { projectPath, page, cards, isIndex, pageSize, totalPages, totalArticles, listTitle } = params;

  const pagesDir = join(projectPath, 'app', 'pages');

  const fileName = isIndex ? 'index.vue' : `page-${page}.vue`;
  const Content = `\
        <script setup lang="ts">
        import BlogLanding from "../components/blog-landing.vue";
        const articles =  ${JSON.stringify(cards, null, 4)}; 
        const page = ${page};
        const pageSize = ${pageSize};
        const totalPages = ${totalPages};
        const totalArticles = ${totalArticles};
        const title = ${JSON.stringify(listTitle ?? '文章列表')};
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
        `;
  const outPath = join(pagesDir, fileName);
  return {
    path: outPath,
    template: Content,
  };
});


