<template>
  <div
    class="rect-shape absolute"
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
      transform:rotate,
      ...borderRadius,
            ...animationStyle

    }"
    @mousedown="onMouseDown"
    ref="el"
  ></div>
</template>

<script lang="ts">
import baseShapeHook from './baseShapeHook'
import useMatrix from '../useMatrix'
import useBorderRadius from '../useBorderRadius'

export default {
  name: 'RectShape',
  props: ['node'],
  emits: ['select', 'append'],
  setup(props: any,context) {


    return {
      ...baseShapeHook(props),
      ...useMatrix(props,context),
      ...useBorderRadius(props)
    }
  }
}
</script>

<style scoped></style>
