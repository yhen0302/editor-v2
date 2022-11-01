<template>
  <div class="nav-details-icon-3d">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'

import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'

export default defineComponent({
  name: 'NavDetailsIcon3D',
  components: {
    ToolBarItem
  },
  setup() {
    const store = useStore()
    const state3D = useState(store, '3d')
    // const mutations3D = useMutation(store, '3d', ['CHANGE_NAV_PAGE_INDEX', 'CHANGE_NAV_TITLE', 'CHANGE_NAV_DETAILS_TYPE'])

    const dataList = ref([
      {
        icon: require('@/assets/images/main/left/editor_element_model_btn_dark.png'),
        name: '标题式',
        type: 'title'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_icon_btn_dark.png'),
        name: '标记式',
        type: 'tag'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_text_btn_dark.png'),
        name: '柱状式',
        type: 'columnar'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_mark_btn_dark.png'),
        name: '图片下拉式',
        type: 'dropdownPicture'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_flyline_btn_dark.png'),
        name: '信息下拉式',
        type: 'dropdownInformation'
      },
      {
        icon: require('@/assets/images/main/left/editor_element_streamer_btn_dark.png'),
        name: '视频弹窗式',
        type: 'popupVideo'
      }
    ])

    const chooseItem = (item: any) => {
      const addedPosition = toRaw(state3D.calibrationCursor).position
    }

    return {
      dataList,
      state3D,
      chooseItem
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-details-icon-3d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
</style>
