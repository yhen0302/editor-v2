<template>
  <div class="middle-main">
    <div class="drawing-board">
      <div ref="drawingBoard" :style="{ width: widthPx, height: heightPx, transform: `scale(${scale}%)`, left: `${(100 - scale) / 2}%`, top: `${(100 - scale) / 2}%` }">
        <DrawingBoard2D />
        <DrawingBoard3D />
      </div>
    </div>

    <div class="scroll-bar">
      <div class="scroll-x"></div>
      <div class="scroll-y"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'

import DrawingBoard2D from '@/components/2d/drawingboard/DrawingBoard2D.vue'
import DrawingBoard3D from '@/components/3d/drawingboard/DrawingBoard3D.vue'

export default defineComponent({
  name: 'Middle',
  components: {
    DrawingBoard2D,
    DrawingBoard3D
  },
  setup() {
    const drawingBoard: any = ref(null)

    const width = ref(1920)
    const height = ref(1080)
    const scale = ref(70)

    const widthPx = computed(() => width.value + 'px')
    const heightPx = computed(() => height.value + 'px')

    onMounted(() => {
      // console.log(drawingBoard.value.getBoundingClientRect())
    })

    return {
      drawingBoard,
      width,
      height,
      scale,
      widthPx,
      heightPx
    }
  }
})
</script>

<style lang="postcss" scoped>
.middle-main {
  @apply overflow-hidden w-full h-full relative;
}

.drawing-board {
  @apply absolute;
}
</style>
