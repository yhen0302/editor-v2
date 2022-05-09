import {createStore, Module} from 'vuex'
import actions from '@/store/editor/actions'
import getters from '@/store/editor/getters'
import mutations from '@/store/editor/mutations'

import {dimensionSelectBarType2d, EditorStore, selectBarType} from '@/store/editor/type'

const state: EditorStore = {
  dimensionType: '3d',
  selectBarToolType: null,
  shadow: false,
  // switchItemAfterProcessType
  switchItemAfterProcessType: {
    outline: false,
    bloom: false,
    dof: false,
    gammaCorrection: false,
    ssaa: false,
    ssr: false,
    ssao: false
  },
  artBoardScale: 0.5,
  layerTree2d: [
    {
      name: '矩形1',
      show: true,
      type: 'shape',
      option: ''
    },
  ],
  layerTree3d: [
    {
      name: '元素组1',
      show: true,
      open: false,
      children: [{name: '相机', show: true}]
    },
    {name: '圆锥体', show: true},
    {name: '球', show: true},
    {name: '平面', show: true}
  ],
  screenPageTree: [
    {name: '场景1', open: false, children: [{name: '页面1'}, {name: '页面2'}, {name: '页面3'}]},
    {name: '场景2', open: false, children: [{name: '页面4'}, {name: '页面5'}, {name: '页面6'}]}
  ],
  select2dNodes: []
}

const store: Module<EditorStore, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default store
