import { toRaw } from 'vue'
import store from '../../store'
import * as UnderScore from 'underscore'
import { upDateForText } from '../utils/text3D'
import { reviseFlyLine } from '../utils/flyLine'

declare const Bol3D: any

export function parseModelNode(opt: any, node: any, index: number, result: any) {
  node.uuid = findParentName(node)

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
  if (node.type === 'Group') {
    result.options = {
      position: [
        parseFloat(node.position.x.toFixed(4)),
        parseFloat(node.position.y.toFixed(4)),
        parseFloat(node.position.z.toFixed(4))
      ],
      rotation: [
        parseFloat(((node.rotation.x * 180) / Math.PI).toFixed(4)),
        parseFloat(((node.rotation.y * 180) / Math.PI).toFixed(4)),
        parseFloat(((node.rotation.z * 180) / Math.PI).toFixed(4))
      ],
      scale: [
        parseFloat(node.scale.x.toFixed(4)),
        parseFloat(node.scale.y.toFixed(4)),
        parseFloat(node.scale.z.toFixed(4))
      ]
    }
  } else if (node.type === 'Mesh') {
    // console.log(node.material.type, node.material.map)
    result.options = {
      position: [
        parseFloat(node.position.x.toFixed(4)),
        parseFloat(node.position.y.toFixed(4)),
        parseFloat(node.position.z.toFixed(4))
      ],
      rotation: [
        parseFloat(((node.rotation.x * 180) / Math.PI).toFixed(4)),
        parseFloat(((node.rotation.y * 180) / Math.PI).toFixed(4)),
        parseFloat(((node.rotation.z * 180) / Math.PI).toFixed(4))
      ],
      scale: [
        parseFloat(node.scale.x.toFixed(4)),
        parseFloat(node.scale.y.toFixed(4)),
        parseFloat(node.scale.z.toFixed(4))
      ],
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
      position: [
        parseFloat(node.position.x.toFixed(4)),
        parseFloat(node.position.y.toFixed(4)),
        parseFloat(node.position.z.toFixed(4))
      ],
      rotation: [
        parseFloat(((node.rotation.x * 180) / Math.PI).toFixed(4)),
        parseFloat(((node.rotation.y * 180) / Math.PI).toFixed(4)),
        parseFloat(((node.rotation.z * 180) / Math.PI).toFixed(4))
      ],
      scale: [
        parseFloat(node.scale.x.toFixed(4)),
        parseFloat(node.scale.y.toFixed(4)),
        parseFloat(node.scale.z.toFixed(4))
      ]
    }
  }
  if (node.children.length > 0) {
    index++
    node.children.forEach((n: any) => {
      const child = {}
      result.children.push(child)
      parseModelNode(opt, n, index, child)
    })
  }
}

