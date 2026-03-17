<script lang="ts" setup>
const navbar = ref<HTMLElement | null>(null)
const searchRef = ref<{ open: () => void } | null>(null)

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
        class="fixed top-0 left-0 w-full bg-white/95 shadow-[0_2px_15px_rgba(0,0,0,0.1)] text-[16px] leading-normal flex items-center justify-between px-[20px] md:px-[5%] py-[15px] z-[1000] transition-transform duration-[400ms]">
        <div class="text-[1.5rem] font-bold text-[#ff6b93]">Pamper</div>
        <ul
            class="flex list-none m-0 p-0 flex-wrap justify-end items-center gap-[5px] md:gap-[10px] max-w-full box-border">
            <li class="flex">
                <button
                    class="relative inline-flex items-center leading-[1.2] text-[inherit] px-[5px] py-[5px] font-medium cursor-pointer bg-transparent border-none text-[18px] hover:scale-110 transition-transform"
                    @click="openSearch">
                    🔍
                </button>
            </li>
            <li class="flex">
                <NuxtLink
                    class="relative inline-flex items-center leading-[1.2] no-underline text-[inherit] px-[5px] py-[5px] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#ff6b93] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-left"
                    to="/">首页</NuxtLink>
            </li>
            <li class="flex">
                <NuxtLink
                    class="relative inline-flex items-center leading-[1.2] no-underline text-[inherit] px-[5px] py-[5px] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#ff6b93] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-left"
                    to="/archives">归档</NuxtLink>
            </li>
            <li class="flex">
                <NuxtLink
                    class="relative inline-flex items-center leading-[1.2] no-underline text-[inherit] px-[5px] py-[5px] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#ff6b93] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-left"
                    to="#">关于</NuxtLink>
            </li>
            <li class="flex">
                <NuxtLink
                    class="relative inline-flex items-center leading-[1.2] no-underline text-[inherit] px-[5px] py-[5px] font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-[#ff6b93] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-left"
                    to="#">友链</NuxtLink>
            </li>
        </ul>
    </div>
    <Search ref="searchRef" />
</template>
