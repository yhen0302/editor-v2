<template>
  <div
    class="image-media-wrap"
    :style="{
      width,
      height,
      left,
      top
    }"
    ref="el"
    @mousedown="onMouseDown"
    @click.stop
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    draggable="false"
  >
    <img
      class="image-media pointer-events-auto absolute"
      draggable="false"
      :src="src"
      v-if="src"
    />
    <div class="img-placeholder" v-else></div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import matrixMixin from "@/views/editor/twoDimension/elements/matrixMixin";

export default {
  name: 'ImageMedia',
  props: ['node'],
  mixins:[matrixMixin],
  emits: ['select', 'append'],
  setup(props: any) {
    const src = computed(() => props.node.option.src)
    return {
      src
    }
  },
}
</script>

<style scoped>
.image-media-wrap {
  position: absolute;
  pointer-events: auto;
}
.image-media{
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.img-placeholder {
  width: 100%;
  height: 100%;
  background: url(~@/assets/images/clip-1406.png) center/100% 100% no-repeat;
}
</style>
