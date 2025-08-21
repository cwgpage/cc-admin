<script setup lang="ts">
import LeftMenu from '@/layouts/components/Menu/index.vue'
import Header from '../components/Header/index.vue'
</script>

<template>
  <div class="default-layout">
    <LeftMenu />
    <div class="layout-right-content">
      <Header />
      <div class="content-wrap">
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
  @apply flex-1 flex flex-col;
}

.content-wrap {
  @apply flex-1 w-full box-border overflow-y-scroll;
}
</style>
