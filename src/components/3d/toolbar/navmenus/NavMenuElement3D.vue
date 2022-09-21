<template>
  <div class="nav-element-3d" v-if="state3D.leftNavPageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item)" />
  </div>

  <div class="nav-element-details-3d" v-if="state3D.leftNavPageIndex === 1">
    <component :is="state3D.leftNavDetailsType" v-show="state3D.leftNavDetailsType !== ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'

import NavDetailsTemplate3D from '../navdetails/NavDetailsTemplate3D.vue'
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { type2DetailsType } from '@/store/util'

export default defineComponent({
  name: 'NavMenuElement3D',
  components: {
    ToolBarItem,
    NavDetailsTemplate3D
  },
  setup() {
    const store = useStore()
    const state3D = useState(store, '3d')
    const mutations3D = useMutation(store, '3d', ['CHANGE_NAV_PAGE_INDEX', 'CHANGE_NAV_TITLE', 'CHANGE_NAV_DETAILS_TYPE'])

    const dataList = ref([
      {
        icon: require('@/assets/images/main/left/editor_element_model_btn_dark.png'),
        name: '模板',
        type: 'template'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_icon_btn_dark.png'),
        name: '图标',
        type: 'threeDimensionIcon'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_text_btn_dark.png'),
        name: '文本',
        type: 'threeDimensionText'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_mark_btn_dark.png'),
        name: '自由标记',
        type: 'threeDimensionMark'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_flyline_btn_dark.png'),
        name: '飞线',
        type: 'flyline'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_streamer_btn_dark.png'),
        name: '道路流光',
        type: 'streamer'
      }
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
.nav-element-3d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
.nav-element-details-3d {
  @apply h-full w-full;
}
</style>
