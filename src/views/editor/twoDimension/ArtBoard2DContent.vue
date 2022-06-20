<template>
  <div
    class="art-board-content w-full h-full absolute z-10 pointer-events-none"
  >
    <drag-wrapper></drag-wrapper>
    <component
      :style="{ pointerEvents: editorStore.addDragging ? 'none' : 'auto' }"
      :is="item.type"
      v-for="item in editorStore.layerTree2d"
      :key="item.name"
      :node="item"
      @select="selectNode(item)"
      v-show="item.show"
      @append="appendSelectNode(item)"
    ></component>
  </div>
</template>

<script lang="tsx">
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { EditorStore, LayerTree2dNode } from '@/store/editor/type'

export default {
  name: 'ArtBoard2DContent',
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

<style scoped>
.art-board-content {
  width: 100%;
  height: 100%;
}
</style>
