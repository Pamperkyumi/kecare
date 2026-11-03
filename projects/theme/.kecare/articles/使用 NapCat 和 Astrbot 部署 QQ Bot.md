---
date: 2026-11-03
sticky: 5
translate: ['zh-CN']
author: Pamper
---



# 使用 NapCat 和 Astrbot 部署 QQ Bot

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

- [AstrBot](https://docs.astrbot.app/what-is-astrbot.html)
- [NapCat](https://napneko.github.io/guide/start-install)

> [!WARNING]
>
> 通过 Docker 可以方便地将 AstrBot 部署到 Windows, Mac, Linux 上。
>
> 以下教程默认您的环境已安装 Docker。如果没有安装，请参考 [Docker 官方文档](https://docs.docker.com/get-docker/) 进行安装。

以上是本文涉及到的工具，你不必全部下载，仅需下载 Docker Desktop即可

> [!NOTE]
>
> 这是一个纯教程向的文档，所以我不再介绍以上工具是什么以及在后续配置过程中每一步的含义（涉及Bot体验的功能会进行解释）

好，我们已经下载好了Docker，我们可以使用Docker Compose 一键部署 Astrbot 和 Napcat

直接复制 [NapNeko/NapCat-Docker/astrbot.yml](https://github.com/NapNeko/NapCat-Docker/blob/main/compose/astrbot.yml) 文件到你的服务器上即可。

如果您的网络环境在中国大陆境内，上述文件无法正常拉取。那你<a href="https://www.kecare.me/assets/astrbot.yml" download>点一下我 </a>我大方的送你一份

让后将其放在你喜欢的地方，最好是新一个文件夹内。

让后在终端中进入该文件夹的路径

运行

```bash
sudo docker compose -f astrbot.yml up -d
```

如果不出意外的话，就应该不出意外

![Astrbot](/assets/astrbotpath1.png)

让后你就耐心等待这两个进度条 Download 满即可。

让后你就可以关掉这两个无用的终端了，接着打开你的 Docker Desktop 就应该能看到两个镜像

![Astrbot path2](/assets/astrbotpath2.png)

那我们一个个来，先找到 Name 为 soulter/astrbot 的镜像，点击一下 Run 不需要你进行任何的 Options Setting。让后你就可以在 容器 中找到这个 容器 并查看其日志，不出意外的话会输出下面这段日志

![image-20261103022050120](/assets/astrbotpath3.png)

让后在浏览器中打开这段Url（点一下即可）

初始名为 astrbot

初始密码为 Url 下方的 password 

```js
我不知道为什么，我的初始密码不初始也不正确。每次都要手动改一下密码  // [!code focus]
```

成功登录之后你会进入到 Astrbot 的首页，我们就跟着它的快速引导来，第一步配置 Ai 模型。

添加新的模型提供商，你从哪搞来的api就填哪家了，以 Deepseek 为例

API Key 填 你获取到的 Api 

API Base Url 填 https://api.deepseek.com

让后滑倒最下面点 保存并获取模型

让后在可用模型里找到 flash 添加 并 启用 即可（可以点一下启用按钮右边的测试按钮，看一下是否测试通过）

让后返回快速引导，点第二步 配置平台机器人

QQ的话，就选  OneBot v11 （不要选官Bot!）

让后直接保存即可，就用它的默认设置，不需要你进行更改。

让后就可以把 Astrbot 放一边了，我们启动 Napcat 的镜像，依旧是按照刚刚启动 Astrbot 的样子，在 容器 日志 中找到 Napcat 的 Url 并 打开

![!image](/assets/astrbotpath4.png)

应该会让你登录 QQ ，拿出你即将要被风控的 Bot 小号，进行登录即可。

登录完成之后，应该就能进入 Napcat 的首页，在左侧找到 网络配置

让后点击 新建 让后选择 Websocket客户端

![image-20261103030132366](/assets/astrbotpath5.png)

Url 一定要这么写（前提是你在docker下部署的）

它会给你默认 Token 其实删了不填也没事，如果你要填，就回到 Astrbot 配置机器人的页面也去填一份一模一样的。点击保存。

前往 AstrBot 网页 的 `数据与日志` -> `日志`，如果出现 `aiocqhttp(OneBot v11) 适配器已连接。` 蓝色的日志，说明连接成功。如果没有，若干秒后出现` aiocqhttp 适配器已被关闭` 则为连接超时（失败），请检查配置是否正确。

![image-20261103030539085](/assets/astrbotpath6.png)

我这图是在docker的日志里截的，其实是一个东西，看到 aiocqhttp(OneBot v11) 适配器已连接 这句话就行。

让后你可以拿你的QQ给Bot发送一句 Hello World， 庆祝它的出生。

让后就是在 Astrbot 侧 配置你的Bot了



