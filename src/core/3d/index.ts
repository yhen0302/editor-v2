import { parseModelNode } from './util'
import store from '../../store'
import { EventsBus } from '../EventsBus'
import { throttled } from '../utils/base'

declare const Bol3D: any

export function loadScene({ modelUrls, domElement, publicPath, callback }: any) {
  const container = new Bol3D.Container({
    publicPath,
    container: domElement,
    viewState: 'orbit',
    modelUrls,
    enableShadow: true,
    lights: {
      ambientLight: {
        color: 0xffffff,
        intensity: 0.2
      },
      directionLights: [{}],
      hemisphereLight: {
        intensity: 0
      }
      // spotLights: [{}],
      // pointLights: [{}],
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
        // enableDamping: false
      }
    },
    stats: true,
    onProgress: (model: any) => {
      const node: any = {}
      const index = 0
      // 3d模板 存入缓存
      parseModelNode(model, index, node)
      ;(store as any).state.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      callback && callback(evt)

      console.log('loaded', evt)

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
          position: [parseFloat(rectAreaLight.position.x.toFixed(4)), parseFloat(rectAreaLight.position.y.toFixed(4)), parseFloat(rectAreaLight.position.z.toFixed(4))]
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
          position: [parseFloat(pointLight.position.x.toFixed(4)), parseFloat(pointLight.position.y.toFixed(4)), parseFloat(pointLight.position.z.toFixed(4))]
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
          position: [parseFloat(spotLight.position.x.toFixed(4)), parseFloat(spotLight.position.y.toFixed(4)), parseFloat(spotLight.position.z.toFixed(4))]
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
          size: directionLight.shadow.mapSize.width
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
        uuid: hemisphereLight.uuid,
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
        uuid: ambientLight.uuid,
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
        uuid: camera.uuid,
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
          if ((store as any).state.selectedPageTreeNode && (store as any).state.selectedPageTreeNode.uuid === camera.uuid) {
            Object.assign((store as any).state.selectedPageTreeNode.options, { position: [parseFloat(position.x.toFixed(4)), parseFloat(position.y.toFixed(4)), parseFloat(position.z.toFixed(4))] })
          }

          // update sceneTreeNode
          if ((store as any).state.selectedSceneTreeNode) {
            ;(store as any).state.selectedSceneTreeNode.trees.threeDimension.forEach((c: any) => {
              if (c.uuid === camera.uuid) Object.assign(c.options, { position: [parseFloat(position.x.toFixed(4)), parseFloat(position.y.toFixed(4)), parseFloat(position.z.toFixed(4))] })
            })
          }
        }
      }

      // 节流 change频率太高
      const updateFnCameraTd = throttled(updateFnCamera, 60)
      controls.addEventListener('change', (event: any) => {
        updateFnCameraTd(event)
      })
    }
    // bgColor: 0x333333,
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
}
