---
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# Front Matter

每篇文章都可以在开头写一段 Front Matter（YAML 格式），用于提供主题可能需要的元信息，例如：标题、日期、标签、描述、作者、封面、置顶、菜单等喵~

### 完整示例

```yaml
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
```

## 字段说明（推荐约定捏）
| 字段 | 类型 | 描述 |
| --- | --- | --- |
| **title** | string | 文章标题 |
| **date** | string | 文章时间（格式建议 YYYY-MM-DD） |
| **tags** | string[] | 标签数组 |
| **desc** | string | 摘要 |
| **author** | string | 作者名 |
| **coverSrc** | string | 封面/背景图 URL |
| **sticky** | number | 置顶优先级 |
| **menu** | string | 绑定菜单 key |
