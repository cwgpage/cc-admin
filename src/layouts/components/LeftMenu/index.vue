<script setup lang="ts">
import menu from '@/json/menu.json'

// 菜单列表
const menuList = menu.menu
</script>

<template>
  <div class="left-menu-list">
    <div v-for="item in menuList" :key="item.id" class="left-menu-item"></div>
  </div>
</template>

<style scoped lang="scss"></style>
