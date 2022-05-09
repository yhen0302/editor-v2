import {DirectiveBinding, h} from 'vue'
import store from '@/store/index'
import {useMutation} from "@/store/helper";
import {EditorMutation} from "@/store/editor/mutations";
import {LayerTree2dNode} from "@/store/editor/type";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('dragover', function (ev: DragEvent) {
      ev.preventDefault()
    })

    el.addEventListener('drop', function (ev) {
      // 将数据添加到树结构中
      const data = JSON.parse(<string>ev.dataTransfer?.getData('meta'))
      const mutations = useMutation(store, 'editor', ["ADD_2D_TREE_NODE"])
      // let instance = h('')
      // mutations[EditorMutation.ADD_2D_TREE_NODE]({node: {name: "矩形", option: {}} as LayerTree2dNode})
    })
  }
}
