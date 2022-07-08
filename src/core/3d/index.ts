import { parseModelNode } from './util'
import store from '../../store'
import { EventsBus } from '../EventsBus'
import { throttled } from '../utils/base'
import { clickFun } from './clickFun'
import { outObjects } from './clickNeedObject'
// import { any } from 'underscore'
// import { render } from 'vue'

declare const Bol3D: any

export function loadScene({ modelUrls, domElement, publicPath, callback }: any) {
  const container = new Bol3D.Container({
    publicPath,
    container: domElement,
    viewState: 'orbit',
    modelUrls,
    enableShadow: true,
    bloomEnabled: false,
    outlineEnabled: false,
    dofEnabled: false,
    msaa: {
      supersampling: false
    },
    lights: {
      ambientLight: {
        color: 0xffffff,
        intensity: 1
      },
      hemisphereLight: {
        intensity: 0
      }
      // directionLights: [{}],
      // spotLights: [{}]
      // pointLights: [{}]
      // rectAreaLights: [{}]
    },
    cameras: {
      orbitCamera: {
        position: [-3580.15, 884.89, -283.5],
        near: 1,
        far: 100000,
        fov: 60
      }
    },
    controls: {
      orbitControls: {
        enableDamping: false
      }
    },
    stats: true,

    hdrUrls: ['/hdr/dikhololo_night_1k.hdr'],

    // background: {
    //   type: 'color',
    //   value: 0xff0000
    // },

    background: {
      type: 'panorama',
      value: ['/panorama/sky_px.jpg', '/panorama/sky_nx.jpg', '/panorama/sky_py.jpg', '/panorama/sky_ny.jpg', '/panorama/sky_pz.jpg', '/panorama/sky_nz.jpg'],
      options: { scale: 1, rotation: [0, 0, (360 * Math.PI) / 180] }
    },

    // background: {
    //   type: 'texture',
    //   value: '/textures/bg.png',
    //   options: {
    //     encoding: Bol3D.sRGBEncoding,
    //     repeat: new Bol3D.Vector2(2, 2),
    //     wrapS: Bol3D.RepeatWrapping,
    //     wrapT: Bol3D.RepeatWrapping
    //   }
    // },

    fog: {
      intensity: 0,
      color: 0xffffff
    },

    onProgress: (model: any) => {
      const node: any = {}
      const index = 0
      // 3d模板 存入缓存
      parseModelNode(model, index, node)
      ;(store as any).state.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      callback && callback(evt)

      // console.log('loaded')

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
      ;(store as any).state.template.threeDimension.unshift(directionLightNodes)

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

      ;(store as any).state.template.threeDimension.unshift(cameraNode)

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
              position: [parseFloat(position.x.toFixed(4)), parseFloat(position.y.toFixed(4)), parseFloat(position.z.toFixed(4))]
            },
            uuid
          })

          // update pageTreeNode
          if ((store as any).state.selectedPageTreeNode && (store as any).state.selectedPageTreeNode.type === 'Camera') {
            Object.assign((store as any).state.selectedPageTreeNode.options, { position: [parseFloat(position.x.toFixed(4)), parseFloat(position.y.toFixed(4)), parseFloat(position.z.toFixed(4))] })
          }

          // update sceneTreeNode
          if ((store as any).state.selectedSceneTreeNode) {
            ;(store as any).state.selectedSceneTreeNode.trees.threeDimension.forEach((c: any) => {
              if (c.type === 'Camera') Object.assign(c.options, { position: [parseFloat(position.x.toFixed(4)), parseFloat(position.y.toFixed(4)), parseFloat(position.z.toFixed(4))] })
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
    }
    // controls: {
    //   orbitControls: {
    //     autoRotate: false,
    //     autoRotateSpeed: 1,
    //     target: [-2542.03, 0, 659.92],
    //     minDistance: 0,
    //     maxDistance: 2500,
    //     maxPolarAngle: Math.PI * 0.44,
    //     minPolarAngle: Math.PI * 0.05,
    //     enableDamping: true,
    //     dampingFactor: 0.05
    //   }
    // },
    // lights: {
    //   sunLight: {
    //     color: 0xedeacc,
    //     intensity: 1.0,
    //     position: [2000.3, 7000, 4000.2],
    //     mapSize: [4096, 4096],
    //     near: 10,
    //     far: 15000,
    //     bias: -0.001,
    //     distance: 8000
    //   }
    // }
  })

  const { lightPlane, curveSphere1, curveSphere2, line } = outObjects(container, publicPath)
  clickFun(container, { lightPlane, curveSphere1, curveSphere2, line })
}
