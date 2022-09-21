<template>
  <section class="excel-table relative">
    <canvas
      class="excel-el"
      ref="excelEl"
      :width="canvasWidth"
      :height="canvasHeight"
      @wheel.stop="scrollExcel"
      @mousedown.stop="selectCell"
      @dblclick.stop="editCell"
      contenteditable="true"
      @keydown.stop.delete="hotKeyDeleteHandle"
    ></canvas>

    <div class="scrollbar-y absolute">
      <slider-el v-model:value="scroll.y" direction="y" :max="90" :tip="false"></slider-el>
    </div>
    <div class="scrollbar-x absolute">
      <slider-el v-model:value="scroll.x" :max="18" :tip="false"></slider-el>
    </div>
    <div class="editor-inp-wrap absolute" :style="toPx(editInpRect)" v-show="showEditInp">
      <input type="text" class="editor-inp block w-full h-full" ref="editInp" v-model="inpVal" @blur="showEditInp = false" @keyup.stop @keydown.stop />
    </div>
  </section>
</template>

<script lang="ts">
import { computed, nextTick, onMounted, onUnmounted, onUpdated, Ref, ref, watch } from 'vue'
import SliderEl from './SliderEl.vue'
import { clone, toPx } from '@/share/util/base'
import { WatchOptions } from '@vue/runtime-core'

const letters = new Array(26).fill().map((item, index) => String.fromCharCode(65 + index))

