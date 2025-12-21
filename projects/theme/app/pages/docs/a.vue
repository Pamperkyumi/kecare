<!-- Generated: 2025-12-21T22:11:27.018Z -->
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

const article = {
    "id": "a",
    "title": "a",
    "desc": "测试",
    "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
    "contentHtml": "<p>测试</p>\n",
    "createdAt": "1763050953525",
    "author": "Pamper",
    "to": "/articles/a",
    "headings": []
} as const;
const totalArticles = undefined
</script>
<template>
  <DocsIndex :navItems="navItems" :article="article"/>
</template>
    