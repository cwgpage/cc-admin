import f from '@/server/fetchRequest'
import { useQwcwStore } from '@/stores/box/qwcw'

/** 接口地址 */
const qwcwUrl = '/qwcw'

const defaultHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.62(0x18003e31) NetType/WIFI Language/zh_CN',
}

function getHeaders() {
  const { qwcwUserList } = useQwcwStore()
  return {
    token: qwcwUserList.value[0].token,
    random: 'rMJBcB',
  }
}

function getUserId() {
  const { qwcwUserList } = useQwcwStore()
  return qwcwUserList.value[0].userId
}

export interface IFindAppBoxSeries {
  currentPage: number
  pageSize: number
  goodType: string
}

/** 查找所有盒子列表 */
export function findAppBoxSeries(params: IFindAppBoxSeries) {
  const h = {
    ...defaultHeaders,
    ...getHeaders(),
  }
  const data = { ...params, userId: getUserId() }
  return f.get(`${qwcwUrl}/mart/api/boxSeries/findAppBoxSeries`, data, { headers: h })
}

export interface IFindAppDetaildsBySeriesId {
  seriesId: number
}

/** 查找当前系列盒子的款式 */
export function findAppDetaildsBySeriesId(params: IFindAppDetaildsBySeriesId) {
  const h = {
    ...defaultHeaders,
    ...getHeaders(),
  }
  const data = { ...params, userId: getUserId() }
  return f.get(`${qwcwUrl}/mart/api/boxSeries/findAppDetaildsBySeriesId`, data, { headers: h })
}

export interface IFindAllDetails {
  page: number
  seriesId: number
}

/** 获取系列盒子下的某个商品盒子 */
export function findAllDetails(params: IFindAllDetails) {
  const h = {
    ...defaultHeaders,
    ...getHeaders(),
  }

  const data = { ...params, userId: getUserId() }
  return f.get(`${qwcwUrl}/mart/api/boxSeries/findAllDetails`, data, { headers: h })
}
