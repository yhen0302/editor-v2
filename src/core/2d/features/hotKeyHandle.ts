import store from '@/store'
import { useMutation, useGetter } from '@/store/helper'
import { EditorGetter } from '@/store/2d/getters'
import { EditorMutation } from '@/store/2d/mutations'
import { hotKeyMap, SpecialKeySign } from '@/core/2d/features/keyboard'

const getters = useGetter(store, 'global', [EditorGetter.GET_SELECT_NODE])
const mutations = useMutation(store, 'global', [
  EditorMutation.DELETE_SELECT_NODES,
  EditorMutation.MARSHALLING_SELECT_NODES,
  EditorMutation.CANCEL_MARSHALLING_SELECT_NODES,
  EditorMutation.MOVE_UP_OF_NODES,
  EditorMutation.MOVE_DOWNWARD_OF_NODES,
  EditorMutation.MOVE_TO_TOP_OF_NODES,
  EditorMutation.MOVE_TO_BOTTOM_OF_NODES
])

// eslint-disable-next-line @typescript-eslint/ban-types
export function keyboardHandle(hotKeyMap: hotKeyMap[keyof hotKeyMap]) {
  hotKeyMap.effect()
}
function multiNodeHandle(mutation: keyof typeof EditorMutation) {
  const selectNodes = getters[EditorGetter.GET_SELECT_NODE].value
  if (!selectNodes) return
  mutations[EditorMutation[mutation]]({
    nodes: Array.isArray(selectNodes) ? selectNodes : [selectNodes]
  })
}
// 点击删除建
export function deleteNodeHandle() {
  multiNodeHandle(EditorMutation.DELETE_SELECT_NODES)
}

// 编组
export function marshalling2dNodesHandle() {
  multiNodeHandle(EditorMutation.MARSHALLING_SELECT_NODES)
}

// 取消编组
export function cancelMarshalling2dNodesHandle() {
  multiNodeHandle(EditorMutation.CANCEL_MARSHALLING_SELECT_NODES)
}

// 图层向上向下移动一层
export function layerMoveUp() {
  multiNodeHandle(EditorMutation.MOVE_UP_OF_NODES)
}
export function layerMoveDownward() {
  multiNodeHandle(EditorMutation.MOVE_DOWNWARD_OF_NODES)
}

// 图层移动到最上(下)一层
export function layerMoveToTopHandle() {
  multiNodeHandle(EditorMutation.MOVE_TO_TOP_OF_NODES)
}

export function layerMoveToBottomHandle() {
  multiNodeHandle(EditorMutation.MOVE_TO_BOTTOM_OF_NODES)
}
