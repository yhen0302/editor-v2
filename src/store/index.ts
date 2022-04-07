import {createStore} from 'vuex'

import editor from "@/store/editor";

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
})
store.registerModule("editor",editor)


export default store