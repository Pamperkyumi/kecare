import { join } from 'node:path';
import { mkdir } from 'node:fs/promises';

export const type = 'article-list';

export async function generator(params: { projectPath: string; page: number; cards: any[]; isIndex: boolean; pageSize: number; totalPages: number; totalArticles: number; listTitle?: string }) {
  const { projectPath, page, cards, isIndex, pageSize, totalPages, totalArticles, listTitle } = params;

  console.log(`------`);
  console.log(JSON.stringify(params));
  console.log(`------`);

  const pagesDir = join(projectPath, 'app', 'pages');
  await mkdir(pagesDir, { recursive: true });

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
}
