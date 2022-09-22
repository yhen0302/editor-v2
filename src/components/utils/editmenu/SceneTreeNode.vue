<template>
  <div class="node">
    <div class="scene-node" :class="node.selected ? 'scene-node-selected' : ''">
      <div class="spread-btn" :class="node.spread ? 'spread-btn-rotate' : ''" @mouseup="spread(node)">
        <img src="@/assets/images/main/right/editor_unfold_icn_dark.png" />
      </div>

      <div class="scene-icon">
        <img src="@/assets/images/main/right/editor_scene_icn_dark.png" />
      </div>

      <div class="scene-name">
        <p>{{ node.name }}</p>
      </div>

      <div class="scene-add-btn" @mouseup.stop="addPage(node)" v-if="node.selected">
        <img src="@/assets/images/main/right/editor_newpage_btn_dark.png" />
      </div>
    </div>

    <div v-if="node.type == 'scene' && node.spread && node.children && node.children.length > 0" class="page-nodes">
      <div v-for="item in node.children" :key="item" class="page-node" :class="item.selected ? 'page-node-selected' : ''" @mouseup="selectPage(item)">
        <div class="page-icon">
          <img src="@/assets/images/main/right/editor_page_icn_dark.png" />
        </div>

        <div class="page-name">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useMutation } from '@/store/helper'
import { PageTreeNode, SceneTreeNode } from '@/store'

export default defineComponent({
  name: 'SceneTreeNode',
  props: ['node'],
  components: {},
  setup() {
    const store = useStore()
    const mutationsGlobal = useMutation(store, 'global', ['SELECT_PAGE_NODE', 'ADD_PAGE_NODE'])

    const spread = (node: SceneTreeNode) => {
      const e = event as any
      if (e.button != 0) return

      node.spread = !node.spread
    }

    const addPage = (node: SceneTreeNode) => {
      const e = event as any
      if (e.button != 0) return

      mutationsGlobal.ADD_PAGE_NODE({ selectedSceneTreeNode: node })
    }

    const selectPage = (page: PageTreeNode) => {
      const e = event as any
      if (e.button != 0) return
      if (page.selected) return

      mutationsGlobal.SELECT_PAGE_NODE({ selectedPageTreeNode: page })
    }

    return {
      spread,
      addPage,
      selectPage
    }
  }
})
</script>

<style lang="postcss" scoped>
.node {
  min-height: 32px;
  @apply w-full h-auto flex flex-col;
}
.scene-node {
  height: 32px;
  @apply w-full relative flex items-center;
}
.scene-node:hover {
  background-color: rgba(50, 52, 64, 1);
}
.scene-node-selected {
  background-color: #484848 !important;
}
.spread-btn {
  margin-left: 16px;
  margin-right: 5px;
  @apply cursor-pointer;
}
.spread-btn-rotate {
  transform: rotate(90deg);
}

.scene-icon {
  margin-right: 8px;
}
.scene-name {
  width: 140px;
  max-width: 140px;
}
.scene-name p {
  width: 140px;
  max-width: 140px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}
.scene-add-btn {
  width: 16px;
  height: 16px;
  right: 16px;
  @apply absolute cursor-pointer;
}
.scene-add-btn img {
  width: 16px;
  height: 16px;
}

.page-nodes {
  @apply w-full h-auto flex flex-col;
}
.page-node {
  height: 32px;
  @apply w-full flex items-center;
}
.page-node:hover {
  background-color: rgba(50, 52, 64, 1);
}
.page-node-selected {
  background-color: rgba(101, 130, 254, 1) !important;
}
.page-icon {
  margin-left: 56px;
  margin-right: 8px;
}
.page-name {
  width: 140px;
  max-width: 140px;
}
.page-name p {
  width: 140px;
  max-width: 140px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}
</style>
