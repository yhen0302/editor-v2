import { DirectiveBinding, h, markRaw, nextTick, ref } from 'vue'
import { EditorStore, LayerTree2dNode } from '@/store/editor/type'
import store from '@/store'
import { useMutation, useState } from '@/store/helper'
import { clone } from '@/util/base'

export default {
  mounted: function (el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('dragover', function (ev: DragEvent) {
      ev.preventDefault()
    })

    el.addEventListener('drop', function (ev: DragEvent) {
      let { offsetX, offsetY } = ev
      const editorStore: EditorStore = useState(store, 'editor')
      const mutations = useMutation(store, 'editor', [
        'ADD_2D_TREE_NODE',
        'SELECT_2D_TREE_NODE'
      ])
      // 将数据添加到树结构中
      const data = JSON.parse(<string>ev.dataTransfer?.getData('meta'))

      initData(ev)

      function initData(ev: DragEvent) {
        const target = ev.target as HTMLDivElement
        const matrixOption = data.option.matrixOption
        if (target.className.includes('art-board-wrapper')) {
          const targetRect = target.getBoundingClientRect()
          const childRect = (
            target.querySelector('.art-board-box') as HTMLDivElement
          ).getBoundingClientRect()
          const scale = editorStore.artBoardConfig.artBoardScale

          offsetX =
            -((targetRect.width - childRect.width) / 2 - offsetX) / scale
          offsetY =
            -((targetRect.height - childRect.height) / 2 - offsetY) / scale
        }
        matrixOption.left = offsetX - matrixOption.width / 2
        matrixOption.top = offsetY - matrixOption.height / 2
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const node: LayerTree2dNode = {
        name: data.name,
        type: data.type,
        option: clone(data.option),
        select: true,
        show: true
      }

      mutations['ADD_2D_TREE_NODE']({ node })

      mutations['SELECT_2D_TREE_NODE']({ node })
    })
  }
}
