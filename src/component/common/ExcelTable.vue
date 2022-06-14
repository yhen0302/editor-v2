<template>
  <div class="excel-table relative">
    <canvas
      class="excelEl"
      ref="excelEl"
      :width="canvasWidth"
      :height="canvasHeight"
      @wheel.stop="scrollExcel"
    ></canvas>

    <div class="scrollbar-y absolute">
      <slider-el
        v-model:value="scroll.y"
        direction="y"
        :max="90"
        :tip="false"
      ></slider-el>
    </div>
    <div class="scrollbar-x absolute">
      <slider-el v-model:value="scroll.x" :max="18" :tip="false"></slider-el>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import SliderEl from '@/component/common/SliderEl'

const letters = new Array(26)
  .fill()
  .map((item, index) => String.fromCharCode(65 + index))

export default {
  name: 'ExcelTable',
  components: { SliderEl },
  setup(props, context) {
    const excelEl = ref()
    const canvasWidth = ref(704)
    const canvasHeight = ref(340)
    const scroll = ref({
      x: 0,
      y: 0
    })
    let update = 'y'
    const tableData = [
      [1, 2, 3, 4, 5, 6, 7, 8],
      ['xxx', 234, 324, 'xxaa', 'sda'],
      ['lkk', '', 'sda', 'aaa', 'bbb', 'ccc']
    ]

    watch(
      () => scroll.value.x,
      (newVal, oldVal) => {
        update = 'x'
        draw()
      },
      {
        flush: 'sync'
      }
    )
    watch(
      () => scroll.value.y,
      (newVal, oldVal) => {
        update = 'y'
        draw()
      },
      {
        flush: 'sync'
      }
    )

    const widths = new Array(26).fill().map(() => 80)
    const heights = new Array(100).fill().map(() => 30)

    onMounted(() => {
      const ctx = excelEl.value.getContext('2d')
      const rect = excelEl.value.parentElement.getBoundingClientRect()
      canvasWidth.value = rect.width
      canvasHeight.value = rect.height
      draw(ctx)
    })

    function draw(ctx = excelEl.value.getContext('2d')) {
      ctx.fillStyle = '#2D333E'
      ctx.strokeStyle = '#212530'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillRect(0, 0, 60, 30)
      switch (update) {
        case 'x':
          ctx.clearRect(widths[0], 0, ctx.canvas.width, ctx.canvas.height)
          update = ''
          break
        case 'y':
          ctx.clearRect(0, heights[0], ctx.canvas.width, ctx.canvas.height)
          update = ''
          break
      }
      dragTableLegend(ctx)

      // window.requestAnimationFrame(draw.bind(null, ctx))
      // window.setTimeout(draw.bind(null, ctx), 100)
    }

    function dragTableLegend(ctx) {
      let offsetX = 61
      let offsetY = 31
      const height = heights.reduce((pre, next) => pre + next)
      const width = widths.reduce((pre, next) => pre + next)
      // cols
      for (let i = scroll.value.x; i < widths.length; i++) {
        // rect
        ctx.fillStyle = '#2D333E'
        ctx.fillRect(offsetX, 0, widths[i], 30)
        // text
        ctx.fillStyle = '#FFF'
        ctx.fillText(letters[i], offsetX + widths[i] / 2, 15, widths[i])
        // line
        ctx.moveTo(offsetX - 0.5, 0)
        ctx.lineTo(offsetX - 0.5, height)
        offsetX += widths[i] + 1
      }

      // rows
      for (let i = scroll.value.y; i < heights.length; i++) {
        // rect
        ctx.fillStyle = '#2D333E'
        ctx.fillRect(0, offsetY, 60, heights[i])
        // text
        ctx.fillStyle = '#FFF'
        ctx.fillText(i + 1, 30, offsetY + heights[i] / 2, heights[i])

        // line
        ctx.moveTo(0, offsetY - 0.5)
        ctx.lineTo(width, offsetY - 0.5)
        offsetY += heights[i] + 1
      }

      // table date render
      for (let i = 0; i < tableData.length; i++) {
        for (let j = 0; j < tableData[i].length; j++) {
          // pass
        }
      }

      ctx.stroke()
    }

    // ev
    function scrollExcel(ev) {
      if (ev.wheelDelta < 0) {
        scroll.value.y < 90 && scroll.value.y++
      } else {
        scroll.value.y && scroll.value.y--
      }
    }

    return {
      excelEl,
      canvasWidth,
      canvasHeight,
      scrollExcel,
      scroll
    }
  }
}
</script>

<style scoped>
.excel-table {
  width: 100%;
  height: 340px;
  /*background: #212530;*/
  background: #151619;
}

.excelEl {
}

.scrollbar-y {
  right: 5px;
  top: 320px;
  transform: rotate(90deg);
  transform-origin: right center;
  width: 300px;
}

.scrollbar-x {
  bottom: -10px;
  left: 65px;
  width: 90%;
}
</style>
