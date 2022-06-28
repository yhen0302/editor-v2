<template>
  <slot>
    <component
      :style="{ pointerEvents: editorStore.addDragging ? 'none' : 'auto' }"
      :is="node.type"
      :node="node"
      @select="selectNode(node)"
      v-show="node.show"
      @append="appendSelectNode(node)"
    ></component>
  </slot>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { EditorStore, LayerTree2dNode } from '@/store/editor/type'

export default {
  name: 'ElementNode',
  props: ['node'],
  setup() {
    const store = useStore()
    const editorStore = useState(store, 'editor') as EditorStore
    const mutation = useMutation(store, 'editor', [
      'SELECT_2D_TREE_NODE',
      'CLEAR_SELECT_2D_NODES'
    ])
    function selectNode(node: LayerTree2dNode) {
      mutation['CLEAR_SELECT_2D_NODES']()
      mutation['SELECT_2D_TREE_NODE']({ node })
    }
    function appendSelectNode(node: LayerTree2dNode) {
      mutation['SELECT_2D_TREE_NODE']({ node })
    }
    return {
      editorStore,
      selectNode,
      appendSelectNode
    }
  }
}
</script>

<style scoped></style>
