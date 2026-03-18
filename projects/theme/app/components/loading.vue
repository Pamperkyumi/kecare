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
    <div v-if="loading"
        class="fixed inset-0 z-[9999] w-full h-full grid place-items-center bg-black/35 backdrop-blur-[4px] select-none"
        aria-live="polite" aria-busy="true">
        <div
            class="grid justify-items-center gap-[10px] p-[18px_20px] rounded-[14px] bg-black/92 shadow-[0_18px_60px_rgba(0,0,0,0.25)] select-none">
            <img src="~/assets/taichi.png" alt="加载中..."
                class="w-[56px] h-[56px] animate-[taichi-rotate_1.1s_linear_infinite] will-change-transform select-none" />
            <p class="m-0 text-[14px] text-white/90 select-none">正在加载...</p>
        </div>
    </div>
</template>

<style scoped>
@keyframes taichi-rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
