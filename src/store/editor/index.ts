import {createStore, Module} from "vuex";
import actions from "@/store/editor/actions";
import getters from "@/store/editor/getters";
import mutations from "@/store/editor/mutations";

import {dimensionSelectBarType2d, EditorStore, selectBarType} from "@/store/editor/type";


const state: EditorStore = {
  dimensionType: "2d",
  selectBarToolType: null
}

const store: Module<EditorStore, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default store