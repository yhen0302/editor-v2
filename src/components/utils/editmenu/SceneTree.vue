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
    <div class="scene-tree-main tree-content" v-if="stateGlobal.sceneTreeNodes">
      <div class="node-item" v-for="item in stateGlobal.sceneTreeNodes" :key="item">
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
import { useMutation, useState } from '@/store/helper'

export default defineComponent({
  name: 'SceneTree',
  components: {
    SceneTreeNode
  },
  setup() {
    const store = useStore()

    const stateGlobal = useState(store, 'global')

    const mutationsGlobal = useMutation(store, 'global', ['ADD_SCENE_NODE', 'SCENE_TREE_LOADED'])

    // 新增场景
    const addScene = () => {
      const e = event as any
      if (e.button != 0) return
      mutationsGlobal.ADD_SCENE_NODE()
    }

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

    onMounted(() => {
      mutationsGlobal.SCENE_TREE_LOADED()
    })

    return {
      stateGlobal,
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
