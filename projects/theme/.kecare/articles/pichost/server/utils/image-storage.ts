import { createHash, randomUUID } from 'node:crypto'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

export type HostedImage = {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  uploadedAt: string
}

export type StoredImageInput = {
  data: Buffer
  originalName: string
  mimeType: string
}

const imageTypes = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/gif', '.gif'],
  ['image/avif', '.avif']
])

// Nuxt 的 server/ 目录会被 Nitro 接管。
// 这里的工具函数只在服务端运行，所以可以安全使用 Node 的 fs/path/crypto 模块。
// process.cwd() 在本地 dev 时指向项目根目录；以后部署到 ECS 时，也会指向应用运行目录。
const uploadDir = join(process.cwd(), 'uploads')
const manifestPath = join(uploadDir, 'images.json')

export function getPublicImageUrl(filename: string) {
  // 图片不是放进 public/，而是由 /api/images/[filename] 这个服务端路由读取后返回。
  // 这样以后想加鉴权、防盗链、统计访问量时，不需要迁移存储目录。
  return `/api/images/${filename}`
}

export async function ensureUploadDir() {
  await mkdir(uploadDir, { recursive: true })
}

export async function readManifest(): Promise<HostedImage[]> {
  await ensureUploadDir()

  try {
    const raw = await readFile(manifestPath, 'utf8')
    return JSON.parse(raw) as HostedImage[]
  }
  catch (error: any) {
    if (error?.code === 'ENOENT') return []
    throw error
  }
}

async function writeManifest(images: HostedImage[]) {
  await ensureUploadDir()
  await writeFile(manifestPath, JSON.stringify(images, null, 2), 'utf8')
}

export function assertSupportedImage(mimeType: string, size: number) {
  if (!imageTypes.has(mimeType)) {
    throw createError({
      statusCode: 415,
      statusMessage: 'Unsupported image type'
    })
  }

  if (size > 8 * 1024 * 1024) {
    throw createError({
      statusCode: 413,
      statusMessage: 'Image is larger than 8 MB'
    })
  }
}

export async function saveImage(input: StoredImageInput): Promise<HostedImage> {
  await ensureUploadDir()

  const ext = imageTypes.get(input.mimeType) || extname(input.originalName) || '.bin'
  const hash = createHash('sha1').update(input.data).digest('hex').slice(0, 12)
  const filename = `${Date.now()}-${hash}${ext}`
  const filePath = join(uploadDir, filename)

  await writeFile(filePath, input.data)

  const image: HostedImage = {
    id: randomUUID(),
    filename,
    originalName: input.originalName,
    url: getPublicImageUrl(filename),
    size: input.data.byteLength,
    mimeType: input.mimeType,
    uploadedAt: new Date().toISOString()
  }

  const images = await readManifest()
  await writeManifest([image, ...images])

  return image
}

export async function listImages(): Promise<HostedImage[]> {
  const images = await readManifest()
  const files = new Set(await readdir(uploadDir).catch(() => []))

  return images.filter(image => files.has(image.filename))
}

export async function getImageFile(filename: string) {
  if (!/^[a-zA-Z0-9._-]+$/.test(filename)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid filename'
    })
  }

  const images = await readManifest()
  const image = images.find(item => item.filename === filename)

  if (!image) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Image not found'
    })
  }

  const filePath = join(uploadDir, filename)
  const fileStat = await stat(filePath).catch(() => null)

  if (!fileStat?.isFile()) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Image file not found'
    })
  }

  return {
    filePath,
    image
  }
}
