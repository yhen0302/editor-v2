import {DirectiveBinding} from 'vue'
import store from '@/store/index'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.draggable = true
    let imgCloneEl: HTMLImageElement
    el.addEventListener('dragstart', function (ev: DragEvent) {
      imgCloneEl = imgCloneEl || el.cloneNode(true) as HTMLImageElement
      imgCloneEl.style.opacity = ".9"
      imgCloneEl.width = (el as HTMLImageElement).width * (store as any).state.editor.artBoardConfig.artBoardScale * 2
      imgCloneEl.height = (el as HTMLImageElement).height * (store as any).state.editor.artBoardConfig.artBoardScale * 2
      document.body.append(imgCloneEl)
      ev.dataTransfer?.setData('meta', JSON.stringify(binding.value))
      ev.dataTransfer?.setDragImage(imgCloneEl, imgCloneEl.width / 2, imgCloneEl.height / 2)
    })

    el.addEventListener('dragend', function (ev: DragEvent) {
    })

    el.addEventListener('drag', function (ev: DragEvent) {
    })
  }
}
