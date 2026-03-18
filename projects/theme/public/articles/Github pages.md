---
date: 2026-03-08
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# 部署到 GitHub Pages

本文档将手把手教你如何将 Kecare 博客部署到 GitHub Pages，让你的站点从本地走向线上。

---

## 前置准备

在开始部署之前，请确保你已经准备好以下内容：

| 准备项 | 说明 |
|--------|------|
| GitHub 账号 | 如果没有，请先 [注册 GitHub](https://github.com/signup) |
| Git | 本地已安装 Git，可通过 `git --version` 验证 |
| Node.js | 本地已安装 Node.js，用于安装依赖和构建项目 |

---

## 创建 GitHub 仓库

### 步骤一：登录 GitHub

访问 [GitHub](https://github.com) 并登录你的账号。

### 步骤二：创建新仓库

1. 点击右上角的 **+** 按钮，选择 **New repository**
2. 填写仓库信息：
   - **Repository name**：仓库名称，可自定义（如 `my-blog`）
   - **Visibility**：选择 **Public**（公开），GitHub Pages 免费版仅支持公开仓库
3. 点击 **Create repository** 完成创建

### 步骤三：记录仓库地址

创建完成后，你会看到仓库地址，格式如下：

```txt
https://github.com/<username>/<repo>.git
```

或 SSH 格式：

```txt
git@github.com:<username>/<repo>.git
```

---

## 配置 SSH 连接

> 💡 **提示**：如果你已经配置过 SSH，可以跳过此步骤。

### 生成 SSH Key

打开终端，执行以下命令：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

按三次回车使用默认设置即可。

### 添加公钥到 GitHub

1. 查看公钥内容：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

2. 复制输出的内容（以 `ssh-ed25519` 开头）

3. 在 GitHub 中添加：
   - 进入 **Settings** → **SSH and GPG keys**
   - 点击 **New SSH key**
   - 粘贴公钥内容并保存

> 📖 **详细教程**：[GitHub 官方文档 - 添加 SSH Key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)

### 验证 SSH 连接

```bash
ssh -T git@github.com
```

首次连接会提示确认指纹，输入 `yes`。看到欢迎信息即表示成功。

---

## 推送代码到 GitHub

### 初始化 Git 仓库（如果尚未初始化）

```bash
cd <你的主题目录>
git init
git add -A
git commit -m "init: 初始化项目"
```

### 添加远程仓库并推送

将 `<username>` 和 `<repo>` 替换为你的 GitHub 用户名和仓库名：

```bash
git branch -M main
git remote add origin git@github.com:<username>/<repo>.git
git push -u origin main
```

推送成功后，你的代码将出现在 GitHub 仓库的 `main` 分支中。

---

## 配置 Nuxt 构建

> ⚠️ **注意**：本节内容针对使用 Nuxt 的示例主题。如果你使用其他框架，请参考对应框架的部署文档。

GitHub Pages 仅支持静态站点。Nuxt 需要将应用预渲染为静态 HTML 文件。

### 配置 Base URL

如果你没有使用自定义域名，需要设置正确的 Base URL。

**方式一：在 nuxt.config.ts 中配置**

```ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: '/<repository>/',  // 替换为你的仓库名
    head: {
      // ...
    },
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

### 安装依赖

确保在**主题目录**下执行：

```bash
npm install
```

### 构建静态文件

```bash
npx nuxt build --preset github_pages
```

构建完成后，静态文件将输出到：

```txt
.output/public/
```

### 发布到 gh-pages 分支

使用 `gh-pages` 工具将构建产物推送到 `gh-pages` 分支：

```bash
npx gh-pages -d .output/public
```

该命令会自动创建 `gh-pages` 分支并推送静态文件。

---

## 启用 GitHub Pages

### 配置 Pages 设置

1. 进入你的 GitHub 仓库
2. 点击 **Settings**
3. 在左侧菜单找到 **Pages**
4. 配置发布源：
   - **Source**：选择 **Deploy from a branch**
   - **Branch**：选择 **gh-pages**
   - **Folder**：选择 **/ (root)**
5. 点击 **Save**

### 访问你的站点

稍等片刻后，GitHub 会给出你的站点地址：

```txt
https://<username>.github.io/<repo>/
```

点击链接即可访问你的博客！

---

## 常见问题

### Q: 如何实现自动部署？

A: 可以使用 GitHub Actions 实现自动构建和部署。Nuxt 官方提供了示例工作流，详见 [Nuxt GitHub Pages 部署文档](https://nuxt.com/deploy/github-pages)。

### Q: 如何使用自定义域名？

A: 在 GitHub Pages 设置中添加自定义域名，并在域名服务商处配置 DNS 解析指向 GitHub Pages。

### Q: 构建失败怎么办？

A: 我不知道

现在你的博客已经上线，可以开始分享了！ 🎉
