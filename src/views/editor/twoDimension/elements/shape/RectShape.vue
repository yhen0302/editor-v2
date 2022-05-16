<template>
  <div
    class="rect-shape pointer-events-auto absolute"
    v-drag="{ active: onDragActive, rect: matrixOption, select:node.select }"
    draggable="false"

    :style="{
      width,
      height,
      left,
      top,
      backgroundColor: transparencyColor.color
    }"
    ref="el"
  >
    {{ value }}
  </div>
</template>

<script lang="ts">
import { toPx } from '@/util/base'
import { computed } from 'vue'

export default {
  name: 'RectShape',
  props: ['transparency', 'transparencyColor', 'matrixOption', 'value', 'node'],
  setup(props: any) {
    const width = computed(() => toPx(props.matrixOption.width))
    const height = computed(() => toPx(props.matrixOption.height))
    const left = computed(() => toPx(props.matrixOption.left))
    const top = computed(() => toPx(props.matrixOption.top))

    return {
      width,
      height,
      left,
      top
    }
  },
  mounted() {},
  methods: {
    onDragActive({ el, rect }: { el: any; rect: any }) {}
  }
}
</script>

<style scoped></style>
