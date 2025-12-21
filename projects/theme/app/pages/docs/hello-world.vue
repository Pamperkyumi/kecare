<!-- Generated: 2025-12-21T22:11:27.022Z -->
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
    "id": "hello-world",
    "title": "HelloWorld",
    "desc": "Hello World",
    "coverSrc": "https://img.cdn1.vip/i/68e29b90b6718_1759681424.webp",
    "contentHtml": "<p>Welcome to <a href=\"http://zespia.tw/hexo\">Hexo</a>! This is your very first post. Check <a href=\"http://zespia.tw/hexo/docs\">documentation</a> to learn how to use.</p>\n<p>纪念一下此避难所复活日期</p>\n",
    "createdAt": "1762613962901",
    "author": "Pamper",
    "to": "/articles/hello-world",
    "headings": []
} as const;
const totalArticles = undefined
</script>
<template>
  <DocsIndex :navItems="navItems" :article="article"/>
</template>
    