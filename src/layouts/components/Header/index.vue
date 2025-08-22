<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/stores/theme.ts'

const { themeConfig } = useThemeStore()

/** 样式 */
const styleConfig = ref({
  height: themeConfig.value.navbarHeight,
})
</script>

<template>
  <div class="header-wrap">
    <div>
      <a-button type="text">
        <i class="icon-shuaxin iconfont" />
      </a-button>
    </div>
    <div>right</div>
  </div>
</template>

<style lang="scss" scoped>
.header-wrap {
  @apply flex h-[var(--default-header-height)] items-center justify-between px-8px border-b box-border;
}
</style>
