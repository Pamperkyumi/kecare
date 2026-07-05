<script setup lang="ts">
type HostedImage = {
  id: string
  filename: string
  originalName: string
  url: string
  size: number
  mimeType: string
  uploadedAt: string
}

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const isUploading = ref(false)
const copiedUrl = ref('')
const uploadError = ref('')

const { data: images, pending, refresh } = await useFetch<HostedImage[]>('/api/images', {
  default: () => []
})

const selectedFileSize = computed(() => selectedFile.value ? formatFileSize(selectedFile.value.size) : '')

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

function chooseFile() {
  fileInput.value?.click()
}

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  uploadError.value = ''

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }

  if (!file) {
    selectedFile.value = null
    return
  }

  if (!file.type.startsWith('image/')) {
    selectedFile.value = null
    uploadError.value = '请选择图片文件。'
    return
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

async function uploadImage() {
  if (!selectedFile.value || isUploading.value) return

  uploadError.value = ''
  isUploading.value = true

  try {
    const formData = new FormData()
    formData.append('image', selectedFile.value)

    await $fetch('/api/images', {
      method: 'POST',
      body: formData
    })

    selectedFile.value = null
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = ''
    }
    if (fileInput.value) fileInput.value.value = ''
    await refresh()
  }
  catch (error) {
    uploadError.value = error instanceof Error ? error.message : '上传失败，请稍后再试。'
  }
  finally {
    isUploading.value = false
  }
}

async function copyUrl(url: string) {
  await navigator.clipboard.writeText(new URL(url, window.location.origin).href)
  copiedUrl.value = url
  window.setTimeout(() => {
    if (copiedUrl.value === url) copiedUrl.value = ''
  }, 1600)
}
</script>

<template>
  <main class="page-shell">
    <section class="toolbar">
      <div>
        <p class="eyebrow">
          Local PicHost
        </p>
        <h1>本地图床</h1>
      </div>
      <button class="primary-button" type="button" @click="chooseFile">
        选择图片
      </button>
      <input
        ref="fileInput"
        class="file-input"
        type="file"
        accept="image/*"
        @change="onFileChange"
      >
    </section>

    <section class="upload-area">
      <div class="preview-panel" :class="{ empty: !previewUrl }">
        <img v-if="previewUrl" :src="previewUrl" alt="待上传图片预览">
        <div v-else class="empty-preview">
          <span>预览区</span>
        </div>
      </div>

      <div class="upload-meta">
        <h2>上传</h2>
        <p v-if="selectedFile">
          {{ selectedFile.name }} · {{ selectedFileSize }}
        </p>
        <p v-else>
          支持常见图片格式，当前本地最大限制为 8 MB。
        </p>
        <p v-if="uploadError" class="error-text">
          {{ uploadError }}
        </p>
        <button class="primary-button wide" type="button" :disabled="!selectedFile || isUploading" @click="uploadImage">
          {{ isUploading ? '上传中...' : '保存到图床' }}
        </button>
      </div>
    </section>

    <section class="gallery-head">
      <div>
        <p class="eyebrow">
          Gallery
        </p>
        <h2>已保存图片</h2>
      </div>
      <button class="ghost-button" type="button" @click="refresh()">
        刷新
      </button>
    </section>

    <section v-if="pending" class="status-line">
      正在读取图片...
    </section>

    <section v-else-if="!images?.length" class="status-line">
      还没有图片，先上传一张试试。
    </section>

    <section v-else class="image-grid">
      <article v-for="image in images" :key="image.id" class="image-card">
        <a :href="image.url" target="_blank" rel="noreferrer">
          <img :src="image.url" :alt="image.originalName">
        </a>
        <div class="card-body">
          <strong>{{ image.originalName }}</strong>
          <span>{{ formatFileSize(image.size) }} · {{ new Date(image.uploadedAt).toLocaleString() }}</span>
          <div class="card-actions">
            <a :href="image.url" target="_blank" rel="noreferrer">访问</a>
            <button type="button" @click="copyUrl(image.url)">
              {{ copiedUrl === image.url ? '已复制' : '复制链接' }}
            </button>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style>
:root {
  color: #17201c;
  background: #f6f7f4;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body {
  margin: 0;
}

button,
input {
  font: inherit;
}

.page-shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 64px;
}

.toolbar,
.gallery-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.eyebrow {
  margin: 0 0 6px;
  color: #687169;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin: 0;
}

h1 {
  font-size: clamp(2.4rem, 6vw, 4.4rem);
  line-height: 0.98;
}

h2 {
  font-size: 1.35rem;
}

.file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}

.primary-button,
.ghost-button {
  min-height: 44px;
  border: 0;
  border-radius: 6px;
  padding: 0 18px;
  cursor: pointer;
}

.primary-button {
  color: white;
  background: #176d5b;
  font-weight: 800;
}

.primary-button:disabled {
  cursor: not-allowed;
  background: #a5aaa3;
}

.ghost-button {
  color: #1f2b27;
  background: #e4e8e1;
}

.wide {
  width: 100%;
}

.upload-area {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  margin: 32px 0 42px;
  align-items: stretch;
}

.preview-panel {
  display: grid;
  min-height: 420px;
  overflow: hidden;
  border: 1px solid #d8ddd5;
  border-radius: 8px;
  background: #ffffff;
  place-items: center;
}

.preview-panel img {
  width: 100%;
  height: 100%;
  max-height: 620px;
  object-fit: contain;
}

.empty-preview {
  display: grid;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  min-height: 300px;
  border: 1px dashed #b7beb4;
  border-radius: 8px;
  color: #7b847c;
  place-items: center;
}

.upload-meta {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 14px;
  border-left: 1px solid #d8ddd5;
  padding-left: 20px;
}

.upload-meta p,
.status-line {
  color: #687169;
}

.error-text {
  color: #b42318 !important;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.image-card {
  overflow: hidden;
  border: 1px solid #d8ddd5;
  border-radius: 8px;
  background: #ffffff;
}

.image-card img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  background: #eef1ec;
}

.card-body {
  display: grid;
  gap: 8px;
  padding: 12px;
}

.card-body strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-body span {
  color: #687169;
  font-size: 0.88rem;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.card-actions a,
.card-actions button {
  border: 0;
  padding: 0;
  color: #176d5b;
  background: transparent;
  cursor: pointer;
  font-weight: 800;
  text-decoration: none;
}

.status-line {
  margin-top: 18px;
  padding: 28px 0;
}

@media (max-width: 760px) {
  .page-shell {
    width: min(100% - 24px, 1120px);
    padding-top: 28px;
  }

  .toolbar,
  .gallery-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .upload-area {
    grid-template-columns: 1fr;
  }

  .preview-panel {
    min-height: 300px;
  }

  .upload-meta {
    border-left: 0;
    border-top: 1px solid #d8ddd5;
    padding: 18px 0 0;
  }
}
</style>
