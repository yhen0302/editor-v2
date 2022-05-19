import { toRaw } from 'vue'
import store from '../../store'

export function parseModelNode(node: any, index: number, result: any) {
  result.id = node.uuid
  result.name = node.name
  result.visible = node.visible
  result.selected = false
  result.index = index
  result.spread = false
  result.type = node.type
  result.children = []
  result.options = {}
  if (node.type === 'Group') {
    result.options = {
      position: [parseFloat(node.position.x.toFixed(4)), parseFloat(node.position.y.toFixed(4)), parseFloat(node.position.z.toFixed(4))],
      rotation: [parseFloat(node.rotation.x.toFixed(4)), parseFloat(node.rotation.y.toFixed(4)), parseFloat(node.rotation.z.toFixed(4))],
      scale: [parseFloat(node.scale.x.toFixed(4)), parseFloat(node.scale.y.toFixed(4)), parseFloat(node.scale.z.toFixed(4))]
    }
  }
  if (node.children.length > 0) {
    index++
    node.children.forEach((n: any) => {
      const child = {}
      result.children.push(child)
      parseModelNode(n, index, child)
    })
  }
}

// 所有节点selected属性重置为false
export function traverseResetSelectedOfNodes(nodes: any) {
  nodes.forEach((n: any) => {
    n.selected = false
    if (n.children.length > 0) traverseResetSelectedOfNodes(n.children)
  })
}

// 根据pageNode重载3d scene
export function reloadThreeDimensionScene(pageNode: any) {
  const sceneNodes = pageNode.trees.threeDimension
  const flatSceneNodes: any = []
  flatTreeNodes(sceneNodes, flatSceneNodes)

  const container: any = toRaw(store.state.threeDimensionContainer)

  flatSceneNodes.forEach((n: any) => {
    if (n.name === 'Camera') {
      // todo 相机重置（动画）
    } else {
      const resultNode: any = []
      traverseFindNodeById(container.scene.children, n.id, resultNode)
      // 1.visibility
      if (resultNode[0]) resultNode[0].visible = n.visible
    }
  })
}

export function flatTreeNodes(nodes: any, result: Array<any>) {
  nodes.forEach((n: any) => {
    result.push(n)
    if (n.children && n.children.length > 0) flatTreeNodes(n.children, result)
  })
}

export function traverseFindNodeById(nodes: any, id: string, result: Array<any>) {
  nodes.forEach((n: any) => {
    if (n.uuid === id) result.push(n)
    if (n.children && n.children.length > 0) traverseFindNodeById(n.children, id, result)
  })
}
