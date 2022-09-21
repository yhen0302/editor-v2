<template>
  <section id="drag-wrapper" v-show="isActive && isShow" dragType="DRAG_MOVE" :style="{ ...dragElStyle }" ref="dragEl" @click.stop.prevent>
    <!--  控制顶点缩放的四个圆点  -->
    <div
      class="circle drag-wrapper_left drag-wrapper_top"
      dragType="DRAG_LEFT_TOP"
      multicontrol
      v-show="!isDrag"
      v-memo="[isDrag, scale]"
      :ref="tempEls"
      :style="`transform:scale(${1 / scale});`"
    ></div>
    <div
      class="circle drag-wrapper_right drag-wrapper_top"
      dragType="DRAG_RIGHT_TOP"
      multicontrol
      v-show="!isDrag"
      v-memo="[isDrag, scale]"
      :ref="tempEls"
      :style="`transform:scale(${1 / scale});`"
    ></div>
    <div
      class="circle drag-wrapper_right drag-wrapper_bottom"
      dragType="DRAG_RIGHT_BOTTOM"
      multicontrol
      v-show="!isDrag"
      v-memo="[isDrag, scale]"
      :ref="tempEls"
      :style="`transform:scale(${1 / scale});`"
    ></div>
    <div
      class="circle drag-wrapper_left drag-wrapper_bottom"
      dragType="DRAG_LEFT_BOTTOM"
      multicontrol
      v-show="!isDrag"
      v-memo="[isDrag, scale]"
      :ref="tempEls"
      :style="`transform:scale(${1 / scale});`"
    ></div>
    <!--  控制上下左右拖拽的四条边  -->
    <div class="border drag-wrapper_top" dragType="DRAG_TOP" v-memo="[scale]" :ref="tempEls" :style="`transform:scaleY(${1 / scale});`"></div>
    <div class="border drag-wrapper_right" dragType="DRAG_RIGHT" v-memo="[scale]" :ref="tempEls" :style="`transform:scaleX(${1 / scale});`"></div>
    <div class="border drag-wrapper_bottom" v-memo="[scale]" dragType="DRAG_BOTTOM" :ref="tempEls" :style="`transform:scaleY(${1 / scale});`"></div>
    <div class="border drag-wrapper_left" dragType="DRAG_LEFT" v-memo="[scale]" :ref="tempEls" :style="`transform:scaleX(${1 / scale});`"></div>
    <!--  旋转控制点  -->
    <div class="rotate-pointer" dragType="ROTATE" :ref="tempEls" v-memo="[scale]">
      <svg style="pointer-events: none" t="1661823888621" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2485" width="100%" height="100%">
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
import { computed, defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import { toPx, findParentPathHasEl, computedElementsRect, triangleFnToAngle } from '@/plugins/dragPlugin/util/util'
import { Ref } from '@vue/reactivity'
import { activeEl, updateRect } from './index'
import { rectProperties, RectProperty } from '@/plugins/dragPlugin/convert'
import { getCenterPointerCoordinate, getPointerLineDistance, getPointerLineDistanceByRotate, getRadian, getSinCos } from '@/share/util/math'
import { clone } from '@/share/util/base'

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
    // elements
    const dragEl: Ref<HTMLElement | null> = ref<HTMLElement | null>(null)
    const dragElList = ref<Set<HTMLElement>>(new Set())
    const tempEls = (el: HTMLElement) => {
      ;(dragElList.value as Set<HTMLElement>).add(el)
    }

    listen()

    function listen() {
      let preX: number, preY: number

      // 监听的鼠标按下事件
      function wrapperDragDown(ev: MouseEvent) {
        // isDrag.value = false
        const target: HTMLElement = ev.target as HTMLElement
        // 是否操作的是角，如果是角控制的是两个维度的变化
        const dragType = target.getAttribute('dragType') as keyof typeof DRAG_STATUS
        isRunning.value = verifyDragWrapperActive(target)

        if (isRunning.value) {
          dragStatus.value = DRAG_STATUS[dragType] || DRAG_STATUS.DRAG_MOVE
          if (dragStatus.value !== DRAG_STATUS.ROTATE && dragStatus.value !== DRAG_STATUS.DRAG_MOVE)
            modifyMouseShape(getMouseShape(getCenterPointerCoordinate(dragEl.value?.getBoundingClientRect()), getCenterPointerCoordinate(target.getBoundingClientRect())))

          isDrag.value = dragStatus.value === DRAG_STATUS.DRAG_MOVE
          preX = ev.pageX
          preY = ev.pageY
        }
      }

      // 监听的鼠标抬起事件
      function wrapperDragUp(ev: MouseEvent) {
        const target: HTMLElement = ev.target as HTMLElement
        isDrag.value = isRunning.value = false
        dragStatus.value = DRAG_STATUS.IDLE
        modifyMouseShape('auto')
        preX = preY = 0
      }

      // 监听的鼠标移动事件
      function wrapperDragMove(ev: MouseEvent) {
        if (!isRunning.value) return
        const { pageX, pageY } = ev
        transformHandle(pageX, pageY, preX, preY, props.scale)
        preX = pageX
        preY = pageY
      }

      document.documentElement.addEventListener('mousedown', wrapperDragDown)
      document.documentElement.addEventListener('mouseup', wrapperDragUp)
      document.documentElement.addEventListener('mousemove', wrapperDragMove)
    }

    // 处理变化
    function transformHandle(curX, curY, preX, preY, scale) {
      const offsetX = curX - preX
      const offsetY = curY - preY
      switch (dragStatus.value) {
        case DRAG_STATUS.DRAG_MOVE:
          dragMove(offsetX / scale, offsetY / scale)
          break
        case DRAG_STATUS.ROTATE:
          rotate(preX, preY)
          break
        default:
          dragSizeTransformHandle(offsetX, offsetY, scale)
      }
    }

    // 改变大小变化的函数
    function dragSizeTransformHandle(offsetX, offsetY, scale) {
      const isHorizontal = (curStatus: DRAG_STATUS) => curStatus !== DRAG_STATUS.DRAG_TOP && dragStatus.value !== DRAG_STATUS.DRAG_BOTTOM
      const isVertical = (curStatus: DRAG_STATUS) => curStatus !== DRAG_STATUS.DRAG_LEFT && dragStatus.value !== DRAG_STATUS.DRAG_RIGHT
      const getDistance = (offsetX, offsetY, rotate) => getPointerLineDistanceByRotate(offsetX, offsetY, rotate)
      const getTransformRotate = (rotate, isY, isReverse) => rotate + Number(isY) * 90 + Number(isReverse) * 180

      function createSizeTransformObj(dragStatus: DRAG_STATUS, offsetX, offsetY, scale) {
        const isX = isHorizontal(dragStatus)
        const isY = isVertical(dragStatus)
        const sizeTransformObj = {
          xDistance: 0,
          yDistance: 0,
          xOffset: 0,
          yOffset: 0
        }
        let centerXOffset = 0
        let centerYOffset = 0

        const { sin, cos } = getSinCos(getRadian(rectProperties.rotate))
        if (isX) {
          const reverse = ([DRAG_STATUS.DRAG_LEFT, DRAG_STATUS.DRAG_LEFT_TOP, DRAG_STATUS.DRAG_LEFT_BOTTOM] as Array<DRAG_STATUS>).includes(dragStatus)
          const distance = getDistance(offsetX, offsetY, getTransformRotate(rectProperties.rotate, false, reverse))
          sizeTransformObj.xDistance += distance
          centerXOffset = distance / 2
          if (reverse) {
            sizeTransformObj.xOffset -= distance
            centerXOffset *= -1
          }
        }

        if (isY) {
          const reverse = ([DRAG_STATUS.DRAG_TOP, DRAG_STATUS.DRAG_LEFT_TOP, DRAG_STATUS.DRAG_RIGHT_TOP] as Array<DRAG_STATUS>).includes(dragStatus)
          const distance = getDistance(offsetX, offsetY, getTransformRotate(rectProperties.rotate, true, reverse))
          sizeTransformObj.yDistance += distance
          centerYOffset = distance / 2
          if (reverse) {
            sizeTransformObj.yOffset -= distance
            centerYOffset *= -1
          }
        }

        // left,top 减去中心点的偏差值
        sizeTransformObj.xOffset -= -cos * centerXOffset + sin * centerYOffset + centerXOffset
        sizeTransformObj.yOffset -= -centerXOffset * sin - centerYOffset * cos + centerYOffset

        // 边界判断
        return sizeTransformObj
      }

      const transform = createSizeTransformObj(dragStatus.value, offsetX, offsetY, scale)

      let realTransform = {} as any
      Object.keys(transform).forEach((key) => (realTransform[key] = transform[key] / scale))
      // 边界判断
      realTransform = boundaryVerification(realTransform)
      sizeTransform(realTransform.xDistance, realTransform.yDistance)
      dragMove(realTransform.xOffset, realTransform.yOffset)
    }
    function boundaryVerification(transform) {
      const obj = clone(transform)
      if (rectProperties.width + obj.xDistance < 0) {
        obj.xDistance = Math.abs(rectProperties.width + obj.xDistance) - rectProperties.width
        obj.xOffset -= Math.abs(rectProperties.width + obj.xDistance)
        dragStatus.value = xDragStatusReverse(dragStatus.value)
      }
      if (rectProperties.height + obj.yDistance < 0) {
        obj.yDistance = Math.abs(rectProperties.height + obj.yDistance) - rectProperties.height
        obj.yOffset -= Math.abs(rectProperties.height + obj.yDistance)

        dragStatus.value = yDragStatusReverse(dragStatus.value)
      }
      return obj
    }
    function xDragStatusReverse(dragStatus) {
      const status = [DRAG_STATUS.DRAG_LEFT, DRAG_STATUS.DRAG_RIGHT, DRAG_STATUS.DRAG_LEFT_TOP, DRAG_STATUS.DRAG_RIGHT_TOP, DRAG_STATUS.DRAG_LEFT_BOTTOM, DRAG_STATUS.DRAG_RIGHT_BOTTOM]
      return getReverseByList(status, dragStatus)
    }
    function getReverseByList(list, cur) {
      const i = list.indexOf(cur)
      return list[i + (i % 2 ? -1 : 1)]
    }
    function yDragStatusReverse(dragStatus) {
      const status = [DRAG_STATUS.DRAG_TOP, DRAG_STATUS.DRAG_BOTTOM, DRAG_STATUS.DRAG_LEFT_TOP, DRAG_STATUS.DRAG_LEFT_BOTTOM, DRAG_STATUS.DRAG_RIGHT_TOP, DRAG_STATUS.DRAG_RIGHT_BOTTOM]
      return getReverseByList(status, dragStatus)
    }

    // 控制移动
    function dragMove(x, y) {
      rectProperties.left += x
      rectProperties.top += y
    }

    function rotate(preX, preY) {
      const wrapRect = dragEl.value!.getBoundingClientRect()
      const center = [wrapRect.left + wrapRect.width / 2, wrapRect.top + wrapRect.height / 2]

      const x = preX - center[0],
        y = (preY - center[1]) * -1
      const hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      const cos = x / hypotenuse
      const sin = y / hypotenuse
      const rotate = triangleFnToAngle(sin, cos)
      rectProperties.rotate = parseInt(rotate.toString())
    }

    function sizeTransform(offsetX, offsetY) {
      rectProperties.width += offsetX
      rectProperties.height += offsetY
    }

    function verifyDragWrapperActive(el: HTMLElement | null) {
      for (const aEl of activeEl.value) {
        if (findParentPathHasEl(el, aEl)) {
          return true
        }
      }
      return dragElList.value.has(el as HTMLElement)
    }

    // 获取鼠标形态
    function getMouseShape(centerPointer: { x; y }, pointer): string {
      let cursor = ''
      const { x, y } = {
        x: pointer.x - centerPointer.x,
        y: (pointer.y - centerPointer.y) * -1
      }
      const hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      const angle = triangleFnToAngle(y / hypotenuse, x / hypotenuse)
      if (angle <= 15) cursor = 'n-resize'
      else if (angle <= 75) cursor = 'ne-resize'
      else if (angle <= 105) cursor = 'e-resize'
      else if (angle <= 165) cursor = 'se-resize'
      else if (angle <= 195) cursor = 's-resize'
      else if (angle <= 255) cursor = 'sw-resize'
      else if (angle <= 285) cursor = 'w-resize'
      else if (angle <= 345) cursor = 'nw-resize'
      else if (angle <= 360) cursor = 'n-resize'
      return cursor
    }

    // 修改鼠标形态
    function modifyMouseShape(dragType: string) {
      document.documentElement.style.cursor = dragType
    }

    function getCurrentReverseCursor(el = document.documentElement) {
      const cursors = ['n-resize', 's-resize', 'e-resize', 'w-resize', 'ne-resize', 'sw-resize', 'nw-resize', 'se-resize']
      const c = getComputedStyle(el).cursor
      const curI = cursors.indexOf(c)
      return cursors[curI % 2 === 0 ? curI + 1 : curI - 1]
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
      const keys = ['left', 'top', 'width', 'height']
      let obj = {} as any

      for (const key of keys) {
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
