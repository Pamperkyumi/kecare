<script lang="ts" setup>

const props = defineProps<{
    totalArticles?: number
}>();

</script>
<template>
    <div class="author-card">
        <div class="avatar">
            <img src="~/assets/avatar.webp" />
        </div>

        <h3 class="author-name">Pamper</h3>
        <p class="author-about">喵喵喵喵喵喵喵！喵喵。</p>

        <div class="author-stats">
            <div class="stat-item">
                <div class="stat-label">文章</div>
                <div class="stat-num">{{ props.totalArticles }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">标签</div>
                <div class="stat-num">1919810</div>
            </div>
        </div>
        <button class="follow" onclick="window.open('https://space.bilibili.com/422742655', '_blank')">灌注喵</button>
        <div class="Music">
            <div> 听会歌吧，这歌挺好听的捏</div>
            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=320 height=65
                src="https://i.y.qq.com/n2/m/outchain/player/index.html?songid=360961445&songtype=0"></iframe>
        </div>
    </div>
</template>

<style scoped>
.author-card {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
    background: transparent;
    backdrop-filter: none;
    border-radius: 16px;
    box-shadow: none;
    text-align: center;
}

.avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 14px;
    border: 3px solid #ff9eb0;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.author-name {
    font-size: 1.25rem;
    margin-bottom: 8px;
    color: #2c3e50;
    user-select: none;
}

.author-about {
    color: #666;
    margin-bottom: 16px;
    font-size: 0.9rem;
    line-height: 1.5;
    user-select: none;
}

.author-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    padding: 14px 0;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.stat-item {
    flex: 1;
}

.stat-num {
    font-weight: bold;
    font-size: 1.15rem;
    color: #ff6b93;
    user-select: none;
}

.stat-label {
    font-size: 0.8rem;
    color: #888;
    user-select: none;
}

.follow {
    width: 100%;
    background: linear-gradient(135deg, #ff9eb0, #ff6b93);
    color: white;
    border: none;
    padding: 10px 0;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.5s ease, box-shadow 0.5s ease;
    user-select: none;
}

.follow:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(255, 107, 147, 0.5);
}
</style>