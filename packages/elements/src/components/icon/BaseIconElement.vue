<template>
  <div
    class="base-icon-element"
    :style="{
      width,
      height,
      left,
      transform: rotate,
      top
    }"
    ref="el"
    @mousedown="onMouseDown"
    @click.stop
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    draggable="false"
  >
    <div class='base-icon-element-img' :style='{background:`url(${src}) center/contain no-repeat`,width,height}'></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import useMatrix from '../useMatrix'

export default {
  name: 'BaseIconElement',
  props: ['node'],
  emits: ['select', 'append'],
  setup(props,context) {
    const src = computed(() => props.node.option.src)
    return {
      src,
      ...useMatrix(props,context)
    }
  }
}
</script>

<style scoped>
.base-icon-element {
  position: absolute;
}
.base-icon-element-img {
}
</style>
