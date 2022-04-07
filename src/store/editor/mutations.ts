import {dimensionType, EditorStore} from "@/store/editor/type";


export const EditorMutation = {
  CHANGE_DIMENSION:"CHANGE_DIMENSION"
}


export default {
  [EditorMutation.CHANGE_DIMENSION](state: EditorStore, payload: { dimensionType: dimensionType }) {
    state.dimensionType = payload.dimensionType
  },

}