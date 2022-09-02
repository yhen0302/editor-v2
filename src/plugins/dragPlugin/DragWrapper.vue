<template>
  <section
    id="drag-wrapper"
    v-show="isActive && isShow"
    dragType="DRAG_MOVE"
    :style="{ ...dragElStyle }"
    ref="dragEl"
    @click.stop.prevent
  >
    <!--  控制顶点缩放的四个圆点  -->
    <div
      class="circle nw-resize drag-wrapper_left drag-wrapper_top"
      dragType="DRAG_LEFT_TOP"
      v-show="!isDrag"
      v-memo="[isDrag, scale]"
      :ref="tempEls"
      :style="`transform:scale(${1 / scale});`"
    ></div>
    <div
      class="circle ne-resize drag-wrapper_right drag-wrapper_top"
      dragType="DRAG_RIGHT_TOP"
      v-show="!isDrag"
      v-memo="[isDrag, scale]"
      :ref="tempEls"
      :style="`transform:scale(${1 / scale});`"
    ></div>
    <div
      class="circle se-resize drag-wrapper_right drag-wrapper_bottom"
      dragType="DRAG_RIGHT_BOTTOM"
      v-show="!isDrag"
      v-memo="[isDrag, scale]"
      :ref="tempEls"
      :style="`transform:scale(${1 / scale});`"
    ></div>
    <div
      class="circle sw-resize drag-wrapper_left drag-wrapper_bottom"
      dragType="DRAG_LEFT_BOTTOM"
      v-show="!isDrag"
      v-memo="[isDrag, scale]"
      :ref="tempEls"
      :style="`transform:scale(${1 / scale});`"
    ></div>
    <!--  控制上下左右拖拽的四条边  -->
    <div
      class="border n-resize drag-wrapper_top"
      dragType="DRAG_TOP"
      v-memo="[scale]"
      :ref="tempEls"
      :style="`transform:scaleY(${1 / scale});`"
    ></div>
    <div
      class="border e-resize drag-wrapper_right"
      dragType="DRAG_RIGHT"
      v-memo="[scale]"
      :ref="tempEls"
      :style="`transform:scaleX(${1 / scale});`"
    ></div>
    <div
      class="border n-resize drag-wrapper_bottom"
      dragType="DRAG_BOTTOM"
      v-memo="[scale]"
      :ref="tempEls"
      :style="`transform:scaleY(${1 / scale});`"
    ></div>
    <div
      class="border e-resize drag-wrapper_left"
      dragType="DRAG_LEFT"
      v-memo="[scale]"
      :ref="tempEls"
      :style="`transform:scaleX(${1 / scale});`"
    ></div>
    <!--  旋转控制点  -->
    <div class="rotate-pointer" dragType="ROTATE" :ref="tempEls">
      <svg
        style="pointer-events: none"
        t="1661823888621"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2485"
        width="100%"
        height="100%"
      >
        <path
          d="M935.497143 659.017143a36.937143 36.937143 0 0 1-1.755429 18.505143 434.322286 434.322286 0 0 1-370.980571 337.773714C325.632 1045.650286 107.373714 876.251429 77.531429 637.293714a435.712 435.712 0 0 1 378.587428-487.131428c5.778286-1.243429 13.385143-1.901714 19.748572-1.974857-2.633143-24.137143-5.851429-46.518857-7.899429-66.267429-3.291429-25.526857-6.582857-44.617143-6.582857-50.980571-1.974857-7.021714-1.389714-15.36 3.657143-21.065143a21.796571 21.796571 0 0 1 31.305143-4.608l0.585142 1.243428 17.993143 16.530286 126.683429 98.962286 17.92 13.312 15.36 11.410285c5.12 3.803429 7.68 8.850286 8.996571 14.628572a20.260571 20.260571 0 0 1-4.388571 16.603428l-11.410286 15.36-13.312 17.92L555.885714 337.92l-14.555428 18.578286-1.243429 0.658285a23.625143 23.625143 0 0 1-31.890286 3.291429c-5.778286-5.12-9.654857-12.726857-8.411428-19.748571-1.316571-5.705143-3.291429-25.453714-6.582857-50.980572-2.633143-17.846857-5.266286-38.838857-7.899429-59.904-6.436571 0-13.385143 1.974857-19.748571 1.974857-193.828571 24.502857-332.726857 201.801143-308.297143 395.556572 24.502857 193.828571 201.801143 332.726857 395.556571 308.224a353.426286 353.426286 0 0 0 303.616-281.307429 40.082286 40.082286 0 0 1 34.377143-30.134857c22.235429-3.291429 43.373714 13.165714 44.763429 34.889143z"
          fill="#bebeff"
          opacity=".801"
          p-id="2486"
          data-spm-anchor-id="a313x.7781069.0.i0"
          class="selected"
        ></path>
      </svg>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue'
