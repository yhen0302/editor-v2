import { DirectiveBinding, h } from 'vue'
import { Element } from '@/views/editor/twoDimension/elements'
import { LayerTree2dNode } from '@/store/editor/type'
import { useMutation } from '@/store/helper'
import store from '@/store'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('dragover', function (ev: DragEvent) {
      ev.preventDefault()
    })

    el.addEventListener('drop', function (ev: DragEvent) {
      const { offsetX, offsetY } = ev
      const mutations = useMutation(store, 'editor', ['ADD_2D_TREE_NODE'])
      // 将数据添加到树结构中
      const data = JSON.parse(<string>ev.dataTransfer?.getData('meta'))
      initData()

      function initData() {
        data.option.matrixOption.left = offsetX
        data.option.matrixOption.top = offsetY
        console.log(data.option.matrixOption.left)
      }

      const element = new Element<typeof data.option>(data.type, data.option)

      const node: LayerTree2dNode = { name: data.name, element, type: data.type, show: true }
      mutations['ADD_2D_TREE_NODE']({ node })
      console.log(node)
    })
  }
}
