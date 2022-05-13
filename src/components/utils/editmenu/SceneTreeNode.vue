<template>
  <div class="node">
    <div class="scene-node" :class="node.selected ? 'scene-node-selected' : ''" @mouseup="spread(node)">
      <div class="spread-btn" :class="node.spread ? 'animation-spread' : 'animation-packup'">
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

    <div v-if="node.spread && node.children && node.children.length > 0" class="page-nodes">
      <div v-for="item in node.children" :key="item" class="page-node" :class="item.selected ? 'page-node-selected' : ''" @mouseup="selectPage(item)" @dblclick="enterPage(item, node)">
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
import { defineComponent, ref } from 'vue'

import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'SceneTreeNode',
  props: ['node'],
  components: {},
  setup() {
    const spread = (node: any) => {
      const e = event as any
      if (e.button != 0) return

      node.spread = !node.spread
    }

    const addPage = (node: any) => {
      const e = event as any
      if (e.button != 0) return

      EventsBus.emit('pageAdded', {
        node
      })
    }

    const selectPage = (page: any) => {
      const e = event as any
      if (e.button != 0) return
      EventsBus.emit('pageSelected', {
        node: page
      })
    }

    const enterPage = (page: any, node: any) => {
      const e = event as any
      if (e.button != 0) return
      EventsBus.emit('pageEnter', {
        node: page,
        parent: node
      })
    }

    return {
      spread,
      addPage,
      selectPage,
      enterPage
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
  @apply cursor-pointer;
}
.scene-node-selected {
  background-color: #484848 !important;
}
.spread-btn {
  margin-left: 16px;
  margin-right: 5px;
}
.animation-spread {
  animation: animate-spread 0.1s;
  animation-fill-mode: forwards;
}
@keyframes animate-spread {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(90deg);
  }
}

.animation-packup {
  animation: animate-packup 0.1s;
  animation-fill-mode: forwards;
}
@keyframes animate-packup {
  0% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(0deg);
  }
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
  @apply absolute;
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
