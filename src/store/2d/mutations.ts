import { dimensionType, EditorStore, LayerTree2dNode, LayerTree3dNode, selectBarType } from '../type'

import { createNode } from '../../../packages/elements/src/share'

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
  TOGGLE_NODE: 'TOGGLE_NODE'
  ADD_EMITTER_TO_NODE: 'ADD_EMITTER_TO_NODE'
  DELETE_SELECT_NODES: 'DELETE_SELECT_NODES'
  MARSHALLING_SELECT_NODES: 'MARSHALLING_SELECT_NODES'
  // 3d
  ADD_3D_TREE_NODE: 'ADD_3D_TREE_NODE'
}

export const EditorMutation: EditorMutationI = {
  CHANGE_DIMENSION: 'CHANGE_DIMENSION',
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE',
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE',
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE',
  SELECT_2D_TREE_NODE: 'SELECT_2D_TREE_NODE',
  CANCEL_SELECT_2D_NODE: 'CANCEL_SELECT_2D_NODE',
  CLEAR_SELECT_2D_NODES: 'CLEAR_SELECT_2D_NODES',
  TOGGLE_NODE: 'TOGGLE_NODE',
  DELETE_SELECT_NODES: 'DELETE_SELECT_NODES',
  ADD_EMITTER_TO_NODE: 'ADD_EMITTER_TO_NODE',
  MARSHALLING_SELECT_NODES: 'MARSHALLING_SELECT_NODES',
  ADD_3D_TREE_NODE: 'ADD_3D_TREE_NODE'
}

function findFirstSelectNode(tree: Array<any>) {
  const nodes = [...tree]
  let node
  // eslint-disable-next-line no-cond-assign
  while ((node = nodes.shift())) {
    if (node.select) return node
    if (node.children) nodes.unshift(...node.children)
  }
  return null
}
export default {
  [EditorMutation.CHANGE_DIMENSION](state: EditorStore, payload: { dimensionType: dimensionType }) {
    state.dimensionType = payload.dimensionType
  },
  [EditorMutation.CHANGE_SELECT_BAR_TOOL_TYPE](state: EditorStore, payload: { selectBarToolType: selectBarType | null }) {
    if (state.selectBarToolType === payload.selectBarToolType) {
      state.selectBarToolType = null
      return
    }
    state.selectBarToolType = payload.selectBarToolType
  },
  [EditorMutation.CHANGE_ART_BOARD_SCALE](state: EditorStore, payload: { artBoardScale: number }) {
    state.artBoardConfig.artBoardScale = payload.artBoardScale
  },
  [EditorMutation.ADD_2D_TREE_NODE](state: EditorStore, payload: { node: LayerTree2dNode }) {
    state.selectedSceneTreeNode.trees.twoDimension.unshift(payload.node)
  },
  [EditorMutation.SELECT_2D_TREE_NODE](state: EditorStore, payload: { node: LayerTree2dNode }) {
    console.log('select', this)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    payload.node.select = true
    state.select2dNodes.add(payload.node)
  },
  [EditorMutation.CANCEL_SELECT_2D_NODE](state: EditorStore, { node }: { node: LayerTree2dNode }) {
    node.select = false
    if (node.contentEditable) node.contentEditable = false
    state.select2dNodes.delete(node)
  },

  [EditorMutation.CLEAR_SELECT_2D_NODES](state: EditorStore) {
    state.select2dNodes.forEach((node) => {
      node.select = false
      if (node.contentEditable) node.contentEditable = false
    })
    state.select2dNodes.clear()
  },
  [EditorMutation.TOGGLE_NODE](this: any, state: EditorStore, { node }: { node: LayerTree2dNode }) {
    if (!node.select && node.show) {
      this.commit(EditorMutation.SELECT_2D_TREE_NODE, { node })
    } else {
      this.commit(EditorMutation.CANCEL_SELECT_2D_NODE, { node })
    }
  },
  [EditorMutation.ADD_EMITTER_TO_NODE](state: EditorStore, { node, eventType, eventAction, effect }: { node: LayerTree2dNode; eventType: string; eventAction: string; effect: string }) {
    node.option.emitters[eventType + ':' + eventAction] = { effect }
  },
  [EditorMutation.DELETE_SELECT_NODES](state: EditorStore, { nodes }: { nodes: LayerTree2dNode[] }) {
    for (const node of nodes) {
      const parent = node.parent
      const isChildrenTree = !!node.parent.children
      const index = isChildrenTree ? node.parent.children.indexOf(node) : node.parent.indexOf(node)
      index !== -1 && (isChildrenTree ? node.parent.children.splice(index, 1) : node.parent.splice(index, 1))
    }
  },
  [EditorMutation.MARSHALLING_SELECT_NODES](this: any, state: EditorStore, { nodes }: { nodes: LayerTree2dNode[] }) {
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

    const replaceNode = findFirstSelectNode(state.selectedSceneTreeNode.trees.twoDimension)
    console.log('children', replaceNode.parent.children)
    const replaceIndex = replaceNode.parent.children ? replaceNode.parent.children.indexOf(replaceNode) : replaceNode.parent.indexOf(replaceNode)

    // 删除节点
    for (const node of nodes) {
      this.commit(EditorMutation.DELETE_SELECT_NODES, { nodes })
    }
    replaceNode.parent.children ? replaceNode.parent.children.splice(replaceIndex, 0, group) : replaceNode.parent.splice(replaceIndex, 0, group)
    this.commit(EditorMutation.SELECT_2D_TREE_NODE, { node: group })
  },
  // 3d
  [EditorMutation.ADD_3D_TREE_NODE](state: EditorStore, payload: { node: LayerTree3dNode }) {
    state.layerTree3d.push(payload.node)
  }
}
