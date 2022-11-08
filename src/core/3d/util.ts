import { toRaw } from 'vue'
import store, { LayerTreeNode3D, PageTreeNode } from '../../store'
import * as UnderScore from 'underscore'
import { mapState, useState } from '../../store/helper'

declare const Bol3D: any

export function parseModelNode(node: any, index: number, result: LayerTreeNode3D, parent: string | number = '') {
  result.uuid = node.uuid
  result.name = node.name
  result.visible = node.visible
  result.selected = false
  result.index = index
  result.spread = false
  result.type = node.type
  result.children = []
  result.options = {}
  result.show = true
  result.parent = parent
  if (node.type === 'Group') {
    result.options = {
      position: [parseFloat(node.position.x.toFixed(4)), parseFloat(node.position.y.toFixed(4)), parseFloat(node.position.z.toFixed(4))],
      rotation: [parseFloat(((node.rotation.x * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.y * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.z * 180) / Math.PI).toFixed(4))],
      scale: [parseFloat(node.scale.x.toFixed(4)), parseFloat(node.scale.y.toFixed(4)), parseFloat(node.scale.z.toFixed(4))]
    }
  } else if (node.type === 'Mesh') {
    // console.log(node.material.type, node.material.map)
    result.options = {
      position: [parseFloat(node.position.x.toFixed(4)), parseFloat(node.position.y.toFixed(4)), parseFloat(node.position.z.toFixed(4))],
      rotation: [parseFloat(((node.rotation.x * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.y * 180) / Math.PI).toFixed(4)), parseFloat(((node.rotation.z * 180) / Math.PI).toFixed(4))],
      scale: [parseFloat(node.scale.x.toFixed(4)), parseFloat(node.scale.y.toFixed(4)), parseFloat(node.scale.z.toFixed(4))],
      castShadow: node.castShadow,
      receiveShadow: node.receiveShadow
    }

    // material 基础属性
    result.matOptions = {
      type: node.material.type,
      name: node.material.name,
      color: '#' + node.material.color.getHexString(),
      transparent: node.material.transparent,
      opacity: node.material.opacity,
      // map: node.material.map,
      depthTest: node.material.depthTest,
      depthWrite: node.material.depthWrite,
      wireframe: node.material.wireframe,
      extends: {}
    }
    if (node.material.type === 'MeshStandardMaterial') {
      const extendOptions = {
        roughness: node.material.roughness,
        metalness: node.material.metalness,
        // 环境贴图
        // envMap: node.material.envMap,
        envMapIntensity: node.material.envMapIntensity,
        // 光照贴图
        // lightMap: node.material.lightMap,
        lightMapIntensity: node.material.lightMapIntensity,
        // 自发光
        emissive: '#' + node.material.emissive.getHexString(),
        emissiveIntensity: node.material.emissiveIntensity
        // emissiveMap: node.material.emissiveMap
      }

      result.matOptions.extends = extendOptions

      // Object.assign(result.matOptions, extendOptions)
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
      const child: any = {}
      result.children.push(child)
      parseModelNode(n, index, child, result.uuid)
    })
  }
}

