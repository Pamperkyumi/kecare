<script lang="ts" setup>
import type { ArticlesRecord } from "kecare";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue"
import SakanaWidget from 'sakana-widget';
import 'sakana-widget/lib/index.css';
import heroBg from '~/assets/bg1.jpg'
import AuthorCard from '~/components/Theme/Sidebar/author-card.vue'
import Navbar from '~/components/Theme/Sidebar/Navbar.vue'

const props = defineProps<{
    articles: ArticlesRecord;
    currentPage?: number;
    totalPages?: number;
    totalArticles?: number;
}>();

const page = computed(() => props.currentPage ?? 1);
const totalPageCount = computed(() => props.totalPages ?? 1);

type ArticleCard = {
    id: string;
    title: string;
    desc: string;
    date?: string;
    author?: string;
    to: string;
    lang: string;
    cover?: string;
};

const articleCards = computed<ArticleCard[]>(() => {
    const records = props.articles ?? [];
    // 处理数组格式的文章数据
    if (Array.isArray(records)) {
        return records.map((article: any) => ({
            id: article.hash ?? article.id ?? "",
            title: article.title ?? "",
            desc: article.desc ?? "",
            date: article.date,
            author: article.author,
            to: article.urlPath ?? "#",
            lang: article.lang ?? "",
            cover: article.cover,
        }));
    }
    return [];
});

// kecream~
function initSakanaWidget() {
    const kecream = SakanaWidget.getCharacter('chisato');
    if (kecream) {
        kecream.image = `https://pichost.cloud/files/a585d06168c8553f42b086a6fec51075273913c2092c65b59858e47352b4fc79.avif`;
        SakanaWidget.registerCharacter('kecream', kecream);
    }
    new SakanaWidget({ character: 'kecream' }).mount('#sakana-widget');
}
onMounted(async () => {
    await nextTick();
    initSakanaWidget();
});


const typingTimer = ref<number | null>(null);

// subtitle文字
const subtitleText = "病弱系小猫女仆,可爱喵,喜欢喵,結婚喵.";
const subtitleElement = ref<HTMLElement | null>(null);
const typingSpeed = 100;

function typeWriter(text: string, element: HTMLElement, speed: number): () => void {
    let i = 0;
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);

    function type() {
        if (i < text.length) {
            const charNode = document.createTextNode(text.charAt(i));
            element.insertBefore(charNode, cursor);
            i++;
            typingTimer.value = window.setTimeout(type, speed);
        } else {
            cursor.remove();
        }
    }

    type();

    return () => {
        if (typingTimer.value) {
            clearTimeout(typingTimer.value);
            typingTimer.value = null;
        }
    };
}


onMounted(() => {
    if (subtitleElement.value) {
        setTimeout(() => {
            return typeWriter(subtitleText, subtitleElement.value!, typingSpeed);
        }, 500);
    }
})

onUnmounted(() => {
    if (typingTimer.value) {
        clearTimeout(typingTimer.value);
        typingTimer.value = null;
    }
})

</script>

<template>
    <div id="app"
        class="min-h-screen flex flex-col font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] leading-[1.6] text-[#333] bg-[#f9f9f9] pt-[70px]">
        <div class="relative h-screen overflow-hidden flex flex-col items-center justify-center text-center">
            <div class="absolute inset-0 bg-center bg-cover" :style="{ backgroundImage: `url(${heroBg})` }"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
            <h1
                class="relative z-10 text-white text-[4rem] font-bold tracking-[2px] select-none [text-shadow:2px_2px_10px_rgba(0,0,0,0.5)] animate-[fadeIn_2s_ease-in-out]">
                Pamperのblog</h1>
            <div class="relative z-10 text-[#ff9eb0] text-[2rem] tracking-[2px] flex items-center justify-center select-none [text-shadow:2px_2px_10px_rgba(0,0,0,0.5)]"
                ref="subtitleElement"></div>
            <div
                class="absolute z-10 bottom-[30px] left-1/2 -translate-x-1/2 text-white text-[1.2rem] flex items-center justify-center select-none animate-[bounceX_2s_infinite]">
                向下滑动浏览内容</div>
        </div>
        <div class="flex flex-col">
            <Navbar />
        </div>
        <div class="max-w-[1200px] mx-auto p-[20px] flex flex-col md:flex-row gap-[30px]">
            <div class="flex-1 flex flex-col gap-[30px]">
                <NuxtLink
                    class="flex flex-col bg-white rounded-[16px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-transform duration-300 ease cursor-pointer no-underline text-[inherit] hover:-translate-y-[5px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
                    v-for="(article, index) in articleCards" :key="index" :to="article.to">
                    <img class="w-full h-[200px] object-cover" :src="article.cover" />
                    <div class="p-[20px] flex flex-col gap-[10px]">
                        <div class="text-[1.4rem] font-bold text-[#2c3e50] leading-[1.3] flex items-center">{{
                            article.title }}</div>
                        <div class="text-[#666] leading-[1.5] flex items-center">{{ article.desc }}</div>
                        <div
                            class="flex justify-between text-[0.85rem] text-[#888] border-t border-[#eee] pt-[15px] gap-[10px]">
                            <span>作者: {{ article.author }}</span>
                            <span>{{ article.date }}</span>
                        </div>
                    </div>
                </NuxtLink>
                <nav class="flex items-center justify-center gap-[14px]" v-if="totalPageCount > 1">
                    <NuxtLink
                        class="text-black flex items-center justify-center transition-transform duration-200 hover:-translate-y-[3px] active:translate-y-[1px]"
                        v-if="page > 1" :to="page === 2 ? '/' : `/page-${page - 1}`">上一页</NuxtLink>
                    <span class="text-black flex items-center justify-center">第 {{ page }} / {{ totalPageCount }}
                        页</span>
                    <NuxtLink
                        class="text-black flex items-center justify-center transition-transform duration-200 hover:-translate-y-[3px] active:translate-y-[1px]"
                        v-if="page < totalPageCount" :to="`/page-${page + 1}`">下一页</NuxtLink>
                </nav>
            </div>
            <AuthorCard :totalArticles="totalArticles" />
        </div>
    </div>
    <div id="sakana-widget" class="fixed right-0 bottom-0 z-[999]"></div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounceX {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0) translateX(-50%);
    }

    40% {
        transform: translateY(-20px) translateX(-50%);
    }

    60% {
        transform: translateY(-10px) translateX(-50%);
    }
}
</style>
