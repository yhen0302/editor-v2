import {Plugin, App,    watch, ref, WatchStopHandle, toRaw} from "vue";
import { debounce, findParentPathHasEl, getCss, toPx} from "./util/util";
import {Ref} from "@vue/reactivity";
import {rectProperties, RectProperty} from "./convert";
import DragWrapper from "./DragWrapper.vue";


let activeEl: Ref<HTMLElement[]> = ref<HTMLElement[]>([]);
let watcherSet: Set<WatchStopHandle> = new Set<WatchStopHandle>()
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
  el: HTMLElement,
  rect: RectProperty
}

interface DragDirectiveOpt {
  change?: (ev: DragEvent) => void,
  input?: (ev: DragEvent) => void,
  active: (ev: DragEvent) => void,
  inputDelay?: number,
}

interface CustomElement extends HTMLElement {
  rect: { left: number, top: number, width: number, height: number, [key: string]: any }
}


const dragPlugin: Plugin = {
  install(app: App, option: Object) {
    listenClearEvent()
    registryDragDirective()
    app.component(DragWrapper.name, DragWrapper)

    function registryDragDirective() {
      app.directive('drag', {
        mounted(el: CustomElement, binding) {
          let dragOpt: DragDirectiveOpt = binding.value || Object.create(null)
          listenElMouseDown()
          const checkCssPosition = () => getCss(el, 'position') === 'static' && (el.style.position = 'absolute');
          const rect = el.getBoundingClientRect()
          el.rect = {
            left: rect.left,
            top: rect.top,
            height: rect.height,
            width: rect.width
          }

          // 监听鼠标按下
          function listenElMouseDown() {
            let change = dragOpt?.change && debounce(dragOpt.change, dragOpt?.inputDelay || 300)

            function watchRect() {
              for (let key of Object.keys(rectProperties)) {
                let watchStop: WatchStopHandle = watch(() => rectProperties[key], (newVal, oldVal) => {
                  // 如果当前变化是正在计算选择区域就不做计算。
                  if (isCalculating.value) return
                  dragOpt?.input?.({el, rect: toRaw<RectProperty>(rectProperties)})
                  change && change({el, rect: toRaw<RectProperty>(rectProperties)})

                  let rect = el.rect
                  if (activeEl.value.length < 2 || ['left', 'top'].includes(key)) {
                    // @ts-ignore
                    el.style[key] = toPx(rect[key] + newVal - oldVal)
                    el.rect[key] = rect[key] + newVal - oldVal
                  } else { // 在多选时的计算方式
                    let ratio: number = newVal / oldVal
                    // @ts-ignore
                    el.style[key] = toPx(rect[key] * ratio)
                    el.rect[key] = rect[key] * ratio

                    let mappingKey: keyof DOMRect = key === 'width' ? 'left' : 'top'

                    let offset = rect[mappingKey] - rectProperties[mappingKey]

                    el.rect[mappingKey] = offset * (ratio - 1) + rect[mappingKey]
                    el.style[mappingKey] = toPx(offset * (ratio - 1) + rect[mappingKey]) as string
                  }
                }, {flush: 'sync'})

                watcherSet.add(watchStop)
              }
            }

            el.addEventListener('mousedown', (ev: MouseEvent) => {
              // 清空上次调用的元素
              let includes = activeEl.value.includes(el)
              if (includes) return
              if (!ev.shiftKey) {
                clearEl()
                clearWatcher()
              }

              activeEl.value.push(el)
              dragOpt?.active?.({el, rect: toRaw<RectProperty>(rectProperties)})
              console.log(activeEl.value)
              checkCssPosition()
              watchRect()

            })
          }

        }
      })
    }

  }
}


function clearWatcher(): void {
  for (let watchStop of watcherSet.values()) {
    watchStop()
    watcherSet.delete(watchStop)
  }
}

export function clearEl(): void {
  activeEl.value.splice(0, activeEl.value.length)
}

export {activeEl, isCalculating}

export default dragPlugin;