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
        <div v-if="loading" class="global-loading" aria-live="polite" aria-busy="true">
            <div class="loading-content">
                <img src="~/assets/taichi.png" alt="加载中..." class="loading-gif" />
                <p class="loading-text">少女祈祷中...</p>
            </div>
        </div>
        <NuxtPage />
    </div>
</template>

<style>
@import url(../../../node_modules/modern-normalize/modern-normalize.css);

#app {}

.global-loading {
    position: fixed;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.loading-gif {
    width: 120px;
    height: 120px;
    animation: taichi-rotate 1.2s linear infinite;
    will-change: transform;
}

.loading-text {
    margin: 0;
    font-size: 14px;
    letter-spacing: 0.08em;
    color: #ff0000;
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
