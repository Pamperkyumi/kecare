---
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# Markdown 扩展

Kecare 在标准 Markdown 语法的基础上，提供了丰富的扩展功能，让你的文档更加生动和专业。

---

## Front Matter

YAML Front Matter 开箱即用，你可以在文章开头添加元数据：

```yaml
---
title: 写作指南
date: 2025-11-19
tags:
  - kecare
  - blog
desc: 这是一段简介
author: 作者
coverSrc: "https://example.com/cover.webp"
sticky: 1
menu: kecare-docs
translate: ['zh-CN', 'en-US', 'ja-JP']
---
```

这些数据将传递给主题组件，供页面使用。更多详情请参考 [Front Matter](./front-matter.md) 文档。

---

## 代码块语法高亮

Kecare 使用 [Shiki](https://shiki.style/) 实现代码块的语法高亮，支持多种编程语言。

### 基本用法

在代码块的起始反引号后添加语言标识：

````markdown
```js
export default {
  name: 'MyComponent',
  data() {
    return {
      message: 'Hello Kecare!'
    }
  }
}
```
````

### 支持的语言

Shiki 支持几乎所有主流编程语言

## 代码块行高亮

你可以高亮代码块中的特定行，让读者更容易关注重点内容。

### 方式一：行号范围

在语言标识后添加 `{行号}`：

````markdown
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'  // 这一行会被高亮
    }
  }
}
```
````

### 方式二：行内注释

使用 `// [!code highlight]` 注释：

````markdown
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```
````

### 高亮多行

支持多种格式组合：

| 格式 | 示例 | 说明 |
|------|------|------|
| 单行 | `{4}` | 高亮第 4 行 |
| 多个单行 | `{4,7,9}` | 高亮第 4、7、9 行 |
| 行范围 | `{5-8}` | 高亮第 5 到 8 行 |
| 混合使用 | `{4,7-13,16,23-27,40}` | 高亮多个行和范围 |

### 效果展示

```js
export default {
  data () {
    return {
      msg: 'Highlighted!'  // 这一行会被高亮
    }
  }
}
```

---

## 代码聚焦

使用聚焦功能可以让某一行突出显示，同时模糊其他行。

### 用法

在目标行添加 `// [!code focus]` 注释：

````markdown
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```
````

### 效果展示

````js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
````



---

## 代码差异显示

在代码对比场景中，可以使用差异显示功能标记新增和删除的行。

### 用法

| 注释 | 效果 |
|------|------|
| `// [!code --]` | 标记为删除行（红色） |
| `// [!code ++]` | 标记为新增行（绿色） |

### 示例

````markdown
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added'   // [!code ++]
    }
  }
}
```
````

### 效果展示

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

---

## 代码分组（Tabs）

你可以将多个代码块分组显示为标签页，方便切换查看。

### 基本用法

````markdown
::: tabs

@tab 第一个标签

这是第一个标签页的内容。
- 支持 Markdown
- **加粗**、*斜体*等

@tab 第二个标签

这是第二个标签页的内容。
1. 有序列表
2. 第二个项目

:::
````

### 带文件名的标签

````markdown
::: tabs

@tab js [config.js]

```js
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

@tab ts [config.ts]

```ts
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
````

### 效果展示

````
::: tabs

@tab 第一个标签

这是第一个标签页的内容。
- 支持 Markdown
- **加粗**、*斜体*等

@tab 第二个标签

这是第二个标签页的内容。
1. 有序列表
2. 第二个项目

:::

::: tabs

@tab js [config.js]

```js
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

@tab ts [config.ts]

```ts
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
````

