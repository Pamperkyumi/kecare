import { join } from 'node:path';
import { defineArticleListGenerator } from 'kecare-tools';

export const type = 'article-detail';

export const generator = defineArticleListGenerator(async (params) => {
  return {
    path: join(params.projectPath, 'app', 'pages', 'articles', `${params.article.id}.vue`),
    template: `<!-- Generated: ${new Date().toISOString()} -->
        <script setup lang="ts">
        import ArticleLayout from '../../components/article-layout.vue'
        import ArticleSidebar from '../../components/article-sidebar.vue'
        import type { NavItem } from 'kecare-tools'

        const article = ${JSON.stringify(params.article)}
        const navItems: NavItem[] | undefined = ${JSON.stringify(params.article.menudata ?? null)}
        const articles = ${JSON.stringify(params.articles, null, 4)}
        </script>
        <template>
        <articleLayout :article="article"
                       :articles="articles"
                       :navItems="navItems"
                       />
        </template>
`,
  };
});
