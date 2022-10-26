<template>
  <div
    class='chart-bar absolute'
    @click.stop
    draggable='false'
    @mousedown='onMouseDown'
    :style='{
      width,
      height,
      left,
      transform: rotate,
      top
    }'
    v-drag='{
      rect: node.option.matrixOption,
      select: node.select,
    }'
    ref='chartWrap'
  ></div>
</template>

<script>
import { debounce, clone } from '../../../../../src/share/util/base'
import useMatrix from '../useMatrix'
import useChart from './useChart'

export default {
  name: 'ChartMultiGauge',
  props: ['node'],
  setup(props, context) {
    function preprocessEchartsOption(echartsOption) {
      const option = clone(echartsOption || props.node.option.echartsOption)
      const seriesLength = option.series.length
      const matrix = props.node.option.matrixOption
      const radius = Math.min((matrix.width * 0.9) / Math.min(seriesLength, 3) / 2, (matrix.height * 0.8) / Math.ceil(seriesLength / 3) / 2)
      const NaNToZero = (n) => (isNaN(n) ? 0 : n)

      option.series.forEach((gauge, index) => {
        gauge.center = [
          ['18%', '50%', '82%'][index % Math.min(seriesLength, 3)],
          seriesLength <= 3 ? '60%' : (100 / Math.ceil(seriesLength / 3)) * Math.ceil((index + 1) / 3) - 100 / Math.ceil(seriesLength / 3) / 2 + 5 + '%'
        ]
        // console.log(gauge.center)
        gauge.progress.itemStyle = gauge.progress.itemStyle || {}
        gauge.progress.itemStyle.color = option.color[index]
        gauge.progress.width = radius / 10
        gauge.detail = gauge.detail || {}
        gauge.detail.color = option.color[index]
        gauge.axisLine = gauge.axisLine || {}
        gauge.axisLine.lineStyle = gauge.axisLine.lineStyle || {}
        gauge.axisLine.lineStyle.width = radius / 10
        gauge.radius = parseInt(radius)
      })
      return option
    }

    return { ...useMatrix(props, context), ...useChart(props, context, false, true, preprocessEchartsOption) }
  }

}
</script>

<style scoped></style>
