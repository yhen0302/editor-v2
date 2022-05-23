import { createStore, Module } from 'vuex'
import actions from '@/store/editor/actions'
import getters from '@/store/editor/getters'
import mutations from '@/store/editor/mutations'

import {
  dimensionSelectBarType2d,
  EditorStore,
  LayerTree2dNode,
  selectBarType
} from '@/store/editor/type'
import { reactive } from '@vue/reactivity'
import { RectShapeProps } from '@/views/editor/twoDimension/elements/shape/RectShapeProps'
import { VNode } from '@vue/runtime-core'
import { h, markRaw } from 'vue'
import RectShape from '@/views/editor/twoDimension/elements/shape/RectShape.vue'

const props = reactive(<RectShapeProps>{
  matrixOption: { left: 10, top: 10, width: 100, height: 50, angle: 0 },
  transparency: 1,
  transparencyColor: { color: '#FF0000', transparency: 1 }
})
const state: EditorStore = {
  dimensionType: '2d',
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
  artBoardConfig: {
    height: 1080,
    width: 1920,
    artBoardScale: 0.5
  },
  layerTree2d: [],
  layerTree3d: [],
  screenPageTree: [
    {
      name: '场景1',
      open: false,
      children: [{ name: '页面1' }, { name: '页面2' }, { name: '页面3' }]
    },
    {
      name: '场景2',
      open: false,
      children: [{ name: '页面4' }, { name: '页面5' }, { name: '页面6' }]
    }
  ],
  select2dNodes: new Set()
}

const store: Module<EditorStore, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default store
