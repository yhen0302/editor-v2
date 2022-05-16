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
    onProgress: (model: any) => {
      const node = {}
      // 3d模板 存入缓存
      parseModelNode(model, node)
      ;(store as any).state.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      callback && callback(evt)

      EventsBus.emit('sceneLoaded', {
        type: '3d',
        container: evt
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
