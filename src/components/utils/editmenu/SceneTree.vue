<template>
  <div>
    <div class="header">
      <div class="title">
        <p>场景树</p>
      </div>
      <div class="scene-add-btn" @mouseup="addScene">
        <img src="@/assets/images/main/right/editor_newscene_btn_dark.png" />
      </div>
    </div>
    <div class="scene-tree-main tree-content">
      <div class="node-item" v-for="item in nodes" :key="item">
        <SceneTreeNode :node="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, toRaw } from 'vue'
import SceneTreeNode from './SceneTreeNode.vue'

import { EventsBus } from '@/core/EventsBus'
import { useStore } from 'vuex'

import { reloadThreeDimensionScene, traverseFindNodeById } from '@/core/3d/util'
import { clone } from '@/share/util/base'

export default defineComponent({
  name: 'SceneTree',
  components: {
    SceneTreeNode
  },
  setup() {
    const store = useStore()
    // 新增场景
    const addScene = () => {
      const e = event as any
      if (e.button != 0) return
      EventsBus.emit('sceneAdded', {})
    }

    // trees: {threeDimension, twoDimension}
    const nodes = computed<any>({
      get() {
        return store.state.pageTreeNodes
      },
      set(val) {
        return (store.state.pageTreeNodes = val)
      }
    })

    // 初始化场景/页
    EventsBus.on('sceneLoaded', (e: any) => {
      if (e.type === '3d') {
        nodes.value[0].children[0].trees = JSON.parse(JSON.stringify(toRaw(store.state.template)))
        store.state.threeDimensionContainer = e.container
      }

      console.log('初始化场景')
      console.log('tree',store.state.selectedSceneTreeNode.trees)
      console.log('parent',store.state.pageTreeNodes[store.state.selectedSceneTreeNode.parent])
      EventsBus.emit('pageEnter', {
        node: store.state.selectedSceneTreeNode,
        parent: store.state.pageTreeNodes[store.state.selectedSceneTreeNode.parent]
      })
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
      console.log('onMounted')
      console.log('tree',store.state.selectedSceneTreeNode)
      console.log('parent',store.state.pageTreeNodes[store.state.selectedSceneTreeNode.parent])
      EventsBus.emit('pageEnter', {
        node: store.state.selectedSceneTreeNode,
        parent: store.state.pageTreeNodes[store.state.selectedSceneTreeNode.parent]
      })
    })

    // 重置模板
    EventsBus.on('resetTemplate', () => {
      // reset sceneTree
      nodes.value = [
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
              trees: {}
            }
          ]
        }
      ]

      nodes.value[0].children[0].trees = JSON.parse(JSON.stringify(toRaw(store.state.template)))
      // reset store pageNode/SceneNode
      store.state.selectedSceneTreeNode = nodes.value[0].children[0]
      store.state.selectedPageTreeNode = null
    })

    return {
      nodes,
      addScene
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
.header {
  height: 64px;
  @apply w-full flex items-center justify-center relative;
}
.scene-add-btn {
  width: 16px;
  height: 16px;
  right: 24px;
  @apply flex items-center justify-center absolute cursor-pointer;
}
.tree-content {
  height: 50vh;
}
</style>
