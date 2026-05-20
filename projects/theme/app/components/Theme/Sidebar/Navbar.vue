<script lang="ts" setup>
import { useColorMode } from '@vueuse/core'
const navbar = ref<HTMLElement | null>(null)
const searchRef = ref<{ open: () => void } | null>(null)
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

let lastScrollTop = 0

const scrollHandler = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (!navbar.value) return

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.value.style.transform = 'translateY(-100%)'
    } else {
        navbar.value.style.transform = 'translateY(0)'
    }

    lastScrollTop = scrollTop
}

const openSearch = () => {
    searchRef.value?.open()
}

const toggleDark = () => {
    colorMode.value = isDark.value ? 'light' : 'dark'
}

onMounted(() => {
    if (navbar.value) {
        navbar.value.style.transform = 'translateY(0)'
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
})

onUnmounted(() => {
    window.removeEventListener('scroll', scrollHandler)
})
</script>

<template>
    <div ref="navbar"
        class="fixed top-0 left-0 w-full bg-transparent dark:bg-transparent shadow-none text-[16px] leading-normal flex items-center justify-between px-[20px] md:px-[5%] py-[15px] z-[1000] transition-transform duration-[400ms]">
        <div class="text-[1.5rem] font-bold text-[var(--color-accent)]">Pamper</div>
        <ul
            class="flex list-none m-0 p-0 flex-wrap justify-end items-center gap-[5px] md:gap-[10px] max-w-full box-border">
            <li class="flex">
                <button
                    class="nav-btn relative inline-flex items-center leading-[1.2] text-[inherit] px-[5px] py-[5px] font-medium cursor-pointer bg-transparent border-none text-[18px]"
                    @click="openSearch">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"
                        fill="currentColor">
                        <path
                            d="M480 272C480 317.9 465.1 360.3 440 394.7L566.6 521.4C579.1 533.9 579.1 554.2 566.6 566.7C554.1 579.2 533.8 579.2 521.3 566.7L394.7 440C360.3 465.1 317.9 480 272 480C157.1 480 64 386.9 64 272C64 157.1 157.1 64 272 64C386.9 64 480 157.1 480 272zM272 416C351.5 416 416 351.5 416 272C416 192.5 351.5 128 272 128C192.5 128 128 192.5 128 272C128 351.5 192.5 416 272 416z" />
                    </svg>
                </button>
            </li>
            <li class="flex">
                <button
                    class="nav-btn relative inline-flex items-center leading-[1.2] text-[inherit] px-[5px] py-[5px] font-medium cursor-pointer bg-transparent border-none text-[18px]"
                    @click="toggleDark">
                    <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20"
                        fill="currentColor">
                        <path
                            d="M320 32C328.4 32 336.3 36.4 340.6 43.7L396.1 136.3L500.9 110C509.1 108 517.8 110.4 523.7 116.3C529.6 122.2 532 131 530 139.1L503.7 243.8L596.4 299.3C603.6 303.6 608.1 311.5 608.1 319.9C608.1 328.3 603.7 336.2 596.4 340.5L503.7 396.1L530 500.8C532 509 529.6 517.7 523.7 523.6C517.8 529.5 509 532 500.9 530L396.2 503.7L340.7 596.4C336.4 603.6 328.5 608.1 320.1 608.1C311.7 608.1 303.8 603.7 299.5 596.4L243.9 503.7L139.2 530C131 532 122.4 529.6 116.4 523.7C110.4 517.8 108 509 110 500.8L136.2 396.1L43.6 340.6C36.4 336.2 32 328.4 32 320C32 311.6 36.4 303.7 43.7 299.4L136.3 243.9L110 139.1C108 130.9 110.3 122.3 116.3 116.3C122.3 110.3 131 108 139.2 110L243.9 136.2L299.4 43.6L301.2 41C305.7 35.3 312.6 31.9 320 31.9zM320 176C240.5 176 176 240.5 176 320C176 399.5 240.5 464 320 464C399.5 464 464 399.5 464 320C464 240.5 399.5 176 320 176zM320 416C267 416 224 373 224 320C224 267 267 224 320 224C373 224 416 267 416 320C416 373 373 416 320 416z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                        fill="currentColor">
                        <path
                            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                </button>
            </li>
            <li class="flex">
                <NuxtLink
                    class="nav-link relative inline-flex items-center leading-[1.2] no-underline text-[inherit] px-[5px] py-[5px] font-medium"
                    to="/">首页</NuxtLink>
            </li>
            <li class="flex">
                <NuxtLink
                    class="nav-link relative inline-flex items-center leading-[1.2] no-underline text-[inherit] px-[5px] py-[5px] font-medium"
                    to="/archives">归档</NuxtLink>
            </li>
            <li class="flex">
                <NuxtLink
                    class="nav-link relative inline-flex items-center leading-[1.2] no-underline text-[inherit] px-[5px] py-[5px] font-medium"
                    to="/about">关于</NuxtLink>
            </li>
            <li class="flex">
                <NuxtLink
                    class="nav-link relative inline-flex items-center leading-[1.2] no-underline text-[inherit] px-[5px] py-[5px] font-medium"
                    to="/friends">友链</NuxtLink>
            </li>
        </ul>
    </div>
    <Search ref="searchRef" />
</template>

<style scoped>
.nav-btn {
    transition: transform 0.2s ease;
}

.nav-btn:hover {
    transform: scale(1.2);
}

.nav-link {
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: var(--color-accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.5s ease;
}

.nav-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}
</style>
