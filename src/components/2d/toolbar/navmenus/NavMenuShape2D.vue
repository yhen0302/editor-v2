<template>
  <div class="nav-shape-2d" v-if="pageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item)" />
  </div>

  <div class="nav-shape-details-2d" v-if="pageIndex === 1">
    <div>details</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'NavMenuShape2D',
  components: {
    ToolBarItem
  },
  setup() {
    const pageIndex = ref(0)
    const dataList = ref([
      { icon: require('@/assets/images/main/left/editor_shape_shape_btn_dark.png'), name: '基本形状', type: 'base' },
      { icon: require('@/assets/images/main/left/editor_shape_button_btn_dark.png'), name: '按钮', type: 'button' },
      { icon: require('@/assets/images/main/left/editor_shape_icon_btn_dark.png'), name: '图标', type: 'base' }
    ])

    const chooseItem = (item: any) => {
      pageIndex.value = 1

      EventsBus.emit('navMenuItemChoosed', {
        dimension: '2d',
        pageIndex: pageIndex.value,
        type: item.type,
        name: item.name
      })
    }

    EventsBus.on('navMenuGoBack', (e: any) => {
      if (e.dimension != '2d') return

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
.nav-shape-2d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
.nav-shape-details-2d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
</style>
