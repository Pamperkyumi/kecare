import { join } from 'node:path';
import { Article } from '../../projects/generator/types/article';

export const type = 'article-detail';

export async function generator(params: { projectPath: string; article: Article;totalArticles: number}) {
  const outPath = join(params.projectPath, 'app', 'pages', 'articles', `${params.article.id}.vue`);

  const serializedArticle = JSON.stringify(params.article);

  const template = `<!-- Generated: ${new Date().toISOString()} -->
<script setup lang="ts">
import ArticleLayout from '../../components/blog-article.vue'
import ArticleSidebar from '../../components/ArticleSidebar.vue'

const article = ${serializedArticle} as const
const totalArticles = ${params.totalArticles}
</script>
<template>
  <ArticleLayout :article="article">
    <template #aside>
      <ArticleSidebar
        :article="article"
        :total-articles="totalArticles"
      />
    </template>
  </ArticleLayout>
</template>
`


  return {
    path: outPath,
    template,
  };
}
