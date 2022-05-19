import {createStore, Mutation} from 'vuex'
import editor from "@/store/editor";
import {EditorMutationI} from "@/store/editor/mutations";
import {EditorGetterI} from "@/store/editor/getters";

interface GlobalMutationsI {
  booth:string
}

const store = createStore({
  state: {},
  mutations: {},
  actions: {},
})
store.registerModule("editor" as moduleState, editor)

export default store
export type moduleState = keyof MutationsMapper

export interface MutationsMapper{
  editor: EditorMutationI,
  global: GlobalMutationsI,
}

export interface GetterMapper {
  editor:EditorGetterI
}

