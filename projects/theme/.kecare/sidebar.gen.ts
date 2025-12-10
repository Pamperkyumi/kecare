import { Article} from 'kecare-tools';
import { join } from 'node:path';

export const type = 'blog-sidebar';

export async function generator(params: {projectPath: string; articles: Article[] }) {
    const outPath = join(params.projectPath, 'app', 'pages', 'blog-sidebar.vue');
    const template = `<!-- Generated: ${new Date().toISOString()} -->
    <script setup lang="ts">
    import SidebarLayout from '../components/blog-sidebar.vue'
    const articles = ${JSON.stringify(params.articles, null, 4)} as const;
    const totalArticles = articles.length;
    </script>
    <template>
    <SidebarLayout :articles="articles" :total-articles="totalArticles" />
    </template>`
    return {
        path: outPath,
        template,
    }
}
  