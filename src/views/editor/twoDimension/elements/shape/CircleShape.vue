<template>
  <div
      class="circle-rect-shape pointer-events-auto absolute"
      @click.stop
      draggable="false"
      v-drag="{ rect: node.option.matrixOption, select: node.select }"
      :style="{
      width,
      height,
      left,
      top,
      backgroundColor: color,
      opacity
    }"
      @mousedown="onMouseDown"
      ref="el"
  ></div>
</template>

<script lang="ts">
import { hexColorToRgba, toPx } from '@/util/base'
import { computed, ref, watch } from 'vue'
import matrixMixin from '../matrixMixin'


export default {
  name: 'CircleShape',
  props: ['node'],
  emits: ['select', 'append'],
  mixins:[matrixMixin],
  setup(props: any) {
    const color = computed(() => {
      return hexColorToRgba(
          props.node.option.transparencyColor.color,
          props.node.option.transparencyColor.transparency
      )
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

<style scoped>
.circle-rect-shape{
  border-radius: 50%;
}
</style>
