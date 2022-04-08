import {dimensionType, EditorStore, selectBarType} from "@/store/editor/type";


export const EditorMutation = {
  CHANGE_DIMENSION: "CHANGE_DIMENSION",
  CHANGE_SELECT_BAR_TOOL_TYPE: "CHANGE_SELECT_BAR_TOOL_TYPE"
}


export default {
  [EditorMutation.CHANGE_DIMENSION](state: EditorStore, payload: { dimensionType: dimensionType }) {
    state.dimensionType = payload.dimensionType
  },
  [EditorMutation.CHANGE_SELECT_BAR_TOOL_TYPE](state: EditorStore, payload: { selectBarToolType: selectBarType | null }) {
    state.selectBarToolType = payload.selectBarToolType
  },
}