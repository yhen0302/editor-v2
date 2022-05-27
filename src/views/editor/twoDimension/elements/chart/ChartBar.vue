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
import { getCurrentInstance } from 'vue'

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
    debounceSetOption: debounce(function () {
      console.log(this)
    }, 300)
  },
  watch: {
    'node.option.echartsOption.color': {
      handler(newVal, oldVal) {
        console.log(this)
        this.debounceSetOption()
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
