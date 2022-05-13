<template>
  <div class="scene-tree-main">
    <div class="node-item" v-for="item in nodes" :key="item">
      <SceneTreeNode :node="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import SceneTreeNode from './SceneTreeNode.vue'

import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'SceneTree',
  components: {
    SceneTreeNode
  },
  setup() {
    const nodes = ref([
      {
        name: '场景1',
        type: 'scene',
        selected: true,
        spread: true,
        id: '0',
        children: [
          {
            name: '页1',
            type: 'page',
            selected: true,
            parent: '0',
            id: '0-0'
          }
        ]
      }
    ])

    // 添加场景
    EventsBus.on('sceneAdded', () => {
      nodes.value.push({
        name: '场景' + (nodes.value.length + 1),
        type: 'scene',
        id: '' + nodes.value.length,
        selected: false,
        spread: true,
        children: [
          {
            name: '页1',
            type: 'page',
            selected: false,
            parent: '' + nodes.value.length,
            id: '' + nodes.value.length + '-0'
          }
        ]
      })
    })

    // 添加页
    EventsBus.on('pageAdded', (e: any) => {
      const node = e.node

      node.spread = true
      node.children.push({
        name: '页' + (node.children.length + 1),
        type: 'page',
        selected: false,
        parent: node.id,
        id: '' + node.id + '-' + node.children.length
      })
    })

    // 选中页
    EventsBus.on('pageSelected', (e: any) => {
      const node = e.node
      nodes.value.forEach((n: any) => {
        n.selected = false

        if (n.children && n.children.length > 0) {
          n.children.forEach((c: any) => {
            c.selected = node.id === c.id
            if (c.selected) n.selected = true
          })
        }
      })
    })

    return {
      nodes
    }
  }
})
</script>

<style lang="postcss" scoped>
.scene-tree-main {
  @apply w-full h-full flex flex-col overflow-scroll;
}
.node-item {
  @apply w-full h-auto;
}
</style>
