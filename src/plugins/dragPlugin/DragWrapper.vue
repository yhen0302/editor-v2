<template>
  <section
    id="drag-wrapper"
    v-show="isActive"
    dragType="DRAG_MOVE"
    :style="toPx(rectProperties)"
    ref="dragEl"
    @click.stop.prevent
  >
    <!--  控制顶点缩放的四个圆点  -->
    <div
      class="circle nw-resize drag-wrapper_left drag-wrapper_top"
      dragType="DRAG_LEFT_TOP"
      v-show="!isDrag"
      v-memo="[isDrag, editorStore.drawingBoard.scale]"
      :ref="tempEls"
      :style="`transform:scale(${
        1 / editorStore.drawingBoard.scale
      });`"
    ></div>
    <div
      class="circle ne-resize drag-wrapper_right drag-wrapper_top"
      dragType="DRAG_RIGHT_TOP"
      v-show="!isDrag"
      v-memo="[isDrag, editorStore.drawingBoard.scale]"
      :ref="tempEls"
      :style="`transform:scale(${
        1 / editorStore.drawingBoard.scale
      });`"
    ></div>
    <div
      class="circle se-resize drag-wrapper_right drag-wrapper_bottom"
      dragType="DRAG_RIGHT_BOTTOM"
      v-show="!isDrag"
      v-memo="[isDrag, editorStore.drawingBoard.scale]"
      :ref="tempEls"
      :style="`transform:scale(${
        1 / editorStore.drawingBoard.scale
      });`"
    ></div>
    <div
      class="circle sw-resize drag-wrapper_left drag-wrapper_bottom"
      dragType="DRAG_LEFT_BOTTOM"
      v-show="!isDrag"
      v-memo="[isDrag, editorStore.drawingBoard.scale]"
      :ref="tempEls"
      :style="`transform:scale(${
        1 / editorStore.drawingBoard.scale
      });`"
    ></div>
    <!--  控制上下左右拖拽的四条边  -->
    <div
      class="border n-resize drag-wrapper_top"
      dragType="DRAG_TOP"
      v-memo="[editorStore.drawingBoard.scale]"
      :ref="tempEls"
      :style="`transform:scaleY(${
        1 / editorStore.drawingBoard.scale
      });`"
    ></div>
    <div
      class="border e-resize drag-wrapper_right"
      dragType="DRAG_RIGHT"
      v-memo="[editorStore.drawingBoard.scale]"
      :ref="tempEls"
      :style="`transform:scaleX(${
        1 / editorStore.drawingBoard.scale
      });`"
    ></div>
    <div
      class="border n-resize drag-wrapper_bottom"
      dragType="DRAG_BOTTOM"
      v-memo="[editorStore.drawingBoard.scale]"
      :ref="tempEls"
      :style="`transform:scaleY(${
        1 / editorStore.drawingBoard.scale
      });`"
    ></div>
    <div
      class="border e-resize drag-wrapper_left"
      dragType="DRAG_LEFT"
      v-memo="[editorStore.drawingBoard.scale]"
      :ref="tempEls"
      :style="`transform:scaleX(${
        1 / editorStore.drawingBoard.scale
      });`"
    ></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch } from 'vue'
import {
  toPx,
  findParentPathHasEl,
  computedElementsRect
} from '@/plugins/dragPlugin/util/util'
import { Ref } from '@vue/reactivity'
import { activeEl, isCalculating } from './index'
import { rectProperties } from '@/plugins/dragPlugin/convert'
import { EditorStore } from '@/store/type'
import { useState } from '@/store/helper'
import store from '@/store'

enum DRAG_STATUS {
  IDLE,

  DRAG_LEFT_TOP,
  DRAG_RIGHT_TOP,
  DRAG_RIGHT_BOTTOM,
  DRAG_LEFT_BOTTOM,

  DRAG_TOP,
  DRAG_RIGHT,
  DRAG_BOTTOM,
  DRAG_LEFT,

  DRAG_MOVE
}

export default defineComponent({
  name: 'DragWrapper',
  setup: function () {
    const app = getCurrentInstance()
    const isRunning = ref<boolean>(false)
    const dragStatus = ref<DRAG_STATUS>(DRAG_STATUS.IDLE)
    const isDrag = ref<boolean>(false)
    const editorStore = useState(store, 'global').state as any

    let dragEl: Ref<HTMLElement | null> = ref<HTMLElement | null>(null)

    const dragElList = ref<Array<HTMLElement>>([])
    let tempEls = (el: HTMLElement) => {
      ;(dragElList.value as Array<HTMLElement>).push(el)
    }

    init()

    function init() {
      let offsetX: number, offsetY: number, preX: number, preY: number

      listen()

      function listen() {
        // 监听的鼠标按下事件
        function wrapperDragDown(ev: MouseEvent) {
          isDrag.value = false
          let target: HTMLElement = ev.target as HTMLElement
          let dragType = target.getAttribute(
            'dragType'
          ) as keyof typeof DRAG_STATUS

          isRunning.value = verifyDragWrapperActive(target)

          if (isRunning.value) {
            dragStatus.value = DRAG_STATUS[dragType] || DRAG_STATUS.DRAG_MOVE
            preX = ev.pageX
            preY = ev.pageY
          }
          isDrag.value = dragStatus.value === DRAG_STATUS.DRAG_MOVE

          modifyMouseShape(getMouseShape(dragStatus.value))
        }

        // 监听的鼠标抬起事件
        function wrapperDragUp(ev: MouseEvent) {
          let target: HTMLElement = ev.target as HTMLElement
          isDrag.value = isRunning.value = false
          dragStatus.value = DRAG_STATUS.IDLE
          modifyMouseShape('auto')
          preX = preY = offsetY = offsetX = 0
        }

        // 监听的鼠标移动事件
        function wrapperDragMove(ev: MouseEvent) {
          let { pageX, pageY } = ev
          if (isRunning.value) {
            offsetX = pageX - preX
            offsetY = pageY - preY

            const scale = editorStore.drawingBoard.scale
            offsetX /= scale
            offsetY /= scale

            preX = pageX
            preY = pageY

            switch (dragStatus.value) {
              case DRAG_STATUS.DRAG_MOVE:
                dragMove()
                break
              case DRAG_STATUS.DRAG_RIGHT:
                dragRight()
                break
              case DRAG_STATUS.DRAG_BOTTOM:
                dragBottom()
                break
              case DRAG_STATUS.DRAG_LEFT:
                dragLeft()
                break
              case DRAG_STATUS.DRAG_TOP:
                dragTop()
                break
              case DRAG_STATUS.DRAG_LEFT_TOP:
                dragTop()
                dragLeft()
                break
              case DRAG_STATUS.DRAG_RIGHT_TOP:
                dragTop()
                dragRight()
                break
              case DRAG_STATUS.DRAG_RIGHT_BOTTOM:
                dragBottom()
                dragRight()
                break
              case DRAG_STATUS.DRAG_LEFT_BOTTOM:
                dragBottom()
                dragLeft()
                break
            }
          }
        }

        document.documentElement.addEventListener('mousedown', wrapperDragDown)
        document.documentElement.addEventListener('mouseup', wrapperDragUp)
        document.documentElement.addEventListener('mousemove', wrapperDragMove)
      }

      // 控制移动
      function dragMove() {
        rectProperties.left += offsetX
        rectProperties.top += offsetY
      }

      function dragRight() {
        // 边界处理
        if (rectProperties.width + offsetX < 0) {
          let wTemp = rectProperties.width
          rectProperties.width = Math.abs(offsetX) - wTemp
          rectProperties.left -= Math.abs(offsetX) - wTemp
          switch (dragStatus.value) {
            case DRAG_STATUS.DRAG_RIGHT:
              dragStatus.value = DRAG_STATUS.DRAG_LEFT
              break
            case DRAG_STATUS.DRAG_RIGHT_TOP:
              dragStatus.value = DRAG_STATUS.DRAG_LEFT_TOP
              break
            case DRAG_STATUS.DRAG_RIGHT_BOTTOM:
              dragStatus.value = DRAG_STATUS.DRAG_LEFT_BOTTOM
              break
          }
          modifyMouseShape(getMouseShape(dragStatus.value))
          return
        }

        rectProperties.width += offsetX
      }

      function dragLeft() {
        if (rectProperties.width - offsetX < 0) {
          let wTemp = rectProperties.width
          rectProperties.width = Math.abs(offsetX) - wTemp
          rectProperties.left += Math.abs(offsetX) - rectProperties.width
          switch (dragStatus.value) {
            case DRAG_STATUS.DRAG_LEFT:
              dragStatus.value = DRAG_STATUS.DRAG_RIGHT
              break
            case DRAG_STATUS.DRAG_LEFT_TOP:
              dragStatus.value = DRAG_STATUS.DRAG_RIGHT_TOP
              break
            case DRAG_STATUS.DRAG_LEFT_BOTTOM:
              dragStatus.value = DRAG_STATUS.DRAG_RIGHT_BOTTOM
              break
          }
          modifyMouseShape(getMouseShape(dragStatus.value))
          return
        }
        rectProperties.width -= offsetX
        rectProperties.left += offsetX
      }

      function dragTop() {
        if (rectProperties.height - offsetY < 0) {
          let hTemp = rectProperties.height
          rectProperties.height = Math.abs(offsetY) - hTemp
          rectProperties.top += Math.abs(offsetY) - rectProperties.height

          switch (dragStatus.value) {
            case DRAG_STATUS.DRAG_TOP:
              dragStatus.value = DRAG_STATUS.DRAG_BOTTOM
              break
            case DRAG_STATUS.DRAG_RIGHT_TOP:
              dragStatus.value = DRAG_STATUS.DRAG_RIGHT_BOTTOM
              break
            case DRAG_STATUS.DRAG_LEFT_TOP:
              dragStatus.value = DRAG_STATUS.DRAG_LEFT_BOTTOM
              break
          }

          modifyMouseShape(getMouseShape(dragStatus.value))

          return
        }

        rectProperties.height -= offsetY
        rectProperties.top += offsetY
      }

      function dragBottom() {
        if (rectProperties.height + offsetY < 0) {
          let hTemp = rectProperties.height
          rectProperties.height = Math.abs(offsetY) - hTemp
          rectProperties.top -= Math.abs(offsetY) - hTemp

          switch (dragStatus.value) {
            case DRAG_STATUS.DRAG_BOTTOM:
              dragStatus.value = DRAG_STATUS.DRAG_TOP
              break
            case DRAG_STATUS.DRAG_LEFT_BOTTOM:
              dragStatus.value = DRAG_STATUS.DRAG_LEFT_TOP
              break
            case DRAG_STATUS.DRAG_RIGHT_BOTTOM:
              dragStatus.value = DRAG_STATUS.DRAG_RIGHT_TOP
              break
          }
          modifyMouseShape(getMouseShape(dragStatus.value))
          return
        }
        rectProperties.height += offsetY
      }
    }

    function verifyDragWrapperActive(el: HTMLElement | null) {
      for (let aEl of activeEl.value) {
        if (findParentPathHasEl(el, aEl)) {
          return true
        }
      }
      return dragElList.value.includes(el as HTMLElement)
    }

    // 获取鼠标形态
    function getMouseShape(dragStatus: DRAG_STATUS): string {
      switch (dragStatus) {
        case DRAG_STATUS.DRAG_BOTTOM:
        case DRAG_STATUS.DRAG_TOP:
          return 'n-resize'
        case DRAG_STATUS.DRAG_LEFT:
        case DRAG_STATUS.DRAG_RIGHT:
          return 'e-resize'
        case DRAG_STATUS.DRAG_LEFT_TOP:
          return 'nw-resize'
        case DRAG_STATUS.DRAG_RIGHT_BOTTOM:
          return 'se-resize'
        case DRAG_STATUS.DRAG_RIGHT_TOP:
          return 'ne-resize'
        case DRAG_STATUS.DRAG_LEFT_BOTTOM:
          return 'sw-resize'
        default:
          return 'auto'
      }
    }

    // 修改鼠标形态
    function modifyMouseShape(dragType: string) {
      document.documentElement.style.cursor = dragType
    }

    const isActive = ref<boolean>(false)

    // 计算初始化wrapper的属性
    watch(
      () => activeEl.value,
      (els: HTMLElement[], oldEl) => {
        console.log(els.length)
        if (els.length) {
          isCalculating.value = true
          isActive.value = true
          let rect = computedElementsRect(els, 'css')
          for (let key of Object.keys(rectProperties)) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            rectProperties[key] = rect[key]
          }
          isCalculating.value = false
        } else isActive.value = false
      },
      { deep: true }
    )

    return {
      rectProperties,
      toPx,
      isRunning,
      isActive,
      isDrag,
      dragEl,
      tempEls,
      editorStore
    }
  }
})
</script>

<style scoped>
#drag-wrapper {
  --border-width: 2px;
  --circle-radius: 4px;
  pointer-events: none;
}

#drag-wrapper {
  position: absolute;
  will-change: left, top, width, height;
  z-index: 99999999;
}

.circle {
  z-index: 1;
  width: var(--circle-radius);
  height: var(--circle-radius);
  border-radius: var(--circle-radius);
}

.circle.nw-resize:hover {
  cursor: nw-resize;
}

.circle.ne-resize:hover {
  cursor: ne-resize;
}

.circle.se-resize:hover {
  cursor: se-resize;
}

.circle.sw-resize:hover {
  cursor: sw-resize;
}

.border.n-resize:hover {
  cursor: n-resize;
}

.border.e-resize:hover {
  cursor: e-resize;
}

.border.drag-wrapper_top,
.border.drag-wrapper_bottom {
  width: 100%;
  height: var(--border-width);
}

.border.drag-wrapper_left,
.border.drag-wrapper_right {
  width: var(--border-width);
  height: 100%;
}

.border,
.circle {
  position: absolute;
  /*will-change: left, top, width, height;*/
  pointer-events: auto;
  background: #bebeff;
}

.border.drag-wrapper_left {
  left: calc(var(--border-width) / 2 * -1);
}

.border.drag-wrapper_top {
  top: calc(var(--border-width) / 2 * -1);
}

.border.drag-wrapper_bottom {
  bottom: calc(var(--border-width) / 2 * -1);
}

.border.drag-wrapper_right {
  right: calc(var(--border-width) / 2 * -1);
}

.circle.drag-wrapper_left {
  left: calc(var(--circle-radius) / 2 * -1);
}

.circle.drag-wrapper_top {
  top: calc(var(--circle-radius) / 2 * -1);
}

.circle.drag-wrapper_bottom {
  bottom: calc(var(--circle-radius) / 2 * -1);
}

.circle.drag-wrapper_right {
  right: calc(var(--circle-radius) / 2 * -1);
}
</style>
