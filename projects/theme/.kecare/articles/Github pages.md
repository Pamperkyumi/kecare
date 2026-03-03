---
menu: test
translate: ['zh-CN', 'en-US', 'ja-JP']
---

# 部署到 GitHub Pages（从 0 到上线喵~）

## 0. 你需要准备什么（清单）

- 一个 GitHub 账号（自己注册喵）
- 本地已安装 **Git**
- 本地已安装 **Node.js**（用于安装依赖与构建 Nuxt）

## 1. 在 GitHub 上新建仓库（Repository）

1) 登录 GitHub  

2) 右上角 **New repository**  

3) 填写仓库信息：

 Repository name：名字随意喵，都可以的喵（也许吧

要选Public，要公开喵

创建完成后，你会得到一个仓库地址（后面绑定 Git 会用到）。

## 2. 让本地 Git “绑定”到 GitHub（推荐 SSH 方式喵~）

### 2.1 生成 SSH Key（本地）

打开终端执行：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

一路回车即可捏。遇到问题看一下Github 官方说明也是这套流程，会更详细一点👉[点我喵](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?utm_source=chatgpt.com)

### 2.2 把公钥添加到 GitHub

1. 打开你本机的公钥文件（通常是 **~/.ssh/id_ed25519.pub**）
2. 复制内容（是一长串以 **`ssh-ed25519`** 开头的文本）
3. 在 GitHub 账号设置里 **添加 SSH key**（粘贴公钥）

这是 GitHub 官方的“添加 SSH key”流程。看Github的肯定比我写的好，所以👉[还是点击我喵](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account?utm_source=chatgpt.com)

### 2.3 测试 SSH 连接

```bash
ssh -T git@github.com
```

首次会提示确认指纹，输入 `yes`。看到欢迎信息就表示成功捏~

## 3. 把主题代码推到你的仓库

下面假设你已经有一个主题目录（例如 `Kecare-theme/`），我们要把它推到刚才新建的仓库里。

### 3.1 在主题目录初始化 Git（如果它还不是仓库)

```bash
cd <你的主题目录>
git init
git add -A
git commit -m "init: theme"
```

### 3.2 添加远程仓库并推送

把下面的 **`<user>`** 和 **`<repo>`** 替换成你的 GitHub 用户名和仓库名：

```bash
git branch -M main
git remote add origin git@github.com:<user>/<repo>.git
git push -u origin main
```

到这里，你的主题代码应该已经出现在 GitHub 仓库的 **`main`** 分支里了喵~

## 4. Nuxt（示例主题）

> [!WARNING]
> 请注意：不同主题的脚手架与技术栈（语言/框架/构建方式）可能完全不同，因此部署方法也可能不同捏。本篇文档仅以**示例主题**为例进行演示——因为示例主题使用 **Nuxt** 搭建，所以文中的 Nuxt 构建部署步骤是“特制给本主题”的喵。实际部署前，请优先阅读**主题作者**提供的部署说明与要求喵~

GitHub Pages 仅支持静态站点，Nuxt 会将您的应用程序预渲染为静态 HTML 文件。

### 4.1 Base URL

如果你没有使用自定义域名，需要在构建步骤中将 `NUXT_APP_BASE_URL` 设置为你的仓库名称。例如： `https://<user>.github.io/<repository>/` 

`NUXT_APP_BASE_URL=/<repository>/`

Nuxt 官方明确要求这样做喵，详细请看👉[点我喵](https://nuxt.com/deploy/github-pages)

不过我觉得，在Nuxt.config.ts中进行配置baseUrl就好了

````ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    baseURL: 'https://<user>.github.io/<repository>/',
    head: {
    },
  },
});
````

### 5. 在主题目录构建静态产物

确保你在**主题目录**执行

```bash
npm install
```

然后构建：

```bash
npx nuxt build --preset github_pages
```

构建完成后，Nuxt 的 GitHub Pages preset 会生成静态文件到：

````txt
.output/public
````

这是 Nuxt 官方给出的输出路径（后面我们就发布这个目录）。

## 6. 发布构建产物到 `gh-pages` 分支

在主题目录执行：

```bash
npx gh-pages -d .output/public
```

它会把 **`.output/public`** 推送到 **`gh-pages`** 分支（若没有会自动创建），非常适合新手捏~

## 7. 在 GitHub 仓库里启用 Pages

1) 进入你的仓库 → **Settings**

2. 找到 **Pages**

3. 在发布源（Source / Build and deployment）里选择：

- Branch：**`gh-pages`**
- Folder：**`/ (root)`**

4) Save

这也有Github 官方的流程👉[还是点击我喵](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site?utm_source=chatgpt.com)

保存后，稍等片刻，GitHub 会给出你的 Pages 地址，例如：

```txt
https://<user>.github.io/<repo>/
```

让后访问即可喵

## FAQ

Q：我能不能让它自动部署（不用每次手动 build + publish）？

A: 可以。Nuxt 官方提供了 GitHub Actions 的示例工作流，能自动把 `.output/public` 上传并部署到 Pages。👉[这里喵](https://nuxt.com/deploy/github-pages)

