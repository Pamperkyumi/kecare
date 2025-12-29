import { defineArticleListGenerator } from 'kecare-tools';
import { join } from 'node:path';

export const type = 'blog-archives';

export const generator = defineArticleListGenerator(async (params) => {
  return {
    path: join(params.projectPath, 'app', 'pages', 'archives.vue'),
    template: `<!-- Generated: ${new Date().toISOString()} -->
            <script setup lang="ts">
            import archives from '../components/Archives/blog-archives.vue';
            const articles = ${JSON.stringify(params.articles)}
            </script>
            <template>
            <archives :articles="articles" />
            </template>
`,
  };
});
