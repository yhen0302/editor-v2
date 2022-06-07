<template>
  <div class="nav-scenes-3d" v-if="pageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item)" />
  </div>

  <div class="nav-scenes-details-3d" v-if="pageIndex === 1">
    <component :is="detailsType" v-show="detailsType !== ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'
import { EventsBus } from '@/core/EventsBus'

import NavDetailsLight3D from '@/components/3d/toolbar/navdetails/NavDetailsLight3D.vue'
import NavDetailsCamera3D from '@/components/3d/toolbar/navdetails/NavDetailsCamera3D.vue'
import NavDetailsShadow3D from '@/components/3d/toolbar/navdetails/NavDetailsShadow3D.vue'
import NavDetailsBackground3D from '@/components/3d/toolbar/navdetails/NavDetailsBackground3D.vue'
import NavDetailsHDR3D from '@/components/3d/toolbar/navdetails/NavDetailsHDR3D.vue'
import NavDetailsFog3D from '@/components/3d/toolbar/navdetails/NavDetailsFog3D.vue'

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
    const pageIndex = ref(0)
    const dataList = ref([
      { icon: require('@/assets/images/main/left/editor_sceneeffect_light_btn_dark.png'), name: '光照', type: 'light' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_camea_btn_dark.png'), name: '相机/控制器', type: 'camera' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_shadow_btn_dark.png'), name: '阴影', type: 'shadow' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_background_btn_dark.png'), name: '背景', type: 'background' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_hdr_btn_dark.png'), name: 'HDR', type: 'HDR' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_fog_btn_dark.png'), name: '雾', type: 'fog' }
    ])
    const detailsType = ref('')

    const chooseItem = (item: any) => {
      pageIndex.value = 1

      EventsBus.emit('navMenuItemChoosed', {
        dimension: '3d',
        pageIndex: pageIndex.value,
        type: item.type,
        name: item.name
      })

      switch (item.type) {
        case 'light':
          detailsType.value = 'NavDetailsLight3D'
          break
        case 'camera':
          detailsType.value = 'NavDetailsCamera3D'
          break
        case 'shadow':
          detailsType.value = 'NavDetailsShadow3D'
          break
        case 'background':
          detailsType.value = 'NavDetailsBackground3D'
          break
        case 'HDR':
          detailsType.value = 'NavDetailsHDR3D'
          break
        case 'fog':
          detailsType.value = 'NavDetailsFog3D'
          break
      }
    }

    EventsBus.on('navMenuGoBack', (e: any) => {
      if (e.dimension != '3d') return

      detailsType.value = ''
      pageIndex.value = e.pageIndex
    })

    return {
      dataList,
      chooseItem,
      pageIndex,
      detailsType
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
