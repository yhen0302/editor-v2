import { mapGetters, mapMutations, MutationMethod, Store } from 'vuex'
import { computed, ComputedRef } from 'vue'

export type moduleState = keyof MutationsMapper
export interface EditorMutationI {
  // 2d
  CHANGE_DIMENSION: 'CHANGE_DIMENSION'
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE'
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE'
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE'

  // SELECT NODES
  SELECT_2D_TREE_NODE: 'SELECT_2D_TREE_NODE'
  CANCEL_SELECT_2D_NODE: 'CANCEL_SELECT_2D_NODE'
  CLEAR_SELECT_2D_NODES: 'CLEAR_SELECT_2D_NODES'
  // 3d
  ADD_3D_TREE_NODE: 'ADD_3D_TREE_NODE'
}
export interface MutationsMapper {
  editor: EditorMutationI
  global: GlobalMutationsI
}
interface GlobalMutationsI {
  [key: string]: any
}
export interface EditorGetterI {
  // 2d
  GET_CONFIGURATOR: 'GET_CONFIGURATOR'
  GET_SELECT_STATUS: 'GET_SELECT_STATUS'
  GET_SELECT_NODE: 'GET_SELECT_NODE'
}

export interface GetterMapper {
  editor: EditorGetterI
}

export function useState(store: Store<any>, namespace: moduleState) {
  if (namespace === 'global') return store
  return store.state[namespace]
}

export function useMutation<K extends keyof MutationsMapper, T extends MutationsMapper[K]>(store: Store<any>, namespace: K, mutationList: Array<keyof T>): { [key in keyof T]: MutationMethod } {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const mutations = namespace && namespace !== 'global' ? mapMutations(namespace, mutationList) : mapMutations(mutationList)

  for (const key of Object.keys(mutations)) {
    mutations[key] = mutations[key].bind({ $store: store })
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return mutations
}

export function useGetter<K extends keyof GetterMapper, T extends GetterMapper[K]>(store: Store<any>, namespace: string, getterList: Array<keyof T>): { [key in keyof T]: ComputedRef<any> } {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const storeGettersFns = namespace && namespace !== 'global' ? mapGetters(namespace, getterList) : mapGetters(getterList)

  // const storeGettersFns = mapGetters(namespace, getterList)

  // 对数据进行转换
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const storeGetter: { [key in keyof T]: ComputedRef<any> } = {}

  // 使用computed将状态包裹一层再返回
  Object.keys(storeGettersFns).forEach((fnKey) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fn = storeGettersFns[fnKey].bind({ $store: store })
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    storeGetter[fnKey] = computed(fn)
  })

  return storeGetter
}
