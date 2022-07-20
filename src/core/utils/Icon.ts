import store from '../../store'
import { EventsBus } from '../EventsBus'

declare const Bol3D: any

export const addIcon = (container: any, obj: any) => {
  const scaleMax =
    store.state.elementScaleInterval.x > store.state.elementScaleInterval.z
      ? (store.state.elementScaleInterval.x / 1000).toFixed(4)
      : (store.state.elementScaleInterval.z / 1000).toFixed(4)

  const { position, urlIcon, name, lightPlane } = obj
  const icon = new Bol3D.POI.Icon({
    position: position,
    url: urlIcon,
    scale: [scaleMax, scaleMax]
  })
  icon.scale.z = scaleMax
  icon.material.transparent = true
  icon.center.y = 0
  icon.name = 'iconSelf' + name
  container.clickObjects.push(icon)
  lightPlane.visible = true
  icon.add(lightPlane)
  store.state.addElementType.mesh = icon
  store.state.addElementType.lightMesh = lightPlane
  store.state.pageTreeNodes[0].children[0].trees.threeDimension.forEach((item: any) => {
    if (item.name == 'Icon') {
      const obj = meshBasicMsg(icon, item, urlIcon)
      item.children.push(obj)
    }
  })
  store.state.threeDimensionContainer.scene.children.forEach((item) => {
    if (item.name == 'Icon') {
      item.add(icon)
    }
  })
  setTimeout(() => {
    store.state.addElementType.moving = !store.state.addElementType.moving
  }, 100)
}

export const addIconToJson = (container: any, node: any, callback: any) => {
  const { meshPosition, urlIcon, meshScale, meshOpacity } = node.options
  const icon = new Bol3D.POI.Icon({
    position: meshPosition,
    url: urlIcon,
    scale: [meshScale, meshScale],
    cb: () => {
      icon.material.transparent = true
      icon.material.opacity = meshOpacity / 100
      icon.scale.z = meshScale
      icon.center.y = 0
      icon.visible = node.visible
      container.clickObjects.push(icon)
      icon.name = node.name
      callback && callback(icon)
    }
  })
  node.uuid = icon.uuid
}

const meshBasicMsg = (mesh: any, item: any, urlIcon: any) => {
  var index = item.index
  const obj = {
    children: [],
    index: index + 1,
    name: mesh.name,
    options: {
      urlIcon: urlIcon,
      meshPosition: [],
      meshScale: '',
      meshOpacity: ''
    },
    addMeshType: 'Icon',
    selected: false,
    show: true,
    spread: false,
    type: 'Mesh',
    uuid: mesh.uuid,
    visible: mesh.visible
  }
  return obj
}
