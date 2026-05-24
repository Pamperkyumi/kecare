<script lang="ts" setup>
import Navbar from '~/components/Theme/Sidebar/Navbar.vue'
import { nextTick, ref, watch } from 'vue'
import avatar from '~/assets/zjkjdx.jpg'

useHead({
    title: '励之教育',
})

interface Message {
    role: 'user' | 'assistant'
    content: string
}

const messages = ref<Message[]>([])
const inputText = ref('')
const isThinking = ref(false)
const chatContainer = ref<HTMLElement | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function scrollToBottom() {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
    })
}

async function sendMessage() {
    const text = inputText.value.trim()
    if (!text || isThinking.value) return

    messages.value.push({
        role: 'user',
        content: text,
    })
    inputText.value = ''
    scrollToBottom()

    isThinking.value = true

    try {
        const response = await $fetch<{ reply: string }>('/api/chat', {
            method: 'POST',
            body: { message: text },
        })
        messages.value.push({
            role: 'assistant',
            content: response.reply,
        })
    } catch {
        messages.value.push({
            role: 'assistant',
            content: '抱歉，请求失败，请稍后重试。',
        })
    } finally {
        isThinking.value = false
        scrollToBottom()
    }
}

function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
    }
}

function adjustTextareaHeight() {
    const el = textareaRef.value
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 200) + 'px'
}

watch(inputText, () => {
    nextTick(adjustTextareaHeight)
})
</script>

<template>
    <Navbar />
    <div class="flex flex-col h-screen pt-[36px] bg-[var(--color-bg-secondary)]">

        <div ref="chatContainer" class="flex-1 overflow-y-auto px-4 py-6 space-y-5 scroll-smooth">
            <div v-if="messages.length === 0"
                class="flex flex-col items-center justify-center h-full text-[var(--color-text-secondary)]">
                <div class="text-5xl mb-4">💬</div>
                <p class="text-lg font-medium mb-1">开始对话</p>
                <p class="text-sm">你是家长的身份，对面是招生老师</p>
            </div>

            <template v-for="msg in messages" :key="msg.content">
                <div v-if="msg.role === 'user'" class="flex items-start gap-3 justify-end">
                    <div class="flex flex-col items-end max-w-[75%]">
                        <div
                            class="px-5 py-3 rounded-2xl rounded-tr-md bg-[var(--color-accent)] text-white text-sm leading-relaxed shadow-sm">
                            {{ msg.content }}
                        </div>
                    </div>
                    <div
                        class="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                        U
                    </div>
                </div>

                <div v-else class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full flex-shrink-0 bg-cover bg-center"
                        :style="{ backgroundImage: `url(${avatar})` }">
                    </div>
                    <div class="flex flex-col max-w-[75%]">
                        <div
                            class="px-5 py-3 rounded-2xl rounded-tl-md bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] border border-[var(--color-border)] text-sm leading-relaxed shadow-sm whitespace-pre-wrap">
                            {{ msg.content }}
                        </div>
                    </div>
                </div>
            </template>

            <div v-if="isThinking" class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-purple-400 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                    :style="{ backgroundImage: `url(${avatar})` }">
                    >
                </div>
                <div
                    class="px-5 py-3 rounded-2xl rounded-tl-md bg-[var(--color-bg-primary)] border border-[var(--color-border)] shadow-sm">
                    <div class="flex gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce"
                            style="animation-delay: 0ms"></span>
                        <span class="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce"
                            style="animation-delay: 150ms"></span>
                        <span class="w-2 h-2 rounded-full bg-[var(--color-text-secondary)] animate-bounce"
                            style="animation-delay: 300ms"></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 py-3 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-t border-[var(--color-border)]">
            <div class="max-w-3xl mx-auto flex items-end gap-3">
                <textarea ref="textareaRef" v-model="inputText" @keydown="handleKeydown" :disabled="isThinking"
                    placeholder="输入你的消息... (Shift+Enter 换行)" rows="1"
                    class="flex-1 resize-none px-4 py-3 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] border border-[var(--color-border)] rounded-2xl text-sm leading-relaxed outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors disabled:opacity-50"></textarea>
                <button @click="sendMessage" :disabled="isThinking || !inputText.trim()"
                    class="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path
                            d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                    </svg>
                </button>
            </div>
            <p class="text-center text-[var(--color-text-secondary)] text-xs mt-2">
                我将邀约视为Ai的目标，所以Ai每句话都会拐到邀约上，但是正常聊天中，频繁邀约可能令家长反感。请根据情况仅挑选Ai中与邀约无关的回复。
            </p>
        </div>
    </div>
</template>