import {
  toPx,
  findParentPathHasEl,
  computedElementsRect,
  triangleFnToAngle
} from '@/plugins/dragPlugin/util/util'
import { Ref } from '@vue/reactivity'
import { activeEl, updateRect } from './index'
import { rectProperties } from '@/plugins/dragPlugin/convert'

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

  ROTATE,
  DRAG_MOVE
}

export default defineComponent({
  name: 'DragWrapper',
  props: { scale: { default: 1.0, type: Number }, isShow: { default: true, type: Boolean } },
  setup: function (props) {
    const app = getCurrentInstance()
    const isRunning = ref<boolean>(false)
    const dragStatus = ref<DRAG_STATUS>(DRAG_STATUS.IDLE)
    const isDrag = ref<boolean>(false)

    const dragEl: Ref<HTMLElement | null> = ref<HTMLElement | null>(null)

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
          // isDrag.value = false
          let target: HTMLElement = ev.target as HTMLElement
          let dragType = target.getAttribute('dragType') as keyof typeof DRAG_STATUS

          isRunning.value = verifyDragWrapperActive(target)

          if (isRunning.value) {
            dragStatus.value = DRAG_STATUS[dragType] || DRAG_STATUS.DRAG_MOVE
            preX = ev.pageX
            preY = ev.pageY
          }
          console.log(dragStatus.value, rectProperties.rotate)
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

            offsetX /= props.scale
            offsetY /= props.scale

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
              case DRAG_STATUS.ROTATE:
                rotate()
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

      function rotate() {
        const wrapRect = dragEl.value!.getBoundingClientRect()
        const center = [wrapRect.left + wrapRect.width / 2, wrapRect.top + wrapRect.height / 2]

        let x = preX - center[0],
          y = (preY - center[1]) * -1
        const hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        const sin = x / hypotenuse
        const cos = y / hypotenuse
        let rotate = triangleFnToAngle(sin, cos)
        rectProperties.rotate = rotate
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
        // 边界处理
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
        case DRAG_STATUS.ROTATE:
          return 'pointer'
        default:
          return 'auto'
      }
    }

    // 修改鼠标形态
    function modifyMouseShape(dragType: string) {
      document.documentElement.style.cursor = dragType
    }

    const isActive = ref<boolean>(false)

    // 当选中元素增加/减少时就跟新
    watch(
      () => activeEl.value,
      (els: HTMLElement[], oldEl) => {
        if (els.length) {
          isActive.value = true
          updateRect()
        } else isActive.value = false
      },
      { deep: true }
    )

    const dragElStyle = computed(() => {
      let keys = ['left', 'top', 'width', 'height']
      let obj = {} as any

      for (let key of keys) {
        obj[key] = rectProperties[key]
      }
      obj = toPx(obj)
      obj.transform = `rotate(${rectProperties.rotate}deg)`
      return obj
    })
    return {
      rectProperties,
      dragElStyle,
      toPx,
      isRunning,
      isActive,
      isDrag,
      dragEl,
      tempEls
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
.rotate-pointer {
  position: absolute;
  left: calc(50% - 10px);
  top: -20px;
  width: 18px;
  height: 18px;
  background: red;
  cursor: pointer;
  pointer-events: auto;
}
</style>
