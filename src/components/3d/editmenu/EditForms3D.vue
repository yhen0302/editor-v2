<template>
  <div class="edit-forms-3d-main">
    <component :is="editedFormType" v-if="dimensionType == '3d' && editedFormType" :node="SELECTED_LAYER_NODE" :key="new Date().getTime()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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

import { mapState, useGetter } from '@/store/helper'

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
    MSAAPassForms3D
  },
  setup() {
    const store = useStore()

    const stateMapperGlobal = mapState(store, 'global', ['dimensionType'])
    const stateMapper3D = mapState(store, '3d', ['editedFormType'])
    const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])

    return {
      store,
      ...stateMapper3D,
      ...stateMapperGlobal,
      ...getters3D
    }
  }
})
</script>

<style lang="postcss" scoped>
.edit-forms-3d-main {
  @apply w-full h-full;
}
</style>
