import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import axios from 'axios'

const axiosRequest: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10e3,
  withCredentials: false,
  // 超时提示消息
  timeoutErrorMessage: '访问超时，请稍候再试！',
})

axiosRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = 'token'
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

axiosRequest.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { status, code } = response.data

    // 成功
    if ([status, +code].includes(200)) {
      return response.data.data
    }

    // 登录失效
    if ([status, code].includes(401)) {
      // 登录失效数理逻辑
      return
    }

    // 获取错误消息
    const errMessage = response.data.message
    // 错误提示吐司
    if (![status, code].includes(403)) {
      message.error(errMessage)
    }

    return Promise.reject(response.data)
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default {
  // post请求
  post(url: string, data: any = {}, config = {}): Promise<[any, any]> {
    return new Promise((resolve) => {
      axiosRequest
        .post(url, data, config)
        .then((res) => {
          resolve([null, res])
        })
        .catch((err) => {
          resolve([err, null])
        })
    })
  },
  get(url: string, params = {}, config: any = {}): Promise<[any, any]> {
    return new Promise((resolve) => {
      axiosRequest
        .get(url, { params, ...config })
        .then((res) => {
          resolve([null, res])
        })
        .catch((err) => {
          resolve([err, null])
        })
    })
  },
}
