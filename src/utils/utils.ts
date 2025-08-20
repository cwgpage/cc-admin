/**
 * 获取url中的参数
 * @param key 参数名
 */
export function getUrlParams(key: string) {
  const params = new URLSearchParams(window.location.href.split('?')[1])
  return params.get(key) || ''
}

/**
 * 对象转url
 * @param params
 */
export function objToUrl(params: any) {
  const search = new URLSearchParams(Object.entries(params))
  return search.toString()
}
