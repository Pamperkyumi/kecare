# Kecare

![License](https://img.shields.io/badge/license-MIT-22c55e?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0--beta.113-06b6d4?style=flat-square)
![Runtime](https://img.shields.io/badge/bun-runtime-f9f1e1?style=flat-square)

**Kecare 把 Markdown 喂进去，吐出多语言内容数据 + 页面模板。前端用什么框架、跑不跑构建、要不要服务端渲染，统统不归它管。**

每个项目都需要文档。Kecare 是「**内容生成器**」——负责读 Markdown、调 AI 翻译、产出结构化数据、按你的模板规则生成页面文件。它**不渲染页面、不写样式、不限定部署形态**。Nuxt / Next.js / VitePress / Astro / Vue / React / EJS + Express / 纯 HTML / 甚至 PHP 都能用。

***

## 为什么是 Kecare

每个项目的技术栈不同，文档站的技术栈也跟着不同：

- Vue 团队用 Nuxt，React 团队用 Next.js，老项目可能是 EJS + Express
- 有的文档站是构建期生成（SSG），有的是运行时渲染（SSR），有的是纯 CDN 静态文件
- 翻译、缓存、列表分页、导航计算……这些事每个文档站都要做一遍

Kecare 把**内容层**从主题/框架里剥离出来，让上面这些事**只写一次**：

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   内容层（Kecare）  │ →  │   页面层（你的框架） │ →  │   部署层（你选）    │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ Markdown 解析    │    │ 路由             │    │ Vercel / Pages  │
│ AI 多语言翻译     │    │ 组件 / 样式       │    │ Nginx / CDN     │
│ 增量缓存          │    │ 框架构建步骤       │    │ Node 服务器（SSR）│
│ 数据聚合          │    │                 │    │ 对象存储          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
   ↑ 你管不了              ↑ 你想怎么写都行            ↑ 你想放哪都行
```

***

## 核心执行流程

```
用户输入: kecare gen <project-path>
       ↓
  commands/         解析 CLI 参数、创建 KecareContext
       ↓
  input-drivers/    扫描 .kecare/articles/*.md
       ↓              ├─ 解析 Front Matter
       ↓              ├─ Markdown → HTML
       ↓              └─ AI 翻译多语言变体（按内容哈希缓存）
       ↓
  module-handler/   调用主题模板，生成最终文件
       ↓              ├─ article.ts      → 详情页
       ↓              ├─ list.ts         → 列表页
       ↓              ├─ archives.ts     → 归档页
       ↓              ├─ menu.ts         → 导航
       ↓              ├─ articleStats.ts → 统计
       ↓              └─ search.ts       → 搜索索引
```

`commands/`、`input-drivers/`、`module-handler/` 三层各司其职，主题开发者只需在 `.kecare/` 下放模板文件即可注入自定义行为。

***

## 特性

- **框架无关**：Nuxt / Next.js / VitePress / Astro / React / Vue / EJS + Express / 纯 HTML / PHP 都行，`template` 字段输出什么格式由你的模板决定
- **不限定部署形态**：SSG（构建期生成）、SSR（运行时渲染）、纯静态文件都可以
- **AI 多语言翻译**：Front Matter 配置 `translate`，调用 OpenAI / Anthropic 生成多语言变体；按内容哈希缓存
- **精准增量缓存**：每篇文章基于内容指纹命中缓存，未变文章跳过解析、翻译、文件写入，watch 模式下毫秒级响应
- **六大内置处理器**：详情、列表、归档、菜单、统计、搜索索引，覆盖大多数文档站场景
- **主题 SDK**：开箱即用的复制、语言切换、侧边栏、代码高亮、Tab 切换、样式注入
- **零配置上手**：单一二进制，`create-kecare` 一行命令安装，跨平台开箱即用
- **跨平台二进制发布**：`@kecare/${platform}-${arch}` 按需分发

***

## 快速开始

### 创建项目

```bash
npm create kecare@beta
# 或
bun create kecare@beta
```

按提示输入项目路径，工具会从 GitHub 拉取模板压缩包并解压。

### 初始化

```bash
cd <your-project>
kecare init
```

交互式选择模板（Nuxt / Next.js / VitePress / Astro / Empty / 从 GitHub URL 导入），生成 `.kecare/` 配置目录。

### 写文档

在 `.kecare/article/` 下创建 Markdown：

```markdown
---
title: 快速上手
menu: 入门
date: 2026-01-15
translate: [zh-CN, en-US, ja-JP]
---

# 快速上手

这是文档正文……
```

### 生成 + 启动

```bash
kecare gen .         # 全量生成
kecare dev .         # 监听文件变更，增量重生成
                     # 加 --with-framework 自动拉起框架 dev server
```

***

## CLI 命令

| 命令                                  | 说明                                       |
| ----------------------------------- | ---------------------------------------- |
| `kecare gen <project-path>`         | 全量生成指定主题项目                              |
| `kecare dev <project-path>`         | 监听 `.kecare/articles` 增量重生成               |
| `kecare dev --with-framework`       | 增量重生成后自动拉起框架 dev server                  |
| `kecare clean <project-path>`       | 清理生成产物（缓存、翻译、生成的页面）                    |
| `kecare init [project-path]`        | 初始化项目（交互式选择模板）                          |
| `kecare version`                    | 输出版本号                                   |
| `kecare --help` / `kecare <cmd> --help` | 输出帮助，可指定命令查看详细选项与示例                |

***

## Front Matter

| 字段          | 必填 | 说明                 |
| ----------- | -- | ------------------ |
| `title`     | 是  | 文档标题               |
| `menu`      | 是  | 所属导航分组             |
| `date`      | 是  | 日期，格式 `YYYY-MM-DD` |
| `translate` | 是  | 翻译语言列表，第一个为原始语言    |
| `tags`      | 否  | 标签数组               |
| `cover`     | 否  | 封面图路径              |
| `desc`      | 否  | 文档摘要               |
| `sticky`    | 否  | 排序权重               |
| `hidden`    | 否  | `true` 时不生成页面      |
| `author`    | 否  | 作者名                |
| `layout`    | 否  | 布局类型               |

***

## 模板扩展

主题就是项目里的 `.kecare/` 目录。下放同名模板文件即可覆盖默认行为：

| 模板文件                  | 用途           | 类型                 |
| --------------------- | ------------ | ------------------ |
| `*.article.ts`        | 文档详情页        | 每篇文章调用一次           |
| `*.list.ts`           | 文档列表页        | 按语言分组 / 排序 / 分页     |
| `*.archives.ts`       | 归档页          | 按时间聚合              |
| `*.menu.source.ts`    | 导航源          | 编译为 `*.menu.generated.ts` |

### 模板接口

```typescript
// *.article.ts — 文档详情页
import type { ArticleVariant, KecareContext } from "kecare"

export const type = "article-detail"

export async function generator(context: KecareContext, article: ArticleVariant) {
  return {
    urlPath: `articles/${article.lang}/${article.hash}`,
    fsPath: "...",
    template: "<template>...</template>",
  }
}
```

```typescript
// *.list.ts — 文档列表页
import type { ArticlesRecord, KecareContext } from "kecare"

export function generator(context: KecareContext, articles: ArticlesRecord) {
  return [
    { fsPath: ".../index.vue", template: "..." },
    { fsPath: ".../page-2.vue", template: "..." },
  ]
}
```

`template` 字段的格式由你的框架决定——`.vue` / `.tsx` / `.astro` / `.svelte` / `.ejs` / `.html` / `.php` 都可以。

### EJS + Express 示例

服务端渲染场景下，Kecare 生成 `.ejs` 模板，Express 视图引擎运行时渲染：

```ejs
<!DOCTYPE html>
<html lang="<%= article.lang %>">
<head><title><%= article.title %></title></head>
<body>
  <h1><%= article.title %></h1>
  <%- article.html %>
</body>
</html>
```

```javascript
app.set("view engine", "ejs")
app.set("views", "views")
app.get("/articles/:lang/:hash", async (req, res) => {
  const data = JSON.parse(await readFile(`public/articles/${req.params.hash}.${req.params.lang}.json`, "utf-8"))
  res.render(`articles/${req.params.lang}/${req.params.hash}`, { article: data })
})
```

***

## 主题 SDK（`@kecare/sdk`）

主题开发者直接消费的浏览器端工具集合。`import { useKecareSDK } from "kecare"` 即可使用：

```typescript
import { useKecareSDK } from "kecare"

const sdk = await useKecareSDK()
await sdk.mounted(article.hash, currentPath)
```

| 模块                     | 职责                          |
| ---------------------- | --------------------------- |
| `style`                | 注入 Kecare 主题样式（CSS 变量、布局）    |
| `copy`                 | 代码块一键复制按钮                   |
| `language-switcher`    | 多语言切换组件                     |
| `sidebar`              | 侧边导航目录树                     |
| `tabs`                 | Markdown Tab 语法扩展（多 Tab 代码块） |
| `syntax-highlight`     | 代码高亮（Prism / Shiki）          |

***

## 部署

Kecare 的职责在「内容层」就结束了——它输出的结构化数据、模板代码、静态资源，配合**你框架自己的构建步骤**才会变成可部署的产物。

- **SSG**（推荐用于公开文档站）：Nuxt / Next.js / Astro 各自跑 `build`，产物丢 CDN
- **SSR**（适合需要登录态 / 实时数据的内部工具）：EJS + Express / Nuxt SSR / Next.js API Routes
- **纯静态**：纯 HTML 模板直接上传对象存储

构建命令和输出目录取决于你的模板里写的是什么。部署平台只要能托管静态文件或运行 Node 服务都行——Cloudflare Pages / Vercel / Netlify / 自建 Nginx / 任何对象存储。

> 非 Nuxt 框架请参考对应官方文档配置构建步骤。Nuxt 用户的最小示例：

| 配置项                        | 示例（Nuxt）            |
| -------------------------- | ------------------- |
| **Framework preset**       | `Nuxt.js`           |
| **Build command**          | `npm run build`     |
| **Build output directory** | `dist`              |
| **Environment variables**  | `NODE_VERSION = 20` |

***

## 项目结构

```
Kecare/                              # 仓库根
├── .github/workflows/               # CI（publish.yml）
├── .trae/                           # 内部文档与规范
│   ├── documents/
│   └── rules/
│
├── packages/                        # 发布的 npm 包
│   ├── create-kecare/               # npm create kecare 脚手架
│   │   ├── index.mjs                # 主入口（基于 @inquirer/prompts 交互）
│   │   └── __VERSION__.mjs
│   │
│   └── kecare/                      # 主题开发者引用的核心包
│       ├── index.ts                 # 导出 SDK + types + utils
│       ├── types.ts                 # 核心类型 (KecareContext, ArticleVariant, FrontMatter)
│       ├── __VERSION__.ts
│       ├── sdk/                     # 主题 SDK（浏览器端）
│       │   ├── __ROOT__.ts          #   useKecareSDK() 入口
│       │   ├── style.ts
│       │   ├── copy.ts
│       │   ├── language-switcher.ts
│       │   ├── sidebar.ts
│       │   ├── syntax-highlight.ts
│       │   └── tabs.ts
│       └── utils/
│           └── is-valid-date-string.ts
│
├── projects/                        # 内部项目
│   ├── generator/                   # Kecare CLI 生成器核心
│   │   ├── index.ts                 #   入口
│   │   ├── commands/                #   CLI 命令层
│   │   │   ├── __ROOT__.ts
│   │   │   ├── execute-init-command.ts
│   │   │   ├── execute-dev-command.ts
│   │   │   ├── execute-clean-command.ts
│   │   │   ├── execute-index-command.ts
│   │   │   ├── execute-version-command.ts
│   │   │   ├── help.ts
│   │   │   └── run-generation.ts
│   │   ├── input-drivers/           #   输入驱动（解析源文件）
│   │   │   ├── __ROOT__.ts
│   │   │   └── markdown-driver/
│   │   │       ├── __ROOT__.ts
│   │   │       ├── markedrenderer/tabs-marked.ts
│   │   │       └── translator/translator.ts
│   │   ├── module-handler/          #   模块处理器（生成页面）
│   │   │   ├── __ROOT__.ts
│   │   │   ├── article.ts
│   │   │   ├── list.ts
│   │   │   ├── archives.ts
│   │   │   ├── menu.ts
│   │   │   ├── articleStats.ts
│   │   │   └── search.ts
│   │   └── utils/                   #   工具函数
│   │       ├── cli.ts
│   │       ├── parse-front-matter.ts
│   │       ├── extra-desc-from-html.ts
│   │       ├── kecare-config.ts
│   │       ├── theme-config.ts
│   │       └── *.test.ts
│   │
│   ├── theme/                       # 主题项目示例（Nuxt）
│   │   ├── .kecare/                 #   Kecare 配置与内容
│   │   │   ├── articles/            #     Markdown 源
│   │   │   ├── cache/               #     翻译缓存
│   │   │   └── menus/               #     导航源
│   │   ├── app/                     #   Nuxt 应用
│   │   │   ├── assets/              #     样式、图片
│   │   │   ├── components/
│   │   │   ├── composables/
│   │   │   ├── pages/               #     路由页面
│   │   │   ├── app.vue
│   │   │   └── error.vue
│   │   ├── public/                  #   静态资源 + 翻译产物
│   │   ├── scripts/
│   │   ├── nuxt.config.ts
│   │   └── package.json
│   │
│   └── test/                        # 生成器 e2e 测试
│       ├── run.ts
│       ├── test-basic/
│       ├── test-empty-content/
│       ├── test-empty-title/
│       ├── test-invalid-date/
│       ├── test-invalid-translate/
│       ├── test-menu-*/             # 6 个菜单相关用例
│       ├── test-multi-articles/
│       ├── test-no-frontmatter/
│       ├── test-no-title/
│       └── test-special-filename/
│
├── Publish.ts                       # 二进制发布脚本
├── package.json
├── bunfig.toml
├── tsconfig.json
├── vitest.config.ts
├── tailwind.config.js
├── kecare-zh-cn.dockerfile
└── LICENSE
```

***

## 许可证

[MIT](./LICENSE) © 2025 Pamper
