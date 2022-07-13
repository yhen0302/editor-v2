import store from '@/store'
import { useMutation, useGetter } from '@/store/helper'
import { EditorGetter } from '@/store/2d/getters'
import { EditorMutation } from '@/store/2d/mutations'
import { hotKeyMap, SpecialKeySign } from '@/core/2d/features/keyboard'

const getters = useGetter(store, 'global', [EditorGetter.GET_SELECT_NODE])
const mutations = useMutation(store, 'global', [EditorMutation.DELETE_SELECT_NODES, EditorMutation.MARSHALLING_SELECT_NODES])

// eslint-disable-next-line @typescript-eslint/ban-types
export function keyboardHandle(hotKeyMap: hotKeyMap[keyof hotKeyMap]) {
  hotKeyMap.effect()
}
// 点击删除建
export function deleteNodeHandle() {
  const selectNodes = getters[EditorGetter.GET_SELECT_NODE].value
  if (!selectNodes) return
  mutations[EditorMutation.DELETE_SELECT_NODES]({ nodes: Array.isArray(selectNodes) ? selectNodes : [selectNodes] })
}

// 编组
export function marshalling2dNodesHandle() {
  const selectNodes = getters[EditorGetter.GET_SELECT_NODE].value
  if (!selectNodes) return
  mutations[EditorMutation.MARSHALLING_SELECT_NODES]({ nodes: Array.isArray(selectNodes) ? selectNodes : [selectNodes] })
}
