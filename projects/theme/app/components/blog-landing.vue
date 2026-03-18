<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue"
// import SakanaWidget from 'sakana-widget';
import 'sakana-widget/lib/index.css';
import heroBg from '~/assets/bg1.jpg'
import AuthorCard from '~/components/Theme/Sidebar/author-card.vue'
import Navbar from '~/components/Theme/Sidebar/Navbar.vue'
import Footer from '~/components/Theme/Sidebar/Footer.vue'

const props = defineProps<{
    articles: any[];
    currentPage?: number;
    totalPages?: number;
    totalArticles?: number;
}>();

const page = computed(() => props.currentPage ?? 1);
const totalPageCount = computed(() => props.totalPages ?? 1);

// 生成分页页码数组
const paginationItems = computed(() => {
    const total = totalPageCount.value;
    const current = page.value;
    const items: (number | string)[] = [];

    if (total <= 5) {
        // 总页数较少时，显示所有页码
        for (let i = 1; i <= total; i++) {
            items.push(i);
        }
    } else if (current <= 3) {
        // 当前页在前面：1 2 3 4 5 ... 最后一页
        for (let i = 1; i <= 5; i++) {
            items.push(i);
        }
        items.push('...');
        items.push(total);
    } else if (current >= total - 2) {
        // 当前页在后面：1 ... 最后一页-4 最后一页-3 最后一页-2 最后一页-1 最后一页
        items.push(1);
        items.push('...');
        for (let i = total - 4; i <= total; i++) {
            items.push(i);
        }
    } else {
        // 当前页在中间：1 ... 当前页-2 当前页-1 当前页 当前页+1 当前页+2 ... 最后一页
        items.push(1);
        items.push('...');
        for (let i = current - 2; i <= current + 2; i++) {
            items.push(i);
        }
        items.push('...');
        items.push(total);
    }

    return items;
});


// kecream~
// function initSakanaWidget() {
//     const kecream = SakanaWidget.getCharacter('chisato');
//     if (kecream) {
//         kecream.image = `https://pichost.cloud/files/a585d06168c8553f42b086a6fec51075273913c2092c65b59858e47352b4fc79.avif`;
//         SakanaWidget.registerCharacter('kecream', kecream);
//     }
//     new SakanaWidget({ character: 'kecream' }).mount('#sakana-widget');
// }
// onMounted(async () => {
//     await nextTick();
//     initSakanaWidget();
// });


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
        return typeWriter(subtitleText, subtitleElement.value!, typingSpeed);
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
        class="min-h-screen flex flex-col font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif] leading-[1.6] text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] pt-[70px]">
        <div class="relative h-screen overflow-hidden flex flex-col items-center justify-center text-center">
            <div class="absolute inset-0 bg-center bg-cover" :style="{ backgroundImage: `url(${heroBg})` }"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
            <h1
                class="relative text-white text-[4rem] font-bold tracking-[2px] select-none [text-shadow:2px_2px_10px_rgba(0,0,0,0.5)] animate-fadeIn">
                Pamperのblog</h1>
            <div class="relative text-[#ff9eb0] text-[2rem] tracking-[2px] flex items-center justify-center select-none [text-shadow:2px_2px_10px_rgba(0,0,0,0.5)]"
                ref="subtitleElement"></div>
            <div
                class="absolute bottom-[30px] left-1/2 -translate-x-1/2 text-white text-[1.2rem] flex items-center justify-center select-none animate-bounceX">
                向下滑动浏览内容</div>
        </div>
        <div class="flex flex-col">
            <Navbar />
        </div>
        <div class="max-w-[1200px] mx-auto p-[20px] flex flex-col md:flex-row gap-[30px]">
            <div class="flex-1 flex flex-col gap-[30px]">
                <NuxtLink
                    class="article-card flex flex-col bg-[var(--color-bg-primary)] rounded-[16px] overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.08)] cursor-pointer no-underline text-[inherit]"
                    v-for="(article, index) in articles" :key="index" :to="article.urlPath">
                    <img class="w-full h-[200px] object-cover" :src="article.frontMatter.cover" />
                    <div class="p-[20px] flex flex-col gap-[10px]">
                        <div
                            class="text-[1.4rem] font-bold text-[var(--color-text-primary)] leading-[1.3] flex items-center">
                            {{ article.frontMatter.title }}</div>
                        <div class="text-[var(--color-text-secondary)] leading-[1.5] flex items-center">{{ article.desc
                        }}
                        </div>
                        <div
                            class="flex justify-between text-[0.85rem] text-[var(--color-text-secondary)] border-t border-[var(--color-border)] pt-[15px] gap-[10px]">
                            <span>作者: {{ article.frontMatter.author }}</span>
                            <span>{{ article.frontMatter.date }}</span>
                        </div>
                    </div>
                </NuxtLink>
                <nav class="flex items-center justify-center gap-[8px]" v-if="totalPageCount > 1">
                    <template v-for="(item, index) in paginationItems" :key="index">
                        <!-- 当前页码（高亮） -->
                        <span v-if="item === page"
                            class="w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[#ff9eb0] text-white font-medium cursor-default">
                            {{ item }}
                        </span>
                        <!-- 省略号 -->
                        <span v-else-if="item === '...'"
                            class="w-[36px] h-[36px] flex items-center justify-center text-[#999] cursor-default">
                            {{ item }}
                        </span>
                        <!-- 可点击页码 -->
                        <NuxtLink v-else
                            class="pagination-item w-[36px] h-[36px] flex items-center justify-center rounded-[8px] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-medium shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
                            :to="item === 1 ? '/' : `/page-${item}`">
                            {{ item }}
                        </NuxtLink>
                    </template>
                </nav>
            </div>
            <AuthorCard :totalArticles="totalArticles" />
        </div>
        <Footer />
    </div>
    <div id="sakana-widget" class="fixed right-0 bottom-0 z-[999]"></div>
</template>

<style scoped>
.article-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.pagination-item {
    transition: all 0.2s ease;
}

.pagination-item:hover {
    background-color: var(--color-bg-secondary);
    transform: translateY(-2px);
}

.pagination-item:active {
    transform: translateY(0);
}
</style>
