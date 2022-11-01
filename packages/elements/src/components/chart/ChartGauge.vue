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
      top,
      background:color,

      ...animationStyle

    }'
    v-drag='{
      rect: node.option.matrixOption,
      select: node.select,
    }'
    ref='chartWrap'
  ></div>
</template>

<script>
import useMatrix from '../useMatrix'
import useChart from './useChart'
import useBackgroundColor from './useBackgroundColor'

export default {
  name: 'ChartGauge',
  props: ['node'],

  setup(props,context) {
    return {
      ...useMatrix(props, context),
      ...useChart(props, context, false),
      ...useBackgroundColor(props)
    }
  }
}
</script>

<style scoped></style>
