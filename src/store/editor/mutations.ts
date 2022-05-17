import {
  dimensionType,
  EditorStore,
  LayerTree2dNode,
  LayerTree3dNode,
  selectBarType
} from '@/store/editor/type'

export interface EditorMutationI {
  // 2d
  CHANGE_DIMENSION: 'CHANGE_DIMENSION'
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE'
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE'
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE'
  SELECT_2D_TREE_NODE: 'SELECT_2D_TREE_NODE'
  CLEAR_SELECT_2D_NODES: 'CLEAR_SELECT_2D_NODES'
  // 3d
  ADD_3D_TREE_NODE: 'ADD_3D_TREE_NODE'
}

export const EditorMutation: EditorMutationI = {
  CHANGE_DIMENSION: 'CHANGE_DIMENSION',
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE',
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE',
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE',
  SELECT_2D_TREE_NODE: 'SELECT_2D_TREE_NODE',
  CLEAR_SELECT_2D_NODES: 'CLEAR_SELECT_2D_NODES',
  ADD_3D_TREE_NODE: 'ADD_3D_TREE_NODE'
}
export default {
  [EditorMutation.CHANGE_DIMENSION](
    state: EditorStore,
    payload: { dimensionType: dimensionType }
  ) {
    state.dimensionType = payload.dimensionType
  },
  [EditorMutation.CHANGE_SELECT_BAR_TOOL_TYPE](
    state: EditorStore,
    payload: { selectBarToolType: selectBarType | null }
  ) {
    if (state.selectBarToolType === payload.selectBarToolType) {
      state.selectBarToolType = null
      return
    }
    state.selectBarToolType = payload.selectBarToolType
  },
  [EditorMutation.CHANGE_ART_BOARD_SCALE](
    state: EditorStore,
    payload: { artBoardScale: number }
  ) {
    state.artBoardConfig.artBoardScale = payload.artBoardScale
  },
  [EditorMutation.ADD_2D_TREE_NODE](
    state: EditorStore,
    payload: { node: LayerTree2dNode }
  ) {
    state.layerTree2d.push(payload.node)
  },
  [EditorMutation.SELECT_2D_TREE_NODE](
    state: EditorStore,
    payload: { node: LayerTree2dNode }
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    payload.node.select = true
    state.select2dNodes.push(payload.node)
  },

  [EditorMutation.CLEAR_SELECT_2D_NODES](state: EditorStore) {
    console.log(state)
    while (state.select2dNodes.length > 0) {
      const node = state.select2dNodes.pop()
      if(node){
        console.log('set select',node.select)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        node.select = false
      }
    }

  },
  // 3d
  [EditorMutation.ADD_3D_TREE_NODE](
    state: EditorStore,
    payload: { node: LayerTree3dNode }
  ) {
    state.layerTree3d.push(payload.node)
  }
}
