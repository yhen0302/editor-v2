import store from '@/store'
import { useMutation, useGetter } from '@/store/helper'
import { Getters2D } from '@/store/2d/getters'
import { hotKeyMap, SpecialKeySign } from '@/core/2d/features/keyboard'
import { Mutation2D, Mutation2DI } from '@/store/2d/mutations'

const getters = useGetter(store, '2d', [Getters2D.GET_SELECT_NODE])
const mutations2D = useMutation(store, '2d', [
  Mutation2D.DELETE_SELECT_NODES,
  Mutation2D.MARSHALLING_SELECT_NODES,
  Mutation2D.CANCEL_MARSHALLING_SELECT_NODES,
  Mutation2D.MOVE_UP_OF_NODES,
  Mutation2D.MOVE_DOWNWARD_OF_NODES,
  Mutation2D.MOVE_TO_TOP_OF_NODES,
  Mutation2D.MOVE_TO_BOTTOM_OF_NODES,
  Mutation2D.COPY_NODE_2D,
  Mutation2D.PASTE_NODE_2D,
  Mutation2D.TOGGLE_LOCK
])

// eslint-disable-next-line @typescript-eslint/ban-types
export function keyboardHandle(hotKeyMap: hotKeyMap[keyof hotKeyMap]) {
  hotKeyMap.effect()
}
function multiNodeHandle(mutation: keyof Mutation2DI) {
  const selectNodes = getters[Getters2D.GET_SELECT_NODE].value
  if (!selectNodes) return
  mutations2D[Mutation2D[mutation]]({
    nodes: Array.isArray(selectNodes) ? selectNodes : [selectNodes]
  })
}
// 点击删除建
export function deleteNodeHandle() {
  multiNodeHandle(Mutation2D.DELETE_SELECT_NODES)
}

// 编组
export function marshalling2dNodesHandle() {
  multiNodeHandle(Mutation2D.MARSHALLING_SELECT_NODES)
}

// 取消编组
export function cancelMarshalling2dNodesHandle() {
  multiNodeHandle(Mutation2D.CANCEL_MARSHALLING_SELECT_NODES)
}

// 图层向上向下移动一层
export function layerMoveUp() {
  multiNodeHandle(Mutation2D.MOVE_UP_OF_NODES)
}
export function layerMoveDownward() {
  multiNodeHandle(Mutation2D.MOVE_DOWNWARD_OF_NODES)
}

// 图层移动到最上(下)一层
export function layerMoveToTopHandle() {
  multiNodeHandle(Mutation2D.MOVE_TO_TOP_OF_NODES)
}

export function layerMoveToBottomHandle() {
  multiNodeHandle(Mutation2D.MOVE_TO_BOTTOM_OF_NODES)
}

// 复制粘贴
export function copyNodeHandle() {
  mutations2D[Mutation2D.COPY_NODE_2D]()
}
export function pasteNodeHandle() {
  mutations2D[Mutation2D.PASTE_NODE_2D]()
}

// 锁
export function toggleLock() {
  // console.log(getters[Getters2D.GET_SELECT_NODE].value)
  mutations2D[Mutation2D.TOGGLE_LOCK]({ node: getters[Getters2D.GET_SELECT_NODE].value })
}
