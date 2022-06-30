import {DirectiveBinding} from 'vue'
import store from '@/store/index'

import {useState} from "@/store/helper";

const editorStore = useState(store,'global')
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {

    el.draggable = true
    let imgCloneEl: HTMLImageElement
    el.addEventListener('dragstart', function (ev: DragEvent) {
      imgCloneEl = imgCloneEl || el.cloneNode(true) as HTMLImageElement
      imgCloneEl.style.opacity = ".9"
      imgCloneEl.width = (el as HTMLImageElement).width * (editorStore as any).state.drawingBoard.scale * 2
      imgCloneEl.height = (el as HTMLImageElement).height * (editorStore as any).state.drawingBoard.scale * 2
      document.body.append(imgCloneEl)
      ev.dataTransfer?.setData('meta', JSON.stringify(binding.value))
      ev.dataTransfer?.setDragImage(imgCloneEl, imgCloneEl.width / 2, imgCloneEl.height / 2)
    })

    el.addEventListener('dragstart',function () {
      editorStore.addDragging = true
    })

    el.addEventListener('dragend', function (ev: DragEvent) {
      editorStore.addDragging = false
    })

    el.addEventListener('drag', function (ev: DragEvent) {
    })
  }
}
