<template>
  <layer-list :node="editorStore.layerTree2d">
    <template v-slot:prefix>
      <div></div>
    </template>
    <template v-slot:placeholder="node" v-once>
      <div style="padding-right: 8px">
        <img :src="layerIcon[node.type]"/>
      </div>
    </template>
    <template v-slot:suffix="node">
      <div
          class="suffix-icon-wrap cursor-pointer"
          :class="{
          'opacity-50': findHasFalseShowParentNode(node)
        }"
          @click.stop="hiddenControl(node)"
      >
        <img
            src="~@/assets/images/editor_unseen_btn_dark.png"
            v-if="node.show"
        />
        <img src="~@/assets/images/editor_seen_btn_dark.png" v-else/>
      </div>
    </template>
    <template v-slot:folderPrefix>
      <img
          src="~@/assets/images/editor_elementgroup_icn_dark.png"
          style="margin-right: 8px"
      />
    </template>
  </layer-list>
</template>

<script>
import {layerIcon} from '@/views/editor/localData'
import {useStore} from 'vuex'
import {useMutation, useState} from '@/store/helper'

export default {
  name: 'LayerList2d',
  setup() {
    const store = useStore()
    const editorStore = useState(store, 'editor')
    const editorMutation = useMutation(store, 'editor', ["CANCEL_SELECT_2D_NODE"])

    function findHasFalseShowParentNode(node) {
      while (node.parent) {
        if (node.parent.show === false) return node.parent
        node = node.parent
      }
      return false
    }

    function hiddenControl(node) {
      let n = findHasFalseShowParentNode(node)
      if (n) {
        n.show = true
      }

      node.show = !node.show
      if (!node.show) {
        editorMutation['CANCEL_SELECT_2D_NODE']({node})
      }
    }

    return {
      layerIcon,
      editorStore,
      hiddenControl,
      findHasFalseShowParentNode
    }
  }
}
</script>

<style scoped>
.layer-tree-2d{

}
</style>
