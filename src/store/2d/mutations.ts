import { State2DI } from '.'
import { createNode } from '../../../packages/elements/src/share'
import { Getters2D } from '@/store/2d/getters'
import { clone } from '@/share/util/base'
import { deleteTreeParentQuote } from '@/core/2d/util/tree'
import store, { LayerTreeNode2D } from '..'
import { useState } from '../helper'

export interface Mutation2DI {
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE'
  // SELECT NODES
  SELECT_2D_TREE_NODE: 'SELECT_2D_TREE_NODE'
  CANCEL_SELECT_2D_NODE: 'CANCEL_SELECT_2D_NODE'
  CLEAR_SELECT_2D_NODES: 'CLEAR_SELECT_2D_NODES'
  TOGGLE_NODE: 'TOGGLE_NODE'
  ADD_EMITTER_TO_NODE: 'ADD_EMITTER_TO_NODE'
  DELETE_SELECT_NODES: 'DELETE_SELECT_NODES'
  MARSHALLING_SELECT_NODES: 'MARSHALLING_SELECT_NODES'
  CANCEL_MARSHALLING_SELECT_NODES: 'CANCEL_MARSHALLING_SELECT_NODES'
  MOVE_UP_OF_NODES: 'MOVE_UP_OF_NODES'
  MOVE_DOWNWARD_OF_NODES: 'MOVE_DOWNWARD_OF_NODES'
  MOVE_TO_TOP_OF_NODES: 'MOVE_TO_TOP_OF_NODES'
  MOVE_TO_BOTTOM_OF_NODES: 'MOVE_TO_BOTTOM_OF_NODES'
  // copy
  COPY_NODE_2D: 'COPY_NODE_2D'
  PASTE_NODE_2D: 'PASTE_NODE_2D'
  //Lock
  TOGGLE_LOCK: 'TOGGLE_LOCK'
}

export const Mutation2D: Mutation2DI = {
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE',
  SELECT_2D_TREE_NODE: 'SELECT_2D_TREE_NODE',
  CANCEL_SELECT_2D_NODE: 'CANCEL_SELECT_2D_NODE',
  CLEAR_SELECT_2D_NODES: 'CLEAR_SELECT_2D_NODES',
  TOGGLE_NODE: 'TOGGLE_NODE',
  DELETE_SELECT_NODES: 'DELETE_SELECT_NODES',
  ADD_EMITTER_TO_NODE: 'ADD_EMITTER_TO_NODE',
  MARSHALLING_SELECT_NODES: 'MARSHALLING_SELECT_NODES',
  CANCEL_MARSHALLING_SELECT_NODES: 'CANCEL_MARSHALLING_SELECT_NODES',
  MOVE_UP_OF_NODES: 'MOVE_UP_OF_NODES',
  MOVE_DOWNWARD_OF_NODES: 'MOVE_DOWNWARD_OF_NODES',
  MOVE_TO_TOP_OF_NODES: 'MOVE_TO_TOP_OF_NODES',
  MOVE_TO_BOTTOM_OF_NODES: 'MOVE_TO_BOTTOM_OF_NODES',
  // copy
  COPY_NODE_2D: 'COPY_NODE_2D',
  PASTE_NODE_2D: 'PASTE_NODE_2D',
  // lock
  TOGGLE_LOCK: 'TOGGLE_LOCK'
}

function findFirstSelectNode(tree: LayerTreeNode2D[] = [], reverse = false) {
  const out = reverse ? Array.prototype.pop : Array.prototype.shift
  const enter = reverse ? Array.prototype.push : Array.prototype.unshift

  const nodes = [...tree]
  let node
  // eslint-disable-next-line no-cond-assign
  while ((node = out.call(nodes))) {
    if (node.select) return node
    if (node.children) enter.apply(nodes, node.children)
  }
  return null
}
function negativeIndex(index: number, length) {
  return ~(length - 1 - index)
}

