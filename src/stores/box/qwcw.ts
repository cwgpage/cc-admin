import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

/** 趣丸潮玩 全局状态 */
export const useQwcwStore = createGlobalState(() => {
  /** 检测盒子信息 */
  const qwcwFileInfo = useLocalStorage('QWCW', {
    /** 有隐藏的盒子列表，包含已经买走的 */
    hideBoxList: [],
    /** 检测过的盒子ID */
    checkedListIds: [],
  })

  /** 用户列表 */
  const qwcwUserList = ref<{ userId: number, token: string }[]>([
    { userId: 19456, token: 'bc83caa07e9a9bb8edff501e55dfcf9a' },
  ])

  return {
    qwcwFileInfo,
    qwcwUserList,
  }
})
