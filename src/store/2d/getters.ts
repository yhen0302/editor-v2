import { State2DI } from '.'

export type  Getters2DI =  {
  [key in keyof typeof Getters2D]:typeof Getters2D[key]
}
export const Getters2D = {
  GET_CONFIGURATOR: 'GET_CONFIGURATOR',
  GET_SELECT_STATUS: 'GET_SELECT_STATUS',
  GET_SELECT_NODE: 'GET_SELECT_NODE'
} as const

export default {
  [Getters2D.GET_CONFIGURATOR](store: State2DI) {
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
        case 'ChartScatter':
        case 'ChartYCategoryBar':
          return 'AxisLineChartConfigurator'
        case 'ChartPie':
        case 'ChartGauge':
        case 'ChartRadar':
          return 'PieChartConfigurator'
        case 'ChartPolarBar':
          return 'AxisPolarChartConfigurator'
        case 'ChartMultiGauge':
          return 'MultiGaugeChartConfigurator'
        case 'BaseTable':
          return 'TableConfigurator'
      }
    }
    return ''
  },
  [Getters2D.GET_SELECT_STATUS](store: State2DI): 'multiple' | 'empty' | 'single' {
    return store.select2dNodes.size > 1 ? 'multiple' : store.select2dNodes.size > 0 ? 'single' : 'empty'
  },
  [Getters2D.GET_SELECT_NODE](state: State2DI) {
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
