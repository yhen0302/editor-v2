import { computedElementsRect, debounce } from './util/util'
import { App, EffectScope } from 'vue'
import { activeEl, CustomElement } from './index'
import { Ref } from '@vue/reactivity'
interface DragDirectiveOpt {
  change?: (ev: DragEvent) => void
  input?: (ev: DragEvent) => void
  active: (ev: DragEvent) => void
  inputDelay?: number
  select?: Ref<boolean>
}
function parseBinding(binding: any) {
  const dragOpt: DragDirectiveOpt = binding.value || Object.create(null)

  const changeCb = dragOpt?.change && debounce(dragOpt.change, dragOpt?.inputDelay || 300)
  const select = dragOpt?.select
  const inputCb = dragOpt?.input

  return {
    select,
    input: inputCb,
    change: changeCb,
    active: dragOpt.active
  }
}

export function registryDragDirective(app: App, watchRect: any, effectTotalSet: Set<EffectScope>, stopEffect: any) {
  app.directive('drag', {
    mounted(el: CustomElement, binding: any) {
      const { select, input, change, active } = parseBinding(binding)
      let effect: EffectScope

      const rect = binding.value.rect || computedElementsRect([el], 'css')
      el.rect = rect
      // 如果是选中状态

      if (select) {
        if (activeEl.value.includes(el)) return
        activeEl.value.push(el)
        effect = el.effect || watchRect(el, rect, change, input)
        effectTotalSet.add(effect)

        el.effect = effect
      } else {
        if (el.effect) {
          stopEffect(el.effect)
          // @ts-ignore
          el.effect = null
        }
        // 取消选中
        const deleteIndex = activeEl.value.indexOf(el)
        // 取消选中
        if (deleteIndex !== -1) activeEl.value.splice(deleteIndex, 1)
      }
    },

    updated(el: CustomElement, binding: any) {
      const { change, input, select } = parseBinding(binding)
      if (select) {
        // 当前元素已经被选中了
        if (activeEl.value.includes(el)) return
        let effect
        if (!el.effect) {
          effect = watchRect(el, el.rect, change, input)
          effectTotalSet.add(effect)
        } else {
          effect = el.effect
        }
        activeEl.value.push(el)
        el.effect = effect
      } else {
        if (el.effect) {
          stopEffect(el.effect)
          // @ts-ignore
          el.effect = null
        }
        const deleteIndex = activeEl.value.indexOf(el)
        // 取消选中
        if (deleteIndex !== -1) activeEl.value.splice(deleteIndex, 1)
      }
    },

    unmounted(el: CustomElement, binding: any) {
      el?.effect?.stop()
      const deleteIndex = activeEl.value.indexOf(el)
      deleteIndex !== -1 && activeEl.value.splice(deleteIndex, 1)
    }
  })
}
