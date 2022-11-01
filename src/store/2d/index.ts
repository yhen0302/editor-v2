import { default as mutations2d } from '@/store/2d/mutations'
import { default as getters2d } from '@/store/2d/getters'

export interface State2DI {
  addDragging: boolean
  select2dNodes: Set<any>,
  clipboard:Array<any>
}

export interface Actions2DI {
  TEST_ACTIONS: 'TEST_ACTIONS'
}

// 2d module
export const store2D = {
  namespaced: true,
  state: {
    addDragging: false, // 当前是否是处于添加二维元素状态
    select2dNodes: new Set(),
    // ******** 剪贴板 start ********
    clipboard: []
    // ******** 剪贴板 end ********
  },
  mutations: { ...mutations2d },
  actions: {},
  getters: { ...getters2d }
}
