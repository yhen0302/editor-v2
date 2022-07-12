import { dimensionType, EditorStore, LayerTree2dNode, LayerTree3dNode, selectBarType } from '../type'

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

  DELETE_SELECT_NODE: 'DELETE_SELECT_NODE'
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
  DELETE_SELECT_NODE: 'DELETE_SELECT_NODE',
  ADD_EMITTER_TO_NODE: 'ADD_EMITTER_TO_NODE',
  ADD_3D_TREE_NODE: 'ADD_3D_TREE_NODE'
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
    state.selectedSceneTreeNode.trees.twoDimension.push(payload.node)
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
  [EditorMutation.DELETE_SELECT_NODE](state: EditorStore, { nodes }: { nodes: LayerTree2dNode[] }) {
    console.log('delete',nodes)
    for (const node of nodes) {
      const index = node.parent.indexOf(node)
      index !== -1 && node.parent.splice(index, 1)
    }
  },
  // 3d
  [EditorMutation.ADD_3D_TREE_NODE](state: EditorStore, payload: { node: LayerTree3dNode }) {
    state.layerTree3d.push(payload.node)
  }
}