// 所有节点selected属性重置为false
export function traverseResetSelectedOfNodes(nodes: LayerTreeNode3D[] = []) {
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

// 根据template重载3d scene passes
export function reloadThreeDimensionPassesByTemplate() {
  const stateGlobal = useState(store, 'global')
  const state3D = useState(store, '3d')
  const sceneNodes = stateGlobal.template.threeDimension
  const container = state3D.threeDimensionContainer
  const flatSceneNodes: any = []
  flatTreeNodes(sceneNodes, flatSceneNodes)

  for (const k in flatSceneNodes) {
    const n = flatSceneNodes[k]
    if (n.type === 'GammaPass') {
      const { options } = n
      const { enabled, factor } = options
      container.gammaPass.enabled = enabled
      container.gammaPass.uniforms.factor.value = factor
    } else if (n.type === 'DOFPass') {
      const { options } = n
      const { enabled, focus, aperture, maxblur } = options
      container.bokehPass.enabled = enabled
      container.bokehPass.uniforms.focus.value = focus
      container.bokehPass.uniforms.aperture.value = aperture
      container.bokehPass.uniforms.maxblur.value = maxblur
    } else if (n.type === 'OutlinePass') {
      const { options } = n
      const { enabled, edgeStrength, edgeGlow, edgeThickness, pulsePeriod, visibleEdgeColor, hiddenEdgeColor } = options
      container.outlinePass.enabled = enabled
      container.outlinePass.edgeStrength = edgeStrength
      container.outlinePass.edgeGlow = edgeGlow
      container.outlinePass.edgeThickness = edgeThickness
      container.outlinePass.pulsePeriod = pulsePeriod
      container.outlinePass.visibleEdgeColor.set(visibleEdgeColor)
      container.outlinePass.hiddenEdgeColor.set(hiddenEdgeColor)
    } else if (n.type === 'BloomPass') {
      const { options } = n
      const { enabled, radius, strength, threshold } = options
      container.bloomPass.enabled = enabled
      container.finalbloomPass.material.uniforms.bloomTexture.value = enabled ? container.bloomComposer.renderTarget2.texture : null
      container.bloomPass.radius = radius
      container.bloomPass.compositeMaterial.uniforms['bloomRadius'].value = radius
      container.bloomPass.strength = strength
      container.bloomPass.compositeMaterial.uniforms['bloomStrength'].value = strength
      container.bloomPass.threshold = threshold
      container.bloomPass.highPassUniforms['luminosityThreshold'].value = threshold
    }
  }
}

// 根据pageNode重载3d scene
export function reloadThreeDimensionScene(pageNode: PageTreeNode) {
  const sceneNodes = pageNode.trees.threeDimension
  const flatSceneNodes: any = []
  flatTreeNodes(sceneNodes, flatSceneNodes)

  const state3D = useState(store, '3d')

  const container = toRaw(state3D.threeDimensionContainer)

  for (const k in flatSceneNodes) {
    const n = flatSceneNodes[k]

    if (n.type === 'GammaPass') {
      const { options } = n
      const { enabled, factor } = options
      container.gammaPass.enabled = enabled
      container.gammaPass.uniforms.factor.value = factor
    } else if (n.type === 'DOFPass') {
      const { options } = n
      const { enabled, focus, aperture, maxblur } = options
      container.bokehPass.enabled = enabled
      container.bokehPass.uniforms.focus.value = focus
      container.bokehPass.uniforms.aperture.value = aperture
      container.bokehPass.uniforms.maxblur.value = maxblur
    } else if (n.type === 'OutlinePass') {
      const { options } = n
      const { enabled, edgeStrength, edgeGlow, edgeThickness, pulsePeriod, visibleEdgeColor, hiddenEdgeColor } = options
      container.outlinePass.enabled = enabled
      container.outlinePass.edgeStrength = edgeStrength
      container.outlinePass.edgeGlow = edgeGlow
      container.outlinePass.edgeThickness = edgeThickness
      container.outlinePass.pulsePeriod = pulsePeriod
      container.outlinePass.visibleEdgeColor.set(visibleEdgeColor)
      container.outlinePass.hiddenEdgeColor.set(hiddenEdgeColor)
    } else if (n.type === 'BloomPass') {
      const { options } = n
      const { enabled, radius, strength, threshold } = options
      container.bloomPass.enabled = enabled
      container.finalbloomPass.material.uniforms.bloomTexture.value = enabled ? container.bloomComposer.renderTarget2.texture : null
      container.bloomPass.radius = radius
      container.bloomPass.compositeMaterial.uniforms['bloomRadius'].value = radius
      container.bloomPass.strength = strength
      container.bloomPass.compositeMaterial.uniforms['bloomStrength'].value = strength
      container.bloomPass.threshold = threshold
      container.bloomPass.highPassUniforms['luminosityThreshold'].value = threshold
    } else if (n.type === 'Fog') {
      const { options } = n
      const { color, intensity } = options
      container.scene.fog.color.set(color)
      container.scene.fog.density = intensity
    } else if (n.type === 'HDR') {
      const { options } = n
      const { value } = options
      if (UnderScore.isEqual(value, [])) {
        container.envMap = null
        container.scene.traverse((c: any) => {
          if (c.isMesh) {
            c.material.envMap = null
          }
        })
      } else {
        container.setHDR(value)
      }
    } else if (n.type === 'Background') {
      const { options } = n
      const { type, value, opts } = options
      container.bgType = type

      if (type === 'color') {
        if (container.sky) container.sky.visible = false
        if (container.scene.background) container.scene.background = null
        container.bgColor = value
        container.renderer.setClearColor(value)
        if (container.ssaaPass) container.ssaaPass.clearColor = value
      } else if (type === 'texture') {
        if (container.sky) container.sky.visible = false
        if (value === '') {
          container.scene.background = null
        } else {
          container.texLoader.load(container.publicPath + value, (tex: any) => {
            container.scene.background = tex
            for (const i in opts) {
              if (i === 'encoding') {
                tex.encoding = opts[i]
              } else if (i === 'wrapping') {
                tex.wrapS = tex.wrapT = opts[i]
              } else if (i === 'repeat') {
                tex.repeat.set(opts[i][0], opts[i][1])
              }
            }
            container.scene.background.needsUpdate = true
          })
        }
      } else if (type === 'panorama') {
        if (UnderScore.isEqual(value, [])) {
          container.sky.visible = false
        } else {
          if (container.sky) {
            if (UnderScore.isEqual(container.sky.userData.value, value)) {
              container.sky.visible = true
              for (const i in opts) {
                if (i === 'scale') {
                  const s = opts[i]
                  container.sky.scale.set(s, s, s)
                } else if (i === 'rotation') {
                  container.sky.rotation.set((opts[i][0] * Math.PI) / 180, (opts[i][1] * Math.PI) / 180, (opts[i][2] * Math.PI) / 180)
                }
              }
            } else {
              container.setSkyBox(value, (sbox: any) => {
                sbox.visible = true
                for (const i in opts) {
                  if (i === 'scale') {
                    const s = opts[i]
                    sbox.scale.set(s, s, s)
                  } else if (i === 'rotation') {
                    sbox.rotation.set((opts[i][0] * Math.PI) / 180, (opts[i][1] * Math.PI) / 180, (opts[i][2] * Math.PI) / 180)
                  }
                }
              })
            }
          } else {
            container.setSkyBox(value, (sbox: any) => {
              sbox.visible = true
              for (const i in opts) {
                if (i === 'scale') {
                  const s = opts[i]
                  sbox.scale.set(s, s, s)
                } else if (i === 'rotation') {
                  sbox.rotation.set((opts[i][0] * Math.PI) / 180, (opts[i][1] * Math.PI) / 180, (opts[i][2] * Math.PI) / 180)
                }
              }
            })
          }
        }
      }
    } else if (n.type === 'Shadow') {
      container.renderer.shadowMap.enabled = n.options.enabled
    } else if (n.type === 'RectAreaLights') {
      container.rectAreaLights.forEach((rectAreaLight: any) => {
        rectAreaLight.visible = false
        n.children.forEach((rectAreaLightOpts: any) => {
          if (rectAreaLight.uuid === rectAreaLightOpts.uuid) {
            rectAreaLight.visible = true
            rectAreaLight.height = rectAreaLightOpts.options.height
            rectAreaLight.width = rectAreaLightOpts.options.width
            rectAreaLight.intensity = rectAreaLightOpts.options.intensity
            rectAreaLight.color.r = rectAreaLightOpts.options.color[0] / 255
            rectAreaLight.color.g = rectAreaLightOpts.options.color[1] / 255
            rectAreaLight.color.b = rectAreaLightOpts.options.color[2] / 255
            rectAreaLight.position.set(rectAreaLightOpts.options.position[0], rectAreaLightOpts.options.position[1], rectAreaLightOpts.options.position[2])
            rectAreaLight.lookAt(rectAreaLightOpts.options.target[0], rectAreaLightOpts.options.target[1], rectAreaLightOpts.options.target[2])
            rectAreaLight.userData.target = rectAreaLightOpts.options.target
          }
        })
      })
    } else if (n.type === 'PointLights') {
      container.pointLights.forEach((pointLight: any) => {
        pointLight.visible = false
        n.children.forEach((pointLightOpts: any) => {
          if (pointLight.uuid === pointLightOpts.uuid) {
            pointLight.visible = true
            pointLight.distance = pointLightOpts.options.distance
            pointLight.decay = pointLightOpts.options.decay
            pointLight.intensity = pointLightOpts.options.intensity
            pointLight.color.r = pointLightOpts.options.color[0] / 255
            pointLight.color.g = pointLightOpts.options.color[1] / 255
            pointLight.color.b = pointLightOpts.options.color[2] / 255
            pointLight.position.set(pointLightOpts.options.position[0], pointLightOpts.options.position[1], pointLightOpts.options.position[2])
            // shadow
            pointLight.castShadow = pointLightOpts.options.castShadow
            pointLight.shadow.bias = pointLightOpts.options.bias
            pointLight.shadow.camera.near = pointLightOpts.options.near
            pointLight.shadow.camera.far = pointLightOpts.options.far
            pointLight.shadow.mapSize.width = pointLightOpts.options.size
            pointLight.shadow.mapSize.height = pointLightOpts.options.size
            pointLight.shadow.camera.updateProjectionMatrix()
            pointLight.shadow.needsUpdate = true
          }
        })
      })
    } else if (n.type === 'SpotLights') {
      container.spotLights.forEach((spotLight: any) => {
        spotLight.visible = false
        n.children.forEach((spotLightOpts: any) => {
          if (spotLight.uuid === spotLightOpts.uuid) {
            spotLight.visible = true
            spotLight.distance = spotLightOpts.options.distance
            spotLight.decay = spotLightOpts.options.decay
            spotLight.penumbra = spotLightOpts.options.penumbra
            spotLight.intensity = spotLightOpts.options.intensity
            spotLight.color.r = spotLightOpts.options.color[0] / 255
            spotLight.color.g = spotLightOpts.options.color[1] / 255
            spotLight.color.b = spotLightOpts.options.color[2] / 255
            spotLight.position.set(spotLightOpts.options.position[0], spotLightOpts.options.position[1], spotLightOpts.options.position[2])
            spotLight.target.position.set(spotLightOpts.options.target[0], spotLightOpts.options.target[1], spotLightOpts.options.target[2])
            // shadow
            spotLight.castShadow = spotLightOpts.options.castShadow
            spotLight.shadow.mapSize.width = spotLightOpts.options.size
            spotLight.shadow.mapSize.height = spotLightOpts.options.size
            spotLight.shadow.camera.near = spotLightOpts.options.near
            spotLight.shadow.camera.far = spotLightOpts.options.far
            spotLight.angle = spotLightOpts.options.angle
            spotLight.shadow.focus = spotLightOpts.options.focus
            spotLight.shadow.bias = spotLightOpts.options.bias
            spotLight.shadow.camera.updateProjectionMatrix()
            spotLight.shadow.needsUpdate = true
          }
        })
      })
    } else if (n.type === 'DirectionLights') {
      container.directionLights.forEach((dirLight: any) => {
        dirLight.visible = false
        n.children.forEach((dirLightOpts: any) => {
          if (dirLight.uuid === dirLightOpts.uuid) {
            dirLight.visible = true
            dirLight.intensity = dirLightOpts.options.intensity
            dirLight.color.r = dirLightOpts.options.color[0] / 255
            dirLight.color.g = dirLightOpts.options.color[1] / 255
            dirLight.color.b = dirLightOpts.options.color[2] / 255
            dirLight.position.set(dirLightOpts.options.position[0], dirLightOpts.options.position[1], dirLightOpts.options.position[2])
            dirLight.target.position.set(dirLightOpts.options.target[0], dirLightOpts.options.target[1], dirLightOpts.options.target[2])
            // shadow
            dirLight.castShadow = dirLightOpts.options.castShadow
            dirLight.shadow.camera.left = -dirLightOpts.options.distance
            dirLight.shadow.camera.right = dirLightOpts.options.distance
            dirLight.shadow.camera.top = dirLightOpts.options.distance
            dirLight.shadow.camera.bottom = -dirLightOpts.options.distance
            dirLight.shadow.camera.near = dirLightOpts.options.near
            dirLight.shadow.camera.far = dirLightOpts.options.far
            dirLight.shadow.mapSize.width = dirLightOpts.options.size
            dirLight.shadow.mapSize.height = dirLightOpts.options.size
            dirLight.shadow.camera.updateProjectionMatrix()
            dirLight.shadow.needsUpdate = true
          }
        })
      })
    } else if (n.type === 'HemisphereLight') {
      container.hemiLight.intensity = n.options.intensity
      container.hemiLight.color.r = n.options.color[0] / 255
      container.hemiLight.color.g = n.options.color[1] / 255
      container.hemiLight.color.b = n.options.color[2] / 255
      container.hemiLight.groundColor.r = n.options.groundColor[0] / 255
      container.hemiLight.groundColor.g = n.options.groundColor[1] / 255
      container.hemiLight.groundColor.b = n.options.groundColor[2] / 255
      container.hemiLight.position.set(n.options.position[0], n.options.position[1], n.options.position[2])
    } else if (n.type === 'AmbientLight') {
      container.ambientLight.intensity = n.options.intensity
      container.ambientLight.color.r = n.options.color[0] / 255
      container.ambientLight.color.g = n.options.color[1] / 255
      container.ambientLight.color.b = n.options.color[2] / 255
    } else if (n.type === 'Camera') {
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

      if (n.isEdit) {
        // 1.visibility
        node.visible = n.visible
      } else {
        // 1.visibility
        node.visible = n.visible
        // 2.trs
        node.position.set(n.options.position[0], n.options.position[1], n.options.position[2])
        node.rotation.set((n.options.rotation[0] * Math.PI) / 180, (n.options.rotation[1] * Math.PI) / 180, (n.options.rotation[2] * Math.PI) / 180)
        node.scale.set(n.options.scale[0], n.options.scale[1], n.options.scale[2])
      }
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
      // 3.shadow
      node.castShadow = n.options.castShadow
      node.receiveShadow = n.options.receiveShadow
      // 4.material
      node.material.color.set(n.matOptions.color)
      node.material.transparent = n.matOptions.transparent
      node.material.opacity = n.matOptions.opacity
      node.material.depthTest = n.matOptions.depthTest
      node.material.depthWrite = n.matOptions.depthWrite
      node.material.wireframe = n.matOptions.wireframe
      if (node.material.type === 'MeshStandardMaterial') {
        for (const i in n.matOptions.extends) {
          if (i === 'emissive') {
            node.material[i].set(n.matOptions.extends[i])
          } else {
            node.material[i] = n.matOptions.extends[i]
          }
        }
      }
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

export function flatTreeNodes(nodes: Array<LayerTreeNode3D>, result: Array<LayerTreeNode3D>) {
  nodes.forEach((n: LayerTreeNode3D) => {
    result.push(n)
    if (n.children && n.children.length > 0) flatTreeNodes(n.children, result)
  })
}

// 根据当前节点展开其关联的所有父节点
export function spreadChainNodes(flattenNodes: LayerTreeNode3D[], node: LayerTreeNode3D) {
  if (node.parent !== '') {
    const result: any = []

    for (const fnode of flattenNodes) {
      if (fnode.uuid == node.parent) {
        result.push(fnode)
        break
      }
    }
    if (result[0]) {
      result[0].spread = true
      spreadChainNodes(flattenNodes, result[0])
    }
  }
}

export function traverseFindRootNodeById(node: LayerTreeNode3D, result: Array<LayerTreeNode3D>) {
  if (node.parent !== '') {
    traverseFindRootNodeById(node, result)
  } else {
    result.push()
  }
}

// 根据uuid查找节点
export function traverseFindNodeById(nodes: Array<any>, id: string, result: Array<LayerTreeNode3D>) {
  nodes.forEach((n: any) => {
    if (n.uuid === id) result.push(n)
    if (n.children && n.children.length > 0) traverseFindNodeById(n.children, id, result)
  })
}

// 加载环境配置节点(光照/相机/后处理等)
export function loadEnvironmentNodes(evt: any) {
  const stateGlobal = useState(store, 'global')

  // filterPass(单个) todo

  // msaaPass(单个)
  const msaaPassOptions = {
    supersampling: evt.supersampling
  }
  const msaaPassNode: any = {
    uuid: -1,
    name: 'MSAAPass',
    selected: false,
    index: 0,
    spread: false,
    type: 'MSAAPass',
    children: [],
    show: false,
    options: msaaPassOptions
  }
  stateGlobal.template.threeDimension.unshift(msaaPassNode)

  // gammaPass(单个)
  const gammaPassOptions = {
    enabled: evt.gammaPass.enabled,
    factor: evt.gammaPass.uniforms.factor.value
  }
  const gammaPassNode: any = {
    uuid: -1,
    name: 'GammaPass',
    selected: false,
    index: 0,
    spread: false,
    type: 'GammaPass',
    children: [],
    show: false,
    options: gammaPassOptions
  }
  stateGlobal.template.threeDimension.unshift(gammaPassNode)

  // dofPass(单个)
  const dofPassOptions = {
    enabled: evt.bokehPass.enabled,
    focus: evt.bokehPass.uniforms.focus.value,
    aperture: evt.bokehPass.uniforms.aperture.value,
    maxblur: evt.bokehPass.uniforms.maxblur.value
  }
  const dofPassNode: any = {
    uuid: -1,
    name: 'DOFPass',
    selected: false,
    index: 0,
    spread: false,
    type: 'DOFPass',
    children: [],
    show: false,
    options: dofPassOptions
  }
  stateGlobal.template.threeDimension.unshift(dofPassNode)

  // outlinePass(单个)
  const outlinePassOptions = {
    enabled: evt.outlinePass.enabled,
    edgeStrength: evt.outlinePass.edgeStrength,
    edgeGlow: evt.outlinePass.edgeGlow,
    edgeThickness: evt.outlinePass.edgeThickness,
    pulsePeriod: evt.outlinePass.pulsePeriod,
    visibleEdgeColor: '#' + evt.outlinePass.visibleEdgeColor.getHexString(),
    hiddenEdgeColor: '#' + evt.outlinePass.hiddenEdgeColor.getHexString()
  }
  const outlinePassNode: any = {
    uuid: -1,
    name: 'OutlinePass',
    selected: false,
    index: 0,
    spread: false,
    type: 'OutlinePass',
    children: [],
    show: false,
    options: outlinePassOptions
  }
  stateGlobal.template.threeDimension.unshift(outlinePassNode)

  // bloomPass(单个)
  const bloomPassOptions = {
    enabled: evt.bloomPass.enabled,
    strength: evt.bloomPass.strength,
    radius: evt.bloomPass.radius,
    threshold: evt.bloomPass.threshold
  }
  const bloomPassNode: any = {
    uuid: -1,
    name: 'BloomPass',
    selected: false,
    index: 0,
    spread: false,
    type: 'BloomPass',
    children: [],
    show: false,
    options: bloomPassOptions
  }
  stateGlobal.template.threeDimension.unshift(bloomPassNode)

  // 雾节点(单个)
  const fogOptions = {
    intensity: evt.fog.density,
    color: '#' + evt.fog.color.getHexString()
  }
  const fogNode: any = {
    uuid: -1,
    name: 'Fog',
    selected: false,
    index: 0,
    spread: false,
    type: 'Fog',
    children: [],
    show: false,
    options: fogOptions
  }
  stateGlobal.template.threeDimension.unshift(fogNode)

  // HDR节点(单个)
  const hdrOptions = {
    value: evt.hdrUrls
  }
  const hdrNode: any = {
    uuid: -1,
    name: 'HDR',
    selected: false,
    index: 0,
    spread: false,
    type: 'HDR',
    children: [],
    show: false,
    options: hdrOptions
  }
  stateGlobal.template.threeDimension.unshift(hdrNode)

  // 背景节点(单个)
  let bgGroundVal: any
  let bgGroundOpts = {}
  if (evt.bgType === 'color') {
    const bgColor = '#' + new Bol3D.Color(evt.bgColor).getHexString()
    bgGroundVal = bgColor
  } else if (evt.bgType === 'texture') {
    const valArr = evt.scene.background.image.src.split('//')
    bgGroundVal = '/' + valArr[valArr.length - 1]
    bgGroundOpts = {
      encoding: evt.scene.background.encoding,
      wrapping: evt.scene.background.wrapS,
      repeat: [evt.scene.background.repeat.x, evt.scene.background.repeat.y]
    }
  } else if (evt.bgType === 'panorama') {
    bgGroundVal = evt.sky.userData.value
    bgGroundOpts = {
      scale: evt.sky.scale.x,
      rotation: [
        parseFloat(((evt.sky.rotation.x * 180) / Math.PI).toFixed(4)),
        parseFloat(((evt.sky.rotation.y * 180) / Math.PI).toFixed(4)),
        parseFloat(((evt.sky.rotation.z * 180) / Math.PI).toFixed(4))
      ]
    }
  }
  const backgroundOptions = {
    type: evt.bgType,
    value: bgGroundVal,
    options: bgGroundOpts
  }
  const backgroundNode: any = {
    uuid: -1,
    name: 'Background',
    selected: false,
    index: 0,
    spread: false,
    type: 'Background',
    children: [],
    show: false,
    options: backgroundOptions
  }
  stateGlobal.template.threeDimension.unshift(backgroundNode)

  // 阴影节点(单个)
  const shadowOptions = {
    enabled: evt.renderer.shadowMap.enabled,
    type: evt.renderer.shadowMap.type
  }
  const shadowNode: any = {
    uuid: -1,
    name: 'Shadow',
    selected: false,
    index: 0,
    spread: false,
    type: 'Shadow',
    children: [],
    show: false,
    options: shadowOptions
  }

  stateGlobal.template.threeDimension.unshift(shadowNode)

  // 面光源节点(多个)
  const rectAreaLights = evt.rectAreaLights
  const rectAreaLightNodes: any = {
    uuid: -1,
    name: 'RectAreaLights',
    selected: false,
    index: 0,
    spread: false,
    type: 'RectAreaLights',
    children: [],
    show: false,
    options: {}
  }
  rectAreaLights.forEach((rectAreaLight: any) => {
    const rectAreaLightOptions = {
      color: [rectAreaLight.color.r * 255, rectAreaLight.color.g * 255, rectAreaLight.color.b * 255],
      intensity: rectAreaLight.intensity,
      width: rectAreaLight.width,
      height: rectAreaLight.height,
      position: [parseFloat(rectAreaLight.position.x.toFixed(4)), parseFloat(rectAreaLight.position.y.toFixed(4)), parseFloat(rectAreaLight.position.z.toFixed(4))],
      target: [parseFloat(rectAreaLight.userData.target[0].toFixed(4)), parseFloat(rectAreaLight.userData.target[1].toFixed(4)), parseFloat(rectAreaLight.userData.target[2].toFixed(4))]
    }

    const rectAreaLightNode = {
      uuid: rectAreaLight.uuid,
      name: 'RectAreaLight',
      selected: false,
      index: 1,
      spread: false,
      type: 'RectAreaLight',
      children: [],
      show: false,
      options: rectAreaLightOptions
    }

    rectAreaLightNodes.children.push(rectAreaLightNode)
  })
  stateGlobal.template.threeDimension.unshift(rectAreaLightNodes)

  // 点光源节点(多个)
  const pointLights = evt.pointLights
  const pointLightNodes: any = {
    uuid: -1,
    name: 'PointLights',
    selected: false,
    index: 0,
    spread: false,
    type: 'PointLights',
    children: [],
    show: false,
    options: {}
  }
  pointLights.forEach((pointLight: any) => {
    const pointLightOptions = {
      color: [pointLight.color.r * 255, pointLight.color.g * 255, pointLight.color.b * 255],
      intensity: pointLight.intensity,
      decay: pointLight.decay,
      distance: pointLight.distance,
      position: [parseFloat(pointLight.position.x.toFixed(4)), parseFloat(pointLight.position.y.toFixed(4)), parseFloat(pointLight.position.z.toFixed(4))],
      castShadow: pointLight.castShadow,
      near: pointLight.shadow.camera.near,
      far: pointLight.shadow.camera.far,
      bias: pointLight.shadow.bias,
      size: pointLight.shadow.mapSize.x
    }

    const pointLightNode = {
      uuid: pointLight.uuid,
      name: 'PointLight',
      selected: false,
      index: 1,
      spread: false,
      type: 'PointLight',
      children: [],
      show: false,
      options: pointLightOptions
    }

    pointLightNodes.children.push(pointLightNode)
  })
  stateGlobal.template.threeDimension.unshift(pointLightNodes)

  // 聚光灯节点(多个)
  const spotLights = evt.spotLights
  const spotLightNodes: any = {
    uuid: -1,
    name: 'SpotLights',
    selected: false,
    index: 0,
    spread: false,
    type: 'SpotLights',
    children: [],
    show: false,
    options: {}
  }
  spotLights.forEach((spotLight: any) => {
    const spotLightOptions = {
      color: [spotLight.color.r * 255, spotLight.color.g * 255, spotLight.color.b * 255],
      intensity: spotLight.intensity,
      decay: spotLight.decay,
      distance: spotLight.distance,
      penumbra: spotLight.penumbra,
      position: [parseFloat(spotLight.position.x.toFixed(4)), parseFloat(spotLight.position.y.toFixed(4)), parseFloat(spotLight.position.z.toFixed(4))],
      target: [parseFloat(spotLight.target.position.x.toFixed(4)), parseFloat(spotLight.target.position.y.toFixed(4)), parseFloat(spotLight.target.position.z.toFixed(4))],
      castShadow: spotLight.castShadow,
      angle: spotLight.angle,
      near: spotLight.shadow.camera.near,
      far: spotLight.shadow.camera.far,
      focus: spotLight.shadow.focus,
      bias: spotLight.shadow.bias,
      size: spotLight.shadow.mapSize.x
    }

    const spotLightNode = {
      uuid: spotLight.uuid,
      name: 'SpotLight',
      selected: false,
      index: 1,
      spread: false,
      type: 'SpotLight',
      children: [],
      show: false,
      options: spotLightOptions
    }

    spotLightNodes.children.push(spotLightNode)
  })
  stateGlobal.template.threeDimension.unshift(spotLightNodes)

  // 平行光节点(多个)
  const directionLights = evt.directionLights
  const directionLightNodes: any = {
    uuid: -1,
    name: 'DirectionLights',
    selected: false,
    index: 0,
    spread: false,
    type: 'DirectionLights',
    children: [],
    show: false,
    options: {}
  }
  directionLights.forEach((directionLight: any) => {
    const directionLightOptions = {
      color: [directionLight.color.r * 255, directionLight.color.g * 255, directionLight.color.b * 255],
      intensity: directionLight.intensity,
      position: [parseFloat(directionLight.position.x.toFixed(4)), parseFloat(directionLight.position.y.toFixed(4)), parseFloat(directionLight.position.z.toFixed(4))],
      // shadow options
      near: directionLight.shadow.camera.near,
      far: directionLight.shadow.camera.far,
      bias: directionLight.shadow.bias,
      distance: directionLight.shadow.camera.top,
      size: directionLight.shadow.mapSize.width,
      castShadow: directionLight.castShadow,
      // target options
      target: [parseFloat(directionLight.target.position.x.toFixed(4)), parseFloat(directionLight.target.position.y.toFixed(4)), parseFloat(directionLight.target.position.z.toFixed(4))]
    }

    const directionLightNode = {
      uuid: directionLight.uuid,
      name: 'DirectionLight',
      selected: false,
      index: 1,
      spread: false,
      type: 'DirectionLight',
      children: [],
      show: false,
      options: directionLightOptions
    }

    directionLightNodes.children.push(directionLightNode)
  })
  stateGlobal.template.threeDimension.unshift(directionLightNodes)

  // 半球光节点(单个)
  const hemisphereLight = evt.hemiLight
  const hemisphereLightOptions = {
    color: [hemisphereLight.color.r * 255, hemisphereLight.color.g * 255, hemisphereLight.color.b * 255],
    groundColor: [hemisphereLight.groundColor.r * 255, hemisphereLight.groundColor.g * 255, hemisphereLight.groundColor.b * 255],
    intensity: hemisphereLight.intensity,
    position: [parseFloat(hemisphereLight.position.x.toFixed(4)), parseFloat(hemisphereLight.position.y.toFixed(4)), parseFloat(hemisphereLight.position.z.toFixed(4))]
  }

  const hemisphereLightNode = {
    uuid: -1,
    name: 'HemisphereLight',
    selected: false,
    index: 0,
    spread: false,
    type: hemisphereLight.type,
    children: [],
    show: false,
    options: hemisphereLightOptions
  }

  stateGlobal.template.threeDimension.unshift(hemisphereLightNode)

  // 环境光节点(单个)
  const ambientLight = evt.ambientLight
  const ambientLightOptions = {
    color: [ambientLight.color.r * 255, ambientLight.color.g * 255, ambientLight.color.b * 255],
    intensity: ambientLight.intensity
  }

  const ambientLightNode = {
    uuid: -1,
    name: 'AmbientLight',
    selected: false,
    index: 0,
    spread: false,
    type: ambientLight.type,
    children: [],
    show: false,
    options: ambientLightOptions
  }

  stateGlobal.template.threeDimension.unshift(ambientLightNode)

  // 相机节点(单个)
  let camera: any
  let controls: any
  let cameraOptions: any = {}
  if (evt.viewState === 'orbit') {
    camera = evt.orbitCamera
    controls = evt.orbitControls
    cameraOptions = {
      position: [parseFloat(camera.position.x.toFixed(4)), parseFloat(camera.position.y.toFixed(4)), parseFloat(camera.position.z.toFixed(4))],
      near: camera.near,
      far: camera.far,
      fov: camera.fov,
      minDistance: controls.minDistance,
      maxDistance: controls.maxDistance,
      minPolarAngle: (controls.minPolarAngle * 180) / Math.PI,
      maxPolarAngle: (controls.maxPolarAngle * 180) / Math.PI
    }
  } else if (evt.viewState === 'firstPerson') {
    camera = evt.firstPersonCamera
    controls = evt.firstPersonControls
  } else if (evt.viewState === 'map') {
    camera = evt.mapCamera
    controls = evt.mapControls
  }

  const cameraNode = {
    uuid: -1,
    name: 'Camera',
    selected: false,
    index: 0,
    spread: false,
    type: 'Camera',
    children: [],
    show: false,
    options: cameraOptions
  }

  stateGlobal.template.threeDimension.unshift(cameraNode)
}
// 递归找出上面所有父级元素 并乘以相应矩阵
export function recursiveCalParentsMat(obj: any, v: any, mat: any) {
  mat.compose(obj.position, new Bol3D.Quaternion().setFromEuler(new Bol3D.Euler().setFromVector3(obj.rotation)), obj.scale)
  v.applyMatrix4(mat)
  if (!obj.parent || obj.parent.type == 'Scene') return
  recursiveCalParentsMat(obj.parent, v, mat)
}

// 加载场景分组节点（模板组/ICON组/飞线组/效果组等） TODO
export function loadGroupNodes(evt: any) {
  const stateGlobal = useState(store, 'global')

  const moduleChildren = stateGlobal.template.threeDimension.splice(0, stateGlobal.template.threeDimension.length)

  // 模板组
  const moduleGroupNode = {
    uuid: -99,
    name: '场景底座',
    selected: false,
    index: 0,
    spread: false,
    type: 'Module',
    children: moduleChildren,
    show: true,
    options: {}
  }
  stateGlobal.template.threeDimension.push(moduleGroupNode)

  // 自定义模型
  const modelNode = {
    uuid: -2,
    name: '自定义模型',
    selected: false,
    index: 0,
    spread: false,
    type: 'ModelGroup',
    children: [],
    show: true,
    options: {}
  }
  stateGlobal.template.threeDimension.push(modelNode)

  // ICON组
  const iconGroupNode = {
    uuid: -2,
    name: '自由标记',
    selected: false,
    index: 0,
    spread: false,
    type: 'IconGroup',
    children: [],
    show: true,
    options: {}
  }
  stateGlobal.template.threeDimension.push(iconGroupNode)
}

// 根据icon类型获取 component组件类型
export function iconTitleType2ExtendsType(type: number) {
  return 'IconTitleExtend' + (type + 1)
}
