<template>
  <div
    class="video-media-wrap"
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
    <video
      class="video-media absolute"
      draggable="false"
      autoplay
      loop
      :src="src"
      v-if="src"
    />
    <div class="img-placeholder" v-else>
      <img class='i-p' src='@/assets/icon/clip-1406.svg' draggable='false'>
    </div>
  </div>
</template>

<script lang="ts">
import baseMediaHook from './baseMediaHook'
import useMatrix from '../useMatrix'

export default {
  name: 'VideoMedia',
  props: ['node'],
  emits: ['select', 'append'],
  setup(props: any,context) {
    return {
      ...baseMediaHook(props),
      ...useMatrix(props,context)
    }
  }
}
</script>

<style scoped>
.video-media-wrap {
  position: absolute;
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
