import { useQwcwStore } from '@/stores/box/qwcw'
import f from '@/utils/fetchRequest'

/** 接口地址 */
const qwcwUrl = '/qwcw'

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
  const { qwcwUserList } = useQwcwStore()
  const h = {
    ...defaultHeaders,
    token: qwcwUserList.value[0].token,
    random: 'rMJBcB',
  }
  return f.get(`${qwcwUrl}/mart/api/boxSeries/findAppBoxSeries`, params, { headers: h })
}
