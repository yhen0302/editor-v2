import RectShape from './shape/RectShape.vue'
import { App, Directive, h, resolveDirective, withDirectives } from 'vue'
import { reactive, UnwrapNestedRefs } from '@vue/reactivity'
import { BaseProps } from '@/views/editor/twoDimension/elements/option'
import { clone } from '@/util/base'
import { VNode } from '@vue/runtime-core'
import {LayerTree2dNode} from "@/store/editor/type";

const elementComponentsMap = {
  rect: RectShape
} as { [key: string]: any }

export default {
  install(app: App) {
    app.component('RectShape', RectShape)
  }
}

let id = 0

// eslint-disable-next-line @typescript-eslint/ban-types
export class Element<T extends BaseProps> {
  props: UnwrapNestedRefs<T>
  eleType: string
  instance: VNode
  id: number = id++
  node:LayerTree2dNode

  constructor(eleType: string, props: T,node:LayerTree2dNode) {

    this.props = this.getProps<T>(props)
    this.eleType = eleType
    this.instance = h(elementComponentsMap[this.eleType], {
      ...this.props,
      node
    })
    this.node = node
  }

  init() {}

  getProps<T extends BaseProps>(props: T): UnwrapNestedRefs<T> {
    return reactive(clone(props))
  }
}

export { RectShape }
