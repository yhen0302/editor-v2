<template>
  <section class="excel-table relative">
    <canvas
      class="excel-el"
      ref="excelEl"
      :width="canvasWidth"
      :height="canvasHeight"
      @wheel.stop="scrollExcel"
      @mousedown.stop="selectCell"
      @click.stop="showEditInp = false"
      @dblclick.stop="editCell"
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
    <div
      class="editor-inp-wrap absolute"
      :style="toPx(editInpRect)"
      v-show="showEditInp"
    >
      <input
        type="text"
        class="editor-inp block w-full h-full"
        ref="editInp"
        v-model="inpVal"
      />
    </div>
  </section>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import SliderEl from '@/component/common/SliderEl'
import { toPx } from '@/util/base'

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
    const defaultOffsetX = 61
    const defaultOffsetY = 31
    const scroll = ref({
      x: 0,
      y: 0
    })
    let update = 'y'
    const tableData = [
      [1, 2, 3, 4, 5, 6, 7, 8, 'xxx', 'sdasd', 'skkk', 'ddd', 'fff'],
      ['xxx', 234, 324, 'xxaa', 'sda'],
      ['lkk', 'xx', 'sda', 'aaa', 'bbb', 'ccc'],
      ['lkk', '', 'sda', 'aaa', 'bbb', 'ccc'],
      ['lkk', 'bb', 'sda', 'aaa', 'bbb', 'ccc'],
      ['lkk', '12', 'sda', 'aaa', 'bbb', 'ccc'],
      ['lkk', '231', 'sda', 'aaa', 'bbb', 'ccc'],
      ['lkk', '3424', 'sda', 'aaa', 'bbb', 'ccc'],
      ['222']
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
      let offsetX = defaultOffsetX
      let offsetY = defaultOffsetY
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

      let dataOffsetX = defaultOffsetX
      let dataOffsetY = defaultOffsetY

      // table date render
      // 解析行
      for (let i = 0; i < tableData.length; i++) {
        if (scroll.value.y <= i) {
          // 解析列
          for (let j = 0; j < tableData[i].length; j++) {
            // pass
            if (scroll.value.x <= j) {
              ctx.fillText(
                tableData[i][j],
                dataOffsetX + widths[i] / 2,
                dataOffsetY + heights[j] / 2,
                widths[i + scroll.value.x]
              )
              dataOffsetX += widths[i] + 1
            }
          }

          dataOffsetY += heights[i] + 1
        }
        dataOffsetX = 61
      }

      ctx.stroke()
    }

    // scroll
    function scrollExcel(ev) {
      if (ev.wheelDelta < 0) {
        scroll.value.y < 90 && scroll.value.y++
      } else {
        scroll.value.y && scroll.value.y--
      }
    }

    // selector
    const selectorRect = ref({
      width: 80,
      height: 30,
      top: 31,
      left: 61,
      i: 0,
      j: 0 // 记录选中节点的坐标位置
    })
    function findCellRectByXY(x, y) {
      let left = x - defaultOffsetX
      let top = y - defaultOffsetY
      let i = scroll.value.x
      let j = scroll.value.y
      while (left > widths[i]) {
        left -= widths[i] + 1
        i++
      }
      while (top > heights[j]) {
        top -= heights[j] + 1
        j++
      }
      left = x - left
      top = y - top

      return {
        left,
        top,
        width: widths[i],
        height: heights[i],
        i,
        j
      }
    }
    function selectCell(ev) {
      const cellRect = findCellRectByXY(ev.offsetX, ev.offsetY)
      // update = cellRect.left < 100 ? 'y' : 'x'
      for (let key of Object.keys(cellRect)) {
        selectorRect.value[key] = cellRect[key]
      }
    }
    function selectorRectChange(newVal, oldVal) {
      const ctx = excelEl.value.getContext('2d')
      update = 'y'
      draw(ctx)
      ctx.strokeStyle = '#6582FE'
      ctx.lineWidth = 2
      ctx.strokeRect(newVal.left, newVal.top, newVal.width, newVal.height)
    }
    watch(() => selectorRect.value, selectorRectChange, { deep: true })

    // edit
    const editInp = ref()
    const showEditInp = ref(false)
    const editInpRect = ref({
      width: 0,
      height: 0,
      left: 0,
      top: 0
    })
    const inpVal = computed({
      get() {
        return tableData?.[selectorRect.value.j]?.[selectorRect.value.i]
      },
      set(newVal) {
        if (tableData?.[selectorRect.value.j]?.[selectorRect.value.i]!==undefined)
          tableData[selectorRect.value.j][selectorRect.value.i] = newVal
      }
    })

    function editCell(ev) {
      const rect = findCellRectByXY(ev.offsetX, ev.offsetY)
      if (rect.i === selectorRect.value.i && rect.j === selectorRect.value.j) {
        showEditInp.value = true
        Object.keys(editInpRect.value).forEach(
          (key) => (editInpRect.value[key] = rect[key])
        )
        nextTick().then(() => editInp.value.focus())
      }
    }

    return {
      excelEl,
      canvasWidth,
      canvasHeight,
      toPx,
      // scroll
      scroll,
      scrollExcel,
      //select
      selectCell,
      selectorRect,
      editCell,
      // edit
      editInpRect,
      editInp,
      inpVal,
      showEditInp
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

.editor-inp {
  background: #151619;
}
</style>
