// 菜单类型
export interface IMenu {
  id: number
  path: string
  name: string
  link: string
  icon: string
  children: IMenu[]
}
