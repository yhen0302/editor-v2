<template>
  <div class="nav-element-3d" v-if="pageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item)" />
  </div>

  <div class="nav-element-details-3d" v-if="pageIndex === 1">
    <component :is="detailsType" v-show="detailsType !== ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'
import { EventsBus } from '@/core/EventsBus'

import NavDetailsTemplate3D from '../navdetails/NavDetailsTemplate3D.vue'
// import NavDetailsThreeDimensionIcon3D from '../navdetails/NavDetailsThreeDimensionIcon3D.vue'

export default defineComponent({
  name: 'NavMenuElement3D',
  components: {
    ToolBarItem,
    NavDetailsTemplate3D,
    NavDetailsThreeDimensionIcon3D: defineAsyncComponent(() => import('../navdetails/NavDetailsThreeDimensionIcon3D.vue'))
  },
  setup() {
    const pageIndex = ref(0)
    const dataList = ref([
      { icon: require('@/assets/images/main/left/editor_element_model_btn_dark.png'), name: '模板', type: 'template' },
      { icon: require('@/assets/images/main/left/editor_element_icon_btn_dark.png'), name: '图标', type: 'threeDimensionIcon' },
      { icon: require('@/assets/images/main/left/editor_element_text_btn_dark.png'), name: '文本', type: 'threeDimensionText' },
      { icon: require('@/assets/images/main/left/editor_element_mark_btn_dark.png'), name: '自由标记', type: 'threeDimensionMark' },
      { icon: require('@/assets/images/main/left/editor_element_flyline_btn_dark.png'), name: '飞线', type: 'flyline' },
      { icon: require('@/assets/images/main/left/editor_element_streamer_btn_dark.png'), name: '道路流光', type: 'streamer' }
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
        case 'template':
          detailsType.value = 'NavDetailsTemplate3D'
          break
        case 'threeDimensionIcon':
          detailsType.value = 'NavDetailsThreeDimensionIcon3D'
          break
        case 'threeDimensionText':
          detailsType.value = 'NavDetailsThreeDimensionText3D'
          break
        case 'threeDimensionMark':
          detailsType.value = 'NavDetailsThreeDimensionMark3D'
          break
        case 'flyline':
          detailsType.value = 'NavDetailsFlyLine3D'
          break
        case 'streamer':
          detailsType.value = 'NavDetailsStreamer3D'
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
.nav-element-3d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
.nav-element-details-3d {
  @apply h-full w-full;
}
</style>
