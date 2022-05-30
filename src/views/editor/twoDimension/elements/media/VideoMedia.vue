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
    <video
        class="video-media pointer-events-auto absolute"
        draggable="false"
        autoplay
        loop
        :src="src"
        v-if="src"
    />
    <div class="img-placeholder" v-else></div>
  </div>
</template>

<script lang="ts">
import { toPx } from '@/util/base'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { EditorMutation } from '@/store/editor/mutations'
import matrixMixin from "@/views/editor/twoDimension/elements/matrixMixin";

export default {
  name: 'VideoMedia',
  props: ['node'],
  emits: ['select', 'append'],
  mixins:[matrixMixin],
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
.video-media{
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
