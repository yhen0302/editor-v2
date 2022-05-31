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
import matrixMixin from '@/views/editor/twoDimension/elements/matrixMixin'
import * as echarts from 'echarts'
import { debounce } from '@/util/base'
import { getCurrentInstance, watch } from 'vue'

export default {
  name: 'ChartBar',
  mixins: [matrixMixin],
  props: ['node'],
  mounted() {
    this.myChart = echarts.init(this.$refs.chartWrap)
    this.myChart.setOption(this.node.option.echartsOption)
  },

  methods: {
    updateEchartsSize() {
      this.myChart.resize()
    },
    updateEchartsOption() {
      this.myChart.setOption(this.node.option.echartsOption)
    },
    debounceSetOption: debounce(function () {
      this.updateEchartsOption()
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
                top: 20,
                style: {
                  text: unit.text,
                  fill: unit.textStyle.color,
                  font: `${unit.textStyle.fontStyle} ${unit.textStyle.fontWeight} ${unit.textStyle.fontSize}px ${unit.textStyle.fontFamily}`
                }
              }
            ]
          }
          instance.ctx.debounceSetOption()
        }
      },
      { deep: true }
    )

    watch(()=>props.node.option.echartsOption.series,(newVal)=>{
      instance.ctx.debounceSetOption()
    },{deep:true})
    watch(()=>props.node.option.echartsOption.yAxis,(newVal)=>{
      instance.ctx.debounceSetOption()
    },{deep:true})
    watch(()=>props.node.option.echartsOption.legend,(newVal)=>{
      instance.ctx.debounceSetOption()
    },{deep:true})

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
