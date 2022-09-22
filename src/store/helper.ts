import { mapState as baseMapState, mapActions as baseMapActions, mapGetters, mapMutations, MutationMethod, Store, ActionMethod } from 'vuex'
import { computed, ComputedRef } from 'vue'

import { Actions2DI, State2DI } from './2d'
import { Actions3DI, State3DI } from './3d'
import { ActionsGlobalI, GettersGlobalI, MutationGlobalI, StateGlobalI } from './index'
import { Getters2DI } from './2d/getters'
import { Mutation2DI } from './2d/mutations'
import { Mutation3DI } from './3d/mutations'
import { Getters3DI } from './3d/getters'

export interface MutationsMapper {
  global: MutationGlobalI
  '2d': Mutation2DI
  '3d': Mutation3DI
}

// mapState hooks
export type StateMapper = {
  global: StateGlobalI
  '2d': State2DI
  '3d': State3DI
}
export function mapState<K extends keyof StateMapper, T extends keyof StateMapper[K], M extends { [k in keyof StateMapper[K]]: ComputedRef<any> }>(store: Store<any>, namespace: K, keys: T[]): M {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const storeStateFns = namespace && namespace !== 'global' ? baseMapState(namespace, keys) : baseMapState(keys)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const storeState = {}
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store })

    storeState[fnKey] = computed(fn)
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return storeState
}

export function useState<K extends keyof StateMapper, M extends StateMapper[K]>(store: Store<any>, namespace: K): M {
  if (namespace === 'global') return store.state
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

export interface GetterMapper {
  global: GettersGlobalI
  '2d': Getters2DI
  '3d': Getters3DI
}

export function useGetter<K extends keyof GetterMapper, T extends keyof GetterMapper[K]>(store: Store<any>, namespace: K, getterList: T[]): { [key in T]: any } {
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return storeGetter
}

// mapAction hooks
type ActionsMapper = {
  global: ActionsGlobalI
  '2d': Actions2DI
  '3d': Actions3DI
}
export function mapActions<T extends keyof ActionsMapper>(store: Store<any>, namespace: keyof ActionsMapper, keys: T[]): { [k in T]: ActionMethod } {
  const actionsFn = namespace && namespace !== 'global' ? baseMapActions(namespace, keys) : baseMapActions(keys)

  for (const key of Object.keys(actionsFn)) {
    actionsFn[key] = actionsFn[key].bind({ $store: store })
  }
  return actionsFn
}
