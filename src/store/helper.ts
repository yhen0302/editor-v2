import { moduleState, MutationsMapper } from './index'
import { mapMutations, MutationMethod, Store } from 'vuex'

export function useState(store: Store<any>, namespace: moduleState) {
  if (namespace === 'global') return store
  return store.state[namespace]
}

export function useMutation<K extends keyof MutationsMapper, T extends MutationsMapper[K]>(store: Store<any>, namespace: K, mutationList: Array<keyof T>): { [key in keyof T]: MutationMethod } {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const mutations = mapMutations('editor', mutationList)

  for (const key of Object.keys(mutations)) {
    mutations[key] = mutations[key].bind({ $store: store })
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return mutations
}
