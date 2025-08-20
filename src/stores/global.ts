import { createGlobalState } from '@vueuse/core'

/** 全局仓库，用于存储需要全局使用的变量 */
export const useGlobalStore = createGlobalState(() => {
  return {}
})
