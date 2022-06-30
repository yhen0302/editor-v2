import { createStore } from 'vuex'
import { default as mutations2d } from '@/store/2d/mutations'
import { default as getters2d } from '@/store/2d/getters'

export default createStore({
  state: {
    dimensionType: '3d', // 2D/3D
    selectBarToolType: '', // 左边工具栏选择类型
    selectedSceneTreeNode: null, // 右边选中的scene tree node
    selectedPageTreeNode: null, // 右边选中的page tree node
    layerTree2d:[],
    select2dNodes:new Set,
    drawingBoard: {
      // 中间画布宽高
      width: 1920,
      height: 1080,
      scale: 0.65
    },
    template: {
      // 模板缓存
      threeDimension: [],
      twoDimension: []
    },
    threeDimensionContainer: null, // 3d container cache

    //  添加元素变量
    addElementType: null,
    elementIcon: [], // 存储图标数组
    elementText: [] // 存储文本数组
  } as any,
  mutations: { ...mutations2d },
  actions: {},
  getters: { ...getters2d },
  modules: {}
})
