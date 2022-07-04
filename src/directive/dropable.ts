import { DirectiveBinding, h, markRaw, nextTick, reactive, ref } from 'vue'
import { EditorStore, LayerTree2dNode } from '@/store/type'
import store from '@/store'
import { useMutation, useState } from '@/store/helper'
import { clone } from '@/core/2d/util/base'

let id = 0
export default {
  mounted: function (el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('dragover', function (ev: DragEvent) {
      ev.preventDefault()
    })

    el.addEventListener('drop', function (ev: DragEvent) {
      let { offsetX, offsetY } = ev
      const editorStore = store.state
      const mutations = useMutation(store, 'global', ['ADD_2D_TREE_NODE', 'SELECT_2D_TREE_NODE', 'CLEAR_SELECT_2D_NODES'])

      // 将数据添加到树结构中
      const data = JSON.parse(<string>ev.dataTransfer?.getData('meta'))

      initData(ev)

      function initData(ev: DragEvent) {
        const target = ev.target as HTMLDivElement
        console.log(target)
        const matrixOption = data.option.matrixOption
        if (target.className.includes('art-board-wrapper')) {
          const targetRect = target.getBoundingClientRect()
          const childRect = (target.querySelector('.art-board-box') as HTMLDivElement).getBoundingClientRect()
          const scale = editorStore.state.drawingBoard.scale

          offsetX = -((targetRect.width - childRect.width) / 2 - offsetX) / scale
          offsetY = -((targetRect.height - childRect.height) / 2 - offsetY) / scale
        }
        matrixOption.left = offsetX - matrixOption.width / 2
        matrixOption.top = offsetY - matrixOption.height / 2
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const node: LayerTree2dNode = {
        name: data.name + String(id++),
        id,
        type: data.type,
        emitters:{},
        option: reactive(clone(data.option)),
        select: true,
        show: true
      }

      mutations['ADD_2D_TREE_NODE']({ node })
      mutations['CLEAR_SELECT_2D_NODES']()
      mutations['SELECT_2D_TREE_NODE']({ node })
    })
  }
}
