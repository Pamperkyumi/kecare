---
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---
# Markdown扩展

## Frontmatter

YAML frontmatter 开箱即用

````
---
title: 写作                 # 标题：不填则默认使用文件名（或主题的默认逻辑）
date: 2025-11-19            # 日期：不填则会使用文件的最后修改时间
tags:                       # 标签：不填则表示没有标签
  - kecare
  - blog
desc: 这是一段简介           # 简介：用于首页/落地页文章卡片；不填可用正文开头截取
author: 作者                # 作者：不填则为空
coverSrc: "https://example.com/cover.webp" # 封面/背景图：不填则使用主题默认图
sticky: 1                   # 置顶：数字越大越靠前；不填则按日期倒序
menu: kecare-docs           # 菜单 key：用于挂载左侧菜单
translate: ['zh-CN', 'en-US', 'ja-JP']  #用于国际化处理
---
````

这些数据将与所有自定义和主题组件一起，供页面其余部分使用。

## 代码块中的语法高亮

使用 Shiki 在 Markdown 代码块中通过彩色文本实现语言语法高亮。Shiki 支持多种编程语言。您只需在代码块的起始反引号后添加有效的语言别名即可

例如

````js
export default {
  name: 'MyComponent',
  // ...
}
````

## 代码块中的行高亮

**Input 输入**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

亦或是

````
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

**Output 输出**

```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```

除了单行之外，你还可以指定多个单行、范围或两者结合：

行范围：例如 **{5-8}** 、 **{3-10}** 、 **{10-17}**

多个单行：例如 **{4,7,9}**

行范围和单行：例如 **{4,7-13,16,23-27,40}**

## 聚焦于代码块

在某行添加 **// [!code focus]** 注释将聚焦该行并模糊代码的其他部分。

**Input 输入**

````
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

**Output 输出**

````js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
````

## 代码块中的彩色差异显示

在行上添加 **// [!code --]** 或 **// [!code ++]** 注释将创建该行的差异，同时保留代码块的颜色。

**Input 输入**

````
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
````

**Output 输出**

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

## 分组

你可以像这样对多个代码块进行分组：

**Input 输入**

````js
::: tabs

@tab 这是第一个标题

这是第一个标签页的内容。
- 可以包含 Markdown
- **加粗**,*斜体*等

@tab 这是第二个标题

这是第二个标签页的内容。
1. 有序列表
2. 第二个项目

:::

::: tabs

@tab js[config.js]

```js
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

@tab ts[config.ts]

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```
:::

````

**Output 输出**

::: tabs

@tab 这是第一个标题。

这是第一个标签页的内容。
- 可以包含 Markdown
- **加粗**,*斜体*等

@tab 这是第二个标题

这是第二个标签页的内容。
1. 有序列表
2. 第二个项目

:::



::: tabs

@tab js[config.js]

```js
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

@tab ts[config.ts]

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```
:::
