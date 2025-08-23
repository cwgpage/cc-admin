/** 美化打印实现方法  */
function prettyLog() {
  const isEmpty = (value: any) => {
    return value == null || false || value === ''
  }
  const prettyPrint = (title: string, text: string, color: string) => {
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      'background:transparent',
    )
  }
  // 基础信息打印
  const info = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Info' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, '#909399')
  }

  const error = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, '#F56C6C')
  }

  const success = (textOrTitle: string, content = '') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, '#26df44')
  }

  return {
    info,
    error,
    success,
  }
}

/** 自定义打印 */
export const customLog = prettyLog()

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
