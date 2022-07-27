<template>
  <div class="node">
    <div class="scene-node" :class="node.selected ? 'scene-node-selected' : ''">
      <div
        class="spread-btn"
        :class="node.spread ? 'spread-btn-rotate' : ''"
        @mouseup="spread(node)"
      >
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

    <div
      v-if="node.type == 'scene' && node.spread && node.children && node.children.length > 0"
      class="page-nodes"
    >
      <div
        v-for="item in node.children"
        :key="item"
        class="page-node"
        :class="item.selected ? 'page-node-selected' : ''"
        @mouseup="selectPage(item)"
        @dblclick="enterPage(item, node)"
      >
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
import { defineComponent, nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import { EventsBus } from '@/core/EventsBus'
import { AnyColumns } from 'element-plus/es/components/table-v2/src/types'

export default defineComponent({
  name: 'SceneTreeNode',
  props: ['node'],
  components: {},
  setup() {
    const store = useStore()

    const spread = (node: any) => {
      const e = event as any
      if (e.button != 0) return

      node.spread = !node.spread
    }

    const addPage = (node: any) => {
      const e = event as any
      if (e.button != 0) return

      EventsBus.emit('pageAdded', { node })
    }

    const selectPage = (page: any) => {
      const e = event as any
      if (e.button != 0) return

      EventsBus.emit('toolBarSelected', { node: {} })
      store.state.dimensionType = null
      store.state.selectBarToolType = ''
      nextTick(() => {
        store.state.addElementType = null
        store.state.dimensionType = '3d'

        page.trees.threeDimension.forEach((item: any) => {
          if (item.isEdit) {
            store.state.template.threeDimension.forEach((dev: any) => {
              if (item.uuid == dev.uuid) {
                const arrs: any = []
                dev.children.forEach((i: any) => {
                  let status: any = true
                  item.children.forEach((b: any) => {
                    if (i.uuid == b.uuid) {
                      status = false
                    }
                  })
                  if (status) {
                    arrs.push(JSON.parse(JSON.stringify(i)))
                  }
                })
                if (arrs.length > 0) {
                  item.children.push(...arrs)
                }
              }
            })
          }
        })
        page.trees.threeDimension.forEach((item: any) => {
          if (item.isEdit) {
            store.state.threeDimensionContainer.scene.children.forEach((child: any) => {
              if (child.name == item.name) {
                child.children.forEach((i: any) => {
                  let status = true
                  item.children.forEach((b: any) => {
                    if (i.uuid == b.uuid) {
                      status = false
                      i.visible = b.visible
                    }
                  })
                  if (status) {
                    i.visible = false
                  }
                })
              }
            })
          }

          if (item.uuid == 'MixerActionsUuid') {
            item.children.forEach((dev: any) => {
              store.state.threeDimensionContainer.mixerActions.forEach((ss: any) => {
                let name: any = ss._mixer.name + ss._mixer._root.uuid
                if (dev.uuid == name) {
                  ss.paused = dev.options.paused
                  ss.loop = dev.options.loop
                  ss.timeScale = dev.options.timeScale
                  ss.time = 0
                  ss.enabled = true
                }
              })
            })
          }
        })

        EventsBus.emit('pageSelected', { node: page })
        EventsBus.emit('toolBarSelected', { node: {} })
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
