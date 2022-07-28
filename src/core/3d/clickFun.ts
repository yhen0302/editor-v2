import store from '../../store'
import { EventsBus } from '../EventsBus'
import * as Text from '../utils/text3D'
import * as Fly from '../utils/flyLine'
import * as Icon from '../utils/Icon'
import { any } from 'underscore'

declare const Bol3D: any
var containerBox: any

export const clickFun = (container: any, publicPath: any, selfMesh: any) => {
  const { lightPlane, curveSphere1, curveSphere2, line } = selfMesh

  containerBox = container
  store.state.elementClick = new Bol3D.Events(container)

  const clock = new Bol3D.Clock()
  const animation = () => {
    requestAnimationFrame(animation)

    if (store.state.elementFlyLine.length > 0) {
      store.state.elementFlyLine.forEach((item: any) => {
        if (!item.name.includes('flyLineSelfSphere')) {
          item.material.uniforms.time.value = clock.getElapsedTime()
        }
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
          const node = {
            type: 'text3D',
            selected: object.userData.selected,
            name: object.name,
            clickObj: true
          }
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
    const object: any = e.objects[0].object
    const name = e.objects[0].object.name
    const element = store.state.addElementType
    const position = [e.objects[0].point.x, e.objects[0].point.y, e.objects[0].point.z]
    if (element && element.type == 'icon' && !name.includes('iconSelf')) {
      Icon.addIcon(container, {
        position,
        urlIcon: element.icon,
        name: element.type,
        lightPlane
      })
    } else if (element && element.type == 'text' && !name.includes('textSelf')) {
      EventsBus.emit('toolBarSelected', { node: {} })
      Text.addCanvas(container, position, element.smallType)
    } else if (element && element.type == 'flyLine' && !name.includes('flyLineSelf')) {
      store.state.addElementType.basePoint = curveSphere1
      store.state.addElementType.movePoint = curveSphere2
      Fly.flyBasePoint(container, position, curveSphere1, curveSphere2, line)
    } else if (
      !name.includes('iconSelf') &&
      !name.includes('textSelf') &&
      !name.includes('flyLineSelf')
    ) {
      recoverMeshColor('click')
      findFatherEvent(object, 'click', (v1, v2) => {
        if (v1 && v2) {
          eventParse(v1, v2, 'click')
        }
      })

      if (element) {
        EventsBus.emit('toolBarSelected', { node: {} })
        lightPlane.visible = false
        curveSphere1.visible = false
        curveSphere2.visible = false
      }
    }
  }

  store.state.elementClick.ondbclick = (e: any) => {
    const object: any = e.objects[0].object
    const name: any = e.objects[0].object.name
    const position = [e.objects[0].point.x, e.objects[0].point.y, e.objects[0].point.z]

    recoverMeshColor('dbclick')
    findFatherEvent(object, 'dbclick', (v1, v2) => {
      if (v1 && v2) {
        eventParse(v1, v2, 'dbclick')
      }
    })
  }

  store.state.elementClick.onhover = (e: any) => {
    const object: any = e.objects[0].object
    const name: any = e.objects[0].object.name
    const position = [e.objects[0].point.x, e.objects[0].point.y, e.objects[0].point.z]
    const element = store.state.addElementType
    if (element && element.type == 'flyLine') {
      if (store.state.addElementType.painting) {
        curveSphere2.position.set(...position)
        Fly.reviseCurveLine(position, line)
      }
    } else {
      recoverMeshColor('hover')
      findFatherEvent(object, 'hover', (v1, v2) => {
        if (v1 && v2) {
          eventParse(v1, v2, 'hover')
        }
      })
    }
  }
}

const tweenMoveView = (point: any, look: any, times: any, td: any = () => {}) => {
  // 场景视角移动
  new Bol3D.TWEEN.Tween(containerBox.orbitCamera)
    .to({ position: new Bol3D.Vector3(...look) }, times)
    .start()
    .onComplete(function () {
      td && td()
    })
  new Bol3D.TWEEN.Tween(containerBox.orbitControls)
    .to({ target: new Bol3D.Vector3(...point) }, times)
    .start()
}

function recoverMeshColor(event: string) {
  containerBox.scene.traverse((child: any) => {
    if (child.userData[event] && JSON.stringify(child.userData[event]) != '{}') {
      if (child.userData[event].status) {
        if (child.type == 'Group' || child.type == 'Object3D') {
          child.traverse((dev: any) => {
            if (dev.isMesh) dev.material.color.setRGB(1, 1, 1)
          })
        } else {
          child.material.color.setRGB(1, 1, 1)
        }
        child.userData[event].status = false
      }
    }
  })
}

function findFatherEvent(obj: any, event: string, callback: any) {
  let b: any, c: any
  let a: any = (obj: any, event: string) => {
    if (obj.userData[event] && JSON.stringify(obj.userData[event]) != '{}') {
      b = obj.userData[event]
      c = obj
    }
    if (obj.parent.type != 'Scene') {
      a(obj.parent, event, callback)
    } else if (obj.parent.type == 'Scene') {
      callback && callback(b, c)
    }
  }
  a(obj, event)
}

function eventParse(options: any, obj: any, event: string) {
  if (options.type == 'viewFocus') {
    obj.userData[event].status = true
    tweenMoveView(options.options.target, options.options.position, options.options.time)
  } else if (options.type == 'colorOverlay') {
    obj.userData[event].status = true
    if (obj.type == 'Group' || obj.type == 'Object3D') {
      obj.traverse((child: any) => {
        if (child.isMesh) {
          child.material.color.set(options.options.value)
        }
      })
    } else {
      obj.material.color.set(options.options.value)
    }
  }
}
