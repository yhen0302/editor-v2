import { createStore } from 'vuex'

export default createStore({
  state: {
    dimensionType: '3d',
    selectBarToolType: '',
    drawingBoard: {
      width: 1920,
      height: 1080,
      scale: 0.65
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})
