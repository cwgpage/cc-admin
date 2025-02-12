<script setup lang="ts">
import menu from '@/json/menu.json'
import { ref } from 'vue'

// 菜单列表
const menuList = menu.menu
console.log('⚽ => menuList', menuList)

const activeMenu = ref(1)

// 菜单点击事件
function menuClick(item) {
  activeMenu.value = item.id
}
</script>

<template>
  <div class="menu-wrapper">
    <div class="left-menu-wrapper">
      <div class="left-logo">
        <img src="" class="h-30px w-30px" alt="">
      </div>
      <div class="left-menu-list">
        <div v-for="item in menuList" :key="item.id" class="left-menu-item" :class="{ 'left-menu-item__active': activeMenu === item.id }" @click="menuClick(item)">
          <i class="iconfont" :class="item.icon" />
          <div class="leading-14px">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-wrapper {
}

.left-menu-wrapper {
  @apply overflow-hidden border-r h-full;
}
.left-logo {
  @apply h-49px center;
}
.left-menu-list {
  @apply w-70px overflow-y-scroll h-[calc(100%-45px)] pt-10px;
  .left-menu-item {
    @apply transition-all mx-8px flex flex-col items-center mb-14px text-(14px #333) h-54px center gap-6px cursor-pointer;

    &:hover {
      @apply bg-#E3E6E7 rounded-4px text-(#2D69DE);
    }

    i {
      @apply text-22px leading-22px;
    }
  }

  .left-menu-item__active {
    @apply important-bg-#2D69DE important-text-(#fff) rounded-4px;
  }
}
</style>
