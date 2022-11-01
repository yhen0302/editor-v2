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
      ...borderRadius,
            ...animationStyle

    }"
    @mousedown="onMouseDown"
    ref="el"
  ></div>
</template>

<script lang="ts">
import { toPx } from '../../../../../src/share/util/base'
import { computed, ref, watch } from 'vue'
import baseShapeHook from './baseShapeHook'
import useMatrix from '../useMatrix'
import useBorderRadius from '../useBorderRadius'

export default {
  name: 'RoundedRectShape',
  props: ['node'],
  emits: ['select', 'append'],
  setup(props: any,context) {
    const { color, opacity, boxShadow } = baseShapeHook(props)

    return {
      ...baseShapeHook(props),
      ...useMatrix(props,context),
      ...useBorderRadius(props)
    }
  }
}
</script>

<style scoped>
.rounded-rect-shape {
  will-change: width, height, left, top;
}
</style>
