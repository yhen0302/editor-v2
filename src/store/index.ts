import { createStore } from 'vuex'

export default createStore({
  state: {
    dimensionType: '3d', // 2D/3D
    selectBarToolType: '', // 左边工具栏选择类型
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
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})
