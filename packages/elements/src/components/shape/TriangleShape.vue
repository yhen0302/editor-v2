<template>
  <div
    class="triangle-shape absolute"
    @click.stop
    draggable="false"
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    :style="{
      width,
      height,
      left,
      top,
      background: color,
      transform: rotate,
      opacity,
      boxShadow
    }"
    @mousedown="onMouseDown"
  ></div>
</template>

<script lang="ts">
import { computed} from 'vue'
import matrixMixin from "../matrixMixin";
import { getColor } from '../../../../../src/share/util/node'
import baseShapeHook from './baseShapeHook'
import useMatrix from '../useMatrix'

export default {
  name: 'TriangleShape',
  props: ['node'],
  emits: ['select', 'append'],
  mixins:[matrixMixin],
  setup(props: any,context) {
    return {
      ...baseShapeHook(props),
      ...useMatrix(props,context)
    }
  },
}
</script>

<style scoped>
.triangle-shape {
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}
</style>
