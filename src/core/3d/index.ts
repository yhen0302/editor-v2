import { loadSceneNodes, parseModelNode } from './util'
import store from '../../store'
import { useState } from '../../store/helper'

declare const Bol3D: any

export function loadScene({ modelUrls, domElement, publicPath, callback }: any) {
  const stateGlobal = useState(store, 'global')

  new Bol3D.Container({
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
    background: {
      type: 'panorama',
      value: ['/panorama/sky_px.jpg', '/panorama/sky_nx.jpg', '/panorama/sky_py.jpg', '/panorama/sky_ny.jpg', '/panorama/sky_pz.jpg', '/panorama/sky_nz.jpg'],
      options: { scale: 1, rotation: [0, 0, (360 * Math.PI) / 180] }
    },
    fog: {
      intensity: 0,
      color: 0xffffff
    },
    onProgress: (model: any) => {
      const node: any = {}
      const index = 0
      // 3d模板 存入缓存
      parseModelNode({ name: model.name }, model, index, node)
      stateGlobal.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      loadSceneNodes(evt)
      callback && callback(evt)
    }
  })
}
