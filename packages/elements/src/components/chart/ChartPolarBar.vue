<template>
  <div
    class="chart-polar-bar absolute"
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
import useMatrix from '../useMatrix'
import useChart from './useChart'

export default {
  name: 'ChartPolarBar',
  props: ['node'],
  setup(props,context) {
    return {
      ...useMatrix(props, context),
      ...useChart(props, context)
    }
  },
}
</script>

<style scoped></style>
