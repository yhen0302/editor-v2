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

export default {
  name: 'RectShape',
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

    const borderRadius = computed(() => {
      return toPx({
        borderTopLeftRadius: props.node.option.matrixOption.borderTopLeftRadius,
        borderTopRightRadius: props.node.option.matrixOption.borderTopRightRadius,
        borderBottomLeftRadius: props.node.option.matrixOption.borderBottomLeftRadius,
        borderBottomRightRadius: props.node.option.matrixOption.borderBottomRightRadius
      })
    })
    const boxShadow = computed(() => {
      return `${props.node.option.shadowX}px ${props.node.option.shadowY}px ${props.node.option.shadowBlur}px ${props.node.option.shadowColor}`
    })
    return {
      color,
      opacity,
      boxShadow,
      borderRadius
    }
  }
}
</script>

<style scoped></style>
