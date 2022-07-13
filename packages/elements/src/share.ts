import { LayerTree2dNode } from '../../../src/store/type'
import { reactive } from 'vue'
import { clone } from '../../../src/share/util/base'

let id = 0
export function createNode(data: any) {
  const node: LayerTree2dNode = {
    name: data.name + String(id++),
    id,
    type: data.type,
    option: reactive(clone(data.option || {})),
    select: true,
    show: true
  }
  return node
}
