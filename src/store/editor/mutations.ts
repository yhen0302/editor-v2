import { dimensionType, EditorStore, selectBarType } from '@/store/editor/type'

export interface EditorMutationI {
  CHANGE_DIMENSION: 'CHANGE_DIMENSION'
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE'
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE'
}

export const EditorMutation: EditorMutationI = {
  CHANGE_DIMENSION: 'CHANGE_DIMENSION',
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE',
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE'
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
  }
}
