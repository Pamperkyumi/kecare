---
date: 2026-03-11
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
sticky: 1
author: Pamper
---

# 在已有项目上使用 Kecare

在已有项目中集成 Kecare，为项目添加文档/博客功能。

## 目录结构

```txt
your-project/
├─- .kecare/
│   ├── articles/           # 存放文章
│   ├── foo-bar.article.ts  # 文章详情页生成器
│   └── foo-bar.list.ts     # 文章列表页生成器
├── package.json
└── ...
```

## 安装

::: tabs

@tab bun

```bash
bun install kecare
```

@tab npm 

```bash
npm install kecare
```
@tab pnpm

```bash
pnpm install kecare
```

:::

## 文章详情页生成器

创建 `*.article.ts` 文件：

```ts
// .kecare/foo-bar.article.ts
import { join } from 'node:path';
import type { ArticleVariant, KecareContext } from "kecare";

export const type = 'article-detail';

export async function generator(context: KecareContext, article: ArticleVariant) {
    return {
        urlPath: ['articles', article.lang, article.hash].join('/'),
        fsPath: join(context.projectPath, 'app', 'pages', 'articles', article.lang, `${article.hash}.vue`),
        template: `
            <script setup lang="ts">
            import ArticleTheme from '~/components/ArticleTheme.vue'
            const article = ${JSON.stringify(article)}
            </script>
            <template>
                <ArticleTheme :article="article" />
            </template>
        `
    };
}
```

## 文章列表页生成器

创建 `*.list.ts` 文件：

```ts
// .kecare/foo-bar.list.ts
import { join } from 'node:path';
import type { ArticlesRecord, KecareContext } from "kecare";

export const type = 'article-list';

const ARTICLES_PER_PAGE = 5;
const TARGET_LANGUAGE = 'zh-CN';

export function generator(context: KecareContext, articles: ArticlesRecord) {
    const files: Array<{ fsPath: string; template: string }> = [];
    const zhArticles: Array<unknown> = [];

    for (const articleHash in articles) {
        const articleLanguages = articles[articleHash]!;
        if (articleLanguages[TARGET_LANGUAGE]) {
            zhArticles.push(articleLanguages[TARGET_LANGUAGE]);
        }
    }

    zhArticles.sort((a: any, b: any) => (b.frontMatter.sticky ?? 0) - (a.frontMatter.sticky ?? 0));

    const totalPages = Math.ceil(zhArticles.length / ARTICLES_PER_PAGE);

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        const pageArticles = zhArticles.slice(pageIndex * ARTICLES_PER_PAGE, (pageIndex + 1) * ARTICLES_PER_PAGE);
        const pageNumber = pageIndex + 1;
        const fileName = pageNumber === 1 ? 'index.vue' : `page-${pageNumber}.vue`;

        files.push({
            fsPath: join(context.projectPath, 'app', 'pages', fileName),
            template: `
                <script setup lang="ts">
                import BlogLanding from "~/components/BlogLanding.vue";
                const articles = ${JSON.stringify(pageArticles)}
                const currentPage = ${pageNumber}
                const totalPages = ${totalPages}
                </script>
                <template>
                    <BlogLanding :articles="articles" :current-page="currentPage" :total-pages="totalPages" />
                </template>
            `,
        });
    }

    return files;
}
```

## 文章展示组件

```vue
<!-- components/ArticleTheme.vue -->
<script setup lang="ts">
import { useKecareSDK } from 'kecare';
import type { ArticleVariant } from "kecare";

const kecareSDK = await useKecareSDK();
const props = defineProps<{ article: ArticleVariant }>();

onMounted(async () => {
    await nextTick();
    await kecareSDK!.mounted(props.article.rawMarkdown);
});
</script>

<template>
    <div class="article-container">
        <h1>{{ props.article.title }}</h1>
        <p>{{ props.article.desc }}</p>
        <div v-html="props.article.html"></div>
    </div>
</template>
```

## 运行生成器

```bash
kecare gen .
```

## 核心类型

```ts
// 生成器上下文
type KecareContext = {
    projectPath: string;
}

// 单篇文章数据
type ArticleVariant = {
    title: string;
    html: string;
    desc: string;
    lang: string;
    hash: string;
    frontMatter: FrontMatter;
    rawMarkdown: string;
    // ...
}

// 所有文章记录
type ArticlesRecord = Record<string, Record<string, ArticleVariant>>;
```

## Kecare SDK

Kecare SDK 提供 Markdown 扩展功能（代码高亮、Tabs、复制按钮等）：

```vue
<script setup>
import { useKecareSDK } from 'kecare';

const kecareSDK = await useKecareSDK();

onMounted(async () => {
    await nextTick();
    await kecareSDK!.mounted(props.article.rawMarkdown);
});
</script>
```
