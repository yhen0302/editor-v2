<template>
  <slot>
    <group-node  v-if="node.type === 'group'" :group-node='node'></group-node>
    <div class="ele-node absolute" :style="{ pointerEvents: editorStore.addDragging||node.lock ? 'none' : 'auto' }" @click.stop v-show="node.show" v-else>
      <component @select="selectNode(node)" @append="appendSelectNode(node)" :is="node.type" :node="node"></component>
    </div>
  </slot>

</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useMutation, useState, useGetter } from '../../store/helper'
import { EditorStore, LayerTree2dNode } from '../../store/type'
import GroupNode from '@/components/2d/GroupNode.vue'

export default {
  name: 'ElementNode',
  components: { GroupNode },
  props: ['node'],
  setup(props:any) {
    console.log('node',props.node)
    const store = useStore()
    const editorStore = useState(store, 'global').state as EditorStore
    const mutation = useMutation(store, 'global', ['SELECT_2D_TREE_NODE', 'CLEAR_SELECT_2D_NODES'])
    const getters = useGetter(store, 'global', ['GET_SELECT_NODE'])
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
