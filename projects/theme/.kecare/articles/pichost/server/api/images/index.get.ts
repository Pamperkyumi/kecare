import { listImages } from '../../utils/image-storage'

export default defineEventHandler(async () => {
  // defineEventHandler 是 Nuxt/Nitro 的服务端路由入口。
  // 文件名 index.get.ts 表示：当浏览器请求 GET /api/images 时，Nuxt 会执行这个函数。
  // 这里不直接碰数据库，而是读取本地 uploads/images.json，返回图片列表给前端画廊。
  return await listImages()
})
