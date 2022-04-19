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
  layerTree3d: []
}

const store: Module<EditorStore, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default store