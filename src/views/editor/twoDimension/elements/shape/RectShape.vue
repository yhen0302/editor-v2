<template>
  <div class="rect-shape pointer-events-auto absolute"
       v-drag
       :style="{ width, height, left, top,backgroundColor:transparencyColor.color}">{{value}}</div>
</template>

<script lang="ts">
import { toPx } from '@/util/base'
import { computed } from 'vue'

export default {
  name: 'RectShape',
  props: ['transparency', 'transparencyColor', 'matrixOption',"value"],
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
  }
}
</script>

<style scoped></style>
