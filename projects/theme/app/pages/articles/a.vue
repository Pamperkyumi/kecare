<!-- Generated: 2025-12-18T20:17:44.627Z -->
<script setup lang="ts">
import ArticleLayout from '../../components/blog-article.vue'
import ArticleSidebar from '../../components/ArticleSidebar.vue'

const article = {"id":"a","title":"a","desc":"测试","coverSrc":"https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp","contentHtml":"<p>测试</p>\n","createdAt":"1763050953525","author":"Pamper","to":"/articles/a","headings":[]} as const
const totalArticles = 7
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
