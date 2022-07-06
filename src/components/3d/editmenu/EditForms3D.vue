<template>
  <div class="edit-forms-3d-main">
    <component :is="type" v-if="type != ''" :node="node" :key="new Date().getTime()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

// 1.page tree
import GroupForms3D from './editForms/GroupForms3D.vue'
import MeshForms3D from './editForms/MeshForms3D.vue'
import ObjectForms3D from './editForms/ObjectForms3D.vue'
// 2.lights
import AmbientLightForms3D from './editForms/AmbientLightForms3D.vue'
import DirectionLightsForms3D from './editForms/DirectionLightsForms3D.vue'
import HemisphereLightForms3D from './editForms/HemisphereLightForms3D.vue'
import SpotLightsForms3D from './editForms/SpotLightsForms3D.vue'
import PointLightsForms3D from './editForms/PointLightsForms3D.vue'
import RectAreaLightsForms3D from './editForms/RectAreaLightsForms3D.vue'
// 3.camera
import CameraForms3D from './editForms/CameraForms3D.vue'
// 4.shadow
import ShadowForms3D from './editForms/ShadowForms3D.vue'
// 5.background
import BackgroundForms3D from './editForms/BackgroundForms3D.vue'
// 6.HDR
import HDRForms3D from './editForms/HDRForms3D.vue'
// 7.FOG
import FogForms3D from './editForms/FogForms3D.vue'
// passes
// 1.bloom pass
import BloomPassForms3D from './editForms/BloomPassForms3D.vue'
// 2.outline pass
import OutlinePassForms3D from './editForms/OutlinePassForms3D.vue'
// 3.dof pass
import DofPassForms3D from './editForms/DofPassForms3D.vue'
// 4.gamma pass
import GammaPassForms3D from './editForms/GammaPassForms3D.vue'
// 5.msaa pass
import MSAAPassForms3D from './editForms/MSAAPassForms3D.vue'
// 添加元素图标模块
import Icon from '../rightKanBan/Icon.vue'
import Text from '../rightKanBan/Text.vue'
import FlyLine from '../rightKanBan/FlyLine.vue'

import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'EditForms3D',
  components: {
    // objects
    GroupForms3D,
    MeshForms3D,
    ObjectForms3D,
    // scenes
    AmbientLightForms3D,
    DirectionLightsForms3D,
    HemisphereLightForms3D,
    SpotLightsForms3D,
    PointLightsForms3D,
    RectAreaLightsForms3D,
    CameraForms3D,
    ShadowForms3D,
    BackgroundForms3D,
    HDRForms3D,
    FogForms3D,
    // passes
    BloomPassForms3D,
    OutlinePassForms3D,
    DofPassForms3D,
    GammaPassForms3D,
    MSAAPassForms3D,
    // 添加元素图标板块
    Icon,
    Text,
    FlyLine
  },
  setup() {
    const store = useStore()
    const type = ref('')
    const node: any = ref(null)

    // 右方pageTree选中元素
    EventsBus.on('treeSelected', (e: any) => {
      // console.log('e.node.type', e.node)

      if (!e.node.selected) {
        type.value = ''
        return
      }

      // 展示编辑表单
      switch (e.node.type) {
        case 'Group':
          type.value = 'GroupForms3D'
          node.value = e.node
          break
        case 'Mesh':
          type.value = 'MeshForms3D'
          node.value = e.node
          break
        case 'Object3D':
          type.value = 'ObjectForms3D'
          node.value = e.node
          break
      }
    })

    // 左方toolBar选中元素
    EventsBus.on('toolBarSelected', (e: any) => {
      // console.log('e.node.type', e.node)

      if (!e.node.selected) {
        type.value = ''
        return
      }

      // 展示编辑表单
      switch (e.node.type) {
        case 'AmbientLight':
          type.value = 'AmbientLightForms3D'
          node.value = e.node
          break
        case 'HemisphereLight':
          type.value = 'HemisphereLightForms3D'
          node.value = e.node
          break
        case 'DirectionLights':
          type.value = 'DirectionLightsForms3D'
          node.value = e.node
          break
        case 'SpotLights':
          type.value = 'SpotLightsForms3D'
          node.value = e.node
          break
        case 'PointLights':
          type.value = 'PointLightsForms3D'
          node.value = e.node
          break
        case 'RectAreaLights':
          type.value = 'RectAreaLightsForms3D'
          node.value = e.node
          break
        case 'Camera':
          type.value = 'CameraForms3D'
          node.value = e.node
          break
        case 'Shadow':
          type.value = 'ShadowForms3D'
          node.value = e.node
          break
        case 'Background':
          type.value = 'BackgroundForms3D'
          node.value = e.node
          break
        case 'HDR':
          type.value = 'HDRForms3D'
          node.value = e.node
          break
        case 'Fog':
          type.value = 'FogForms3D'
          node.value = e.node
          break
        case 'BloomPass':
          type.value = 'BloomPassForms3D'
          node.value = e.node
          break
        case 'OutlinePass':
          type.value = 'OutlinePassForms3D'
          node.value = e.node
          break
        case 'DOFPass':
          type.value = 'DofPassForms3D'
          node.value = e.node
          break
        case 'GammaPass':
          type.value = 'GammaPassForms3D'
          node.value = e.node
          break
        case 'MSAAPass':
          type.value = 'MSAAPassForms3D'
          node.value = e.node
          break
        case 'icon3D':
          type.value = 'Icon'
          node.value = e.node
          break
        case 'text3D':
          type.value = 'Text'
          node.value = e.node
          break
        case 'flyLine':
          type.value = 'FlyLine'
          node.value = e.node
          break
      }
    })

    // 重置编辑表单
    EventsBus.on('formsReset', () => {
      type.value = ''
      node.value = null

      // 左侧toolbar update（有可能为选中状态，此时恢复表单）
      EventsBus.emit('formsReload', {})
    })

    // 重置模板
    EventsBus.on('resetTemplate', () => {
      type.value = ''
      node.value = null
    })

    return {
      store,
      type,
      node
    }
  }
})
</script>

<style lang="postcss" scoped>
.edit-forms-3d-main {
  @apply w-full h-full;
}
</style>
