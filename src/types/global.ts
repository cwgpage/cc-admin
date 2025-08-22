/** 菜单类型 */
export interface IMenu {
  id: number
  path: string
  name: string
  link: string
  icon: string
  children: IMenu[]
}

/** 主题配置 */
export interface IThemeConfig {
  /** 导航栏高度 默认40px */
  navbarHeight: string
  /** 默认主题色 */
  primaryColor: string
}
