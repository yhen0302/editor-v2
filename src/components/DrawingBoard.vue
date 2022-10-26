<template>
  <div class="middle-main">
    <div
      class="drawing-board-container art-board-wrapper"
      ref="drawingBoardContainer"
      @click="clean2dSelectedNode()"
      v-dropable
      :style="{ width: containerWidthPx, height: containerHeightPx, transform: `translate(${drawingBoardContainerX}px,${drawingBoardContainerY}px)` }"
    >
      <div
        class="drawing-board-utils"
        :style="{
          width: `${stateGlobal.drawingBoard.width * stateGlobal.drawingBoard.scale}px`,
          height: '48px',
          left: '292px'
        }"
      >
        <div class="util-add-mode" v-show="state3D.mode">
          <ElButton color="#5475FF" type="primary">ESC退出打点模式</ElButton>
        </div>
      </div>
      <div
        class="drawing-board-size"
        :style="{
          width: `${stateGlobal.drawingBoard.width * stateGlobal.drawingBoard.scale}px`,
          height: '32px',
          left: '292px',
          top: '32px'
        }"
      >
        <p>{{ stateGlobal.drawingBoard.width }} x {{ stateGlobal.drawingBoard.height }}</p>
      </div>
      <div
        class="drawing-board"
        ref="drawingBoard"
        :style="{
          width: widthPx,
          height: heightPx,
          transform: `scale(${stateGlobal.drawingBoard.scale * 100}%) translate(${(-(1 - stateGlobal.drawingBoard.scale) / (2 * stateGlobal.drawingBoard.scale)) * stateGlobal.drawingBoard.width}px,${
            (-(1 - stateGlobal.drawingBoard.scale) / (2 * stateGlobal.drawingBoard.scale)) * stateGlobal.drawingBoard.height
          }px)`,
          left: '292px',
          top: '64px'
        }"
      >
        <DrawingBoard2D />
        <DrawingBoard3D />
      </div>
    </div>
    <div class="scroll-bar scroll-x" ref="scrollX">
      <div class="scroll-x-item" ref="scrollXItem"></div>
    </div>
    <div class="scroll-bar scroll-y" ref="scrollY">
      <div class="scroll-y-item" ref="scrollYItem"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

import DrawingBoard2D from '@/components/2d/ArtBoard2DContent.vue'
import DrawingBoard3D from '@/components/3d/drawingboard/DrawingBoard3D.vue'
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'

import { ElButton } from 'element-plus'

export default defineComponent({
  name: 'Middle',
  components: {
    DrawingBoard2D,
    DrawingBoard3D
  },
  setup() {
    const drawingBoard: any = ref(null)
    const drawingBoardContainer: any = ref(null)
    const drawingBoardContainerX = ref(0)
    const drawingBoardContainerY = ref(0)

    const store = useStore()
    const stateGlobal = useState(store, 'global')
    const state3D = useState(store, '3d')
    const mutations2D = useMutation(store, '2d', ['CLEAR_SELECT_2D_NODES'])
    const { width, height, scale } = stateGlobal.drawingBoard

    const widthPx = computed(() => width + 'px')
    const heightPx = computed(() => height + 'px')

    const containerWidthPx = computed(() => (width * scale) / (25 / 100) + 'px')
    const containerHeightPx = computed(() => (height * scale) / (25 / 100) + 'px')

    // scroll bars/items
    const scrollX: any = ref(null)
    const scrollXItem: any = ref(null)
    const scrollY: any = ref(null)
    const scrollYItem: any = ref(null)
    // drag flag
    let scrollXFlag = false
    let scrollYFlag = false
    // coordinates
    let x = 0,
      y = 0

    onMounted(() => {
      // **************** scrollbar func start ****************
      scrollXItem.value.addEventListener('mousedown', (e: MouseEvent) => {
        scrollXFlag = true
        x = e.clientX - scrollXItem.value.offsetLeft
      })

      scrollYItem.value.addEventListener('mousedown', (e: MouseEvent) => {
        scrollYFlag = true
        y = e.clientY - scrollYItem.value.offsetTop
      })

      const scrollWidthX: any = scrollX.value.clientWidth
      const scrollHeightY: any = scrollY.value.clientHeight

      const scrollItemWidthX: any = scrollXItem.value.clientWidth
      const scrollItemHeightY: any = scrollYItem.value.clientHeight

      document.addEventListener('mousemove', (e: MouseEvent) => {
        if (scrollXFlag) {
          let moveX = e.clientX - x > 0 ? e.clientX - x : 0 //得到距离左边移动距离
          moveX = moveX < scrollWidthX - scrollItemWidthX ? moveX : scrollWidthX - scrollItemWidthX
          scrollXItem.value.style.left = (100 * moveX) / scrollWidthX + '%'
          // container translate X
          drawingBoardContainerX.value = ((0.375 - moveX / scrollWidthX) * (width * scale)) / (25 / 100)
        } else if (scrollYFlag) {
          let moveY = e.clientY - y > 0 ? e.clientY - y : 0 //得到距离上边移动距离
          moveY = moveY < scrollHeightY - scrollItemHeightY ? moveY : scrollHeightY - scrollItemHeightY
          scrollYItem.value.style.top = (100 * moveY) / scrollHeightY + '%'
          // container translate Y
          drawingBoardContainerY.value = ((0.375 - moveY / scrollHeightY) * (height * scale)) / (25 / 100)
        }
      })

      document.addEventListener('mouseup', () => {
        scrollXFlag = false
        scrollYFlag = false
      })
      // **************** scrollbar func end ****************
    })

    function clean2dSelectedNode() {
      mutations2D.CLEAR_SELECT_2D_NODES()
    }
    return {
      drawingBoard,
      drawingBoardContainer,
      drawingBoardContainerX,
      drawingBoardContainerY,
      widthPx,
      heightPx,
      containerWidthPx,
      containerHeightPx,
      scrollX,
      scrollY,
      scrollXItem,
      scrollYItem,
      stateGlobal,
      state3D,
      clean2dSelectedNode
    }
  }
})
</script>

<style lang="postcss" scoped>
.middle-main {
  @apply overflow-hidden w-full h-full relative;
}
.drawing-board-container {
  @apply relative;
}
.drawing-board-utils {
  left: 0;
  top: 0;
  @apply absolute flex items-center;
}
.util-add-mode {
}
.drawing-board-size {
  left: 0;
  top: 0;
  @apply absolute flex justify-end items-center;
}
.drawing-board-size p {
  color: #b6b8cc;
  @apply text-14;
}
.drawing-board {
  left: 0;
  top: 0;
  background-color: tan;
  @apply absolute;
}
.scroll-bar {
  @apply absolute;
}
.scroll-x {
  height: 10px;
  bottom: 0;
  left: 0;
  background: transparent;
  @apply w-full;
}
.scroll-x-item {
  width: 25%;
  left: 37.5%;
  height: 6px;
  background: #d2d2d8;
  border-radius: 4px;
  @apply absolute cursor-pointer;
}
.scroll-y {
  width: 10px;
  right: 0;
  top: 0;
  background: transparent;
  @apply h-full;
}
.scroll-y-item {
  height: 25%;
  top: 37.5%;
  width: 6px;
  background: #d2d2d8;
  border-radius: 4px;
  @apply absolute cursor-pointer;
}
</style>
