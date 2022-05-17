<template>
  <div
    class="rect-shape pointer-events-auto absolute"
    @click.stop
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
import {computed, ref, watch} from 'vue'
import {useStore} from "vuex";
import {useMutation, useState} from "@/store/helper";
import {EditorMutation} from "@/store/editor/mutations";

export default {
  name: 'RectShape',
  props: ['transparency', 'transparencyColor', 'matrixOption', 'value', 'node'],
  setup(props: any) {
    const store = useStore()
    const editorStore = useState(store,'editor')
    const mutation = useMutation(store,'editor',[EditorMutation.SELECT_2D_TREE_NODE])
    const width = computed(() => toPx(props.matrixOption.width))
    const height = computed(() => toPx(props.matrixOption.height))
    const left = computed(() => toPx(props.matrixOption.left))
    const top = computed(() => toPx(props.matrixOption.top))

    function onDragActive(){
      mutation.SELECT_2D_TREE_NODE({node:props.node})
    }
    return {
      width,
      height,
      left,
      top,
    }
  },
  mounted() {},
  methods: {
  }
}
</script>

<style scoped></style>
