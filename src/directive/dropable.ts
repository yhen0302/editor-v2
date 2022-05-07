import {DirectiveBinding} from 'vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('dragover', function (ev: DragEvent) {
      ev.preventDefault()
    })

    el.addEventListener('drop', function (ev) {
      // 将数据添加到树结构中
      console.log(JSON.parse(<string>ev.dataTransfer?.getData('test')).icon)
      console.log('drop')
    })
  }
}
