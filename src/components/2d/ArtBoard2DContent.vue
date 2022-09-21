<template>
  <div class="art-board-content w-full h-full absolute z-10 pointer-events-none">
    <drag-wrapper></drag-wrapper>
    <element-node v-for="item in [...nodes].reverse()" :key="item.id" :node="item"> </element-node>
  </div>
</template>

<script lang="tsx">
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import ElementNode from '@/components/2d/ElementNode.vue'
import { computed } from 'vue'
import GroupNode from '@/components/2d/GroupNode.vue'
import { LayerTreeNode2D } from '@/store'

export default {
  name: 'ArtBoard2DContent',
  components: { GroupNode, ElementNode },
  setup() {
    const store = useStore()
    const stateGlobal = useState(store, 'global')
    const mutation = useMutation(store, '2d', ['SELECT_2D_TREE_NODE', 'CLEAR_SELECT_2D_NODES'])
    function selectNode(node: LayerTreeNode2D) {
      mutation['CLEAR_SELECT_2D_NODES']()
      mutation['SELECT_2D_TREE_NODE']({ node })
    }
    function appendSelectNode(node: LayerTreeNode2D) {
      mutation['SELECT_2D_TREE_NODE']({ node })
    }

    const nodes = computed(() => {
      return stateGlobal?.selectedPageTreeNode?.trees?.twoDimension || []
    })
    return {
      stateGlobal,
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
