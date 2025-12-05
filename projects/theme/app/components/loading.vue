<script lang="ts" setup>
const loading = ref(false)

const show = () => {
  loading.value = true
}


const hide = () => {
  loading.value = false
}

defineExpose({
  show,
  hide
})

</script>

<template>

     <div v-if="loading" class="global-loading">
    <div class="loading-content">
      <img src="~/assets/taichi.png" alt="加载中..." class="loading-gif" />
      <p class="loading-text">正在加载...</p>
    </div>
  </div>

</template>

<style scoped>

</style>