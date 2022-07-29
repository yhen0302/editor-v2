import { parseModelNode } from './util'
import store from '../../store'
// import { EventsBus } from '../EventsBus'
// import { throttled } from '../utils/base'
import { clickFun } from './clickFun'
import { onloadFun } from './onloadFun'
// import { any } from 'underscore'
// import { render } from 'vue'

declare const Bol3D: any

var max = new Bol3D.Vector3()
var min = new Bol3D.Vector3()

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
    stats: false,

    hdrUrls: ['/hdr/dikhololo_night_1k.hdr'],

    // background: {
    //   type: 'color',
    //   value: 0xff0000
    // },

    background: {
      type: 'panorama',
      value: [
        '/panorama/sky_px.jpg',
        '/panorama/sky_nx.jpg',
        '/panorama/sky_py.jpg',
        '/panorama/sky_ny.jpg',
        '/panorama/sky_pz.jpg',
        '/panorama/sky_nz.jpg'
      ],
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
      ;(store as any).state.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      callback && callback(evt)
      ;(store as any).state.elementScaleInterval.x = Math.abs(max.x) + Math.abs(min.x)
      ;(store as any).state.elementScaleInterval.y = Math.abs(max.y) + Math.abs(min.y)
      ;(store as any).state.elementScaleInterval.z = Math.abs(max.z) + Math.abs(min.z)

      const obj = onloadFun(evt, container, publicPath)

      clickFun(container, publicPath, obj)
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
