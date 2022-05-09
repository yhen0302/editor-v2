import {DirectiveBinding, h} from 'vue'
import store from '@/store/index'
import {useMutation} from '@/store/helper'
import {EditorMutation} from '@/store/editor/mutations'
import {LayerTree2dNode} from '@/store/editor/type'
import {reactive} from '@vue/reactivity'
import {VNode} from '@vue/runtime-core'
import {RectShapeProps} from '@/views/editor/twoDimension/elements/shape/RectShapeProps'
import RectShape from "@/views/editor/twoDimension/elements/shape/RectShape.vue";

export default {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        el.addEventListener('dragover', function (ev: DragEvent) {
            ev.preventDefault()
        })

        el.addEventListener('drop', function (ev: DragEvent) {
            const {pageX, pageY} = ev
            // 将数据添加到树结构中
            const data = JSON.parse(<string>ev.dataTransfer?.getData('meta'))
            const mutations = useMutation(store, 'editor', ['ADD_2D_TREE_NODE'])
            const props = reactive(<RectShapeProps>{
                matrixOption: {left: 10, top: 10, width: 100, height: 50, angle: 0},
                transparency: 1,
                transparencyColor: {color: '#FF0000', transparency: 1}
            })
            const instance: VNode = h(RectShape, {props})

            mutations[EditorMutation.ADD_2D_TREE_NODE]({
                node: {
                    name: '矩形',
                    detail: {componentInstance: instance, options: props}
                } as LayerTree2dNode
            })
        })
    }
}
