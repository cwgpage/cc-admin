<script setup lang="ts">
import LeftMenu from '@/layouts/components/LeftMenu/index.vue'
</script>

<template>
  <div class="default-layout">
    <LeftMenu />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  @apply flex h-screen;
}
</style>
