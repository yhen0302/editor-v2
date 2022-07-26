import { parseModelNode } from './util'
import store from '../../store'
// import { EventsBus } from '../EventsBus'
// import { throttled } from '../utils/base'
import { clickFun } from './clickFun'
import { onloadFun } from './onloadFun'

declare const Bol3D: any

var max = new Bol3D.Vector3()
var min = new Bol3D.Vector3()

const distinct: any = (arr) => {
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i].uuid === arr[j].uuid) {
        arr.splice(j, 1)
        // splic数组会改变数组长度，所以要将数组长度len和下标j减一
        j--
        len--
      }
    }
  }
  return arr
}

export const importScene = (canvas: any) => {
  var Camera: any,
    AmbientLight: any,
    HemisphereLight: any,
    DirectionLights: any,
    SpotLights: any,
    PointLights: any,
    RectAreaLights: any,
    Shadow: any,
    Background: any,
    HDR: any,
    Fog: any,
    BloomPass: any,
    OutlinePass: any,
    DOFPass: any,
    GammaPass: any,
    MSAAPass: any
  var modelUrls: any = [],
    models: any = [],
    production = 'production', // 不提出来过不了编译 semantic error TS2367
    publicPath =
      process.env.NODE_ENV === production
        ? location.protocol === 'blob:'
          ? 'https://www.kantu3d.com/demo/edit/'
          : location.origin + location.pathname
        : location.origin + location.pathname

  var textMeshGroup: any, iconMeshGroup: any, flyLineMeshGroup: any
  var textMeshGroupFoo: any = [],
    iconMeshGroupFoo: any = [],
    flyLineMeshGroupFoo: any = [],
    textMeshGroupDepu: any,
    iconMeshGroupDepu: any,
    flyLineMeshGroupDepu: any

  const tree = JSON.parse(JSON.stringify(store.state.exportContent.tree))
  var scene: any = null
  tree.forEach((item: any) => {
    item.children.forEach((dev: any) => {
      if (dev.selected) {
        scene = dev.trees.threeDimension
      }

      dev.trees.threeDimension.forEach((crt: any) => {
        if (crt.uuid == 'IconIndex-uuid-2CC79AFB') {
          crt.children.forEach((i: any) => {
            iconMeshGroupFoo.push(i)
          })
          if (dev.selected) {
            iconMeshGroup = crt
          }
        } else if (crt.uuid == 'TextIndex-uuid-F4763805') {
          crt.children.forEach((i: any) => {
            textMeshGroupFoo.push(i)
          })
          if (dev.selected) {
            textMeshGroup = crt
          }
        } else if (crt.uuid == 'FlyLineIndex-uuid-352BF4EA') {
          crt.children.forEach((i: any) => {
            flyLineMeshGroupFoo.push(i)
          })
          if (dev.selected) {
            flyLineMeshGroup = crt
          }
        }
      })
    })
  })
  iconMeshGroupDepu = distinct(iconMeshGroupFoo)
  textMeshGroupDepu = distinct(textMeshGroupFoo)
  flyLineMeshGroupDepu = distinct(flyLineMeshGroupFoo)

  scene.forEach((item: any) => {
    if (item.uuid == -1) {
      if (item.name == 'Camera') {
        Camera = item
      } else if (item.name == 'AmbientLight') {
        AmbientLight = item
      } else if (item.name == 'HemisphereLight') {
        HemisphereLight = item
      } else if (item.name == 'DirectionLights') {
        DirectionLights = item
      } else if (item.name == 'SpotLights') {
        SpotLights = item
      } else if (item.name == 'PointLights') {
        PointLights = item
      } else if (item.name == 'RectAreaLights') {
        RectAreaLights = item
      } else if (item.name == 'Shadow') {
        Shadow = item
      } else if (item.name == 'Background') {
        Background = item
      } else if (item.name == 'HDR') {
        HDR = item
      } else if (item.name == 'Fog') {
        Fog = item
      } else if (item.name == 'BloomPass') {
        BloomPass = item
      } else if (item.name == 'OutlinePass') {
        OutlinePass = item
      } else if (item.name == 'DOFPass') {
        DOFPass = item
      } else if (item.name == 'GammaPass') {
        GammaPass = item
      } else if (item.name == 'MSAAPass') {
        MSAAPass = item
      }
    } else {
      if (!item.isEdit) {
        modelUrls.push(`/models/HangKong/ChangJing/${item.name}.glb`)
        const arrs: any = []
        findAllChildren(arrs, item)
        models.push(arrs)
      }
    }
  })

  const container: any = new Bol3D.Container({
    publicPath,
    container: canvas,
    viewState: 'orbit',
    modelUrls,
    cameras: {
      orbitCamera: Camera.options
    },
    lights: {
      ambientLight: AmbientLight.options,
      hemisphereLight: HemisphereLight.options,
      directionLights: DirectionLights.children,
      spotLights: SpotLights.children,
      pointLights: PointLights.children,
      rectAreaLights: RectAreaLights.children
    },
    enableShadow: Shadow.options.enabled,
    background: Background.options,
    hdrUrls: HDR.options.value,
    fog: Fog.options,
    bloomEnabled: BloomPass.options.enabled,
    bloom: BloomPass.options,
    outlineEnabled: OutlinePass.options.enabled,
    outline: OutlinePass.options,
    dofEnabled: DOFPass.options.enabled,
    dof: DOFPass.options,
    gammaEnabled: GammaPass.options.enabled,
    gamma: GammaPass.options,
    msaa: MSAAPass.options,
    stats: true,
    onProgress: (model: any) => {
      model.traverse((child: any) => {
        if (child.isMesh) {
          const v = new Bol3D.Vector3()
          child.geometry.boundingBox.getCenter(v)
          const _v = v.clone()
          recursiveCalParentsMat(child, _v, new Bol3D.Matrix4())
          const _max = child.geometry.boundingBox.max.clone()
          recursiveCalParentsMat(child, _max, new Bol3D.Matrix4())
          const _min = child.geometry.boundingBox.min.clone()
          recursiveCalParentsMat(child, _min, new Bol3D.Matrix4())
          const __max = new Bol3D.Vector3().subVectors(_v, _max)
          const __min = new Bol3D.Vector3().subVectors(_v, _min)
          if (__max.lengthSq() > max.lengthSq()) max.copy(__max)
          if (__min.lengthSq() > min.lengthSq()) min.copy(__min)
        }
      })
      const node: any = {}
      const index = 0
      // 3d模板 存入缓存
      parseModelNode({ name: model.name }, model, index, node)
      models.forEach((crv: any) => {
        if (crv[0].uuid == model.uuid) {
          modelGiveRecursion(model, crv, node)
        }
      })
    },
    onLoad: (evt: any) => {
      ;(store as any).state.elementScaleInterval.x = Math.abs(max.x) + Math.abs(min.x)
      ;(store as any).state.elementScaleInterval.y = Math.abs(max.y) + Math.abs(min.y)
      ;(store as any).state.elementScaleInterval.z = Math.abs(max.z) + Math.abs(min.z)

      store.state.threeDimensionContainer = container

      const obj = onloadFun(evt, container, publicPath, {
        textMeshGroup,
        iconMeshGroup,
        flyLineMeshGroup,
        textMeshGroupDepu,
        iconMeshGroupDepu,
        flyLineMeshGroupDepu
      })
      // // click event
      clickFun(container, publicPath, obj)
    }
  })
}

