<template>
  <slot>
    <group-node v-if="node.type === 'group'" :group-node="node"></group-node>
    <div class="ele-node" :style="{ pointerEvents: state2D.addDragging || node.lock ? 'none' : 'auto' }" @click.stop v-show="node.show" v-else>
      <component @select="selectNode(node)" @append="appendSelectNode(node)" :is="node.type" :node="node"></component>
    </div>
  </slot>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useMutation, useState } from '../../store/helper'
import GroupNode from '@/components/2d/GroupNode.vue'
import { LayerTreeNode2D } from '@/store'

export default {
  name: 'ElementNode',
  components: { GroupNode },
  props: ['node'],
  setup(props: any) {
    // console.log('node', props.node)
    const store = useStore()
    const state2D = useState(store, '2d')
    const mutation = useMutation(store, '2d', ['SELECT_2D_TREE_NODE', 'CLEAR_SELECT_2D_NODES'])
    function selectNode(node: LayerTreeNode2D) {
      mutation['CLEAR_SELECT_2D_NODES']()
      mutation['SELECT_2D_TREE_NODE']({ node })
    }
    function appendSelectNode(node: LayerTreeNode2D) {
      mutation['SELECT_2D_TREE_NODE']({ node })
    }
    return {
      state2D,
      selectNode,
      appendSelectNode
    }
  }
}
</script>

<style scoped></style>
