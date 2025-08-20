<script setup lang="ts">
import LeftMenu from '@/layouts/components/Menu/index.vue'
import Header from '../components/Header/index.vue'
</script>

<template>
  <div class="default-layout">
    <LeftMenu />
    <div class="layout-right-content">
      <Header />
      <div>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.default-layout {
  @apply flex h-screen;
}
.layout-right-content {
  @apply flex-1;
}
</style>
