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
      opacity
    }"
    @mousedown="onMouseDown"
    ref="el"
  ></div>
</template>

<script lang="ts">
import { getColor } from '../../../../../src/share/util/node'

import { computed, ref, watch } from 'vue'
import matrixMixin from '../matrixMixin'

export default {
  name: 'CircleShape',
  props: ['node'],
  emits: ['select', 'append'],
  mixins: [matrixMixin],
  setup(props: any) {
    const color = computed(() => {
      return getColor(props.node)
    })
    const opacity = computed(() => {
      return (props.node.option.transparency / 100).toFixed(2)
    })
    const boxShadow = computed(() => {
      return `${props.node.option.shadowX}px ${props.node.option.shadowY}px ${props.node.option.shadowBlur}px ${props.node.option.shadowColor}`
    })
    return {
      color,
      opacity,
      boxShadow
    }
  }
}
</script>

<style scoped>
.circle-rect-shape {
  border-radius: 50%;
}
</style>
