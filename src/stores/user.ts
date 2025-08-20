import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

/** 全局仓库，用于存储需要全局使用的变量 */
export const useUserStore = createGlobalState(() => {
  const userList = ref<{ userId: number, token: string }[]>([
    { userId: 19456, token: '364141877988a4eebbd7a55280169663' },
  ])

  return {
    userList,
  }
})
