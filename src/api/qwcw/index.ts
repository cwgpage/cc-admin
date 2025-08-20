import { useUserStore } from '@/stores/user'
import f from '@/utils/fetchRequest'

/** 接口地址 */
const qwcwUrl = 'https://mart.hzhxyqchy.com'

const defaultHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.62(0x18003e31) NetType/WIFI Language/zh_CN',
}

export interface IFindAppBoxSeries {
  currentPage: number
  pageSize: number
  goodType: string
  userId: number
}

/** 查找所有盒子列表 */
export function findAppBoxSeries(params: IFindAppBoxSeries) {
  const { userList } = useUserStore()
  const h = {
    ...defaultHeaders,
    token: userList.value[0].token,
  }
  return f.get(`${qwcwUrl}/mart/api/boxSeries/findAppBoxSeries`, params, { headers: h })
}
