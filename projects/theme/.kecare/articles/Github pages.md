---
date: 2026-03-08
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
author: Pamper
---

# 部署到 GitHub Pages
将 Kecare 博客部署到 GitHub Pages

## 前置准备

在开始部署之前，请确保你已经准备好以下内容：

- Github账号
- Git 和 Node.js

## 创建 GitHub 仓库

1. 在 GitHub 创建公开仓库
2. 记录仓库地址：`https://github.com/<username>/<repo>.git`

## 配置 SSH 连接

具体流程可访问[使用 SSH 连接到GitHub - GitHub 文档](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh)

### 验证 SSH 连接

```bash
ssh -T git@github.com
```

## 推送代码到 GitHub

```bash
cd <你的主题目录>

git init

git add -A

git commit -m "init: 初始化项目"

git branch -M main

git remote add origin git@github.com:<username>/<repo>.git

git push -u origin main
```

推送成功后，你的代码将出现在 GitHub 仓库的 `main` 分支中。

## 配置 Nuxt 

> ⚠️ **注意**：本节内容针对使用 Nuxt 的示例主题。如果你使用其他框架，请参考对应框架的部署文档。

GitHub Pages 仅支持静态站点。Nuxt 需要将应用预渲染为静态 HTML 文件。

### 配置 Base URL

如果你没有使用自定义域名，需要设置正确的 Base URL。

**方式一：在 nuxt.config.ts 中配置**

```ts
export default defineNuxtConfig({
  app: {
    baseURL: '/<repository>/',  // 替换为你的仓库名
  },
});
```

**方式二：通过环境变量配置**

```bash
NUXT_APP_BASE_URL=/<repository>/
```

> 📖 **参考**：[Nuxt 官方文档 - GitHub Pages 部署](https://nuxt.com/deploy/github-pages)

---

## 构建与发布

确保在**主题目录**下执行：

```bash
npm install

npx nuxt build --preset github_pages

npx gh-pages -d .output/public
```

该命令会自动创建 `gh-pages` 分支并推送静态文件。

## 启用 GitHub Pages

### 配置 Pages 设置

1. 进入仓库 **Settings** → **Pages**

2. Source 选择 **Deploy from a branch**
3. Branch 选择 **gh-pages**，Folder 选择 **(root)**
4. 保存后访问 `https://<username>.github.io/<repo>/`

## 常见问题

### Q: 如何实现自动部署？

A: 可以使用 GitHub Actions 实现自动构建和部署。Nuxt 官方提供了示例工作流，详见 [Nuxt GitHub Pages 部署文档](https://nuxt.com/deploy/github-pages)。

### Q: 如何使用自定义域名？

A: 在 GitHub Pages 设置中添加自定义域名，并在域名服务商处配置 DNS 解析指向 GitHub Pages。

### Q: 构建失败怎么办？

A: 我不知道
