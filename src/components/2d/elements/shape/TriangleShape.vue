<template>
  <div
    class="triangle-shape pointer-events-auto absolute"
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
  ></div>
</template>

<script lang="ts">
import { hexColorToRgba, toPx } from '@/core/2d/util/base'
import { computed} from 'vue'
import matrixMixin from "../matrixMixin";

export default {
  name: 'TriangleShape',
  props: ['node'],
  emits: ['select', 'append'],
  mixins:[matrixMixin],
  setup(props: any) {
    // exterior
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
.triangle-shape {
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}
</style>