const findParentName = (obj: any) => {
  let name: any = obj.name
  function findName(objs: any) {
    if (objs.parent.type != 'Scene') {
      name = objs.parent.name + '-' + name
      findName(objs.parent)
    } else {
      return false
    }
  }

  if (obj.parent.type != 'Scene') {
    name = obj.parent.name + '-' + name
    findName(obj.parent)
    return name
  } else {
    return name
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

// 根据template重载3d scene passes
export function reloadThreeDimensionPassesByTemplate() {
  const sceneNodes = store.state.template.threeDimension
  const flatSceneNodes: any = []
  flatTreeNodes(sceneNodes, flatSceneNodes)

  const container: any = toRaw(store.state.threeDimensionContainer)

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
      const {
        enabled,
        edgeStrength,
        edgeGlow,
        edgeThickness,
        pulsePeriod,
        visibleEdgeColor,
        hiddenEdgeColor
      } = options
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
      container.finalbloomPass.material.uniforms.bloomTexture.value = enabled
        ? container.bloomComposer.renderTarget2.texture
        : null
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
export function reloadThreeDimensionScene(pageNode: any) {
  const sceneNodes = pageNode.trees.threeDimension
  const flatSceneNodes: any = []
  flatTreeNodes(sceneNodes, flatSceneNodes)

  const container: any = toRaw(store.state.threeDimensionContainer)

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
      const {
        enabled,
        edgeStrength,
        edgeGlow,
        edgeThickness,
        pulsePeriod,
        visibleEdgeColor,
        hiddenEdgeColor
      } = options
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
      container.finalbloomPass.material.uniforms.bloomTexture.value = enabled
        ? container.bloomComposer.renderTarget2.texture
        : null
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
                  container.sky.rotation.set(
                    (opts[i][0] * Math.PI) / 180,
                    (opts[i][1] * Math.PI) / 180,
                    (opts[i][2] * Math.PI) / 180
                  )
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
                    sbox.rotation.set(
                      (opts[i][0] * Math.PI) / 180,
                      (opts[i][1] * Math.PI) / 180,
                      (opts[i][2] * Math.PI) / 180
                    )
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
                  sbox.rotation.set(
                    (opts[i][0] * Math.PI) / 180,
                    (opts[i][1] * Math.PI) / 180,
                    (opts[i][2] * Math.PI) / 180
                  )
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
            rectAreaLight.position.set(
              rectAreaLightOpts.options.position[0],
              rectAreaLightOpts.options.position[1],
              rectAreaLightOpts.options.position[2]
            )
            rectAreaLight.lookAt(
              rectAreaLightOpts.options.target[0],
              rectAreaLightOpts.options.target[1],
              rectAreaLightOpts.options.target[2]
            )
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
            pointLight.position.set(
              pointLightOpts.options.position[0],
              pointLightOpts.options.position[1],
              pointLightOpts.options.position[2]
            )
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
            spotLight.position.set(
              spotLightOpts.options.position[0],
              spotLightOpts.options.position[1],
              spotLightOpts.options.position[2]
            )
            spotLight.target.position.set(
              spotLightOpts.options.target[0],
              spotLightOpts.options.target[1],
              spotLightOpts.options.target[2]
            )
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
            dirLight.position.set(
              dirLightOpts.options.position[0],
              dirLightOpts.options.position[1],
              dirLightOpts.options.position[2]
            )
            dirLight.target.position.set(
              dirLightOpts.options.target[0],
              dirLightOpts.options.target[1],
              dirLightOpts.options.target[2]
            )
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
      container.hemiLight.position.set(
        n.options.position[0],
        n.options.position[1],
        n.options.position[2]
      )
    } else if (n.type === 'AmbientLight') {
      container.ambientLight.intensity = n.options.intensity
      container.ambientLight.color.r = n.options.color[0] / 255
      container.ambientLight.color.g = n.options.color[1] / 255
      container.ambientLight.color.b = n.options.color[2] / 255
    } else if (n.type === 'Camera') {
      // todo 正交相机,墨卡托相机 , 相机重置（动画）
      // 1. update camera
      container.orbitControls.object.position.set(
        n.options.position[0],
        n.options.position[1],
        n.options.position[2]
      )
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
        node.rotation.set(
          (n.options.rotation[0] * Math.PI) / 180,
          (n.options.rotation[1] * Math.PI) / 180,
          (n.options.rotation[2] * Math.PI) / 180
        )
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
      node.rotation.set(
        (n.options.rotation[0] * Math.PI) / 180,
        (n.options.rotation[1] * Math.PI) / 180,
        (n.options.rotation[2] * Math.PI) / 180
      )
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
      node.rotation.set(
        (n.options.rotation[0] * Math.PI) / 180,
        (n.options.rotation[1] * Math.PI) / 180,
        (n.options.rotation[2] * Math.PI) / 180
      )
      node.scale.set(n.options.scale[0], n.options.scale[1], n.options.scale[2])
    } else if (n.type === 'Icon') {
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
      node.position.set(...n.options.meshPosition)
      node.scale.set(n.options.meshScale, n.options.meshScale, n.options.meshScale)
      node.material.opacity = n.options.meshOpacity / 100
    } else if (n.type === 'Text') {
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
      const obj = {
        text: n.options.textText,
        color: n.options.textColor,
        fontFamily: n.options.textFontFamily,
        fontSize: n.options.textFontSize,
        fontWeight: n.options.textFontWeight,
        textScale: n.options.textTextScale,
        bgColor: n.options.textBGColor,
        bgOpcity: n.options.textBGOpacity,
        bgImage: n.options.textBGImage,
        textOffset: n.options.textTextOffset,
        textAlign: n.options.textTextAlign,
        lineAlign: n.options.textLineAlign,
        position: n.options.meshPosition,
        scale: n.options.meshScale,
        opacity: n.options.meshOpacity,
        rotation: n.options.meshRotation,
        center: n.options.meshCenter
      }
      upDateForText(obj, node, n.options.type)
    } else if (n.type === 'FlyLine') {
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
      reviseFlyLine(
        {
          source: new Bol3D.Vector3(n.options.source.x, n.options.source.y, n.options.source.z),
          target: new Bol3D.Vector3(n.options.target.x, n.options.target.y, n.options.target.z),
          height: n.options.height,
          size: n.options.size,
          color: n.options.color,
          range: n.options.range,
          speed: n.options.speed
        },
        node
      )
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
