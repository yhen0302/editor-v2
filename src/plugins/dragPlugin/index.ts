import {Plugin, App, watch, ref, WatchStopHandle, toRaw, computed} from 'vue'
import {
  computedElementsRect,
  debounce,
  findParentPathHasEl,
  getCss,
  toPx
} from './util/util'
import {Ref} from '@vue/reactivity'
import {rectProperties, RectProperty} from './convert'
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
  watchStopSet: Set<WatchStopHandle>
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
        change && change({el, rect: toRaw<RectProperty>(rectProperties)})

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
      {flush: 'sync'}
    )

    watchStopSet.add(watchStop)
  }
  return watchStopSet
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

const dragPlugin: Plugin = {
  install(app: App, option: Object) {
    // function set
    const keys = Object.keys(rectProperties)
    keys.forEach((key) => {
      app.config.globalProperties[
      '$setDragPluginRect' + key[0].toUpperCase() + key.substring(1)
        ] = function (val: number) {
        rectProperties[key] = val
      }
    })

    // listenClearEvent()
    registryDragDirective()

    app.component(DragWrapper.name, DragWrapper)

    function parseBinding(binding: any) {
      let dragOpt: DragDirectiveOpt = binding.value || Object.create(null)

      const changeCb =
        dragOpt?.change && debounce(dragOpt.change, dragOpt?.inputDelay || 300)
      const select = dragOpt?.select
      const inputCb = dragOpt?.input

      return {
        select,
        input: inputCb,
        change: changeCb,
        active: dragOpt.active
      }
    }

    function registryDragDirective() {
      app.directive('drag', {
        mounted(el: CustomElement, binding) {
          const {select, input, change, active} = parseBinding(binding)
          let watchStopSet: Set<WatchStopHandle>

          const rect = binding.value.rect || computedElementsRect([el], 'css')
          el.rect = rect
          // 如果是选中状态

          if (select) {
            console.log('mounted', select)
            activeEl.value.push(el)
            watchStopSet = watchRect(el, rect, change, input)
            watcherTotalSet.add(watchStopSet)

            el.watchStopSet = watchStopSet
          } else {
            if (el.watchStopSet) {
              stopWatchers(el.watchStopSet)
            }
            // 取消选中
            activeEl.value.splice(
              activeEl.value.findIndex((item) => item === el),
              1
            )
          }
        },

        updated(el: CustomElement, binding) {
          const {change, input, select} = parseBinding(binding)
          if (select) {
            // 当前元素已经被选中了
            if (activeEl.value.includes(el)) return
            const watchStopSet = watchRect(el, el.rect, change, input)
            watcherTotalSet.add(watchStopSet)
            activeEl.value.push(el)

            el.watchStopSet = watchStopSet
          } else {
            if (el.watchStopSet) {
              stopWatchers(el.watchStopSet)
            }
            const deleteIndex = activeEl.value.indexOf(el)
            // 取消选中
            if (deleteIndex !== -1) activeEl.value.splice(deleteIndex, 1)
          }
        }
      })
    }
  }
}

export {activeEl, isCalculating}

export default dragPlugin
