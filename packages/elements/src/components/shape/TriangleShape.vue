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
      opacity
    }"
    @mousedown="onMouseDown"
  ></div>
</template>

<script lang="ts">
import { hexColorToRgba, toPx } from '../../../../../src/share/util/base'
import { computed} from 'vue'
import matrixMixin from "../matrixMixin";
import { getColor } from '../../../../../src/share/util/node'

export default {
  name: 'TriangleShape',
  props: ['node'],
  emits: ['select', 'append'],
  mixins:[matrixMixin],
  setup(props: any) {
    // exterior
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

<style scoped>
.triangle-shape {
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}
</style>
