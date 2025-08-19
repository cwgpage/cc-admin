<script setup lang="ts">
const props = defineProps<{
  menu: IMenu
}>()
</script>

<template>
  <a-sub-menu v-if="menu.children.length" :key="menu.path">
    <template #title>
      <div>{{ menu.name }}</div>
    </template>
    <SubMenu v-for="sunMenu in menu.children" :key="sunMenu.path" :menu="sunMenu" />
  </a-sub-menu>
  <a-menu-item v-else :key="menu.path">
    <span>{{ menu.name }}</span>
  </a-menu-item>
</template>

<style scoped>

</style>
