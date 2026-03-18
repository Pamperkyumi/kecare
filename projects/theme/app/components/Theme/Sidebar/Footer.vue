<script lang="ts" setup>
const currentYear = new Date().getFullYear()

const footercontent = [
    { name: '首页', path: '/' },
    { name: '归档', path: '/archives' },
    { name: '关于', path: '/about' },
    { name: '友链', path: '/friends' },
]

</script>

<template>
    <footer class="footer">
        <div class="footer-line"></div>
        <div class="footer-bottom">
            <p>&copy;2020-{{ currentYear }} Pamper. All rights reserved.</p>
            <p>Powered by <a href="https://kecare.kecream.cn" target="_blank" rel="noopener noreferrer">Kecare</a></p>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    width: 100%;
    background: var(--color-bg-primary);
    margin-top: auto;
}

.footer-line {
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--color-accent, #ff9eb0), transparent);
}

.footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px;
    text-align: center;
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
}

.footer-bottom p {
    color: var(--color-text-secondary);
    font-size: 0.85rem;
    margin: 0;
}

.footer-bottom a {
    color: var(--color-accent, #ff9eb0);
    text-decoration: none;
    transition: opacity 0.2s ease;
}

.footer-bottom a:hover {
    opacity: 0.8;
}
</style>
