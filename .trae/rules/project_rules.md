# Kecare 生成器

在你每次进行思考以及代码编写前，请你详细阅读这份关于Kecare生成器的编码规范以及逻辑处理，避免产生不必要的错误

---

# 编码规范

1.  **代码风格**：优先采用**过程式编程风格**，避免不必要的函数封装。代码应能从上到下线性阅读，便于快速理解逻辑意图。
2.  **代码注释**：在关键逻辑处编写清晰的注释，帮助阅读者理解代码的意图和作用。
3.  **导入语句**：所有导入必须包含完整的文件名，即以 `.ts` 为后缀。例如：`import { astra } from "../../utils/test.ts";`
4.  **循环使用**：**禁止**在循环中使用 `forEach`、`map`、`reduce` 等高阶函数。请使用 `for … of`、`for … in` 或普通 `for` 循环替代，以保持代码的线性执行逻辑和对异步操作的支持。允许使用 `filter` 和 `some` 这类纯数据过滤的高阶函数。
5.  **代码质量**：编辑器已启用 ESLint 扩展，编码必须符合其规范。
6.  **命名规范**：所有变量名（包括数据库的表名和列名）均采用**小写驼峰命名法**。
7.  **TypeScript 配置**：项目已开启 `allowImportingTsExtensions` 选项，重申第三条规范：所有导入必须包含 `.ts` 后缀。
8.  **文件路径层级**：你必须使用工具复核 import 的文件路径是否存在，避免引入不存在的文件。很多时候都是文件名正确但是层级有误。

---

# 项目架构概览

```
Kecare/
├── packages/
│   └── kecare/              # 核心包，导出公共类型和工具函数
│       ├── types.ts         # 核心类型定义 (KecareContext, ArticleVariant, FrontMatter 等)
│       └── utils/           # 工具函数
│
├── projects/
│   ├── generator/           # 生成器核心
│   │   ├── index.ts         # 入口文件
│   │   ├── commands/        # CLI 命令处理
│   │   ├── input-drivers/   # 输入驱动 (处理不同格式的源文件)
│   │   ├── module-handler/  # 模块处理器 (生成页面)
│   │   └── utils/           # 工具函数
│   │
│   └── theme/               # 主题项目示例
│       ├── .kecare/         # Kecare 配置和数据目录
│       └── app/             # Nuxt 应用目录
```

**类型定义**：所有核心类型定义在 `/packages/kecare/types.ts`，编写代码时请先查阅该文件。如果需要新增类型，请在此文件中添加。

---

# 核心执行流程

```
用户输入: kecare gen <theme-path>
    ↓
commands/__ROOT__.ts → 解析命令行参数
    ↓
execute-index-command.ts → 验证 .kecare 目录存在，创建 KecareContext
    ↓
input-drivers/__ROOT__.ts → 调度输入驱动，批量处理文章
    ↓
markdown-driver/__ROOT__.ts → 解析 Markdown，处理翻译，生成 ArticleVariant
    ↓
module-handler/__ROOT__.ts → 处理文章数据，生成页面
    ├── emitArticleHandle() → 每篇文章调用一次
    │   ├── article.ts → 生成文章详情页
    │   └── list.ts → 收集文章列表数据
    │
    └── emitModuleFinish() → 所有文章处理完成后调用
        ├── menu.ts → 生成菜单文件
        └── list.ts → 生成列表页
```

---

# 各层职责详解

## commands/ - 命令层

- `__ROOT__.ts`：解析命令行参数，支持 `--option=value`、`--flag`、子命令格式
- `execute-index-command.ts`：验证项目路径，创建上下文，启动输入驱动
- `execute-version-command.ts`：输出版本信息

## input-drivers/ - 输入驱动层

**职责**：扫描源文件，解析内容，生成 ArticleVariant 数据

- `markdown-driver/__ROOT__.ts`：处理 Markdown 文件
  1. 解析 Front Matter (YAML 格式)
  2. 校验元数据字段
  3. Markdown → HTML (使用 marked + 自定义扩展)
  4. 多语言翻译处理 (可选 AI 翻译)

**Front Matter 必填字段**：
- `title`: 文章标题
- `menu`: 所属菜单名称
- `date`: 日期，格式 `YYYY-MM-DD`
- `translate`: 语言数组，第一个为原始语言

## module-handler/ - 模块处理器层

**职责**：读取主题模板文件，生成最终页面

### article.ts - 文章详情页
1. 扫描 `.kecare/**/*.article.ts` 模板文件
2. 对每篇文章调用模板的 `generator(context, article)` 方法
3. 将返回的模板写入文件

### list.ts - 文章列表页
1. `handle()` 阶段：收集所有文章元数据
2. `finish()` 阶段：按语言分组、排序、分页，生成列表页

### menu.ts - 菜单文件
1. 扫描 `.kecare/menus/*.menu.source.ts`
2. 将 `link` 字段中的文件名转换为 hash
3. 生成对应的 `*.menu.generated.ts`

---

## *.article.ts - 文章页面模板

```typescript
import type { ArticleVariant, KecareContext } from "kecare";

export const type = 'article-detail';

export async function generator(context: KecareContext, article: ArticleVariant) {
    return {
        urlPath: `articles/${article.lang}/${article.hash}`,
        fsPath: join(context.projectPath, 'app/pages/articles', article.lang, `${article.hash}.vue`),
        template: `<template>...</template>`
    };
}
```

## *.list.ts - 列表页面模板

```typescript
import type { ArticlesRecord, KecareContext } from "kecare";

export function generator(context: KecareContext, articles: ArticlesRecord) {
    // articles: { [hash]: { [lang]: ArticleData } }
    return [
        { fsPath: '.../index.vue', template: '...' },
        { fsPath: '.../page-2.vue', template: '...' }
    ];
}
```

---

# 工具函数 (utils/)

- `parse-front-matter.ts`：解析 Markdown 文件开头的 YAML Front Matter
- `extra-desc-from-html.ts`：从 HTML 中提取纯文本摘要
- `kecare-config.ts`：加载 `.kecare/kecare.config.ts` 配置文件

---
