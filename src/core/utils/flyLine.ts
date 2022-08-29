import store from '../../store'
import { EventsBus } from '../EventsBus'

declare const Bol3D: any

const pointsArrs = (source: any, target: any, height: any) => {
  const positions: any = []
  const attrPositions: any = []
  const attrCindex: any = []
  const attrCnumber: any = []

  const _source = new Bol3D.Vector3(source.x, source.y, source.z)
  const _target = new Bol3D.Vector3(target.x, target.y, target.z)
  const _center = _target.clone().lerp(_source, 0.5)
  _center.y += height

  const number = parseInt(_source.distanceTo(_center) + _target.distanceTo(_center))

  const curve = new Bol3D.QuadraticBezierCurve3(_source, _center, _target)

  const points = curve.getPoints(number)
  // 粒子位置计算
  points.forEach((elem: any, i: number) => {
    const index = i / (number - 1)
    positions.push({
      x: elem.x,
      y: elem.y,
      z: elem.z
    })
    attrCindex.push(index)
    attrCnumber.push(i)
  })

  positions.forEach((p: any) => {
    attrPositions.push(p.x, p.y, p.z)
  })
  return { attrPositions, attrCindex, attrCnumber, number }
}

const flyObj = (option: any) => {
  const { source, target, height, size, color, range, speed } = option
  const { attrPositions, attrCindex, attrCnumber, number } = pointsArrs(source, target, height)

  const geometry = new Bol3D.BufferGeometry()
  geometry.setAttribute('position', new Bol3D.Float32BufferAttribute(attrPositions, 3))
  // 传递当前所在位置
  geometry.setAttribute('index', new Bol3D.Float32BufferAttribute(attrCindex, 1))
  geometry.setAttribute('current', new Bol3D.Float32BufferAttribute(attrCnumber, 1))

  const shader = new Bol3D.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: Bol3D.AdditiveBlending,
    uniforms: {
      uColor: {
        value: new Bol3D.Color(color) // 颜色
      },
      uRange: {
        value: range || 100 // 显示当前范围的个数
      },
      uSize: {
        value: size // 粒子大小
      },
      uTotal: {
        value: number // 当前粒子的所有的总数
      },
      time: {
        value: 0 //
      },
      speed: {
        value: speed
      }
    },
    vertexShader: `
        attribute float index;
        attribute float current;
        uniform float time;
        uniform float speed;
        uniform float uSize;
        uniform float uRange; // 展示区间
        uniform float uTotal; // 粒子总数
        uniform vec3 uColor; 
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
            // 需要当前显示的索引
            float size = uSize;
            float showNumber = uTotal * mod(time * speed, 1.1);
            if (showNumber > current && showNumber < current + uRange) {
                float uIndex = ((current + uRange) - showNumber) / uRange;
                size *= uIndex;
                vOpacity = 1.0;
            } else {
                vOpacity = 0.0;
            }

            // 顶点着色器计算后的Position
            vColor = uColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition; 
            // 大小
            gl_PointSize = size * 300.0 / (-mvPosition.z);
        }`,
    fragmentShader: `
        varying vec3 vColor; 
        varying float vOpacity;
        void main() {
            gl_FragColor = vec4(vColor, vOpacity);
        }`
  })

  const point = new Bol3D.Points(geometry, shader)

  return point
}

export const reviseFlyLine = (option: any, mesh: any) => {
  const { source, target, height, size, color, range, speed } = option
  const { attrPositions, attrCindex, attrCnumber, number } = pointsArrs(source, target, height)

  const geometry = new Bol3D.BufferGeometry()
  geometry.setAttribute('position', new Bol3D.Float32BufferAttribute(attrPositions, 3))
  // 传递当前所在位置
  geometry.setAttribute('index', new Bol3D.Float32BufferAttribute(attrCindex, 1))
  geometry.setAttribute('current', new Bol3D.Float32BufferAttribute(attrCnumber, 1))
  mesh.geometry = geometry
  mesh.material.uniforms.uTotal.value = number
  mesh.material.uniforms.uColor.value = new Bol3D.Color(color)
  mesh.material.uniforms.uRange.value = range
  mesh.material.uniforms.uSize.value = size
  mesh.material.uniforms.speed.value = speed
  store.state.addElementType &&
    store.state.addElementType.basePoint &&
    store.state.addElementType.basePoint.position.copy(source.clone())
  store.state.addElementType &&
    store.state.addElementType.basePoint &&
    store.state.addElementType.movePoint.position.copy(target.clone())
  mesh.userData.source = source.clone()
  mesh.userData.target = target.clone()
  mesh.userData.height = height
  mesh.userData.size = size
  mesh.userData.color = color
  mesh.userData.range = range
  mesh.userData.speed = speed
}

export const reviseCurveLine = (position: Array<number>, obj: any) => {
  const position1: any = (store as any).state.addElementType.basePoint.position.clone()
  const cx = (position1.x + position[0]) / 2
  const cy = position1.y > position[1] ? position1.y + 50 : position[1] + 50
  const cz = (position1.z + position[2]) / 2

  var curve = new Bol3D.CatmullRomCurve3([
    new Bol3D.Vector3(position1.x, position1.y, position1.z),
    new Bol3D.Vector3(cx, cy, cz),
    new Bol3D.Vector3(position[0], position[1], position[2])
  ])
  curve.closed = false
  const ponits = curve.getPoints(100)
  obj.visible = true
  obj.geometry = new Bol3D.BufferGeometry().setFromPoints(ponits)
  ;(store as any).state.addElementType.curveObj = obj
}

