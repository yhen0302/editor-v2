import { useState } from './helper'
import store, { SceneTreeNode } from './index'

// 根据UUID查找Scene Node
export function selectSceneNodeByUUID(uuid: string): SceneTreeNode | null {
  const stateGlobal = useState(store, 'global')

  let result: SceneTreeNode | null = null

  for (const i in stateGlobal.sceneTreeNodes) {
    const stNode: SceneTreeNode = stateGlobal.sceneTreeNodes[i]
    if (stNode.uuid == uuid) {
      result = stNode
      break
    }
  }

  return result
}

// 3d: 根据node type返回需要展示的<EditForms>下的<component>组件 :is属性所需的type
export function nodeType2IsType(type: string) {
  let result: string | null = null
  // 展示编辑表单
  switch (type) {
    case 'None':
      break
    case 'Group':
      result = 'GroupForms3D'
      break
    case 'Mesh':
      result = 'MeshForms3D'
      break
    case 'Object3D':
      result = 'ObjectForms3D'
      break
    case 'AmbientLight':
      result = 'AmbientLightForms3D'
      break
    case 'HemisphereLight':
      result = 'HemisphereLightForms3D'
      break
    case 'DirectionLights':
      result = 'DirectionLightsForms3D'
      break
    case 'SpotLights':
      result = 'SpotLightsForms3D'
      break
    case 'PointLights':
      result = 'PointLightsForms3D'
      break
    case 'RectAreaLights':
      result = 'RectAreaLightsForms3D'
      break
    case 'Camera':
      result = 'CameraForms3D'
      break
    case 'Shadow':
      result = 'ShadowForms3D'
      break
    case 'Background':
      result = 'BackgroundForms3D'
      break
    case 'HDR':
      result = 'HDRForms3D'
      break
    case 'Fog':
      result = 'FogForms3D'
      break
    case 'BloomPass':
      result = 'BloomPassForms3D'
      break
    case 'OutlinePass':
      result = 'OutlinePassForms3D'
      break
    case 'DOFPass':
      result = 'DofPassForms3D'
      break
    case 'GammaPass':
      result = 'GammaPassForms3D'
      break
    case 'MSAAPass':
      result = 'MSAAPassForms3D'
      break
  }

  return result
}

// 3d: 根据node type返回toolbarType
export function nodeType2ToolBarType(type: string) {
  let result: string | null = null
  // 展示编辑表单
  switch (type) {
    case 'element':
      result = 'NavMenuElement3D'
      break
    case 'scenes':
      result = 'NavMenuScenes3D'
      break
    case 'afterProcess':
      result = 'NavMenuPostProcesses3D'
      break
  }

  return result
}

// 3d: 根据左侧导航type 返回导航标题
export function toolbarType2Title(type: string | null) {
  let result: string | null = null
  switch (type) {
    case 'NavMenuElement3D':
      result = '添加元素'
      break
    case 'NavMenuScenes3D':
      result = '场景配置'
      break
  }
  return result
}

// 3d: 根据type 返回需要展示的2级导航Details下的<component>组件 :is属性所需的type
export function type2DetailsType(type: string | null) {
  let result: string | null = null
  switch (type) {
    case 'template':
      result = 'NavDetailsTemplate3D'
      break
    case 'flyline':
      result = 'NavDetailsFlyLine3D'
      break
    case 'streamer':
      result = 'NavDetailsStreamer3D'
      break
    case 'light':
      result = 'NavDetailsLight3D'
      break
    case 'camera':
      result = 'NavDetailsCamera3D'
      break
    case 'shadow':
      result = 'NavDetailsShadow3D'
      break
    case 'background':
      result = 'NavDetailsBackground3D'
      break
    case 'HDR':
      result = 'NavDetailsHDR3D'
      break
    case 'fog':
      result = 'NavDetailsFog3D'
      break
  }
  return result
}
