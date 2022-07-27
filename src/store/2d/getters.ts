import { EditorStore, LayerTree2dNode } from '../type'

export interface EditorGetterI {
  // 2d
  GET_CONFIGURATOR: 'GET_CONFIGURATOR'
  GET_SELECT_STATUS: 'GET_SELECT_STATUS'
  GET_SELECT_NODE: 'GET_SELECT_NODE'
}

export const EditorGetter: EditorGetterI = {
  GET_CONFIGURATOR: 'GET_CONFIGURATOR',
  GET_SELECT_STATUS: 'GET_SELECT_STATUS',
  GET_SELECT_NODE: 'GET_SELECT_NODE'
}

export default {
  [EditorGetter.GET_CONFIGURATOR](store: EditorStore) {
    // 选择了多个
    if (store.select2dNodes.size > 1) {
      // pass
    } else if (store.select2dNodes.size > 0) {
      const iterator = store.select2dNodes.values()
      const node = iterator.next()
      switch (node.value.type as string) {
        case 'TriangleShape':
        case 'CircleShape':
        case 'RoundedRectShape':
        case 'RectShape':
          return 'ShapeConfigurator'
        case 'ImageMedia':
        case 'VideoMedia':
          return 'MediaConfigurator'
        case 'BigTitle':
        case 'SmallTitle':
        case 'BaseTitle':
        case 'TextContent':
          return 'TextConfigurator'
        case 'ChartBar':
        case 'ChartLine':
        case 'ChartCurve':
          return 'AxisLineChartConfigurator'
        case 'ChartPie':
        case 'ChartGauge':
          return 'PieChartConfigurator'
        case 'BaseTable':
          return 'TableConfigurator'
      }
    }
    return ''
  },
  [EditorGetter.GET_SELECT_STATUS](
    store: EditorStore
  ): 'multiple' | 'empty' | 'single' {
    return store.select2dNodes.size > 1
      ? 'multiple'
      : store.select2dNodes.size > 0
      ? 'single'
      : 'empty'
  },
  [EditorGetter.GET_SELECT_NODE](state: EditorStore) {
    if (state.select2dNodes.size > 1) {
      return [...state.select2dNodes]
      // pass
    } else if (state.select2dNodes.size > 0) {
      const iterator = state.select2dNodes.values()
      const node = iterator.next()
      return node.value
    } else {
      return null
    }
  }
}