export default {
  name: 'ExcelTable',
  components: { SliderEl },

  props: {
    canvasWidth: { type: Number, default: 704 },
    canvasHeight: { type: Number, default: 340 },
    data: { type: Array, default: () => [] }
  },
  setup(props, context) {
    const excelEl = ref()
    const defaultOffsetX = 61
    const defaultOffsetY = 31
    const scroll = ref({
      x: 0,
      y: 0
    })
    let update = ''

    const widths = new Array(26).fill().map(() => 80)
    const heights = new Array(100).fill().map(() => 30)

    onMounted(() => {
      const ctx = excelEl.value.getContext('2d')
      draw(ctx)
    })

    function draw(ctx = excelEl.value.getContext('2d')) {
      ctx.fillStyle = '#2D333E'
      ctx.strokeStyle = '#212530'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.font = '16px serif'
      // console.log('draw')
      // debugger
      // console.log(update)
      switch (update) {
        case 'x':
          ctx.clearRect(widths[0], 0, ctx.canvas.width, ctx.canvas.height)
          update = ''
          break
        case 'y':
          ctx.clearRect(0, heights[0], ctx.canvas.width, ctx.canvas.height)
          update = ''
          break
        default:
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      }
      ctx.fillRect(0, 0, 60, 30)
      drawTableLegend(ctx)

      // window.requestAnimationFrame(draw.bind(null, ctx))
      // window.setTimeout(draw.bind(null, ctx), 100)
    }

    function drawTableLegend(ctx) {
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
        ctx.fillText(letters[i], offsetX + widths[i] / 2, 15)
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
        ctx.fillText(i + 1, 30, offsetY + heights[i] / 2)

        // line
        ctx.moveTo(0, offsetY - 0.5)
        ctx.lineTo(width, offsetY - 0.5)
        offsetY += heights[i] + 1
      }

      let dataOffsetX = defaultOffsetX
      let dataOffsetY = defaultOffsetY

      function computedValidRangeForText(text, containerWidth, ctx, fontSize = 16, isEllipsis = true) {
        const m = ctx.measureText(text)
        // overflow
        if (m.width < containerWidth) return text
        if (isEllipsis) containerWidth -= (fontSize / 2) * 3
        let res = '',
          i = 0
        // eslint-disable-next-line no-control-regex
        const reg = /([\u0000-\u00FF]*)([^\u0000-\u00FF]*)/g
        while (i < text.length) {
          //pass
          const matcher = reg.exec(text)
          const otherCharMsg = ctx.measureText(matcher![2])
          const c = (subText, index, num) => {
            if (ctx.measureText(subText).width > containerWidth) {
              res += text.substr(index, Math.floor(containerWidth / num))
              return true
            }
            res += text.substr(index, subText.length)
            i += subText.length
            containerWidth -= subText.length * num
          }
          if (c(matcher![1], matcher.index, fontSize / 2) || c(matcher![2], matcher.index + matcher![1].length, fontSize)) break
        }
        return isEllipsis ? res + '...' : res
      }
      // table date render
      // 解析行
      for (let i = 0; i < props.data.length; i++) {
        if (scroll.value.y <= i) {
          // 解析列
          if (props.data[i]) {
            for (let j = 0; j < props.data[i].length; j++) {
              const t = computedValidRangeForText(props.data[i][j], widths[i + scroll.value.x] - 4, ctx)

              if (scroll.value.x <= j) {
                if (props.data[i][j] !== undefined)
                  ctx.fillText(
                    t,
                    dataOffsetX + widths[i] / 2,
                    dataOffsetY + heights[j] / 2
                    // widths[i + scroll.value.x]
                  )
                dataOffsetX += widths[i] + 1
              }
            }
          }
          dataOffsetY += heights[i] + 1
        }
        dataOffsetX = 61
      }

      ctx.stroke()
    }

    // scroll
    const sync: WatchOptions = { flush: 'sync' }
    ;['x', 'y'].forEach((k) => {
      watch(
        () => scroll.value[k],
        (newVal, oldVal) => {
          update = k
          draw()
        },
        sync
      )
    })
    function scrollExcel(ev) {
      if (ev.wheelDelta < 0) {
        scroll.value.y < 90 && scroll.value.y++
      } else {
        scroll.value.y && scroll.value.y--
      }
    }

    // selector
    type SelectType = 'NULL' | 'ROW' | 'COL' | 'NODE'
    const selectType: Ref<SelectType> = ref<SelectType>('NULL')
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
      const flagL = left < 0
      const flagT = top < 0
      if (flagL && flagT) selectType.value = 'NULL'
      else if (flagL) selectType.value = 'ROW'
      else if (flagT) selectType.value = 'COL'
      else selectType.value = 'NODE'
      if (flagL && flagT) return selectorRect.value

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
        left: flagL ? defaultOffsetX : left,
        top: flagT ? defaultOffsetY : top,
        width: flagL ? widths.reduce((pre, item) => pre + item) : widths[i],
        height: flagT ? heights.reduce((pre, item) => pre + item) : heights[i],
        i,
        j
      }
    }
    function selectCell(ev) {
      excelEl.value.focus()
      hiddenInp()
      const cellRect = findCellRectByXY(ev.offsetX, ev.offsetY)
      for (const key of Object.keys(cellRect)) {
        selectorRect.value[key] = cellRect[key]
      }
    }
    function selectorRectChange(newVal, oldVal) {
      const ctx = excelEl.value.getContext('2d')
      draw(ctx)
      if (selectType.value === 'NULL') return
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
        return props.data?.[selectorRect.value.j]?.[selectorRect.value.i]
      },
      set(newVal) {
        // eslint-disable-next-line vue/no-mutating-props
        context.emit('update:data', [selectorRect.value.j, selectorRect.value.i, isNaN(newVal) ? newVal : Number(newVal)])
        // props.data[selectorRect.value.j][selectorRect.value.i] = newVal
      }
    })
    function hiddenInp() {
      showEditInp.value = false
    }
    function editCell(ev) {
      const rect = findCellRectByXY(ev.offsetX, ev.offsetY)
      if (rect.i === selectorRect.value.i && rect.j === selectorRect.value.j) {
        showEditInp.value = true
        Object.keys(editInpRect.value).forEach((key) => (editInpRect.value[key] = rect[key]))
        nextTick().then(() => editInp.value.focus())
      }
    }

    // keyHandle
    function hotKeyDeleteHandle() {
      switch (selectType.value) {
        case 'ROW':
          // eslint-disable-next-line vue/no-mutating-props
          props.data.splice(selectorRect.value.j, 1)
          break
        case 'COL':
          // eslint-disable-next-line vue/no-mutating-props
          props.data.forEach((item) => {
            item.splice(selectorRect.value.i, 1)
          })
          break
        case 'NODE':
          // eslint-disable-next-line vue/no-mutating-props
          props.data[selectorRect.value.j][selectorRect.value.i] = 0
      }
      // reset selector
      selectorRect.value.left = -1
      selectorRect.value.top = -1
      // reset selectType
      selectType.value = 'NULL'
      draw()
    }

    return {
      excelEl,
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
      showEditInp,
      hotKeyDeleteHandle
    }
  }
}
</script>

<style scoped>
.excel-el {
  outline: none;
  cursor: pointer;
}
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
