<template>
  <div
    class="rect-shape pointer-events-auto absolute"
    @click.stop
    draggable="false"
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    :style="{
      width,
      height,
      left,
      top,
      backgroundColor: node.option.transparencyColor.color
    }"
    @mousedown="onMouseDown"
    ref="el"
  ></div>
</template>

<script lang="ts">
import { toPx } from '@/util/base'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { EditorMutation } from '@/store/editor/mutations'

export default {
  name: 'RectShape',
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

    function onActive() {}
    return {
      width,
      height,
      left,
      top,
      onActive
    }
  },
  mounted() {},
  methods: {
    onMouseDown(ev: MouseEvent) {
      // @ts-ignore
      if(this.node.select)return
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

<style scoped></style>
