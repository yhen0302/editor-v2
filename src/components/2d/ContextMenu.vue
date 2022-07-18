<template>
  <section class="context-menu-wrap" v-show="editorStore.contextmenu.show" :style="{ left: toPx(editorStore.contextmenu.x), top: toPx(editorStore.contextmenu.y) }">
    <ul class="context-menu-list">
      <li>移动到底层(Ctrl+alt+[)</li>
      <li>移动到顶层(Ctrl+alt+])</li>
      <li>移动到下一层(Ctrl+[)</li>
      <li @click='layerMoveUp'>移动到上一层(Ctrl+])</li>
      <li @click='cancelMarshalling2dNodesHandle'>取消分组(Ctrl+Shift+g)</li>
      <li @click='marshalling2dNodesHandle'>分组(Ctrl+g)</li>
      <li @click="deleteNodeHandle">删除图层(delete)</li>
    </ul>
  </section>
</template>

<script>
import { useStore } from 'vuex'
import { toPx } from '@/share/util/base'
import {
  cancelMarshalling2dNodesHandle,
  deleteNodeHandle, layerMoveUp,
  marshalling2dNodesHandle
} from '@/core/2d/features/hotKeyHandle'

export default {
  name: 'ContextMenu',
  setup() {
    const editorStore = useStore().state

    return {
      editorStore,
      toPx,
      // 快捷方式
      deleteNodeHandle,
      marshalling2dNodesHandle,
      cancelMarshalling2dNodesHandle,
      layerMoveUp
    }
  }
}
</script>

<style scoped>
.context-menu-wrap {
  @apply fixed;
  z-index: 222222;
  background: #25262d;
  border-radius: 5px;
  overflow: hidden;
  text-align: left;
  box-shadow: 0 0 5px 0 rgba(88, 88, 88, 0.5);
  font-size: 12px;
  width: 152px;
}
.context-menu-list > li {
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
}
.context-menu-list > li:hover {
  background: #6582fe;
}
</style>
