import store from '../../store'
import { EventsBus } from '../EventsBus'
import { animationToBeat } from '../3d/util'

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

  const modelType = store.state.addElementType.modelType
  store.state.selectedSceneTreeNode.trees.threeDimension.forEach((item: any) => {
    if (item.name == 'Icon') {
      item.childIndex++
      icon.uuid = `iconSelfindex${item.childIndex}-${store.state.selectedSceneTreeNode.uuid}`
      const ObjMesh = meshBasicMsg(icon, item, urlIcon, { position, scaleMax, modelType })
      item.children.push(ObjMesh)
    }
  })
  if (!modelType) {
    store.state.template.threeDimension.forEach((item: any) => {
      if (item.name == 'Icon') {
        const ObjMesh = meshBasicMsg(icon, item, urlIcon, { position, scaleMax, modelType })
        item.children.push(ObjMesh)
      }
    })
  }
  store.state.threeDimensionContainer.scene.children.forEach((item) => {
    if (item.name == 'Icon') {
      item.add(icon)
    }
  })
  setTimeout(() => {
    store.state.addElementType.moving = !store.state.addElementType.moving
  }, 100)
}

export const addIconToJson = (
  container: any,
  node: any,
  visible: any,
  animationType: any,
  callback: any
) => {
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
      icon.visible = visible
      container.clickObjects.push(icon)
      icon.name = node.name

      if (animationType) {
        node.animation && node.animation.beat
          ? (icon.userData.beat = JSON.parse(JSON.stringify(node.animation.beat)))
          : (icon.userData.beat = {})
        if (Object.keys(icon.userData.beat).length != 0) {
          animationToBeat(icon, true)
        }
      }

      console.log(icon)

      callback && callback(icon)
    }
  })
  icon.uuid = node.uuid
}

const meshBasicMsg = (mesh: any, item: any, urlIcon: any, options: any) => {
  var index = item.index
  const obj = {
    children: [],
    index: index + 1,
    name: mesh.name,
    options: {
      urlIcon: urlIcon,
      meshPosition: options.position,
      meshScale: options.scaleMax,
      meshOpacity: 100
    },
    addMeshType: 'Icon',
    selected: false,
    show: true,
    spread: false,
    event: {},
    animation: {},
    type: 'Icon',
    uuid: mesh.uuid,
    visible: mesh.visible,
    modelType: options.modelType
  }
  return obj
}
