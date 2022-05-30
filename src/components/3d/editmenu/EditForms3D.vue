<template>
  <div class="edit-forms-3d-main">
    <component :is="type" v-if="type != ''" :node="node" :key="new Date().getTime()" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import CameraForms3D from './editForms/CameraForms3D.vue'
import GroupForms3D from './editForms/GroupForms3D.vue'
import MeshForms3D from './editForms/MeshForms3D.vue'
import ObjectForms3D from './editForms/ObjectForms3D.vue'

import AmbientLightForms3D from './editForms/AmbientLightForms3D.vue'
import DirectionLightsForms3D from './editForms/DirectionLightsForms3D.vue'
import HemisphereLightForms3D from './editForms/HemisphereLightForms3D.vue'
import SpotLightsForms3D from './editForms/SpotLightsForms3D.vue'
import PointLightsForms3D from './editForms/PointLightsForms3D.vue'
import RectAreaLightsForms3D from './editForms/RectAreaLightsForms3D.vue'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'EditForms3D',
  components: {
    CameraForms3D,
    GroupForms3D,
    MeshForms3D,
    ObjectForms3D,
    AmbientLightForms3D,
    DirectionLightsForms3D,
    HemisphereLightForms3D,
    SpotLightsForms3D,
    PointLightsForms3D,
    RectAreaLightsForms3D
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
        case 'PerspectiveCamera': // todo 正交相机 墨卡托相机
          type.value = 'CameraForms3D'
          node.value = e.node
          break
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
      console.log('e.node.type', e.node)

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
      }
    })

    // 重置编辑表单
    EventsBus.on('formsReset', () => {
      type.value = ''
      node.value = null

      // 左侧toolbar update（有可能为选中状态，此时恢复表单）
      EventsBus.emit('formsReload', {})
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
