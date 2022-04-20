import {createStore, Module} from "vuex";
import actions from "@/store/editor/actions";
import getters from "@/store/editor/getters";
import mutations from "@/store/editor/mutations";

import {dimensionSelectBarType2d, EditorStore, selectBarType} from "@/store/editor/type";


const state: EditorStore = {
  dimensionType: "2d",
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
    ssao: false,
  },
  artBoardScale: .5,
  layerTree2d: [
    {name: "矩形1", show: true, type: 'shape', subType: 'base'},
    {name: "矩形2", show: false, type: 'shape', subType: 'base'},
    {
      name: "编组1", show: true, type: 'group', children: [
        {name: "矩形3", show: false, type: 'shape', subType: 'base'},
        {
          name: "编组2",
          show: true,
          type: 'group',
          children: [{name: "矩形4", show: false, type: 'shape', subType: 'base'},]
        }]
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
    {name: '平面', show: true},
  ],
  screenPageTree: [
    {name: '场景1', open: false, children: [{name: '页面1'},{name: '页面2'},{name: '页面3'}]},
    {name:'场景2',children:[]}]
}

const store: Module<EditorStore, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default store