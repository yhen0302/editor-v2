<template>
  <div class="nav-scenes-3d" v-if="pageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item.type)" />
  </div>

  <div class="nav-scenes-details-3d" v-if="pageIndex === 1">
    <div>details</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'NavMenuScenes3D',
  components: {
    ToolBarItem
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

    const chooseItem = (type: string) => {
      pageIndex.value = 1

      EventsBus.emit('navMenuItemChoosed', {
        dimension: '3d',
        pageIndex: pageIndex.value,
        type
      })
    }

    EventsBus.on('navMenuGoBack', (e: any) => {
      if (e.dimension != '3d') return

      pageIndex.value = e.pageIndex
    })

    return {
      dataList,
      chooseItem,
      pageIndex
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
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
</style>
