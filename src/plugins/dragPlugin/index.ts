// @ts-nocheck
import { Plugin, App, watch, ref, toRaw, effectScope, EffectScope } from 'vue'
import { computedElementsRect, findParentPathHasEl, getCss, toPx } from './util/util'
import { Ref } from '@vue/reactivity'
import { rectProperties, RectProperty } from './convert'
import DragWrapper from './DragWrapper.vue'
import { registryDragDirective } from '@/plugins/dragPlugin/dragDirective'

const activeEl: Ref<HTMLElement[]> = ref<HTMLElement[]>([])
const effectTotalSet: Set<EffectScope> = new Set<EffectScope>()
const blockingUpdate: Ref<boolean> = ref<boolean>(false) // 是否在计算中

function listenClearEvent() {
  document.addEventListener('click', (ev) => {
    if (ev.shiftKey || !activeEl.value.length) return

    for (const el of activeEl.value) {
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

export interface CustomElement extends HTMLElement {
  rect: {
    left: number
    top: number
    width: number
    height: number
    [key: string]: any
  }
  effect: EffectScope
}

const checkCssPosition = (el: HTMLElement) =>
  getCss(el, 'position') === 'static' && (el.style.position = 'absolute')

function watchRect(
  el: CustomElement,
  rect: object,
  change?: Function,
  input?: Function
): EffectScope {
  const scope = effectScope()
  scope.run(() => {
    for (let key of Object.keys(rectProperties)) {
      watch(
        () => rectProperties[key],
        (newVal, oldVal) => {
          // 如果当前变化是正在计算选择区域就不做计算，防止多选时rect值变化发送事件去修改元素的大小
          if (blockingUpdate.value) return

          input &&
            input({
              el,
              rect: toRaw<RectProperty>(rectProperties)
            })
          change && change({ el, rect: toRaw<RectProperty>(rectProperties) })

          let rect = el.rect
          if (key === 'rotate') {
            el.style.transform = `rotate(${newVal}deg)`
            el.rect.rotate = newVal
          } else if (activeEl.value.length < 2 || ['left', 'top'].includes(key)) {
            // @ts-ignore
            el.style[key] = toPx(rect[key] + newVal - oldVal)
            el.rect[key] = rect[key] + newVal - oldVal
          } else {
            // 在多选时的计算方式
            let ratio: number = newVal / oldVal
            // @ts-ignore
            el.style[key] = toPx(rect[key] * ratio)
            el.rect[key] = rect[key] * ratio

            // 当拖动是左上方时: left 和 top 的值相应发生变化。
            let mappingKey: keyof DOMRect = key === 'width' ? 'left' : 'top'
            let offset = rect[mappingKey] - rectProperties[mappingKey]
            el.rect[mappingKey] = offset * (ratio - 1) + rect[mappingKey]
            el.style[mappingKey] = toPx(offset * (ratio - 1) + rect[mappingKey]) as string
          }
        },
        { flush: 'sync' }
      )
    }
  })

  return scope
}

function stopEffect(effectScope1: EffectScope) {
  effectScope1.stop()
}

function clearWatcher(): void {
  for (const watchStopSet of effectTotalSet.values()) {
    stopEffect(watchStopSet)
  }
  effectTotalSet.clear()
}

export function clearEl(): void {
  activeEl.value.splice(0, activeEl.value.length)
}

let updateRectProcessFn: Function = (t) => t
// 手动跟新
export function updateRect() {
  // 跟新的时候监听器不能变化
  blockingUpdate.value = true
  let rect
  if (activeEl.value.length === 1) {
    rect = computedElementsRect(activeEl.value, 'css')
    rect.rotate = activeEl.value[0].rect.rotate
  } else {
    // bounding的计算可能和实际的形状属性存在差异,
    rect = computedElementsRect(activeEl.value, 'bounding')
    rect.rotate = 0
  }
  rect = updateRectProcessFn(rect, activeEl.value.length !== 1)
  for (let key of Object.keys(rectProperties)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rectProperties[key] = rect[key]
  }
  blockingUpdate.value = false
}

const dragPlugin: Plugin = {
  install(app: App, option: Object) {
    option.updateRectProcessFn && (updateRectProcessFn = option.updateRectProcessFn)

    app.config.globalProperties.$updateRect = updateRect
    // function set
    const keys = Object.keys(rectProperties)
    keys.forEach((key) => {
      app.config.globalProperties['$setDragPluginRect' + key[0].toUpperCase() + key.substring(1)] =
        function (val: number) {
          rectProperties[key] = val
        }
    })

    // listenClearEvent()
    registryDragDirective(app, watchRect, effectTotalSet, stopEffect)

    app.component(DragWrapper.name, DragWrapper)
  }
}

export { activeEl }

export default dragPlugin
