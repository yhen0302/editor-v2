<template>
  <div class="nav-element-3d" v-if="pageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item.type)" />
  </div>

  <div class="nav-element-details-3d" v-if="pageIndex === 1">
    <div>details</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'NavMenuElement3D',
  components: {
    ToolBarItem
  },
  setup() {
    const pageIndex = ref(0)
    const dataList = ref([
      { icon: require('@/assets/images/main/left/editor_element_model_btn_dark.png'), name: '模型', type: 'model' },
      { icon: require('@/assets/images/main/left/editor_element_icon_btn_dark.png'), name: '图标', type: '3dicon' },
      { icon: require('@/assets/images/main/left/editor_element_text_btn_dark.png'), name: '文本', type: 'text' },
      { icon: require('@/assets/images/main/left/editor_element_mark_btn_dark.png'), name: '自由标记', type: 'mark' },
      { icon: require('@/assets/images/main/left/editor_element_flyline_btn_dark.png'), name: '飞线', type: 'flyline' },
      { icon: require('@/assets/images/main/left/editor_element_streamer_btn_dark.png'), name: '道路流光', type: 'streamer' }
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
.nav-element-3d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
.nav-element-details-3d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
</style>
