<template>
  <slot>
    <div class='ele-node absolute'
         :style="{ pointerEvents: editorStore.addDragging ? 'none' : 'auto' }"
         @click.stop
         v-show="node.show"
          >

      <component
        @select="selectNode(node)"
        @append="appendSelectNode(node)"
        :is="node.type"
        :node="node"
      ></component>
    </div>
  </slot>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useMutation, useState ,useGetter} from '../../store/helper'
import { EditorStore, LayerTree2dNode } from '../../store/type'
import { getCurrentInstance } from 'vue'

export default {
  name: 'ElementNode',
  props: ['node'],
  setup() {
    console.log('elementNode',getCurrentInstance())
    const store = useStore()
    const editorStore = useState(store, 'global').state as EditorStore
    const mutation = useMutation(store, 'global', [
      'SELECT_2D_TREE_NODE',
      'CLEAR_SELECT_2D_NODES'
    ])
    const getters = useGetter(store,'global',['GET_SELECT_NODE'])
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
