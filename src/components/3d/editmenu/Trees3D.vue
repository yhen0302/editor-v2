<template>
  <div class="trees-3d-main">
    <div class="node-item" v-for="item in nodes" :key="item">
      <PageTreeNode3d :node="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { EventsBus } from '@/core/EventsBus'
import PageTreeNode3d from '@/components/utils/editmenu/PageTreeNode3d.vue'
import { traverseFindNodeById, traverseResetSelectedOfNodes, traverseResetSpreadOfNodes } from '@/core/3d/util'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Trees3D',
  components: {
    PageTreeNode3d
  },
  setup() {
    const store = useStore()
    const nodes = ref([])
    let sceneTreeNodeId = ''

    // 查看详情页
    EventsBus.on('pageEnter', (e: any) => {
      // console.log('trees3d', e.node.trees)

      nodes.value = e.node.trees.threeDimension
      sceneTreeNodeId = e.node.uuid
    })

    // 选中元素:单选
    EventsBus.on('treeSelected', (e: any) => {
      const flag = e.node.selected
      traverseResetSelectedOfNodes(nodes.value)
      e.node.selected = !flag
      store.state.selectedPageTreeNode = e.node.selected ? e.node : null
    })

    // 重置page tree
    EventsBus.on('formsReset', () => {
      // selected attribute
      traverseResetSelectedOfNodes(nodes.value)
      // spread attribute
      traverseResetSpreadOfNodes(nodes.value)
    })

    return {
      store,
      nodes
    }
  }
})
</script>

<style lang="postcss" scoped>
.trees-3d-main {
  @apply w-full h-full overflow-scroll;
}
</style>
