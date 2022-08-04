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
      opacity
    }"
    @mousedown="onMouseDown"
    ref="el"
  ></div>
</template>

<script lang="ts">
import { hexColorToRgba, toPx } from '../../../../../src/share/util/base'
import { computed, ref } from 'vue'
import matrixMixin from "../matrixMixin";
import { getColor } from '../../../../../src/share/util/node'

export default {
  name: 'RectShape',
  props: ['node'],
  emits: ['select', 'append'],
  mixins:[matrixMixin],

  setup(props: any) {
    const color = computed(() => {
      return getColor(props.node)
    })
    const opacity = computed(() => {
      return (props.node.option.transparency / 100).toFixed(2)
    })
    return {
      color,
      opacity
    }
  },
}
</script>

<style scoped></style>
