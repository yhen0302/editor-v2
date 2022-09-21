<template>
  <main class="main">
    <!--左侧工具栏-->
    <section class="left">
      <ToolBar />
    </section>
    <!--中间画板-->
    <section class="middle">
      <DrawingBoard />
    </section>
    <!--右侧操作菜单-->
    <section class="right relative" :class="{ 'is-right-fold': !isRightFold }">
      <!-- 折叠 -->
      <div class="fold-strip" :class="{ 'is-right-fold': !isRightFold }">
        <img src="~@/assets/images/fold-arrow.png" @click="isRightFold = !isRightFold" />
      </div>
      <EditMenu v-if="isRightFold" class="edit-menu-wrap" />
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    const isRightFold = ref(true)

    return {
      isRightFold
    }
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
  will-change: width;
  background-color: transparent;
  @apply flex flex-col h-full;
  width: 272px;
  transition: width 0.18s ease-out;
  overflow: hidden;
}

.right.is-right-fold {
  width: 10px;
  overflow: visible;
}

.edit-menu-wrap {
  transition: transform 0.18s ease-out;
}

.right-fold-enter-to,
.right-fold-leave-from {
  display: block;
  transform: matrix(1, 0, 0, 1, 272, 0);
}

.right-fold-enter-from,
.right-fold-leave-to {
  display: none;
  transform: matrix(1, 0, 0, 1, 0, 0);
}

.fold-strip.is-right-fold {
  transform: matrix(1, 0, 0, 1, 10px, 0);
}

.fold-strip.is-right-fold > img {
  transform: rotate(180deg);
}

.fold-strip.is-right-fold:hover {
  transform: matrix(1, 0, 0, 1, -30, 0);
}

.fold-strip {
  display: grid;
  place-content: center;
  position: absolute;
  @apply h-full;
  width: 40px;
  padding-right: 10px;
  transform: matrix(1, 0, 0, 1, -30, 0);
  left: 0;
  top: 0;
  z-index: 1000;
  transition: transform 0.18s ease-out;
}

.fold-strip:hover {
  transform: matrix(1, 0, 0, 1, 0, 0);
}
</style>
