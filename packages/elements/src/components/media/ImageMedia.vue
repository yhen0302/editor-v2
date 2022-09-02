<template>
  <div
    class="image-media-wrap"
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
    <img
      class="image-media absolute"
      draggable="false"
      :src="src"
      v-if="src"
    />
    <div class="img-placeholder-box" v-else>
      <img class='i-p' src='@/assets/icon/clip-1406.svg' draggable='false'>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import matrixMixin from "../matrixMixin";

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
}
.image-media{
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.img-placeholder-box {
  width: 100%;
  height: 100%;
  /*background: url(~@/assets/images/clip-1406.png) center/100% 100% no-repeat;*/
}
.i-p{
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
