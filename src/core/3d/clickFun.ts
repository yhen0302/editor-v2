import store from '../../store'
import { EventsBus } from '../EventsBus'
import * as Text from '../utils/text3D'
import * as Fly from '../utils/flyLine'

declare const Bol3D: any

export const clickFun = (container: any) => {
  const { lightPlane, curveSphere1, curveSphere2, line } = store.state.elementUserMesh

  store.state.elementClick = new Bol3D.Events(container)

  const clock = new Bol3D.Clock()
  const animation = () => {
    requestAnimationFrame(animation)

    if (store.state.elementFlyLine.length > 0) {
      store.state.elementFlyLine.forEach((item: any) => {
        item.material.uniforms.time.value = clock.getElapsedTime()
      })
    }
  }
  animation()

  var dragObj: any = null
  // 新增raycaster射线
  const addRay = (e: any) => {
    const mouse = new Bol3D.Vector2()
    const domElement = document.getElementsByClassName('scene-3d')[0]
    const getBoundingClientRect = domElement.getBoundingClientRect()
    const raycaster = new Bol3D.Raycaster()
    mouse.x = ((e.clientX - getBoundingClientRect.left) / (domElement.clientWidth * 0.65)) * 2 - 1
    mouse.y = -((e.clientY - getBoundingClientRect.top) / (domElement.clientHeight * 0.65)) * 2 + 1
    const camera = container.orbitCamera
    raycaster.setFromCamera(mouse, camera)
    // 需要被监听的对象要存储在clickObjects中。
    const intersects = raycaster.intersectObjects(container.clickObjects)
    return intersects
  }
  // 重写鼠标移动事件
  const newMove = (e: any) => {
    const intersects = addRay(e)
    if (intersects.length > 0) {
      const position = [intersects[0].point.x, intersects[0].point.y, intersects[0].point.z]
      dragObj.position.set(position[0], position[1], position[2])
      lightPlane.material.color.set(0xffff00)
      store.state.addElementType.moving = !store.state.addElementType.moving
    }
  }
  // 重写mousedown
  const newMoveDown = (e: any) => {
    if (e.button != 0) return

    const intersects = addRay(e)
    if (intersects.length > 0 && store.state.addElementType && intersects[0].object.visible) {
      const object = intersects[0].object
      const name = intersects[0].object.name
      if (name.includes('iconSelf') || name.includes('textSelf')) {
        container.clickObjects.forEach((item: any, i: number) => {
          if (item.uuid == object.uuid) {
            container.clickObjects.splice(i, 1)
          }
        })
        container.orbitControls.enableRotate = false
        store.state.addElementType.mesh = object
        dragObj = object
        document.getElementsByClassName('scene-3d')[0].addEventListener('mousemove', newMove)
        if (name.includes('iconSelf')) {
          lightPlane.visible = true
          object.add(lightPlane)
          const node = { type: 'icon3D', selected: object.name, name: object.name, clickObj: true }
          EventsBus.emit('toolBarSelected', { node })
        } else if (name.includes('textSelf')) {
          const node = { type: 'text3D', selected: object.userData.selected, name: object.name, clickObj: true }
          EventsBus.emit('toolBarSelected', { node })
        }
      } else if (name.includes('flyLineSelf')) {
        if (name.includes('flyLineSelfSphere')) {
          container.clickObjects.forEach((item: any, i: number) => {
            if (item.uuid == object.uuid) {
              container.clickObjects.splice(i, 1)
            }
          })
          container.orbitControls.enableRotate = false
          dragObj = object
          document.getElementsByClassName('scene-3d')[0].addEventListener('mousemove', newMove)
        } else {
          store.state.addElementType.mesh = object
          curveSphere1.position.copy(object.userData.source.clone())
          curveSphere2.position.copy(object.userData.target.clone())
          var havePoint = false
          container.clickObjects.forEach((item: any) => {
            if (item.uuid == curveSphere1.uuid || item.uuid == curveSphere2.uuid) {
              havePoint = true
            }
          })
          if (!havePoint) {
            container.clickObjects.push(curveSphere1, curveSphere2)
          }
          curveSphere1.visible = true
          curveSphere2.visible = true
          store.state.addElementType.basePoint = curveSphere1
          store.state.addElementType.movePoint = curveSphere2
          const node = { type: 'flyLine', selected: object.name, name: object.name, clickObj: true }
          EventsBus.emit('toolBarSelected', { node })
        }
      }
    }
  }
  // 重写mouseup
  const newMoveUp = (e: any) => {
    if (e.button != 0) return

    const intersects = addRay(e)
    if (intersects.length > 0) {
      if (dragObj) {
        document.getElementsByClassName('scene-3d')[0].removeEventListener('mousemove', newMove)
        container.clickObjects.push(dragObj)
        lightPlane.material.color.set(0x16ddfa)
        container.orbitControls.enableRotate = true
        dragObj = null
      }
    }
  }

  document.getElementsByClassName('scene-3d')[0].addEventListener('mousedown', newMoveDown)
  document.getElementsByClassName('scene-3d')[0].addEventListener('mouseup', newMoveUp)

  store.state.elementClick.onclick = (e: any) => {
    const name = e.objects[0].object.name
    if (store.state.addElementType) {
      const element = store.state.addElementType
      const position = [e.objects[0].point.x, e.objects[0].point.y, e.objects[0].point.z]
      if (element.type == 'icon' && !name.includes('iconSelf')) {
        const icon = new Bol3D.POI.Icon({
          position: position,
          url: element.icon,
          scale: [50, 50]
        })
        icon.material.transparent = true
        icon.center.y = 0
        icon.name = 'iconSelf' + element.type
        container.clickObjects.push(icon)
        container.attach(icon)
        lightPlane.visible = true
        icon.add(lightPlane)
        store.state.addElementType.mesh = icon
        store.state.addElementType.lightMesh = lightPlane
        store.state.elementIcon.push(icon)
        setTimeout(() => {
          store.state.addElementType.moving = !store.state.addElementType.moving
        }, 100)
      } else if (element.type == 'text' && !name.includes('textSelf')) {
        EventsBus.emit('toolBarSelected', { node: {} })
        Text.addCanvas(container, position, element.smallType)
      } else if (element.type == 'flyLine' && !name.includes('flyLineSelf')) {
        store.state.addElementType.basePoint = curveSphere1
        store.state.addElementType.movePoint = curveSphere2
        Fly.flyBasePoint(container, position, curveSphere1, curveSphere2, line)
      } else if (!name.includes('iconSelf') && !name.includes('textSelf') && !name.includes('flyLineSelf')) {
        EventsBus.emit('toolBarSelected', { node: {} })
        lightPlane.visible = false
        curveSphere1.visible = false
        curveSphere2.visible = false
      }
    }
  }

  store.state.elementClick.onhover = (e: any) => {
    const name: any = e.objects[0].object.name
    const position = [e.objects[0].point.x, e.objects[0].point.y, e.objects[0].point.z]
    const element = store.state.addElementType
    if (element && element.type == 'flyLine') {
      if (store.state.addElementType.painting) {
        curveSphere2.position.set(...position)
        Fly.reviseCurveLine(position, line)
      }
    }
  }
}
