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
      ...borderRadius
    }"
    @mousedown="onMouseDown"
    ref="el"
  ></div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import matrixMixin from '../matrixMixin'
import { getColor } from '../../../../../src/share/util/node'
import { toPx } from '../../../../../src/share/util/base'
import baseShapeHook from './baseShapeHook'
import useMatrix from '../useMatrix'

export default {
  name: 'RectShape',
  props: ['node'],
  emits: ['select', 'append'],
  mixins: [matrixMixin],

  setup(props: any,context) {


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
      borderRadius
    }
  }
}
</script>

<style scoped></style>
