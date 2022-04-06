<template>
  <div class="editor">
    <nav-bar></nav-bar>
    <section class="editor-area">
      <aside class="select-area h-full">
        <ul class="select-type-bar bg-gray-dark h-full">
          <li class="dimension-type-item text-blue">2d</li>

        </ul>
      </aside>
      <aside class="layer-option-area"></aside>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import NavBar from "./child/NavBar.vue"

/* 编辑器 */
export default defineComponent({
  name: 'Editor',
  components: {NavBar}
})
</script>

<style scoped>
.editor-area {
  margin-top: 4px;
  height: calc(100vh - 64px - 4px);
}

.select-type-bar {
  width: 64px;
  padding: 16px 4px;
  box-sizing: border-box;
}

.dimension-type-item {
  height: 24px;
}
</style>
