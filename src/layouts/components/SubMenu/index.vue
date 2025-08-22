<script setup lang="ts">
import type { IMenu } from '@/types/global.ts'
import { useRouter } from 'vue-router'
import SubMenu from '@/layouts/components/SubMenu/index.vue'

const props = defineProps<{
  menu: IMenu
}>()

const router = useRouter()

// 菜单点击
function menuClick(menuItem: IMenu) {
  if (menuItem.link) {
    window.open(menuItem.link)
    return
  }
  router.push(menuItem.path)
}
</script>

<template>
  <a-sub-menu v-if="menu.children.length" :key="menu.path">
    <template #title>
      <div class="flex items-center gap-5px">
        <i class="iconfont !text-18px" :class="menu.icon" />
        <span>{{ menu.name }}</span>
      </div>
    </template>
    <SubMenu v-for="sunMenu in menu.children" :key="sunMenu.path" :menu="sunMenu" />
  </a-sub-menu>
  <a-menu-item v-else :key="menu.path" @click="menuClick(menu)">
    <div class="flex items-center gap-5px">
      <i class="iconfont !text-18px" :class="menu.icon" />
      <span>{{ menu.name }}</span>
    </div>
  </a-menu-item>
</template>

<style scoped lang="scss"></style>
