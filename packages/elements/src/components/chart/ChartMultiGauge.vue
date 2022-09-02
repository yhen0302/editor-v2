<template>
  <div
    class="chart-bar absolute"
    @click.stop
    draggable="false"
    @mousedown="onMouseDown"
    :style="{
      width,
      height,
      left,
      transform: rotate,
      top
    }"
    v-drag="{
      rect: node.option.matrixOption,
      select: node.select,
    }"
    ref="chartWrap"
  ></div>
</template>

<script>
import matrixMixin from '../matrixMixin'
import * as echarts from 'echarts'
import { debounce, clone } from '../../../../../src/share/util/base'
import { getCurrentInstance, watch } from 'vue'
import chartMixin from './chartMixin'

export default {
  name: 'ChartMultiGauge',
  mixins: [matrixMixin, chartMixin],
  props: ['node'],
  mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap)
    this.myChart.setOption(this.preprocessEchartsOption())
  },
  methods: {
    debounceSetOption: debounce(function (...args) {
      const option = args[0] || this.node.option.echartsOption
      // 处理option
      this.updateEchartsOption(this.preprocessEchartsOption(option), ...args.slice(1))
    }, 300),
    changeMatrix() {
      this.debounceSetOption(this.node.option.echartsOption, false, true)
    },
    preprocessEchartsOption(echartsOption) {
      const option = clone(echartsOption || this.node.option.echartsOption)
      const seriesLength = option.series.length
      const matrix = this.node.option.matrixOption
      const radius = Math.min(
        (matrix.width * 0.9) / Math.min(seriesLength, 3) / 2,
        (matrix.height * 0.8) / Math.ceil(seriesLength / 3) / 2
      )
      const NaNToZero = (n) => (isNaN(n) ? 0 : n)

      option.series.forEach((gauge, index) => {
        gauge.center = [
          ['18%', '50%', '82%'][index % Math.min(seriesLength, 3)],
          seriesLength <= 3
            ? '60%'
            : (100 / Math.ceil(seriesLength / 3)) * Math.ceil((index + 1) / 3) -
              100 / Math.ceil(seriesLength / 3) / 2 +
              5 +
              '%'
        ]
        console.log(gauge.center)
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
      console.log(option)
      return option
    }
  },
  setup(props) {
    const instance = getCurrentInstance()
    // title watcher
    watch(
      () => props.node.option.echartsOption.title,
      (newVal, oldVal) => {
        instance.ctx.debounceSetOption()
      },
      { deep: true }
    )
    watch(
      () => props.node.option.echartsOption.unit,
      (newVal, oldVal) => {
        if (newVal.show) {
          const unit = props.node.option.echartsOption.unit
          // eslint-disable-next-line vue/no-mutating-props
          props.node.option.echartsOption.graphic = {
            elements: [
              {
                type: 'text',
                left: unit.left,
                right: unit.right,
                top: unit.top,
                style: {
                  text: unit.text,
                  fill: unit.textStyle.color,
                  font: `${unit.textStyle.fontStyle} ${unit.textStyle.fontWeight} ${unit.textStyle.fontSize}px ${unit.textStyle.fontFamily}`
                }
              }
            ]
          }
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          delete props.node.option.echartsOption.graphic
        }
        instance.ctx.debounceSetOption()
      },
      { deep: true }
    )

    watch(
      () => props.node.option.echartsOption.series,
      (newVal) => {
        instance.ctx.debounceSetOption()
      },
      { deep: true }
    )
    watch(
      () => props.node.option.echartsOption.legend,
      (newVal) => {
        instance.ctx.debounceSetOption()
      },
      { deep: true }
    )
    watch(
      () => props.node.option.apiMapping,
      () => {
        instance.ctx.debounceSetOption()
      }
    )
  },

  watch: {
    'node.option.echartsOption.color': {
      handler(newVal, oldVal) {
        this.debounceSetOption()
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
