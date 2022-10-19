<template>
  <div
    class="circle-rect-shape absolute"
    @click.stop
    draggable="false"
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    :style="{
      width,
      height,
      left,
      top,
      background: color,
      boxShadow,
      transform: rotate,
      opacity
    }"
    @mousedown="onMouseDown"
    ref="el"
  ></div>
</template>

<script lang="ts">
import baseShapeHook from './baseShapeHook'
import useMatrix from '../useMatrix'
export default {
  name: 'CircleShape',
  props: ['node'],
  emits: ['select', 'append'],
  setup(props: any,context) {
    return {
      ...baseShapeHook(props),
      ...useMatrix(props,context)
    }
  }
}
</script>

<style scoped>
.circle-rect-shape {
  border-radius: 50%;
}
</style>
