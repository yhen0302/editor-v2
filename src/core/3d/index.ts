import { flatTreeNodes, loadEnvironmentNodes, parseModelNode, loadGroupNodes, traverseFindNodeById } from './util'
import store, { LayerTreeNode3D } from '../../store'
import { useGetter, useMutation, useState } from '../../store/helper'
import { nextTick, toRaw } from 'vue'

declare const Bol3D: any

export function loadScene({ modelUrls, domElement, publicPath, callback }: any) {
  const stateGlobal = useState(store, 'global')

  const mutations3d = useMutation(store, '3d', ['SELECT_LAYER_NODE_CONTROLS', 'CLEAR_SELECT_LAYER_NODE', 'CLEAR_EDIT_FORM', 'UPDATE_SELECT_LAYER_NODE_CONTROLS', 'UPDATE_CAMERA'])
  const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])
  const state3D = useState(store, '3d')

  const container = new Bol3D.Container({
    publicPath,
    container: domElement,
    viewState: 'orbit',
    modelUrls,
    enableShadow: true,
    bloomEnabled: true,
    bloom: {
      bloomStrength: 0.75,
      bloomRadius: 0.15,
      threshold: 0.035
    },
    renderer: {
      logarithmicDepthBuffer: true,
      alpha: true
    },
    outlineEnabled: true,
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
      const index = 1
      // 模板：模型节点
      parseModelNode(model, index, node)
      stateGlobal.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      ;(window as any).container = evt

      // 校准游标
      evt.texLoader.load('/utils/calibration.png', (tex: any) => {
        const calibratMat = new Bol3D.SpriteMaterial({
          depthTest: false,
          transparent: true,
          sizeAttenuation: false,
          map: tex
        })
        const calibrat = new Bol3D.Sprite(calibratMat)
        evt.scene.add(calibrat)
        calibrat.scale.set(0.05, 0.05, 0.05)
        calibrat.renderOrder = 101

        state3D.calibrationCursor = calibrat
      })

      // 模板：分组节点
      loadGroupNodes(evt)
      // 模板：环境节点
      loadEnvironmentNodes(evt)

      evt.orbitControls.addEventListener('end', () => {
        mutations3d.UPDATE_CAMERA({ controls: evt.orbitControls })
      })

      callback && callback(evt)
    }
  })

  nextTick(() => {
    const events = new Bol3D.Events(container)

    // add transform controls / default state 'translate'
    container.transformControl.setMode('translate')

    container.transformControl.addEventListener('change', () => {
      if (container.transformControl.dragging) {
        const { position, rotation, scale } = container.transformControl.object
        mutations3d.UPDATE_SELECT_LAYER_NODE_CONTROLS({
          node: {
            position,
            rotation,
            scale
          }
        })
      }
    })

    events.ondbclick = (e) => {
      if (stateGlobal.dimensionType != '3d') return
      if (e.objects.length > 0) {
        const rayObj = e.objects[0].object

        container.transformControl.attach(rayObj)

        const currentPageNode = stateGlobal.selectedPageTreeNode

        const flattenNodes: LayerTreeNode3D[] = []
        flatTreeNodes((currentPageNode && currentPageNode.trees.threeDimension) as LayerTreeNode3D[], flattenNodes)

        for (const n of flattenNodes) {
          if (n.uuid == rayObj.uuid) {
            container.outlineObjects = [rayObj]
            mutations3d.SELECT_LAYER_NODE_CONTROLS({ node: n, flattenNodes })
            break
          }
        }
      } else {
        container.transformControl.detach()
        container.outlineObjects = []
        mutations3d.CLEAR_EDIT_FORM()
        mutations3d.CLEAR_SELECT_LAYER_NODE()
      }
    }

    events.onhover = (e: any) => {
      if (stateGlobal.dimensionType != '3d') return

      if (getters3D.SELECTED_LAYER_NODE.value) {
        for (const otObj of container.outlineObjects) {
          if (otObj.uuid == getters3D.SELECTED_LAYER_NODE.value.uuid) {
            container.outlineObjects = [otObj]
            return
          }
        }
      } else {
        container.outlineObjects = []
        if (e.objects.length > 0) {
          container.outlineObjects.push(e.objects[0].object)
        }
      }
    }
  })
}
