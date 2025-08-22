<script setup lang="ts">
import LeftMenu from '@/layouts/components/Menu/index.vue'
import Header from '../components/Header/index.vue'

function onBack() {}

function onForward() {}
</script>

<template>
  <div class="default-layout">
    <LeftMenu />
    <div class="layout-right-content">
      <Header />
      <div class="content-wrap">
        <router-view v-slot="{ Component }">
          <vue-page-stack @back="onBack" @forward="onForward">
            <component :is="Component" :key="$route.fullPath" />
          </vue-page-stack>
        </router-view>
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

<style lang="scss">
.default-layout {
  /** navBar高度 */
  --default-header-height: 46px;
}
</style>
