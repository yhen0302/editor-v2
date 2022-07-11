import store from '@/store'
import { useMutation, useGetter } from '@/store/helper'
import { EditorGetter } from '@/store/2d/getters'
import { EditorMutation } from '@/store/2d/mutations'

// eslint-disable-next-line @typescript-eslint/ban-types
export function keyboardHandle(keyCode: number) {
  switch (keyCode) {
    case 46:
      deleteKeyHandle()
  }
}
export function deleteKeyHandle() {
  const getters = useGetter(store, 'global', [EditorGetter.GET_SELECT_NODE])
  const mutations = useMutation(store, 'global', [EditorMutation.DELETE_SELECT_NODE])
  const selectNodes = getters[EditorGetter.GET_SELECT_NODE].value
  if (!selectNodes) return
  mutations[EditorMutation.DELETE_SELECT_NODE]({ nodes: Array.isArray(selectNodes) ? selectNodes : [selectNodes] })
}
