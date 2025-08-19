<script setup lang="ts">
import { ref } from 'vue'
import menu from '@/json/menu.json'
import SubMenu from '../components/SubMenu/index.vue'

// 菜单列表
const menuList: IMenu[] = menu.data
// 子菜单列表
const subMenuList = ref<IMenu[]>([])
subMenuList.value = menuList[0].children

/** 激活的一级菜单的path */
const activeTopMenu = ref('/overview')

// 菜单点击事件
function menuClick(item: IMenu) {
  activeTopMenu.value = item.path
  subMenuList.value = item.children
}

// 选择的菜单列表
const selectMenuList = ref([])
// 打开菜单列表
const openMenu = ref([])
// 子菜单点击事件
function subMenuClick(menu: any) {
  console.log('⚽ => ', menu)
}
</script>

<template>
  <div class="menu-wrapper">
    <div class="left-menu-wrapper">
      <div class="left-logo">
        <img src="" class="h-30px w-30px" alt="">
      </div>
      <div class="left-menu-list">
        <div v-for="item in menuList" :key="item.id" class="left-menu-item" :class="{ 'left-menu-item__active': activeTopMenu === item.path }" @click="menuClick(item)">
          <i class="iconfont" :class="item.icon" />
          <div class="leading-14px">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="right-menu-wrapper">
      <div class="right-title">CC Admin Antd</div>
      <!--              :open-keys="openMenu"
        :items="subMenuList"
        @open-change="subMenuClick" -->
      <a-menu v-model:selected-keys="selectMenuList" class="right-menu" mode="inline">
        <SubMenu v-for="menu in subMenuList" :key="menu.path" :menu="menu" />
      </a-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-wrapper {
  @apply flex;
}

.left-menu-wrapper {
  @apply overflow-hidden border-r h-full;
  .left-logo {
    @apply h-49px center;
  }
  .left-menu-list {
    @apply w-70px overflow-y-scroll h-[calc(100%-45px)] pt-10px relative;
    &::-webkit-scrollbar {
      display: none;
    }

    .left-menu-item {
      @apply transition-all mx-8px flex flex-col items-center mb-14px text-(14px #333) h-54px center gap-6px cursor-pointer;

      i {
        @apply text-22px leading-22px transition-all;
      }
      &:hover {
        @apply bg-#E3E6E7 rounded-4px text-(#2D69DE);

        i {
          @apply text-24px;
        }
      }
    }

    .left-menu-item__active {
      @apply important-bg-#2D69DE important-text-(#fff) rounded-4px;
    }
  }
}

.right-menu-wrapper {
  @apply h-full w-160px flex flex-col;
  .right-title {
    @apply h-46px center text-(18px) border-r;
  }

  .right-menu {
    @apply flex-1;
  }
}

// 隐藏滚动条
.left-menu-list::-webkit-scrollbar {
  @apply w-0;
}
</style>
