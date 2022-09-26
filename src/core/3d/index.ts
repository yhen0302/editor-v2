import { flatTreeNodes, loadSceneNodes, parseModelNode, traverseFindNodeById } from './util'
import store, { LayerTreeNode3D } from '../../store'
import { useGetter, useMutation, useState } from '../../store/helper'
import { nextTick } from 'vue'

declare const Bol3D: any

export function loadScene({ modelUrls, domElement, publicPath, callback }: any) {
  const stateGlobal = useState(store, 'global')

  const mutations3d = useMutation(store, '3d', ['SELECT_LAYER_NODE_CONTROLS', 'CLEAR_SELECT_LAYER_NODE', 'CLEAR_EDIT_FORM', 'UPDATE_SELECT_LAYER_NODE_CONTROLS'])
  const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])

  const container = new Bol3D.Container({
    publicPath,
    container: domElement,
    viewState: 'orbit',
    modelUrls,
    enableShadow: true,
    bloomEnabled: false,
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
      const index = 0
      // 3d模板 存入缓存
      parseModelNode(model, index, node)
      stateGlobal.template.threeDimension.push(node)
    },
    onLoad: (evt: any) => {
      loadSceneNodes(evt)
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
