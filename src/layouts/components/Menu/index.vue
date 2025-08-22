<script setup lang="ts">
import type { IMenu } from '@/types/global.ts'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DEFAULT_TITLE } from '@/config/common.ts'
import menu from '@/json/menu.json'
import SubMenu from '@/layouts/components/SubMenu/index.vue'

const route = useRoute()

// 菜单列表
const menuList: IMenu[] = menu.data
// 子菜单列表
const subMenuList = ref<IMenu[]>([])
subMenuList.value = menuList[0].children

/** 激活的一级菜单的path */
const activeTopMenu = ref('/home')

// 菜单点击事件
function menuClick(item: IMenu) {
  activeTopMenu.value = item.path
  subMenuList.value = item.children
}

// 选择的菜单列表
const selectMenuList = ref<string[]>([])

watch(() => route.path, () => {
  const pathList = route.path.split('/').filter(Boolean)
  activeTopMenu.value = `/${pathList[0]}`
  /** 获取二级菜单列表 */
  subMenuList.value = menuList.find(item => item.path === activeTopMenu.value)?.children || []
})

/** 页面创建时调用 */
function pageCreated() {
  /** 获取默认选中的菜单 */
  selectMenuList.value = [route.path]
}

pageCreated()
</script>

<template>
  <div class="menu-wrapper">
    <div class="left-menu-wrapper">
      <div class="left-logo">
        <img src="" class="h-30px w-30px" alt="">
      </div>
      <div class="left-menu-list">
        <div
          v-for="item in menuList" :key="item.id" class="left-menu-item"
          :class="{ 'left-menu-item__active': activeTopMenu === item.path }" @click="menuClick(item)"
        >
          <i class="iconfont" :class="item.icon" />
          <div class="leading-14px">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="right-menu-wrapper">
      <div class="right-title">{{ DEFAULT_TITLE }}</div>
      <a-menu v-model:selected-keys="selectMenuList" class="right-menu" mode="inline">
        <SubMenu v-for="menuItem in subMenuList" :key="menuItem.path" :menu="menuItem" />
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
    @apply h-[var(--default-header-height)] center;
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
    @apply h-[var(--default-header-height)] center text-(18px) border-r;
  }

  .right-menu {
    @apply flex-1;
  }

  :deep(.ant-menu-item) {
    @apply important-pl-18px pr-10px;
  }

  :deep(.ant-menu-submenu-title) {
    @apply important-pl-10px;
  }
}
</style>
