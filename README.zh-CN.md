# Kecare

[English](./README.md) | 简体中文

Kecare 是一个面向多语言内容站的静态生成器。你在 `.kecare/articles/` 里写 Markdown，构建时它负责翻译、缓存和页面生成，然后把成品交给主题自带的前端框架去渲染——默认是 Nuxt，但换成别的文件路由框架也完全可以。生成器和渲染框架刻意保持分离：内容归你，管线归 Kecare，表现层归主题。

可以把它理解成一台编译器：Markdown 进，页面出，渲染框架只是宿主。

## 为什么是 Kecare

**翻译发生在构建期，而不是运行时。** 在 Front Matter 里写上 `translate: ['zh-CN', 'en-US', 'ja-JP']`，构建时 Kecare 会调用 OpenAI / Anthropic 兼容接口完成翻译。每种语言都有真实的 URL 和真实的 HTML，对搜索引擎比浏览器里切换语言友好得多。双层缓存把成本压住：内容哈希清单让没改动的文章整篇跳过，段落级缓存让只改一段的文章只重译那一段；代码块用占位符保护，不会被翻译引擎碰坏。翻译失败时只回退原文展示、不写缓存，一次网络抖动不会把译文永久劣化。

**主题是完整项目，模板就是 TypeScript。** 主题是一个普通的 Nuxt 项目，有自己的依赖和组件；Kecare 相关的部分只是 `.kecare/` 里的几个文件：

| 文件 | 调用时机 |
| --- | --- |
| `*.article.ts` | 每个文章变体调用一次 |
| `*.list.ts` | 全部文章处理完后调用一次，拿到完整文章表 |
| `*.archives.ts` | 调用一次，拿到归档数据 |
| `*.menu.source.ts` | 文章生成前调用一次，link 中的文件名自动转为 hash 链接 |

每个模板导出一个 `generator` 函数，拿到有类型的数据，返回 `{ urlPath, fsPath, template }`。页面放哪、路由怎么排、内容长什么样——由你的代码决定，而不是某个配置方言。多个 `*.article.ts` 模板会为同一篇文章产出多个文件，全部被登记，缓存重建和 `clean` 都不会漏。

**构建是增量的，也是确定性的。** 相同输入产出逐字节相同的产物——文章数据统一收集一次，派生视图前按路径和语言排序，不依赖并发完成顺序。没改动的文章跳过解析和翻译；`dev` 模式监听 `.kecare/articles/`，只重生成受影响的部分，页面直接写进 Nuxt 的路由目录，Vite HMR 接手。文章被删除或设为 hidden，产物会自动清理。

**问题在构建之前暴露，而不是构建中途。** `kecare check` 加载你的模板、用最小数据干跑一遍、扫描每篇文章的 Front Matter（缓存命中的文章构建时是不校验的，check 不受此限制）、校验配置。几秒跑完，不写文件、不调 API，有问题时非零退出，可以直接挂进 CI 或 pre-commit。`gen` 失败时也会提示你去跑 `check`。

**清理靠登记，不靠猜。** 生成器写过的每个文件都进产物登记表，`kecare clean` 只删登记在案的文件、搜索索引和缓存，顺手回收空目录——不硬编码路径，不留孤儿。

开箱即用的还有：Markdown 管线里的 KaTeX 和 Tabs 扩展、内建搜索索引、供列表/归档模板使用的分语言文章统计，以及一个轻量浏览器 SDK（Tabs、Shiki 代码高亮、复制按钮、目录、语言切换），主题不必各自重造文章页交互。CLI 以平台独立二进制分发（通过 `create-kecare` 安装），内容站自己的 `package.json` 里不需要为"生成"这件事装任何依赖。

## 快速开始

```bash
bun install

# 生成示例主题的页面
bun run gen

# 开发模式：保存即重生成，联动 Nuxt HMR
bun run dev

# 提交前体检模板、文章与配置
bun run ./projects/generator/index.ts check projects/theme

# 清理生成产物与缓存
bun run clean
```

单元测试：`bunx vitest run --config projects/generator/vitest.config.ts`。

环境要求：Bun >= 1.2，Node.js >= 20（Nuxt 主题开发用）。

## CLI

```bash
bun run ./projects/generator/index.ts <command> <project-path> [options]
```

| 命令 | 说明 |
| --- | --- |
| `gen` | 扫描文章并生成全部页面 |
| `dev` | 增量生成 + 监听文件变化，联动 Nuxt HMR（`--with-nuxt` 同时启动 `nuxt dev`） |
| `check` | 快速体检模板契约、Front Matter、菜单与配置——不写文件、不调 API，有问题非零退出 |
| `init` | 从模板初始化项目 |
| `clean` | 按产物登记表清理生成文件与缓存 |
| `version` / `help` | 版本信息与命令帮助（任意命令加 `--help, -h`） |

## 写文章

文章是 `<theme>/.kecare/articles/` 下的 Markdown 文件：

```markdown
---
title: 我的第一篇          # 可选，缺省回退为文件名
menu: docs                # 可选，归入某个菜单
date: 2026-01-01          # 必填，YYYY-MM-DD
translate:                # 第一个值为原始语言
  - zh-CN
  - en-US
  - ja-JP
---

正文……
```

其余可选字段：`desc`、`cover`、`tags`、`sticky`、`author`、`layout`、`hidden`。

## 一个具体的模板

```ts
// .kecare/foo-bar.article.ts
import { join } from 'node:path';
import type { ArticleVariant, KecareContext } from 'kecare';

export async function generator(context: KecareContext, article: ArticleVariant) {
    return {
        urlPath: `articles/${article.lang}/${article.hash}`,
        fsPath: join(context.projectPath, 'app/pages/articles', article.lang, `${article.hash}.vue`),
        template: `<template>...</template>`,
    };
}
```

同一篇文章的所有语言共享一个由路径算出的短 hash，URL 形如 `articles/zh-CN/fcc31e3f`，语言之间的对应关系一目了然。

## 仓库结构

```
Kecare/
├── packages/
│   ├── kecare/           # 核心包：公共类型 + 浏览器 SDK（发布到 npm）
│   └── create-kecare/    # 脚手架：安装独立 CLI（发布到 npm）
├── projects/
│   ├── generator/        # 生成器核心（CLI 命令、输入驱动、模块处理器）
│   ├── theme/            # 官方主题示例（Nuxt 应用，文章在 .kecare/articles）
│   └── test/             # 端到端测试夹具
├── .commands/            # 仓库辅助脚本（CI 发布等）
├── Publish.ts            # 交互式发布脚本（版本号、打 tag、推送）
└── kecare-zh-cn.dockerfile
```

> `projects/kecare-template-nuxt` 是子模块（默认不初始化）。要改模板请先执行 `git submodule update --init projects/kecare-template-nuxt`。

## 许可

见 [LICENSE](./LICENSE)。
