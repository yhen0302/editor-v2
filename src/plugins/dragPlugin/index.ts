import { Plugin, App, watch, ref, WatchStopHandle, toRaw, computed } from 'vue'
import {
  computedElementsRect,
  debounce,
  findParentPathHasEl,
  getCss,
  toPx
} from './util/util'
import { Ref } from '@vue/reactivity'
import { rectProperties, RectProperty } from './convert'
import DragWrapper from './DragWrapper.vue'

let activeEl: Ref<HTMLElement[]> = ref<HTMLElement[]>([])
let watcherTotalSet: Set<Set<WatchStopHandle>> = new Set<Set<WatchStopHandle>>()
let isCalculating: Ref<boolean> = ref<boolean>(false)

function listenClearEvent() {
  document.addEventListener('click', (ev) => {
    if (ev.shiftKey || !activeEl.value.length) return

    for (let el of activeEl.value) {
      if (findParentPathHasEl(ev.target as HTMLElement, el)) return
    }
    clearEl()
    clearWatcher()
  })
}

interface DragEvent {
  el: HTMLElement
  rect: RectProperty
}

interface DragDirectiveOpt {
  change?: (ev: DragEvent) => void
  input?: (ev: DragEvent) => void
  active: (ev: DragEvent) => void
  inputDelay?: number
  select?: Ref<boolean>
}

interface CustomElement extends HTMLElement {
  rect: {
    left: number
    top: number
    width: number
    height: number
    [key: string]: any
  }
}

const checkCssPosition = (el: HTMLElement) =>
  getCss(el, 'position') === 'static' && (el.style.position = 'absolute')

function watchRect(
  el: CustomElement,
  rect: object,
  change?: Function,
  input?: Function
): Set<WatchStopHandle> {
  let watchStopSet: Set<WatchStopHandle> = new Set()
  for (let key of Object.keys(rectProperties)) {
    let watchStop: WatchStopHandle = watch(
      () => rectProperties[key],
      (newVal, oldVal) => {
        // 如果当前变化是正在计算选择区域就不做计算。
        if (isCalculating.value) return
        input &&
          input({
            el,
            rect: toRaw<RectProperty>(rectProperties)
          })
        change && change({ el, rect: toRaw<RectProperty>(rectProperties) })

        let rect = el.rect
        if (activeEl.value.length < 2 || ['left', 'top'].includes(key)) {
          // @ts-ignore
          el.style[key] = toPx(rect[key] + newVal - oldVal)
          el.rect[key] = rect[key] + newVal - oldVal
        } else {
          // 在多选时的计算方式
          let ratio: number = newVal / oldVal
          // @ts-ignore
          el.style[key] = toPx(rect[key] * ratio)
          el.rect[key] = rect[key] * ratio

          let mappingKey: keyof DOMRect = key === 'width' ? 'left' : 'top'
          let offset = rect[mappingKey] - rectProperties[mappingKey]
          el.rect[mappingKey] = offset * (ratio - 1) + rect[mappingKey]
          el.style[mappingKey] = toPx(
            offset * (ratio - 1) + rect[mappingKey]
          ) as string
        }
      },
      { flush: 'sync' }
    )

    watchStopSet.add(watchStop)
  }
  return watchStopSet
}

const dragPlugin: Plugin = {
  install(app: App, option: Object) {
    // listenClearEvent()
    registryDragDirective()
    app.component(DragWrapper.name, DragWrapper)

    function registryDragDirective() {
      app.directive('drag', {
        mounted(el: CustomElement, binding) {
          let dragOpt: DragDirectiveOpt = binding.value || Object.create(null)
          let watchStopSet: Set<WatchStopHandle>
          listenElMouseDown()
          const select = dragOpt?.select
          const changeCb =
            dragOpt?.change &&
            debounce(dragOpt.change, dragOpt?.inputDelay || 300)

          const inputCb = dragOpt?.input
          const rect = binding.value.rect || computedElementsRect([el], 'css')
          el.rect = rect

          console.log(select)
          watch(
            () => select?.value,
            (newVal, oldVal) => {
              // 如果是选中状态
              if (newVal) {
                watchStopSet = watchRect(el, rect, changeCb, inputCb)
                watcherTotalSet.add(watchStopSet)
                activeEl.value.push(el)
                dragOpt?.active?.({
                  el,
                  rect: toRaw<RectProperty>(rectProperties)
                })
              } else {
                if (watchStopSet) {
                  stopWatchers(watchStopSet)
                }
                // 取消选中
                activeEl.value.splice(
                  activeEl.value.findIndex((item) => item === el),
                  1
                )
              }
            },
            { immediate: true }
          )

          // 监听鼠标按下
          function listenElMouseDown() {
            checkCssPosition(el)
            el.addEventListener('mousedown', (ev: MouseEvent) => {
              // 清空上次调用的元素
              let includes = activeEl.value.includes(el)
              if (includes) return
              if (!ev.shiftKey) {
                clearEl()
                clearWatcher()
              }

              activeEl.value.push(el)
              ;(select as Ref<boolean>).value = true
            })
          }
        }
      })
    }
  }
}

function stopWatchers(watchStopSet: Set<WatchStopHandle>) {
  for (let watchStop of watchStopSet) {
    watchStop()
  }
  watchStopSet.clear()
}
function clearWatcher(): void {
  for (let watchStopSet of watcherTotalSet.values()) {
    stopWatchers(watchStopSet)
  }
  watcherTotalSet.clear()
}

export function clearEl(): void {
  activeEl.value.splice(0, activeEl.value.length)
}

export { activeEl, isCalculating }

export default dragPlugin
