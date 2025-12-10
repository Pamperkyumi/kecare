import { join } from 'node:path';
import { Article } from 'kecare-tools';

export const type = 'article-detail';

export async function generator(params: { projectPath: string; article: Article }) {
  const outPath = join(params.projectPath, 'app', 'pages', 'articles', `${params.article.id}.vue`);

  const serializedArticle = JSON.stringify(params.article);

  const template = `<!-- Generated: ${new Date().toISOString()} -->
<script setup lang="ts">
import ArticleLayout from '../../components/blog-article.vue'
const article = ${serializedArticle} as const;
</script>
<template>
  <ArticleLayout :article="article" />
</template>
`;

  return {
    path: outPath,
    template,
  };
}
