import { join } from 'node:path';
import { Article,} from '../../projects/generator/types/article';

export const type = 'docs-index';

export async function  generator(params:{projectPath:string;article:Article,totalArticles: number}) {
    const outPath = join(params.projectPath, 'app', 'pages','docs',`${params.article.id}.vue`);
    const serializedArticles = JSON.stringify(params.article, null, 4);
    const template = `<!-- Generated: ${new Date().toISOString()} -->
<script setup lang="ts">
import DocsIndex from '../../components/docs-index.vue'
import type { NavItem } from 'kecare-tools'
import ArticleSidebar from '../../components/ArticleSidebar.vue'

const navItems:NavItem[]=[
  {text: '首页',
    items: [
      {
        text: '开始',
        link: '/start'
      },
      {
        text: '文档',
        link: '/docs'
      },
      {
        text: 'API',
        link: '/api'
      }
    ]
  },
  {
    text: '关于',
    items: [
      {
        text: '关于',
        link: '/about'
      }
    ]
  }
]

const article = ${serializedArticles} as const;
const totalArticles = ${params.totalArticles}
</script>
<template>
  <DocsIndex :navItems="navItems" :article="article"/>
</template>
    `
    return {
        path: outPath,
        template,
    }
}



