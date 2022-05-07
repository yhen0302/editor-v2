import {dimensionType, EditorStore, LayerTree2dNode, selectBarType} from '@/store/editor/type'

export interface EditorMutationI {
  CHANGE_DIMENSION: 'CHANGE_DIMENSION'
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE'
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE'
  // 2d three
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE'
}

export const EditorMutation: EditorMutationI = {
  CHANGE_DIMENSION: 'CHANGE_DIMENSION',
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE',
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE',
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE'
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
    state.artBoardScale = payload.artBoardScale
  },
  [EditorMutation.ADD_2D_TREE_NODE](state: EditorStore, payload: { node: LayerTree2dNode }) {
  }
}
