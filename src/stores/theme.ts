import type { IThemeConfig } from '@/types/global.ts'
import { createGlobalState, useLocalStorage } from '@vueuse/core'

/** 全局仓库，用于存储需要全局使用的变量 */
export const useThemeStore = createGlobalState(() => {
  /** 主题配置 */
  const themeConfig = useLocalStorage<IThemeConfig>('THEME_CONFIG', {
    // 导航栏高度
    navbarHeight: '40px',
    // 默认主题色
    primaryColor: '#009688',
  })
  return {
    themeConfig,
  }
})
