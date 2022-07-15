<template>
  <section class='context-menu-wrap' v-show='editorStore.contextmenu'>
    <ul class='context-menu-list'>
      <li>裁剪</li>
    </ul>
  </section>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'ContextMenu',
  setup() {
    const editorStore= useStore().state
    return {
      editorStore
    }
  }
}
</script>

<style scoped>
.context-menu-wrap{
  @apply fixed;
  z-index: 222222;
}
</style>
