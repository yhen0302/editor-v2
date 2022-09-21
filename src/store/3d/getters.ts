import { State3DI } from '.'

// getters
export interface Getters3DI {
  SELECTED_LAYER_NODE: 'SELECTED_LAYER_NODE' // 当前选中节点 （单选）
}
export const Getters3D = {
  SELECTED_LAYER_NODE: 'SELECTED_LAYER_NODE'
}

export default {
  [Getters3D.SELECTED_LAYER_NODE](state: State3DI) {
    const it = state.selectedLayerNodes.values()
    const first = it.next()
    return first.value
  }
}
