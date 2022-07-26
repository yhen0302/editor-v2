import store from '../../store'
import { EventsBus } from '../EventsBus'
import { throttled } from '../utils/base'
import { loadTextPlane } from '../utils/text3D'
import { addIconToJson } from '../utils/Icon'
import { addFlyLine } from '../utils/flyLine'
declare const Bol3D: any

export const onloadFun = (
  evt: any,
  container: any,
  publicPath: any,
  addMeshObj: any = null,
  isImport = false
) => {
  // console.log('loaded')
  const scaleMax =
    store.state.elementScaleInterval.x > store.state.elementScaleInterval.z
      ? (store.state.elementScaleInterval.x / 5000).toFixed(4)
      : (store.state.elementScaleInterval.z / 5000).toFixed(4)

  // 添加图标自定义元素
  var lightPlane: any
  const geometryPlane = new Bol3D.PlaneGeometry(1, 1)
  const textIconPic = new Bol3D.TextureLoader().load(publicPath + 'textures/circularPin.png')
  const materialPlane = new Bol3D.MeshBasicMaterial({
    color: 0x16ddfa,
    side: Bol3D.DoubleSide,
    map: textIconPic,
    transparent: true
  })
  lightPlane = new Bol3D.Mesh(geometryPlane, materialPlane)
  lightPlane.rotation.x = -Math.PI / 2
  lightPlane.renderOrder = 1000
  lightPlane.position.y = 0.03
  lightPlane.visible = false
  lightPlane.type = 'IconBottomLight'

  // 飞线部分自定义元素
  const geometry = new Bol3D.SphereGeometry(1, 32, 16)
  const material = new Bol3D.MeshBasicMaterial({ color: 0xffff00 })
  const curveSphere1 = new Bol3D.Mesh(geometry, material)
  curveSphere1.scale.set(scaleMax, scaleMax, scaleMax)
  const curveSphere2 = new Bol3D.Mesh(geometry, material)
  curveSphere2.scale.set(scaleMax, scaleMax, scaleMax)
  curveSphere1.visible = false
  curveSphere2.visible = false
  curveSphere1.name = 'flyLineSelfSphere1'
  curveSphere2.name = 'flyLineSelfSphere2'
  curveSphere1.type = 'flyLineBasicPoint'
  curveSphere2.type = 'flyLineBasicPoint'
  container.attach(curveSphere1)
  container.attach(curveSphere2)
  container.clickObjects.push(curveSphere1, curveSphere2)
  ;(store as any).state.elementFlyLine.push(curveSphere1, curveSphere2)

  var curve = new Bol3D.CatmullRomCurve3([
    new Bol3D.Vector3(0, 0, 0),
    new Bol3D.Vector3(50, 100, 0),
    new Bol3D.Vector3(100, 0, 0)
  ])
  curve.closed = false
  const ponits = curve.getPoints(100)
  var line = new Bol3D.Line(
    new Bol3D.BufferGeometry().setFromPoints(ponits),
    new Bol3D.LineBasicMaterial({ color: 0xffff00 })
  )
  line.visible = false
  line.type = 'flyLineAuxiliaryLine'
  container.attach(line)

  const IconGroup = new Bol3D.Group()
  IconGroup.name = 'Icon'
  IconGroup.uuid = 'IconIndex-uuid-2CC79AFB'
  container.attach(IconGroup)

  const TextGroup = new Bol3D.Group()
  TextGroup.name = 'Text'
  TextGroup.uuid = 'TextIndex-uuid-F4763805'
  container.attach(TextGroup)

  const FlyLineGroup = new Bol3D.Group()
  FlyLineGroup.name = 'FlyLine'
  FlyLineGroup.uuid = 'FlyLineIndex-uuid-352BF4EA'
  container.attach(FlyLineGroup)

  if (!addMeshObj) {
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
    ;(store as any).state.template.threeDimension.unshift(msaaPassNode)

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
    ;(store as any).state.template.threeDimension.unshift(gammaPassNode)

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
    ;(store as any).state.template.threeDimension.unshift(dofPassNode)

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
    ;(store as any).state.template.threeDimension.unshift(outlinePassNode)

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
    ;(store as any).state.template.threeDimension.unshift(bloomPassNode)

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
    ;(store as any).state.template.threeDimension.unshift(fogNode)

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
    ;(store as any).state.template.threeDimension.unshift(hdrNode)

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
      opts: bgGroundOpts
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
    ;(store as any).state.template.threeDimension.unshift(backgroundNode)

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

    ;(store as any).state.template.threeDimension.unshift(shadowNode)

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
        color: [
          rectAreaLight.color.r * 255,
          rectAreaLight.color.g * 255,
          rectAreaLight.color.b * 255
        ],
        intensity: rectAreaLight.intensity,
        width: rectAreaLight.width,
        height: rectAreaLight.height,
        position: [
          parseFloat(rectAreaLight.position.x.toFixed(4)),
          parseFloat(rectAreaLight.position.y.toFixed(4)),
          parseFloat(rectAreaLight.position.z.toFixed(4))
        ],
        target: [
          parseFloat(rectAreaLight.userData.target[0].toFixed(4)),
          parseFloat(rectAreaLight.userData.target[1].toFixed(4)),
          parseFloat(rectAreaLight.userData.target[2].toFixed(4))
        ]
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
    ;(store as any).state.template.threeDimension.unshift(rectAreaLightNodes)

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
        position: [
          parseFloat(pointLight.position.x.toFixed(4)),
          parseFloat(pointLight.position.y.toFixed(4)),
          parseFloat(pointLight.position.z.toFixed(4))
        ],
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
    ;(store as any).state.template.threeDimension.unshift(pointLightNodes)

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
        position: [
          parseFloat(spotLight.position.x.toFixed(4)),
          parseFloat(spotLight.position.y.toFixed(4)),
          parseFloat(spotLight.position.z.toFixed(4))
        ],
        target: [
          parseFloat(spotLight.target.position.x.toFixed(4)),
          parseFloat(spotLight.target.position.y.toFixed(4)),
          parseFloat(spotLight.target.position.z.toFixed(4))
        ],
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
    ;(store as any).state.template.threeDimension.unshift(spotLightNodes)

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
        color: [
          directionLight.color.r * 255,
          directionLight.color.g * 255,
          directionLight.color.b * 255
        ],
        intensity: directionLight.intensity,
        position: [
          parseFloat(directionLight.position.x.toFixed(4)),
          parseFloat(directionLight.position.y.toFixed(4)),
          parseFloat(directionLight.position.z.toFixed(4))
        ],
        // shadow options
        near: directionLight.shadow.camera.near,
        far: directionLight.shadow.camera.far,
        bias: directionLight.shadow.bias,
        distance: directionLight.shadow.camera.top,
        size: directionLight.shadow.mapSize.width,
        castShadow: directionLight.castShadow,
        // target options
        target: [
          parseFloat(directionLight.target.position.x.toFixed(4)),
          parseFloat(directionLight.target.position.y.toFixed(4)),
          parseFloat(directionLight.target.position.z.toFixed(4))
        ]
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
    ;(store as any).state.template.threeDimension.unshift(directionLightNodes)

    // 半球光节点(单个)
    const hemisphereLight = evt.hemiLight
    const hemisphereLightOptions = {
      color: [
        hemisphereLight.color.r * 255,
        hemisphereLight.color.g * 255,
        hemisphereLight.color.b * 255
      ],
      groundColor: [
        hemisphereLight.groundColor.r * 255,
        hemisphereLight.groundColor.g * 255,
        hemisphereLight.groundColor.b * 255
      ],
      intensity: hemisphereLight.intensity,
      position: [
        parseFloat(hemisphereLight.position.x.toFixed(4)),
        parseFloat(hemisphereLight.position.y.toFixed(4)),
        parseFloat(hemisphereLight.position.z.toFixed(4))
      ]
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

    ;(store as any).state.template.threeDimension.unshift(hemisphereLightNode)

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

    ;(store as any).state.template.threeDimension.unshift(ambientLightNode)

    // 相机节点(单个)
    let camera: any
    let controls: any
    let cameraOptions: any = {}
    if (evt.viewState === 'orbit') {
      camera = evt.orbitCamera
      controls = evt.orbitControls
      cameraOptions = {
        position: [
          parseFloat(camera.position.x.toFixed(4)),
          parseFloat(camera.position.y.toFixed(4)),
          parseFloat(camera.position.z.toFixed(4))
        ],
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

    ;(store as any).state.template.threeDimension.unshift(cameraNode)

    const IconGroupNode: any = {
      uuid: IconGroup.uuid,
      name: 'Icon',
      selected: false,
      index: 0,
      spread: false,
      type: 'Group',
      show: true,
      children: [],
      visible: true,
      isEdit: true,
      childIndex: 0
    }
    ;(store as any).state.template.threeDimension.unshift(IconGroupNode)

    const TextGroupNode: any = {
      uuid: TextGroup.uuid,
      name: 'Text',
      selected: false,
      index: 0,
      spread: false,
      type: 'Group',
      show: true,
      children: [],
      visible: true,
      isEdit: true,
      childIndex: 0
    }
    ;(store as any).state.template.threeDimension.unshift(TextGroupNode)

    const FlyLineNode: any = {
      uuid: FlyLineGroup.uuid,
      name: 'FlyLine',
      selected: false,
      index: 0,
      spread: false,
      type: 'Group',
      show: true,
      children: [],
      visible: true,
      isEdit: true,
      childIndex: 0
    }
    ;(store as any).state.template.threeDimension.unshift(FlyLineNode)

    EventsBus.emit('sceneLoaded', {
      type: '3d',
      container: evt
    })

    // 相机事件
    let controlsFlag = false
    controls.addEventListener('start', () => {
      controlsFlag = true
    })
    controls.addEventListener('end', () => {
      controlsFlag = false
    })

    const updateFnCamera = (event: any) => {
      if (controlsFlag && event && event.target) {
        const t = event.target
        const { object } = t
        const { position, uuid } = object

        // update editForms
        EventsBus.emit('pageTreeNodeUpdate', {
          type: '3d',
          options: {
            position: [
              parseFloat(position.x.toFixed(4)),
              parseFloat(position.y.toFixed(4)),
              parseFloat(position.z.toFixed(4))
            ]
          },
          uuid
        })

        // update pageTreeNode
        if (
          (store as any).state.selectedPageTreeNode &&
          (store as any).state.selectedPageTreeNode.type === 'Camera'
        ) {
          Object.assign((store as any).state.selectedPageTreeNode.options, {
            position: [
              parseFloat(position.x.toFixed(4)),
              parseFloat(position.y.toFixed(4)),
              parseFloat(position.z.toFixed(4))
            ]
          })
        }

        // update sceneTreeNode
        if ((store as any).state.selectedSceneTreeNode) {
          ;(store as any).state.selectedSceneTreeNode.trees.threeDimension.forEach((c: any) => {
            if (c.type === 'Camera')
              Object.assign(c.options, {
                position: [
                  parseFloat(position.x.toFixed(4)),
                  parseFloat(position.y.toFixed(4)),
                  parseFloat(position.z.toFixed(4))
                ]
              })
          })
        }
      }
    }

    // 节流 change频率太高
    // const updateFnCameraTd = throttled(updateFnCamera, 60)
    const updateFnCameraTd = throttled(updateFnCamera, 0)
    controls.addEventListener('change', (event: any) => {
      updateFnCameraTd(event)
    })
  } else {
    // 相机节点(单个)
    let camera: any
    let controls: any
    if (evt.viewState === 'orbit') {
      camera = evt.orbitCamera
      controls = evt.orbitControls
    } else if (evt.viewState === 'firstPerson') {
      camera = evt.firstPersonCamera
      controls = evt.firstPersonControls
    } else if (evt.viewState === 'map') {
      camera = evt.mapCamera
      controls = evt.mapControls
    }

    // 相机事件
    let controlsFlag = false
    controls.addEventListener('start', () => {
      controlsFlag = true
    })
    controls.addEventListener('end', () => {
      controlsFlag = false
    })

    const updateFnCamera = (event: any) => {
      if (controlsFlag && event && event.target) {
        const t = event.target
        const { object } = t
        const { position, uuid } = object

        // update editForms
        EventsBus.emit('pageTreeNodeUpdate', {
          type: '3d',
          options: {
            position: [
              parseFloat(position.x.toFixed(4)),
              parseFloat(position.y.toFixed(4)),
              parseFloat(position.z.toFixed(4))
            ]
          },
          uuid
        })

        // update pageTreeNode
        if (
          (store as any).state.selectedPageTreeNode &&
          (store as any).state.selectedPageTreeNode.type === 'Camera'
        ) {
          Object.assign((store as any).state.selectedPageTreeNode.options, {
            position: [
              parseFloat(position.x.toFixed(4)),
              parseFloat(position.y.toFixed(4)),
              parseFloat(position.z.toFixed(4))
            ]
          })
        }

        // update sceneTreeNode
        if ((store as any).state.selectedSceneTreeNode) {
          ;(store as any).state.selectedSceneTreeNode.trees.threeDimension.forEach((c: any) => {
            if (c.type === 'Camera')
              Object.assign(c.options, {
                position: [
                  parseFloat(position.x.toFixed(4)),
                  parseFloat(position.y.toFixed(4)),
                  parseFloat(position.z.toFixed(4))
                ]
              })
          })
        }
      }
    }

    // 节流 change频率太高
    // const updateFnCameraTd = throttled(updateFnCamera, 60)
    const updateFnCameraTd = throttled(updateFnCamera, 0)
    controls.addEventListener('change', (event: any) => {
      updateFnCameraTd(event)
    })

    if (addMeshObj.iconMeshGroup) {
      const iconMeshGroup = addMeshObj.iconMeshGroup
      const iconMeshGroupDepu = addMeshObj.iconMeshGroupDepu

      IconGroup.visible = iconMeshGroup.visible
      iconMeshGroupDepu.forEach((item: any, i: any) => {
        var status: any = true
        iconMeshGroup.children.forEach((dev: any) => {
          if (item.uuid == dev.uuid) {
            addIconToJson(container, dev, dev.visible, (srrs) => {
              i == 0 && srrs.add(lightPlane)
              IconGroup.add(srrs)
              status = false
            })
          }
        })
        if (status) {
          addIconToJson(container, item, false, (srrs) => {
            i == 0 && srrs.add(lightPlane)
            IconGroup.add(srrs)
          })
        }
      })
    }

    if (addMeshObj.textMeshGroup) {
      const textMeshGroup = addMeshObj.textMeshGroup
      const textMeshGroupDepu = addMeshObj.textMeshGroupDepu

      TextGroup.visible = textMeshGroup.visible
      textMeshGroupDepu.forEach((item: any) => {
        var status: any = true
        textMeshGroup.children.forEach((dev: any) => {
          if (item.uuid == dev.uuid) {
            status = false
            loadTextPlane(container, TextGroup, dev.visible, dev)
          }
        })
        if (status) {
          loadTextPlane(container, TextGroup, false, item)
        }
      })
    }

    if (addMeshObj.flyLineMeshGroup) {
      const flyLineMeshGroup = addMeshObj.flyLineMeshGroup
      const flyLineMeshGroupDepu = addMeshObj.flyLineMeshGroupDepu

      FlyLineGroup.visible = flyLineMeshGroup.visible
      flyLineMeshGroupDepu.forEach((item: any) => {
        var status: any = true
        flyLineMeshGroup.children.forEach((dev: any) => {
          if (item.uuid == dev.uuid) {
            status = false
            addFlyLine(container, FlyLineGroup, dev.visible, dev)
          }
        })
        if (status) {
          addFlyLine(container, FlyLineGroup, false, item)
        }
      })
    }
  }

  return { lightPlane, curveSphere1, curveSphere2, line }
}
