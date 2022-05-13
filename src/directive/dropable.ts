import { DirectiveBinding, h } from 'vue'
import { Element } from '@/views/editor/twoDimension/elements'
import { EditorStore, LayerTree2dNode } from '@/store/editor/type'
import store from '@/store'
import { useMutation, useState } from '@/store/helper'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('dragover', function (ev: DragEvent) {
      ev.preventDefault()
    })

    el.addEventListener('drop', function (ev: DragEvent) {
      let { offsetX, offsetY } = ev
      const editorStore: EditorStore = useState(store, 'editor')
      const mutations = useMutation(store, 'editor', ['ADD_2D_TREE_NODE'])
      // 将数据添加到树结构中
      const data = JSON.parse(<string>ev.dataTransfer?.getData('meta'))

      initData(ev)

      function initData(ev: DragEvent) {
        const target = ev.target as HTMLDivElement
        const matrixOption = data.option.matrixOption
        if (target.className.includes('art-board-wrapper')) {
          const targetRect = target.getBoundingClientRect()
          const childRect = (target.querySelector('.art-board-box') as HTMLDivElement).getBoundingClientRect()
          const scale = editorStore.artBoardConfig.artBoardScale

          offsetX = -((targetRect.width - childRect.width) / 2 - offsetX) / scale
          offsetY = -((targetRect.height - childRect.height) / 2 - offsetY) / scale
        }
        matrixOption.left = offsetX - matrixOption.width / 2
        matrixOption.top = offsetY - matrixOption.height / 2
      }

      const element = new Element<typeof data.option>(data.type, data.option)
      const node: LayerTree2dNode = { name: data.name, element, type: data.type, show: true }
      mutations['ADD_2D_TREE_NODE']({ node })
    })
  }
}
