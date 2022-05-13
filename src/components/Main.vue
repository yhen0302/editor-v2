<template>
  <div class="main">
    <!--左侧工具栏-->
    <section class="left">
      <ToolBar />
    </section>
    <!--中间画板-->
    <section class="middle">
      <DrawingBoard />
    </section>
    <!--右侧操作菜单-->
    <section class="right">
      <EditMenu />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ToolBar from './ToolBar.vue'
import DrawingBoard from './DrawingBoard.vue'
import EditMenu from './EditMenu.vue'

export default defineComponent({
  name: 'Main',
  components: {
    ToolBar,
    DrawingBoard,
    EditMenu
  },
  setup() {
    //
  }
})
</script>

<style lang="postcss" scoped>
.main {
  padding-top: 4px;
  height: calc(100vh - 64px);
  @apply flex justify-between w-full select-none;
}
.left {
  width: 64px;
  @apply h-full flex bg-gray-dark z-20;
}
.middle {
  width: calc(100vw - 64px - 272px);
  @apply z-10;
}
.right {
  background-color: transparent;
  @apply flex flex-col h-full;
  width: 272px;
}
</style>
