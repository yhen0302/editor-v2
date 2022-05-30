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
import {getCurrentInstance, watch} from 'vue'

export default {
  name: 'ChartBar',
  mixins: [matrixMixin],
  props: ['node'],
  mounted() {
    console.log(this.node.option.echartsOption.title)
    this.myChart = echarts.init(this.$refs.chartWrap)
    this.myChart.setOption(this.node.option.echartsOption)
  },

  methods: {
    updateEchartsSize() {
      this.myChart.resize()
    },
    updateEchartsOption() {
      console.log(this.node.option.echartsOption)
      this.myChart.setOption(this.node.option.echartsOption)
    },
    debounceSetOption: debounce(function () {
      this.updateEchartsOption()
    }, 300)
  },
  setup(props){
    const instance = getCurrentInstance()
    watch(()=>props.node.option.echartsOption.title,(newVal,oldVal)=>{
      instance.ctx.debounceSetOption()
    },{deep:true})
  },
  watch: {
    'node.option.echartsOption.color': {
      handler(newVal, oldVal) {
        this.debounceSetOption()
      },
      deep: true
    },
  }
}
</script>

<style scoped></style>
