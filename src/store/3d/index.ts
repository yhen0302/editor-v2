import { LayerTreeNode3D } from '..'
import mutations3d from './mutations'
import getters3d from './getters'
// store3D
export interface Store3DI {
  namespaced: boolean
  state: State3DI
  mutations: any
  actions: any
  getters: any
}

// state
export interface State3DI {
  threeDimensionContainer: any // 3d container cache
  selectedLayerNodes: Set<LayerTreeNode3D> // 3D LayerTree选中
  editedFormType: string | null // 正在编辑的表单类型
  leftNavTitle: string // 左侧导航栏标题
  leftNavPageIndex: number // 左侧导航栏页码
  leftNavDetailsType: string // 左侧导航2（多）级菜单类型
}

// actions
export interface Actions3DI {
  TEST_ACTIONS: 'TEST_ACTIONS'
}
export const Actions3D = {
  TEST_ACTIONS: 'TEST_ACTIONS'
}

// 3d module
export const store3D: Store3DI = {
  namespaced: true,
  state: {
    threeDimensionContainer: null,
    selectedLayerNodes: new Set(),
    editedFormType: null,
    leftNavPageIndex: 0,
    leftNavTitle: '',
    leftNavDetailsType: ''
  },
  mutations: { ...mutations3d },
  actions: {},
  getters: { ...getters3d }
}
