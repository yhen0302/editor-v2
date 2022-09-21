<template>
  <div class="nav-scenes-3d" v-if="state3D.leftNavPageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item)" />
  </div>

  <div class="nav-scenes-details-3d" v-if="state3D.leftNavPageIndex === 1">
    <component :is="state3D.leftNavDetailsType" v-show="state3D.leftNavDetailsType !== ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'

import NavDetailsLight3D from '@/components/3d/toolbar/navdetails/NavDetailsLight3D.vue'
import NavDetailsCamera3D from '@/components/3d/toolbar/navdetails/NavDetailsCamera3D.vue'
import NavDetailsShadow3D from '@/components/3d/toolbar/navdetails/NavDetailsShadow3D.vue'
import NavDetailsBackground3D from '@/components/3d/toolbar/navdetails/NavDetailsBackground3D.vue'
import NavDetailsHDR3D from '@/components/3d/toolbar/navdetails/NavDetailsHDR3D.vue'
import NavDetailsFog3D from '@/components/3d/toolbar/navdetails/NavDetailsFog3D.vue'
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { type2DetailsType } from '@/store/util'

export default defineComponent({
  name: 'NavMenuScenes3D',
  components: {
    ToolBarItem,
    NavDetailsLight3D,
    NavDetailsCamera3D,
    NavDetailsShadow3D,
    NavDetailsBackground3D,
    NavDetailsHDR3D,
    NavDetailsFog3D
  },
  setup() {
    const store = useStore()
    const state3D = useState(store, '3d')
    const mutations3D = useMutation(store, '3d', ['CHANGE_NAV_PAGE_INDEX', 'CHANGE_NAV_TITLE', 'CHANGE_NAV_DETAILS_TYPE'])

    const dataList = ref([
      { icon: require('@/assets/images/main/left/editor_sceneeffect_light_btn_dark.png'), name: '光照', type: 'light' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_camea_btn_dark.png'), name: '相机/控制器', type: 'camera' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_shadow_btn_dark.png'), name: '阴影', type: 'shadow' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_background_btn_dark.png'), name: '背景', type: 'background' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_hdr_btn_dark.png'), name: 'HDR', type: 'HDR' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_fog_btn_dark.png'), name: '雾', type: 'fog' }
    ])

    const chooseItem = (item: any) => {
      mutations3D.CHANGE_NAV_PAGE_INDEX({ index: state3D.leftNavPageIndex + 1 })
      mutations3D.CHANGE_NAV_TITLE({ name: item.name })
      mutations3D.CHANGE_NAV_DETAILS_TYPE({ type: type2DetailsType(item.type) })
    }

    return {
      dataList,
      chooseItem,
      state3D
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-scenes-3d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
.nav-scenes-details-3d {
  @apply h-full w-full overflow-scroll;
}
</style>
