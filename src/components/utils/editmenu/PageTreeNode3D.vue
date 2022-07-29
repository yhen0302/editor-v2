<template>
  <div class="node">
    <div
      class="item"
      :class="node.selected ? 'item-selected' : ''"
      :style="'padding-left:' + node.index * 15 + 'px'"
      @mouseup="selectItem(node)"
    >
      <div
        class="spread-btn"
        :class="node.spread ? 'spread-btn-rotate' : ''"
        :style="node.children.length > 0 ? '' : 'margin-left: 10px'"
        @mouseup.stop="spread(node)"
      >
        <img
          src="@/assets/images/main/right/editor_unfold_icn_dark.png"
          v-show="node.children.length > 0"
        />
      </div>

      <div class="item-name">
        <p>{{ node.name }}</p>
      </div>

      <div
        class="item-visible-btn"
        @mouseup.stop="changeVisibility(node)"
        v-show="node.visible !== undefined"
      >
        <img v-show="node.visible" :src="visibleImg" />
        <img v-show="!node.visible" :src="inVisibleImg" />
      </div>
    </div>

    <div v-if="node.spread && node.children.length > 0" class="node-children">
      <div class="children-item" v-for="item in node.children" :key="item">
        <PageTreeNode3D :node="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import { EventsBus } from '@/core/EventsBus'
import { useStore } from 'vuex'
import { traverseResetSelectedOfNodes } from '../../../core/3d/util'

export default defineComponent({
  name: 'PageTreeNode3D',
  props: ['node'],
  components: {},
  setup() {
    const store = useStore()
    const visibleImg = ref(require('@/assets/images/main/right/editor_unseen_btn_dark.png'))
    const inVisibleImg = ref(require('@/assets/images/main/right/editor_seen_btn_dark.png'))

    const spread = (node: any) => {
      const e = event as any
      if (e.button != 0) return

      node.spread = !node.spread
    }

    const changeVisibility = (node: any) => {
      const e = event as any
      if (e.button != 0) return

      node.visible = !node.visible

      store.state.threeDimensionContainer.scene.children.forEach((c: any) => {
        if (c.traverse)
          c.traverse((gc: any) => {
            if (gc.uuid === node.uuid) gc.visible = node.visible
          })
      })
    }

    const selectItem = (nodes: any) => {
      const e = event as any
      if (e.button != 0) return

      if (nodes.isEdit) {
        store.state.addElementType = null
        EventsBus.emit('treeSelected', { node: { selected: true, type: 'None' } })
        EventsBus.emit('navDetailsValidate', {})

        EventsBus.emit('toolBarSelected', { node: {} })
        store.state.dimensionType = null
        store.state.selectBarToolType = ''
        nextTick(() => {
          store.state.addElementType = null
          store.state.dimensionType = '3d'
        })
      } else {
        if (nodes.addMeshType) {
          const flag = nodes.selected
          traverseResetSelectedOfNodes(store.state.selectedSceneTreeNode.trees.threeDimension)
          nodes.selected = !flag
          store.state.selectedPageTreeNode = nodes.selected ? e.node : null

          store.state.addElementType = {
            mesh: null,
            moving: true,
            lightMesh: null
          }
          if (nodes.addMeshType == 'Text') {
            const node = {
              type: 'text3D',
              selected: nodes.options.type,
              name: nodes.name,
              clickObj: nodes
            }
            EventsBus.emit('toolBarSelected', { node })
          } else if (nodes.addMeshType == 'Icon') {
            const node = { type: 'icon3D', selected: nodes.name, name: nodes.name, clickObj: nodes }
            EventsBus.emit('toolBarSelected', { node })
          } else if (nodes.addMeshType == 'FlyLine') {
            const node = {
              type: 'flyLine',
              selected: nodes.name,
              name: nodes.name,
              clickObj: nodes
            }
            EventsBus.emit('toolBarSelected', { node })
          } else if (nodes.addMeshType == 'MixerActions') {
            const node = {
              type: 'MixerActions',
              selected: true,
              name: nodes
            }
            EventsBus.emit('toolBarSelected', { node })
          }
        } else {
          const node = nodes
          store.state.addElementType = null
          EventsBus.emit('treeSelected', { node })
          EventsBus.emit('navDetailsValidate', {})
        }
      }
    }

    return {
      spread,
      visibleImg,
      inVisibleImg,
      changeVisibility,
      selectItem
    }
  }
})
</script>

<style lang="postcss" scoped>
.node {
  min-height: 32px;
  @apply w-full h-auto flex flex-col;
}
.item {
  height: 32px;
  @apply w-full relative flex items-center;
}
.item:hover {
  background-color: rgba(50, 52, 64, 1);
}
.item-selected {
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
.item-name {
  width: 140px;
  max-width: 140px;
}
.item-name p {
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
.item-visible-btn {
  width: 16px;
  height: 16px;
  right: 16px;
  @apply absolute cursor-pointer;
}
.item-visible-btn img {
  width: 16px;
  height: 16px;
}
</style>
