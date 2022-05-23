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

export default {
  name: 'VideoMedia',
  props: ['node'],
  emits: ['select', 'append'],
  setup(props: any) {
    const store = useStore()
    const editorStore = useState(store, 'editor')
    const mutation = useMutation(store, 'editor', [
      EditorMutation.SELECT_2D_TREE_NODE
    ])
    const width = computed(() => toPx(props.node.option.matrixOption.width))
    const height = computed(() => toPx(props.node.option.matrixOption.height))
    const left = computed(() => toPx(props.node.option.matrixOption.left))
    const top = computed(() => toPx(props.node.option.matrixOption.top))
    const src = computed(() => props.node.option.src)
    return {
      width,
      height,
      left,
      top,
      src
    }
  },
  methods: {
    onMouseDown(ev: MouseEvent) {
      // @ts-ignore
      if (this.node.select) return
      if (ev.shiftKey) {
        // @ts-ignore
        this.$emit('append')
        return
      }
      // @ts-ignore
      this.$emit('select')
    }
  }
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
