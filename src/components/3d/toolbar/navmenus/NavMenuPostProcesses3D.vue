<template>
  <div class="nav-postprocesses-3d" v-if="pageIndex === 0">
    <div class="mb-8"><ToolBarSwitch v-for="item in dataList1" :key="item.type" :icon="item.icon" :name="item.name" :type="item.type" :val="item.val" /></div>

    <LineEl :color="'#363741'" />

    <div><ToolBarSwitch v-for="item in dataList2" :key="item.type" :icon="item.icon" :name="item.name" :type="item.type" :val="item.val" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarSwitch from '@/components/utils/toolbar/ToolBarSwitch.vue'
import LineEl from '@/components/utils/common/LineEl.vue'

export default defineComponent({
  name: 'NavMenuPostProcesses3D',
  components: {
    ToolBarSwitch,
    LineEl
  },
  setup() {
    const pageIndex = ref(0)
    const dataList1 = ref([
      { icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'), name: '轮廓', val: false, type: 'Outline' },
      { icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'), name: '泛光', val: false, type: 'Bloom' }
    ])

    const dataList2 = ref([
      { icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'), name: '景深', val: false, type: 'DOF' },
      { icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'), name: 'gamma校正', val: false, type: 'Gamma Correction' },
      { icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'), name: 'ssaa抗锯齿', val: false, type: 'SSAA' },
      { icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'), name: '屏幕空间反射', val: false, type: 'SSR' },
      { icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'), name: '屏幕空间环境光遮蔽', val: false, type: 'SSAO' }
    ])

    return {
      dataList1,
      dataList2,
      pageIndex
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-postprocesses-3d {
  @apply h-full w-full flex flex-col;
}
</style>
