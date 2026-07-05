import { assertSupportedImage, saveImage } from '../../utils/image-storage'

export default defineEventHandler(async (event) => {
  // 这个文件对应 POST /api/images。
  // 前端用 FormData 发送文件时，请求体的 Content-Type 会是 multipart/form-data。
  // Nuxt 底层的 h3 提供 readMultipartFormData(event)，可以把 multipart 表单拆成字段数组。
  const form = await readMultipartFormData(event)
  const imagePart = form?.find(part => part.name === 'image')

  if (!imagePart?.data || !imagePart.filename || !imagePart.type) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing image file'
    })
  }

  // 在服务端校验格式和大小很重要：前端 accept="image/*" 只是用户体验提示，不能作为安全边界。
  assertSupportedImage(imagePart.type, imagePart.data.byteLength)

  // saveImage 会把二进制 Buffer 写入 uploads/，并同步更新 images.json 索引。
  // 返回值会直接被 Nuxt 序列化成 JSON，前端 $fetch 可以拿到这个对象。
  return await saveImage({
    data: imagePart.data,
    originalName: imagePart.filename,
    mimeType: imagePart.type
  })
})
