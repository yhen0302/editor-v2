import { parseModelNode } from './util'
import store from '../../store'
// import { EventsBus } from '../EventsBus'
// import { throttled } from '../utils/base'
import { clickFun } from './clickFun'
import { onloadFun } from './onloadFun'

declare const Bol3D: any

export const importScene = (canvas: any, d?: any) => {
  const scene = d || store.state.exportContent[0].children[0].trees.threeDimension
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
      process.env.NODE_ENV === production ? (location.protocol === 'blob:' ? 'https://www.kantu3d.com/demo/edit/' : location.origin + location.pathname) : location.origin + location.pathname

  var textMeshGroup: any, iconMeshGroup: any, flyLineMeshGroup: any

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
      if (item.isEdit) {
        if (item.name == 'Text') {
          textMeshGroup = item
        } else if (item.name == 'Icon') {
          iconMeshGroup = item
        } else if (item.name == 'FlyLine') {
          flyLineMeshGroup = item
        }
      } else {
        modelUrls.push(`/models/HangKong/ChangJing/${item.name}.glb`)
        models.push(item)
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
      models.forEach((item: any) => {
        if (model.name == item.name) {
          model.position.set(parseFloat(item.options.position[0]), parseFloat(item.options.position[1]), parseFloat(item.options.position[2]))
          model.rotation.set((item.options.rotation[0] * Math.PI) / 180, (item.options.rotation[1] * Math.PI) / 180, (item.options.rotation[2] * Math.PI) / 180)
          model.scale.set(parseFloat(item.options.scale[0]), parseFloat(item.options.scale[1]), parseFloat(item.options.scale[2]))
          model.visible = item.visible
          modelsRecursion(model.children, item.children)
        }
      })
      const node: any = {}
      const index = 0
      // 3d模板 存入缓存
      parseModelNode(model, index, node)
      store.state.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      const obj = onloadFun(evt, container, publicPath, {
        textMeshGroup,
        iconMeshGroup,
        flyLineMeshGroup
      })

      // click event
      clickFun(container, publicPath, obj)
    }
  })
}

const modelsRecursion = (model: any, template: any) => {
  const arrs: any = []
  findElement(arrs, template)
  model.forEach((item: any) => {
    arrs.forEach((dev: any) => {
      if (item.isMesh) {
        if (item.name == dev.name && item.type == dev.type) {
          item.visible = dev.visible
          item.position.set(parseFloat(dev.options.position[0]), parseFloat(dev.options.position[1]), parseFloat(dev.options.position[2]))
          item.rotation.set((dev.options.rotation[0] * Math.PI) / 180, (dev.options.rotation[1] * Math.PI) / 180, (dev.options.rotation[2] * Math.PI) / 180)
          item.scale.set(parseFloat(dev.options.scale[0]), parseFloat(dev.options.scale[1]), parseFloat(dev.options.scale[2]))
          item.castShadow = dev.options.castShadow
          item.receiveShadow = dev.options.receiveShadow
          item.material.color.set(dev.matOptions.color)
          item.material.depthTest = dev.matOptions.depthTest
          item.material.depthWrite = dev.matOptions.depthWrite
          item.material.opacity = dev.matOptions.opacity
          item.material.transparent = dev.matOptions.transparent
          item.material.wireframe = dev.matOptions.wireframe
          item.material.emissive.set(dev.matOptions.extends.emissive)
          item.material.emissiveIntensity = dev.matOptions.extends.emissiveIntensity
          item.material.envMapIntensity = dev.matOptions.extends.envMapIntensity
          item.material.lightMapIntensity = dev.matOptions.extends.lightMapIntensity
          item.material.metalness = dev.matOptions.extends.metalness
          item.material.roughness = dev.matOptions.extends.roughness
        }
      } else {
        item.traverse((child: any) => {
          if (child.name == dev.name && child.type == dev.type) {
            if (child.type == 'Group') {
              child.position.set(parseFloat(dev.options.position[0]), parseFloat(dev.options.position[1]), parseFloat(dev.options.position[2]))
              child.rotation.set((dev.options.rotation[0] * Math.PI) / 180, (dev.options.rotation[1] * Math.PI) / 180, (dev.options.rotation[2] * Math.PI) / 180)
              child.scale.set(parseFloat(dev.options.scale[0]), parseFloat(dev.options.scale[1]), parseFloat(dev.options.scale[2]))
              child.visible = dev.visible
            } else if (child.type == 'Object3D') {
              child.position.set(parseFloat(dev.options.position[0]), parseFloat(dev.options.position[1]), parseFloat(dev.options.position[2]))
              child.rotation.set((dev.options.rotation[0] * Math.PI) / 180, (dev.options.rotation[1] * Math.PI) / 180, (dev.options.rotation[2] * Math.PI) / 180)
              child.scale.set(parseFloat(dev.options.scale[0]), parseFloat(dev.options.scale[1]), parseFloat(dev.options.scale[2]))
              child.visible = dev.visible
            } else if (child.type == 'Mesh') {
              child.visible = dev.visible
              child.position.set(parseFloat(dev.options.position[0]), parseFloat(dev.options.position[1]), parseFloat(dev.options.position[2]))
              child.rotation.set((dev.options.rotation[0] * Math.PI) / 180, (dev.options.rotation[1] * Math.PI) / 180, (dev.options.rotation[2] * Math.PI) / 180)
              child.scale.set(parseFloat(dev.options.scale[0]), parseFloat(dev.options.scale[1]), parseFloat(dev.options.scale[2]))
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
      }
    })
  })
}

const findElement = (arrs: any, obj: any) => {
  obj.forEach((item: any) => {
    const str: any = {}
    for (const k in item) {
      if (k != 'children') {
        str[k] = item[k]
      }
    }
    arrs.push(str)

    if (item.children.length > 0) {
      findElement(arrs, item.children)
    }
  })
}
