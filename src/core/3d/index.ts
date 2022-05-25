import { parseModelNode } from './util'
import store from '../../store'
import { EventsBus } from '../EventsBus'

declare const Bol3D: any

export function loadScene({ modelUrls, domElement, publicPath, callback }: any) {
  const container = new Bol3D.Container({
    publicPath,
    container: domElement,
    viewState: 'orbit',
    modelUrls,
    lights: {
      ambientLight: {
        color: 0xffffff,
        intensity: 1.0
      }
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
    onProgress: (model: any) => {
      const node: any = {}
      const index = 0
      // 3d模板 存入缓存
      parseModelNode(model, index, node)
      ;(store as any).state.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      callback && callback(evt)

      // 相机节点
      let camera: any
      let controls: any
      let options: any = {}
      if (evt.viewState === 'orbit') {
        camera = evt.orbitCamera
        controls = evt.orbitControls
        options = {
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
        type: camera.type,
        children: [],
        options
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
      controls.addEventListener('change', (event: any) => {
        if (controlsFlag) {
          const t = event.target
          const { target, object } = t
          const { position, uuid } = object

          // 相机状态变化
          EventsBus.emit('cameraChanged', {
            position: [parseFloat(position.x.toFixed(4)), parseFloat(position.y.toFixed(4)), parseFloat(position.z.toFixed(4))],
            target: [parseFloat(target.x.toFixed(4)), parseFloat(target.y.toFixed(4)), parseFloat(target.z.toFixed(4))],
            uuid
          })
        }
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
