import { createGlobalState, useLocalStorage } from '@vueuse/core'
import { ref } from 'vue'

/** 趣丸潮玩 全局状态 */
export const useQwcwStore = createGlobalState(() => {
  /** 用户列表 */
  const qwcwUserList = ref<{ userId: number, token: string }[]>([
    { userId: 19456, token: 'bc83caa07e9a9bb8edff501e55dfcf9a' },
  ])

  interface IQwcwBoxOption {
    /** 检测的盒子 */
    checkBoxIds: string[]
    261: {
      /** 隐藏的盒子列表 */
      hideBoxList: any[]
      /** 检测过的盒子ID */
      checkedListIds: string[]
      /** 盒子商品列表 */
      // boxGoodsList: any[]
    }
  }

  /** 检测盒子信息 */
  const qwcwBoxOption = useLocalStorage<any>('QWCW_BOX_OPTION', {
    // checkBoxIds: ['268'],
    hideBoxList: [],
    checkedListIds: [],
    // boxGoodsList: [],
  })
  const checkBoxIds = ref(['261'])


  return {
    qwcwBoxOption,
    qwcwUserList,
    checkBoxIds,
  }
})
