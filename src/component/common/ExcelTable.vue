<template>
  <div class="excel-table">
    <canvas
      class="editor"
      ref="editor"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
const letters = new Array(26)
  .fill()
  .map((item, index) => String.fromCharCode(65 + index))

export default {
  name: 'ExcelTable',
  setup(props, context) {
    const editor = ref()
    const canvasWidth = ref()
    const canvasHeight = ref()

    const widths = new Array(27).fill().map(() => 80)
    const heights = new Array(101).fill().map(() => 30)
    widths[0] = 60
    onMounted(() => {
      const ctx = editor.value.getContext('2d')
      const rect = editor.value.parentElement.getBoundingClientRect()
      canvasWidth.value = rect.width
      canvasHeight.value = rect.height

      draw(ctx)
    })

    function draw(ctx) {
      ctx.fillStyle = '#2D333E'
      ctx.strokeStyle = '#212530'
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      dragTableLegend(ctx)
      window.requestAnimationFrame(draw.bind(null, ctx))
    }

    function dragTableLegend(ctx) {
      let offsetX = 0
      let offsetY = 0
      const height = heights.reduce((pre, next) => pre + next)
      const width = widths.reduce((pre, next) => pre + next)
      for (let i = 0; i < widths.length; i++) {
        const letterIndex = i - 1
        // rect
        ctx.fillStyle = '#2D333E'
        ctx.fillRect(offsetX, 0, widths[i], 30)
        // text
        if (letterIndex !== -1) {
          ctx.fillStyle = '#FFF'
          ctx.fillText(letters[letterIndex], offsetX+widths[i]/2, 15, widths[i])
        }
        // line
        ctx.moveTo(offsetX-.5, 0)
        ctx.lineTo(offsetX-.5, height)
        offsetX += widths[i] + 1
      }
      ctx.stroke()


      for (let i = 0; i < heights.length; i++) {
        // rect
        ctx.fillStyle = '#2D333E'
        ctx.fillRect(0, offsetY, 60, heights[i])
        // text
        if (i-1 !== -1) {
          ctx.fillStyle = '#FFF'
          ctx.fillText(i, 30, offsetY+heights[i]/2, heights[i])
        }
        // line
        ctx.moveTo(0, offsetY-.5)
        ctx.lineTo(width, offsetY-.5)
        offsetY += heights[i] + 1
      }
      ctx.stroke()


    }

    return {
      editor,
      canvasWidth,
      canvasHeight
    }
  }
}
</script>

<style scoped>
.excel-table {
  width: 100%;
  height: 400px;
  /*background: #212530;*/
  background: #151619;

}
.editor {
}
</style>
