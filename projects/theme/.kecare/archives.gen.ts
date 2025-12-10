import { join } from 'node:path';
import { Article } from 'kecare-tools';

export const type = 'blog-archives';

export async function generator(params: { projectPath: string; articles: Article }) {
  const outPath = join(params.projectPath, 'app', 'pages', 'blog-archives.vue');  
  
  const serializedArticles = JSON.stringify(params.articles, null, 4);
  
  const template = `<!-- Generated: ${new Date().toISOString()} -->
<script setup lang="ts">
import archives from '../components/blog-archives.vue';
const articles = ${serializedArticles} as const;
</script>
<template>
  <archives :articles="articles" />
</template>
`;

  return {
    path: outPath,  
    template,       
  };
}
