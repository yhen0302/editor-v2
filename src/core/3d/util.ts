import { toRaw } from 'vue'
import store from '../../store'

export function parseModelNode(node: any, index: number, result: any) {
  result.uuid = node.uuid
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
      rotation: [parseFloat(((node.rotation.x * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.y * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.z * 180) / Math.PI).toFixed(4))],
      scale: [parseFloat(node.scale.x.toFixed(4)), parseFloat(node.scale.y.toFixed(4)), parseFloat(node.scale.z.toFixed(4))]
    }
  } else if (node.type === 'Mesh') {
    result.options = {
      position: [parseFloat(node.position.x.toFixed(4)), parseFloat(node.position.y.toFixed(4)), parseFloat(node.position.z.toFixed(4))],
      rotation: [parseFloat(((node.rotation.x * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.y * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.z * 180) / Math.PI).toFixed(4))],
      scale: [parseFloat(node.scale.x.toFixed(4)), parseFloat(node.scale.y.toFixed(4)), parseFloat(node.scale.z.toFixed(4))]
    }
  } else if (node.type === 'Object3D') {
    result.options = {
      position: [parseFloat(node.position.x.toFixed(4)), parseFloat(node.position.y.toFixed(4)), parseFloat(node.position.z.toFixed(4))],
      rotation: [parseFloat(((node.rotation.x * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.y * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.z * 180) / Math.PI).toFixed(4))],
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

// 所有节点spread属性重置为false
export function traverseResetSpreadOfNodes(nodes: any) {
  nodes.forEach((n: any) => {
    n.spread = false
    if (n.children.length > 0) traverseResetSelectedOfNodes(n.children)
  })
}

// 根据pageNode重载3d scene
export function reloadThreeDimensionScene(pageNode: any) {
  const sceneNodes = pageNode.trees.threeDimension
  const flatSceneNodes: any = []
  flatTreeNodes(sceneNodes, flatSceneNodes)

  const container: any = toRaw(store.state.threeDimensionContainer)

  for (const k in flatSceneNodes) {
    const n = flatSceneNodes[k]

    if (n.type === 'PerspectiveCamera') {
      console.log('n.options', n)
      // todo 正交相机,墨卡托相机 , 相机重置（动画）
      // 1. update camera
      container.orbitControls.object.position.set(n.options.position[0], n.options.position[1], n.options.position[2])
      container.orbitControls.object.near = n.options.near
      container.orbitControls.object.far = n.options.far
      container.orbitControls.object.fov = n.options.fov
      // 2.update controls
      container.orbitControls.minDistance = n.options.minDistance
      container.orbitControls.maxDistance = n.options.maxDistance
      container.orbitControls.minPolarAngle = (n.options.minPolarAngle * Math.PI) / 180
      container.orbitControls.maxPolarAngle = (n.options.maxPolarAngle * Math.PI) / 180

      container.orbitControls.object.updateProjectionMatrix()
      container.orbitControls.update()
    } else if (n.type === 'Group') {
      const resultNode: any = []
      traverseFindNodeById(container.scene.children, n.uuid, resultNode)
      if (resultNode.length === 0) {
        console.warn('can not find object which uuid is ' + n.uuid)
        continue
      }

      const node = resultNode[0]
      // 1.visibility
      node.visible = n.visible
      // 2.trs
      node.position.set(n.options.position[0], n.options.position[1], n.options.position[2])
      node.rotation.set((n.options.rotation[0] * Math.PI) / 180, (n.options.rotation[1] * Math.PI) / 180, (n.options.rotation[2] * Math.PI) / 180)
      node.scale.set(n.options.scale[0], n.options.scale[1], n.options.scale[2])
    } else if (n.type === 'Mesh') {
      const resultNode: any = []
      traverseFindNodeById(container.scene.children, n.uuid, resultNode)
      if (resultNode.length === 0) {
        console.warn('can not find object which uuid is ' + n.uuid)
        continue
      }

      const node = resultNode[0]
      // 1.visibility
      node.visible = n.visible
      // 2.trs
      node.position.set(n.options.position[0], n.options.position[1], n.options.position[2])
      node.rotation.set((n.options.rotation[0] * Math.PI) / 180, (n.options.rotation[1] * Math.PI) / 180, (n.options.rotation[2] * Math.PI) / 180)
      node.scale.set(n.options.scale[0], n.options.scale[1], n.options.scale[2])
    } else if (n.type === 'Object3D') {
      const resultNode: any = []
      traverseFindNodeById(container.scene.children, n.uuid, resultNode)
      if (resultNode.length === 0) {
        console.warn('can not find object which uuid is ' + n.uuid)
        continue
      }

      const node = resultNode[0]
      // 1.visibility
      node.visible = n.visible
      // 2.trs
      node.position.set(n.options.position[0], n.options.position[1], n.options.position[2])
      node.rotation.set((n.options.rotation[0] * Math.PI) / 180, (n.options.rotation[1] * Math.PI) / 180, (n.options.rotation[2] * Math.PI) / 180)
      node.scale.set(n.options.scale[0], n.options.scale[1], n.options.scale[2])
    }
  }
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
