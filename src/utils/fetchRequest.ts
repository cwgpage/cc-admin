import { objToUrl } from '@/utils/utils.ts'

const defaultHeaders = {
  'Content-Type': 'application/json',
}

export default {
  post(url: string, data: any = {}, config = {}): Promise<[any, any]> {
    const options = {
      method: 'POST',
      headers: { ...defaultHeaders },
      body: JSON.stringify(data),
      ...config,
    }

    return new Promise((resolve) => {
      fetch(url, options)
        .then(response => response.json())
        .then((res) => {
          resolve([null, res])
        })
        .catch((err) => {
          resolve([err, null])
        })
    })
  },
  get(url: string, params: any = {}, config: any = {}): Promise<[any, any]> {
    const options = {
      method: 'GET',
      headers: { ...defaultHeaders },
      ...config,
    }
    const allUrl = `${url}?${objToUrl(params)}`
    return new Promise((resolve) => {
      fetch(allUrl, options).then((res) => {
        resolve([null, res])
      }).catch((err) => {
        resolve([err, null])
      })
    })
  },
}