export default {
  [Mutation2D.ADD_2D_TREE_NODE](state: State2DI, payload: { node: LayerTreeNode2D }) {
    const stateGlobal = useState(store, 'global')
    stateGlobal.selectedPageTreeNode?.trees.twoDimension.unshift(payload.node)
  },
  [Mutation2D.SELECT_2D_TREE_NODE](state: State2DI, payload: { node: LayerTreeNode2D }) {
    if (payload.node.type === 'group') {
      const children = [...payload.node.children!]
      let node: any
      // 如果选中的时group类型的话, 遍历所有的子元素为select
      // eslint-disable-next-line no-cond-assign
      while ((node = children.shift())) {
        node.select = true
        if (node.children) children.unshift(...node.children!)
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    payload.node.select = true
    state.select2dNodes.add(payload.node)
  },
  [Mutation2D.CANCEL_SELECT_2D_NODE](state: State2DI, { node }: { node: LayerTreeNode2D }) {
    if (node.type === 'group') {
      const children = [...node.children!]
      let child: any
      // 如果选中的时group类型的话, 遍历所有的子元素为select
      // eslint-disable-next-line no-cond-assign
      while ((child = children.shift())) {
        child.select = false
        if (child.children) children.unshift(...child.children!)
      }
    }
    node.select = false
    if (node.contentEditable) node.contentEditable = false
    state.select2dNodes.delete(node)
  },

  [Mutation2D.CLEAR_SELECT_2D_NODES](this: any, state: State2DI) {
    state.select2dNodes.forEach((node) => {
      this.commit('2d/' + Mutation2D.CANCEL_SELECT_2D_NODE, { node })
      if (node.contentEditable) node.contentEditable = false
    })
    state.select2dNodes.clear()
  },
  [Mutation2D.TOGGLE_NODE](this: any, state: State2DI, { node }: { node: LayerTreeNode2D }) {
    if (!node.select && node.show) {
      this.commit('2d/' + Mutation2D.SELECT_2D_TREE_NODE, { node })
    } else {
      this.commit('2d/' + Mutation2D.CANCEL_SELECT_2D_NODE, { node })
    }
  },
  [Mutation2D.ADD_EMITTER_TO_NODE](state: State2DI, { node, eventType, eventAction, effect }: { node: LayerTreeNode2D; eventType: string; eventAction: string; effect: string }) {
    node.option.emitters[eventType + ':' + eventAction] = { effect }
  },
  [Mutation2D.DELETE_SELECT_NODES](state: State2DI, { nodes }: { nodes: LayerTreeNode2D[] }) {
    for (const node of nodes) {
      const parent = node.parent
      const isChildrenTree = !!node.parent.children
      const index = isChildrenTree ? node.parent.children.indexOf(node) : node.parent.indexOf(node)
      index !== -1 && (isChildrenTree ? node.parent.children.splice(index, 1) : node.parent.splice(index, 1))

      state.select2dNodes.delete(node)
    }
  },
  [Mutation2D.MARSHALLING_SELECT_NODES](this: any, state: State2DI, { nodes }: { nodes: LayerTreeNode2D[] }) {
    // 1.获取当前的二维tree, 获取当前选中的节点 #
    // 2.创建一个group 节点,并移除原来的节点,将所有的节点放入
    //   (1) 计算
    // 3.将创建的group节点放入到最上方的元素中
    // state
    const group = createNode({
      name: '编组',
      type: 'group',
      select: false,
      children: [...nodes]
    })

    const stateGlobal = useState(store, 'global')
    const replaceNode = findFirstSelectNode(stateGlobal.selectedPageTreeNode?.trees.twoDimension)
    const replaceIndex = replaceNode.parent.children ? replaceNode.parent.children.indexOf(replaceNode) : replaceNode.parent.indexOf(replaceNode)

    // 删除节点
    for (const node of nodes) {
      this.commit('2d/' + Mutation2D.DELETE_SELECT_NODES, { nodes })
    }
    replaceNode.parent.children ? replaceNode.parent.children.splice(replaceIndex, 0, group) : replaceNode.parent.splice(replaceIndex, 0, group)
    this.commit('2d/' + Mutation2D.SELECT_2D_TREE_NODE, { node: group })
  },
  [Mutation2D.CANCEL_MARSHALLING_SELECT_NODES](this: any, state: State2DI, { nodes }: { nodes: LayerTreeNode2D[] }) {
    // 取消分组只对组元素有效,并将组进行depth排序
    //@ts-ignore
    const groups = nodes.filter((item) => item.type === 'group').sort((a, b) => b.depth - a.depth)
    for (const group of groups) {
      const children = [...group.children!]
      const parent = group.parent
      const insertIndex: number = parent.indexOf ? parent.indexOf(group) : parent.children.indexOf(group)
      parent.splice ? parent.splice(insertIndex, 1, ...children) : parent.children.splice(insertIndex, 1, ...children)
      // 取消编组后将原来所有在组中的元素添加到selectSet中
      for (const child of children) state.select2dNodes.add(child)
    }
  },
  [Mutation2D.MOVE_UP_OF_NODES](this: any, state: State2DI, { nodes }: { nodes: LayerTreeNode2D[] }) {
    const stateGlobal = useState(store, 'global')
    const firstNode = findFirstSelectNode(stateGlobal.selectedPageTreeNode?.trees.twoDimension)
    let firstNodeParent = firstNode.parent
    let spliceIndex
    // 如果父元素是一个组
    if (firstNodeParent.type === 'group' && firstNodeParent.children[0] === firstNode) {
      spliceIndex = (firstNodeParent.parent.indexOf ? firstNodeParent.parent.indexOf(firstNodeParent) : firstNodeParent.parent.children.indexOf(firstNodeParent)) + 1
      firstNodeParent = firstNodeParent.parent
      // 将元素出组
    } else {
      spliceIndex = Array.prototype.indexOf.call(firstNodeParent.children || firstNodeParent, firstNode)
    }
    this.commit('2d/' + Mutation2D.DELETE_SELECT_NODES, { nodes })

    for (const node of nodes) state.select2dNodes.add(node)
    spliceIndex = spliceIndex - 1 < 0 ? 0 : spliceIndex - 1

    Array.prototype.splice.call(firstNodeParent.children || firstNodeParent, spliceIndex, 0, ...nodes)
  },
  [Mutation2D.MOVE_DOWNWARD_OF_NODES](this: any, state: State2DI, { nodes }: { nodes: LayerTreeNode2D[] }) {
    const stateGlobal = useState(store, 'global')
    const firstNode = findFirstSelectNode(stateGlobal.selectedPageTreeNode?.trees.twoDimension, true)
    let firstNodeParent = firstNode.parent
    let spliceIndex
    // 如果父元素是一个组
    if (firstNodeParent.type === 'group' && firstNodeParent.children[firstNodeParent.children.length - 1] === firstNode) {
      // 将元素出组
      spliceIndex = Array.prototype.indexOf.call(firstNodeParent.parent.children || firstNodeParent.parent, firstNodeParent) - 1
      firstNodeParent = firstNodeParent.parent
    } else {
      spliceIndex = Array.prototype.indexOf.call(firstNodeParent.children || firstNodeParent, firstNode)
    }
    spliceIndex += 2
    const len = (firstNodeParent.children || firstNodeParent).length // 记录一下之前的length
    spliceIndex = negativeIndex(spliceIndex, len)
    this.commit('2d/' + Mutation2D.DELETE_SELECT_NODES, { nodes })
    Array.prototype.splice.call(firstNodeParent.children || firstNodeParent, spliceIndex >= 0 ? (firstNodeParent.children || firstNodeParent).length : spliceIndex, 0, ...nodes)
    for (const node of nodes) state.select2dNodes.add(node)
  },
  [Mutation2D.MOVE_TO_TOP_OF_NODES](this: any, state: State2DI, { nodes }: { nodes: LayerTreeNode2D[] }) {
    const stateGlobal = useState(store, 'global')
    const firstNode = findFirstSelectNode(stateGlobal.selectedPageTreeNode?.trees.twoDimension)
    let parent = firstNode.parent
    let parentChildren = parent.children || parent
    let inSameGroup = false,
      isNodesFirstBeginContinuous = true,
      isFirstInGroupTop = parentChildren[0] === firstNode
    if (nodes.length <= parentChildren.length) {
      const nodesSet = new Set([...nodes])
      // 验证是否再同一个数组
      for (const node of parentChildren) {
        if (nodesSet.has(node)) {
          nodesSet.delete(node)
        } else {
          isNodesFirstBeginContinuous = false
        }
        if (!nodesSet.size) {
          inSameGroup = true
          break
        }
      }
    }
    isNodesFirstBeginContinuous = isNodesFirstBeginContinuous && inSameGroup

    if (inSameGroup) {
      if (isNodesFirstBeginContinuous && isFirstInGroupTop) {
        parent = parent.parent || parent
        parentChildren = parent.children || parent
      }
    } else {
      while (parent.parent) {
        parent = parent.parent
      }
      parentChildren = parent
    }
    // delete
    this.commit('2d/' + Mutation2D.DELETE_SELECT_NODES, { nodes })
    // do
    parentChildren.splice(0, 0, ...nodes)
    // select
    for (const node of nodes) state.select2dNodes.add(node)
  },
  [Mutation2D.MOVE_TO_BOTTOM_OF_NODES](this: any, state: State2DI, { nodes }: { nodes: LayerTreeNode2D[] }) {
    const stateGlobal = useState(store, 'global')
    const firstNode = findFirstSelectNode(stateGlobal.selectedPageTreeNode?.trees.twoDimension, true)
    let parent = firstNode.parent
    let parentChildren = parent.children || parent
    let inSameGroup = false,
      isNodesFirstBeginContinuous = true,
      isLastInGroupTop = parentChildren[parentChildren.length - 1] === firstNode
    if (nodes.length <= parentChildren.length) {
      const nodesSet = new Set([...nodes])
      // 验证是否再同一个数组
      for (const node of [...parentChildren].reverse()) {
        if (nodesSet.has(node)) {
          nodesSet.delete(node)
        } else {
          isNodesFirstBeginContinuous = false
        }
        if (!nodesSet.size) {
          inSameGroup = true
          break
        }
      }
    }
    isNodesFirstBeginContinuous = isNodesFirstBeginContinuous && inSameGroup

    if (inSameGroup) {
      if (isNodesFirstBeginContinuous && isLastInGroupTop) {
        parent = parent.parent || parent
        parentChildren = parent.children || parent
      }
    } else {
      while (parent.parent) {
        parent = parent.parent
      }
      parentChildren = parent
    }
    // delete
    this.commit('2d/' + Mutation2D.DELETE_SELECT_NODES, { nodes })
    // do
    parentChildren.splice(parentChildren.length, 0, ...nodes)
    // select
    for (const node of nodes) state.select2dNodes.add(node)
  },
  [Mutation2D.COPY_NODE_2D](this: any, state) {
    if (!this.getters[Getters2D.GET_SELECT_NODE]) return
    const nodes = Array.isArray(this.getters[Getters2D.GET_SELECT_NODE]) ? this.getters[Getters2D.GET_SELECT_NODE] : [this.getters[Getters2D.GET_SELECT_NODE]]

    state.clipboard.unshift(clone(deleteTreeParentQuote(nodes)))
  },
  [Mutation2D.PASTE_NODE_2D](this: any, state) {
    if (state.clipboard.length === 0) return
    state.clipboard[0].forEach((item) => {
      console.log(item)
      // item.option.matrixOption.left += 10
      // item.option.matrixOption.top += 10
      const node = createNode({
        ...item,
        name: item.name + '副本'
      })
      this.commit('2d/' + Mutation2D.ADD_2D_TREE_NODE, { node })
    })
  },
  [Mutation2D.TOGGLE_LOCK](this: any, state, { node }) {
    // pass
    node.lock = !node.lock
    this.commit('2d/' + Mutation2D.CANCEL_SELECT_2D_NODE, { node })
  }
}
