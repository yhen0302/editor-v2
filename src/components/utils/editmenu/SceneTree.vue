<template>
  <div class="scene-tree-main">
    <div class="node-item" v-for="item in nodes" :key="item">
      <SceneTreeNode :node="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue'
import SceneTreeNode from './SceneTreeNode.vue'

import { EventsBus } from '@/core/EventsBus'
import { useStore } from 'vuex'

import { reloadThreeDimensionScene, traverseFindNodeById } from '@/core/3d/util'

export default defineComponent({
  name: 'SceneTree',
  components: {
    SceneTreeNode
  },
  setup() {
    const store = useStore()

    // trees: {threeDimension, twoDimension}
    const nodes = ref([
      {
        name: '场景1',
        type: 'scene',
        selected: true,
        spread: true,
        uuid: '0',
        children: [
          {
            name: '页1',
            type: 'page',
            selected: true,
            parent: '0',
            uuid: '0-0',
            trees: {} // 见上方注释
          }
        ]
      }
    ])

    // 初始化场景/页
    EventsBus.on('sceneLoaded', (e: any) => {
      if (e.type === '3d') {
        nodes.value[0].children[0].trees = JSON.parse(JSON.stringify(toRaw(store.state.template)))
        store.state.threeDimensionContainer = e.container
      }
    })

    // 添加场景
    EventsBus.on('sceneAdded', () => {
      nodes.value.push({
        name: '场景' + (nodes.value.length + 1),
        type: 'scene',
        uuid: '' + nodes.value.length,
        selected: false,
        spread: true,
        children: [
          {
            name: '页1',
            type: 'page',
            selected: false,
            parent: '' + nodes.value.length,
            uuid: '' + nodes.value.length + '-0',
            trees: JSON.parse(JSON.stringify(toRaw(store.state.template)))
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
        parent: node.uuid,
        uuid: '' + node.uuid + '-' + node.children.length,
        trees: JSON.parse(JSON.stringify(toRaw(store.state.template)))
      })
    })

    // 选中页
    EventsBus.on('pageSelected', (e: any) => {
      const node = e.node

      if (node.selected) return

      store.state.selectedSceneTreeNode = null
      nodes.value.forEach((n: any) => {
        n.selected = false

        if (n.children && n.children.length > 0) {
          n.children.forEach((c: any) => {
            c.selected = node.uuid === c.uuid
            if (c.selected) {
              n.selected = true
              store.state.selectedSceneTreeNode = c
            }
          })
        }
      })

      // reload 3d scene
      reloadThreeDimensionScene(node)
      // reload edit forms
      EventsBus.emit('formsReload', {})
    })

    onMounted(() => {
      store.state.selectedSceneTreeNode = nodes.value[0].children[0]
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
