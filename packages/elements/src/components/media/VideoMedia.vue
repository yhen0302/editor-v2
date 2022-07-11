<template>
  <div
    class="video-media-wrap"
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
    <video
      class="video-media pointer-events-auto absolute"
      draggable="false"
      autoplay
      loop
      :src="src"
      v-if="src"
    />
    <div class="img-placeholder" v-else>
      <img class='i-p' src='~@/assets/icon/clip-1406.svg' draggable='false'>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import matrixMixin from '../matrixMixin'

export default {
  name: 'VideoMedia',
  props: ['node'],
  emits: ['select', 'append'],
  mixins: [matrixMixin],
  setup(props: any) {
    const src = computed(() => props.node.option.src)
    return {
      src
    }
  }
}
</script>

<style scoped>
.video-media-wrap {
  position: absolute;
  pointer-events: auto;
}
.video-media {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.img-placeholder {
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
