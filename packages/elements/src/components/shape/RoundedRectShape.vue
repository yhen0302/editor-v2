<template>
  <div
    class="rounded-rect-shape absolute"
    @click.stop
    draggable="false"
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    :style="{
      width,
      height,
      left,
      top,
      background: color,
      opacity,
      boxShadow,
      transform: rotate,
      ...borderRadius
    }"
    @mousedown="onMouseDown"
    ref="el"
  ></div>
</template>

<script lang="ts">
import { toPx } from '../../../../../src/share/util/base'
import { computed, ref, watch } from 'vue'
import matrixMixin from '../matrixMixin'
import { getColor } from '../../../../../src/share/util/node'
import baseShapeHook from './baseShapeHook'
import useMatrix from '../useMatrix'

export default {
  name: 'RoundedRectShape',
  props: ['node'],
  emits: ['select', 'append'],
  setup(props: any,context) {
    const { color, opacity, boxShadow } = baseShapeHook(props)
    const borderRadius = computed(() => {
      return toPx({
        borderTopLeftRadius: props.node.option.matrixOption.borderTopLeftRadius,
        borderTopRightRadius: props.node.option.matrixOption.borderTopRightRadius,
        borderBottomLeftRadius: props.node.option.matrixOption.borderBottomLeftRadius,
        borderBottomRightRadius: props.node.option.matrixOption.borderBottomRightRadius
      })
    })

    return {
      ...baseShapeHook(props),
      ...useMatrix(props,context),
      borderRadius,
    }
  }
}
</script>

<style scoped>
.rounded-rect-shape {
  will-change: width, height, left, top;
}
</style>
