import { LayerTreeNode2D } from '@/store'
import { reactive } from 'vue'
import { clone } from '../../../src/share/util/base'

let id = 0
export function createNode(data: any) {
  const { select = true } = data
  const node: LayerTreeNode2D = {
    name: data.name + '-' + String(id++),
    id,
    type: data.type,
    option: reactive(clone(data.option || {})),
    select: select,
    show: true,
    lock: false
  }
  if (data.children) node.children = data.children
  return node
}
