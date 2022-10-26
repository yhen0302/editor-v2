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
import { debounce } from '../../../../../src/share/util/base'
import { getCurrentInstance, watch } from 'vue'
import chartMixin from "./chartMixin";
import useMatrix from '../useMatrix'
import useChart from './useChart'

export default {
  name: 'ChartCurve',
  props: ['node'],
  setup(props,context) {
    return {
      ...useMatrix(props,context),
      ...useChart(props,context)
    }
  },
}
</script>

<style scoped></style>
