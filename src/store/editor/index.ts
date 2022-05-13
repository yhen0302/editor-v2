import { createStore, Module } from 'vuex'
import actions from '@/store/editor/actions'
import getters from '@/store/editor/getters'
import mutations from '@/store/editor/mutations'

import { dimensionSelectBarType2d, EditorStore, LayerTree2dNode, selectBarType } from '@/store/editor/type'
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
const instance: VNode = markRaw(h(RectShape, { ...props }))
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
  artBoardConfig: {
    height: 500,
    width: 500,
    artBoardScale: 0.5
  },
  layerTree2d: [
    /*   {
            name: '矩形1',
            show: true,
            type: 'shape',
            detail: {componentInstance: instance, options: props}
        }*/
  ],
  layerTree3d: [
    // {
    //   name: '元素组1',
    //   show: true,
    //   open: false,
    //   children: [{name: '相机', show: true}]
    // },
    // {name: '圆锥体', show: true},
    // {name: '球', show: true},
    // {name: '平面', show: true}
  ],
  screenPageTree: [
    { name: '场景1', open: false, children: [{ name: '页面1' }, { name: '页面2' }, { name: '页面3' }] },
    { name: '场景2', open: false, children: [{ name: '页面4' }, { name: '页面5' }, { name: '页面6' }] }
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
