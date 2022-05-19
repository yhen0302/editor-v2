import { moduleState, MutationsMapper } from './index'
import {mapGetters, mapMutations, MutationMethod, Store} from 'vuex'
import {computed, ComputedRef} from 'vue'

export function useState(store: Store<any>, namespace: moduleState) {
  if (namespace === 'global') return store
  return store.state[namespace]
}

export function useMutation<K extends keyof MutationsMapper, T extends MutationsMapper[K]>(store: Store<any>, namespace: K, mutationList: Array<keyof T>): { [key in keyof T]: MutationMethod } {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore8
  const mutations = mapMutations('editor', mutationList)

  for (const key of Object.keys(mutations)) {
    mutations[key] = mutations[key].bind({ $store: store })
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return mutations
}



export function useGetter<K extends keyof MutationsMapper, T extends MutationsMapper[K]>(store: Store<any>, namespace: string, getterList: "GET_CONFIGURATOR"[]): { [key in keyof T]: ComputedRef<any> } {
  const storeGettersFns = mapGetters(namespace,getterList);

  // 对数据进行转换
  // @ts-ignore
  const storeGetter:{ [key in keyof T]: ComputedRef<any>} = {};

  // 使用computed将状态包裹一层再返回
  Object.keys(storeGettersFns).forEach(fnKey => {
    // @ts-ignore
    const fn = storeGettersFns[fnKey].bind({$store: store})
    // @ts-ignore
    storeGetter[fnKey] = computed(fn)
  })

  return storeGetter;
}