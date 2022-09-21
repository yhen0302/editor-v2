import { DirectiveBinding } from 'vue'
import store from '@/store/index'

import { useState } from '@/store/helper'

const stateGlobal = useState(store, 'global')
const state2D = useState(store, '2d')
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.draggable = true
    let imgCloneEl: HTMLImageElement
    el.addEventListener('dragstart', function (ev: DragEvent) {
      imgCloneEl = imgCloneEl || (el.cloneNode(true) as HTMLImageElement)
      imgCloneEl.style.opacity = '.9'
      imgCloneEl.width = (el as HTMLImageElement).width * stateGlobal.drawingBoard.scale * 2
      imgCloneEl.height = (el as HTMLImageElement).height * stateGlobal.drawingBoard.scale * 2
      document.body.append(imgCloneEl)
      ev.dataTransfer?.setData('meta', JSON.stringify(binding.value))
      ev.dataTransfer?.setDragImage(imgCloneEl, imgCloneEl.width / 2, imgCloneEl.height / 2)
    })

    el.addEventListener('dragstart', function () {
      state2D.addDragging = true
    })

    el.addEventListener('dragend', function (ev: DragEvent) {
      state2D.addDragging = false
    })

    el.addEventListener('drag', function (ev: DragEvent) {})
  }
}