const modelGiveRecursion = (gourp: any, arrs: any, node: any) => {
  gourp.traverse((child: any) => {
    arrs.forEach((dev: any) => {
      if (child.uuid == dev.uuid) {
        if (child.type == 'Object3D' || child.type == 'Group') {
          child.position.set(
            parseFloat(dev.options.position[0]),
            parseFloat(dev.options.position[1]),
            parseFloat(dev.options.position[2])
          )
          child.rotation.set(
            (dev.options.rotation[0] * Math.PI) / 180,
            (dev.options.rotation[1] * Math.PI) / 180,
            (dev.options.rotation[2] * Math.PI) / 180
          )
          child.scale.set(
            parseFloat(dev.options.scale[0]),
            parseFloat(dev.options.scale[1]),
            parseFloat(dev.options.scale[2])
          )
          child.visible = dev.visible
        } else if (child.type == 'Mesh') {
          child.visible = dev.visible
          child.position.set(
            parseFloat(dev.options.position[0]),
            parseFloat(dev.options.position[1]),
            parseFloat(dev.options.position[2])
          )
          child.rotation.set(
            (dev.options.rotation[0] * Math.PI) / 180,
            (dev.options.rotation[1] * Math.PI) / 180,
            (dev.options.rotation[2] * Math.PI) / 180
          )
          child.scale.set(
            parseFloat(dev.options.scale[0]),
            parseFloat(dev.options.scale[1]),
            parseFloat(dev.options.scale[2])
          )
          child.castShadow = dev.options.castShadow
          child.receiveShadow = dev.options.receiveShadow
          child.material.color.set(dev.matOptions.color)
          child.material.depthTest = dev.matOptions.depthTest
          child.material.depthWrite = dev.matOptions.depthWrite
          child.material.opacity = dev.matOptions.opacity
          child.material.transparent = dev.matOptions.transparent
          child.material.wireframe = dev.matOptions.wireframe
          child.material.emissive.set(dev.matOptions.extends.emissive)
          child.material.emissiveIntensity = dev.matOptions.extends.emissiveIntensity
          child.material.envMapIntensity = dev.matOptions.extends.envMapIntensity
          child.material.lightMapIntensity = dev.matOptions.extends.lightMapIntensity
          child.material.metalness = dev.matOptions.extends.metalness
          child.material.roughness = dev.matOptions.extends.roughness
        }
      }
    })
  })
}

const findAllChildren = (arrs: any, obj: any) => {
  const str: any = {}
  for (const k in obj) {
    if (k != 'children') {
      str[k] = obj[k]
    }
  }
  arrs.push(str)
  if (obj.children.length > 0) {
    obj.children.forEach((item: any) => {
      findAllChildren(arrs, item)
    })
  }
}

// 递归找出上面所有父级元素 并乘以相应矩阵
function recursiveCalParentsMat(obj, v, mat) {
  mat.compose(
    obj.position,
    new Bol3D.Quaternion().setFromEuler(new Bol3D.Euler().setFromVector3(obj.rotation)),
    obj.scale
  )
  v.applyMatrix4(mat)
  if (!obj.parent || obj.parent.type == 'Scene') return
  recursiveCalParentsMat(obj.parent, v, mat)
}
