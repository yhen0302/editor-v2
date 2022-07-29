<template>
  <div
    class="art-board-content w-full h-full absolute z-10 pointer-events-none"
  >
    <drag-wrapper></drag-wrapper>
    <element-node
      v-for="item in [...nodes].reverse()"
      :key="item.id"
      :node="item"
    >

    </element-node>
    <!--    <component
      :style="{ pointerEvents: editorStore.addDragging ? 'none' : 'auto' }"
      :is="item.type"
      v-for="item in editorStore.layerTree2d"
      :key="item.id"
      :node="item"
      @select="selectNode(item)"
      v-show="item.show"
      @append="appendSelectNode(item)"
    ></component>-->
  </div>
</template>

<script lang="tsx">
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { EditorStore, LayerTree2dNode } from '@/store/type'
import ElementNode from '@/components/2d/ElementNode.vue'
import { computed } from 'vue'
import GroupNode from '@/components/2d/GroupNode.vue'

export default {
  name: 'ArtBoard2DContent',
  components: { GroupNode, ElementNode },
  setup() {

    const store = useStore()
    const editorStore = useState(store, 'global').state as EditorStore
    const mutation = useMutation(store, 'global', [
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

    const nodes = computed(()=>{
      return editorStore?.selectedSceneTreeNode?.trees?.twoDimension || []
      })
    return {
      editorStore,
      selectNode,
      appendSelectNode,
      nodes
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
