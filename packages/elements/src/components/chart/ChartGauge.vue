<template>
  <div
    class="chart-bar pointer-events-auto absolute"
    @click.stop
    draggable="false"
    @mousedown="onMouseDown"
    :style="{
      width,
      height,
      left,
      top
    }"
    v-drag="{
      rect: node.option.matrixOption,
      select: node.select,
      change: updateEchartsSize
    }"
    ref="chartWrap"
  ></div>
</template>

<script>
import matrixMixin from '../matrixMixin'
import * as echarts from 'echarts'
import { debounce } from '../util/base'
import { getCurrentInstance, watch } from 'vue'
import chartMixin from "./chartMixin";

export default {
  name: 'ChartGauge',
  mixins: [matrixMixin,chartMixin],
  props: ['node'],
  mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap)
    this.myChart.setOption(this.node.option.echartsOption)
  },

  methods: {
    debounceSetOption: debounce(function (...args) {
      this.updateEchartsOption(...args)
    }, 300)
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
        instance.ctx.debounceSetOption(true)
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
    watch(()=>props.node.option.apiMapping,()=>{
      instance.ctx.debounceSetOption()
    })
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
