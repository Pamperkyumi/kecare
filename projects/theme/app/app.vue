<script lang="ts" setup>
const loading = ref(false)

const MIN_DURATION = 500
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


const nuxtApp = useNuxtApp()
nuxtApp.hook('page:start', show)
nuxtApp.hook('page:finish', hide)

</script>

<template>
    <div>
        <div v-if="loading" class="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-bg-primary)]"
            aria-live="polite" aria-busy="true">
            <div class="flex flex-col items-center gap-[16px]">
                <img src="~/assets/taichi.png" alt="加载中..."
                    class="w-[120px] h-[120px] animate-[taichi-rotate_1.2s_linear_infinite] will-change-transform" />
                <p class="m-0 text-[14px] text-[var(--color-accent)] tracking-[0.08em]">少女祈祷中...</p>
            </div>
        </div>
        <NuxtPage />
    </div>
</template>

<style>
@import url(../../../node_modules/modern-normalize/modern-normalize.css);

#app {}

@keyframes taichi-rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
