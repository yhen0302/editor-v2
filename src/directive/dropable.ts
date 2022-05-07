import {DirectiveBinding} from 'vue'
import store from '@/store/index'
import {useMutation} from "@/store/helper";
import {EditorMutation} from "@/store/editor/mutations";

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener('dragover', function (ev: DragEvent) {
      ev.preventDefault()
    })

    el.addEventListener('drop', function (ev) {
      // 将数据添加到树结构中
      const data = JSON.parse(<string>ev.dataTransfer?.getData('meta'))
      const mutations = useMutation(store, 'editor', ["ADD_2D_TREE_NODE"])
      console.log(data)
      mutations[EditorMutation.ADD_2D_TREE_NODE]({node: {}})
    })
  }
}
