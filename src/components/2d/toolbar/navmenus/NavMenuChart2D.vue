<template>
  <div class="nav-chart-2d" v-if="pageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item.type)" />
  </div>

  <div class="nav-chart-details-2d" v-if="pageIndex === 1">
    <div>details</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'NavMenuChart2D',
  components: {
    ToolBarItem
  },
  setup() {
    const pageIndex = ref(0)
    const dataList = ref([
      { icon: require('@/assets/images/main/left/editor_chart_histogram_btn_dark.png'), name: '柱状图', type: 'bar' },
      { icon: require('@/assets/images/main/left/editor_chart_linechart_btn_dark.png'), name: '折线图', type: 'line' },
      { icon: require('@/assets/images/main/left/editor_chart_piechart_btn_dark.png'), name: '饼图', type: 'pie' },
      { icon: require('@/assets/images/main/left/editor_chart_dashboard_btn_dark.png'), name: '柱状图', type: 'gauge' },
      { icon: require('@/assets/images/main/left/editor_chart_curvelinechart_btn_dark.png'), name: '曲线图', type: 'curve' }
    ])

    const chooseItem = (type: string) => {
      pageIndex.value = 1

      EventsBus.emit('navMenuItemChoosed', {
        dimension: '2d',
        pageIndex: pageIndex.value,
        type
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
.nav-chart-2d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
.nav-chart-details-2d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
</style>
