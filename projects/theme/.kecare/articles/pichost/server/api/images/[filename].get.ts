import { createReadStream } from 'node:fs'
import { getImageFile } from '../../utils/image-storage'

export default defineEventHandler(async (event) => {
  // 方括号文件名是 Nuxt 的动态路由语法。
  // [filename].get.ts 会匹配 /api/images/xxx.png，并把 xxx.png 放到 event.context.params.filename。
  const filename = getRouterParam(event, 'filename') || ''
  const { filePath, image } = await getImageFile(filename)

  // setHeader 用来告诉浏览器返回内容的类型。
  // 如果没有 image/png、image/jpeg 这类 Content-Type，浏览器可能会把图片当成下载文件或纯文本处理。
  setHeader(event, 'Content-Type', image.mimeType)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  // sendStream 会把文件流交给 Nitro 响应，不需要一次性把大图读进内存。
  // 本地图床阶段这已经够用；上 ECS 后如果图片很多，可以进一步换成对象存储或 Nginx 静态目录。
  return sendStream(event, createReadStream(filePath))
})