export const flyBasePoint = (
  container: any,
  position: Array<number>,
  curveSphere1: any,
  curveSphere2: any,
  obj: any
) => {
  const scaleMax: any =
    store.state.elementScaleInterval.x > store.state.elementScaleInterval.z
      ? (store.state.elementScaleInterval.x / 5000).toFixed(4)
      : (store.state.elementScaleInterval.z / 5000).toFixed(4)

  if (!(store as any).state.addElementType.painting) {
    const node: any = {}
    EventsBus.emit('toolBarSelected', { node })
    arrayDel(container.clickObjects, curveSphere1)
    arrayDel(container.clickObjects, curveSphere2)
    curveSphere1.visible = true
    curveSphere2.visible = true
    curveSphere1.scale.set(scaleMax, scaleMax, scaleMax)
    curveSphere2.scale.set(scaleMax, scaleMax, scaleMax)
    curveSphere1.position.set(...position)
    curveSphere2.position.set(...position)
    ;(store as any).state.addElementType.painting = true
  } else {
    ;(store as any).state.addElementType.painting = false
    curveSphere2.position.set(...position)
    obj.visible = false
    const line = flyObj({
      source: curveSphere1.position.clone(),
      target: curveSphere2.position.clone(),
      height: 1,
      size: scaleMax < 1 ? 1 : scaleMax,
      color: '#fff000',
      range: 100,
      speed: 1
    })
    line.name = 'flyLineSelf'
    line.userData.source = curveSphere1.position.clone()
    line.userData.target = curveSphere2.position.clone()
    line.userData.height = 1
    line.userData.size = scaleMax < 1 ? 1 : scaleMax
    line.userData.color = '#fff000'
    line.userData.range = 100
    line.userData.speed = 1
    container.clickObjects.push(line, curveSphere1, curveSphere2)
    ;(store as any).state.elementFlyLine.push(line)
    ;(store as any).state.addElementType.mesh = line
    line.renderOrder = 500
    // container.attach(line)

    const node = { type: 'flyLine', selected: true, name: '' }
    EventsBus.emit('toolBarSelected', { node })
    const modelType = store.state.addElementType.modelType
    store.state.selectedSceneTreeNode.trees.threeDimension.forEach((item: any) => {
      if (item.name == 'FlyLine') {
        item.childIndex++
        line.uuid = `flyLineSelfIndex${item.childIndex}-${store.state.selectedSceneTreeNode.uuid}`
        const obj = meshBasicMsg(line, item, {
          source: curveSphere1.position.clone(),
          target: curveSphere2.position.clone(),
          height: 1,
          size: scaleMax < 1 ? 1 : scaleMax,
          color: '#fff000',
          range: 100,
          speed: 1,
          modelType
        })
        item.children.push(obj)
      }
    })
    if (!modelType) {
      store.state.template.threeDimension.forEach((item: any) => {
        if (item.name == 'FlyLine') {
          const obj = meshBasicMsg(line, item, {
            source: curveSphere1.position.clone(),
            target: curveSphere2.position.clone(),
            height: 1,
            size: scaleMax < 1 ? 1 : scaleMax,
            color: '#fff000',
            range: 100,
            speed: 1,
            modelType
          })
          item.children.push(obj)
        }
      })
    }
    store.state.threeDimensionContainer.scene.children.forEach((item) => {
      if (item.name == 'FlyLine') {
        item.add(line)
      }
    })
    setTimeout(() => {
      ;(store as any).state.addElementType.moving = !(store as any).state.addElementType.moving
    }, 100)
  }
}

const arrayDel = (arr: Array<any>, delObj: any) => {
  arr.forEach((item: any, i: number) => {
    if (item.uuid == delObj.uuid) {
      arr.splice(i, 1)
      return false
    }
  })
}

export const addFlyLine = (container: any, parentMesh: any, visible: any, node: any) => {
  const { color, height, range, size, source, speed, target } = node.options
  const line = flyObj({
    source: new Bol3D.Vector3(source.x, source.y, source.z),
    target: new Bol3D.Vector3(target.x, target.y, target.z),
    height: height,
    size: size,
    color: color,
    range: range,
    speed: speed
  })
  line.name = 'flyLineSelf'
  line.userData.source = new Bol3D.Vector3(source.x, source.y, source.z)
  line.userData.target = new Bol3D.Vector3(target.x, target.y, target.z)
  line.userData.height = height
  line.userData.size = size
  line.userData.color = color
  line.userData.range = range
  line.userData.speed = speed
  container.clickObjects.push(line)
  line.renderOrder = 500
  line.visible = visible
  line.uuid = node.uuid
  ;(store as any).state.elementFlyLine.push(line)
  parentMesh.add(line)
}

const meshBasicMsg = (mesh: any, item: any, options: any) => {
  var index = item.index
  const obj = {
    children: [],
    index: index + 1,
    name: mesh.name,
    options: {
      source: options.source,
      target: options.target,
      height: options.height,
      speed: options.speed,
      size: options.size,
      color: options.color,
      range: options.range
    },
    addMeshType: 'FlyLine',
    selected: false,
    show: true,
    spread: false,
    event: {},
    type: 'FlyLine',
    uuid: mesh.uuid,
    visible: mesh.visible,
    modelType: options.modelType
  }
  return obj
}
