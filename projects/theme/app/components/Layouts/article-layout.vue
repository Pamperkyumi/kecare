<script lang="ts"s setup>
import ArticleTheme from '../Themes/article-theme.vue';
import DocsTheme from '../Themes/docs-theme.vue';
import type { Article, NavItem } from "kecare-tools";

const props = defineProps<{
  article: Article;
  articles: Article[];
}>();

    
</script>

<template>

    <ArticleTheme :article="article" :articles="articles"  v-if="props.article.menudata === null"/>
    <DocsTheme :navItems="article.menudata" :article="article" v-else/>
    
</template>