<script lang="ts" setup>
const loading = ref(false)
const MIN_DURATION = 250
let shownAt = 0
let hideTimer: ReturnType<typeof setTimeout> | null = null

const show = () => {
    if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
    }

    shownAt = Date.now()
    loading.value = true
}

const hide = () => {
    const elapsed = Date.now() - shownAt
    const remaining = Math.max(0, MIN_DURATION - elapsed)
    if (remaining === 0) {
        loading.value = false
        return
    }

    if (hideTimer) clearTimeout(hideTimer)
    hideTimer = setTimeout(() => {
        loading.value = false
        hideTimer = null
    }, remaining)
}

defineExpose({
    show,
    hide
})
</script>

<template>
    <div v-if="loading" class="global-loading" aria-live="polite" aria-busy="true">
        <div class="loading-content">
            <img src="~/assets/taichi.png" alt="加载中..." class="loading-gif" />
            <p class="loading-text">正在加载...</p>
        </div>
    </div>
</template>

<style scoped>
.global-loading {
    position: fixed;
    inset: 0;
    z-index: 9999;

    display: grid;
    place-items: center;

    background: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(4px);
    user-select: none;
}

.loading-content {
    display: grid;
    justify-items: center;
    gap: 10px;

    padding: 18px 20px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.25);
    user-select: none;
}

.loading-gif {
    width: 56px;
    height: 56px;
    animation: taichi-rotate 1.1s linear infinite;
    will-change: transform;
    user-select: none;
}

.loading-text {
    margin: 0;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.8);
    user-select: none;
}

@keyframes taichi-rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
