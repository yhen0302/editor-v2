<template>
  <div class="nav-details-processes-3d-main">
    <div v-for="(item, key) in detailsList" :key="key">
      <NavDetailsSelectItem :icon="item.icon" :name="item.name" :type="key" :selected="item.selected" @click="selectItem({ key, target: item })" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

import NavDetailsSelectItem from '@/components/utils/navdetails/NavDetailsSelectItem.vue'
import { useMutation, useState } from '@/store/helper'

export default defineComponent({
  name: 'NavMenuPostProcesses3D',
  components: {
    NavDetailsSelectItem
  },
  setup() {
    const store = useStore()

    const stateGlobal = useState(store, 'global')
    const mutations3D = useMutation(store, '3d', ['SELECT_LAYER_NODE', 'TOGGLE_EDIT_FORM'])

    const detailsList: any = ref({
      BloomPass: {
        name: '泛光',
        selected: false,
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      },
      OutlinePass: {
        name: '轮廓',
        selected: false,
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      },
      DOFPass: {
        name: '景深',
        selected: false,
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      },
      GammaPass: {
        name: 'gamma校正',
        selected: false,
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      }
      // MSAAPass: {
      //   name: 'msaa抗锯齿',
      //   selected: false,
      //   icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      // },
      // SSRPass: {
      //   name: '屏幕空间反射',
      //   selected: false,
      //   icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      // },
      // SSAOPass: {
      //   name: '屏幕空间环境光遮蔽',
      //   selected: false,
      //   icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      // }
    })

    const selectItem = (options: any) => {
      const { key, target } = options

      const flag = target.selected
      for (const k in detailsList.value) {
        const detail = detailsList.value[k]
        detail.selected = false
      }
      target.selected = !flag

      stateGlobal.selectedPageTreeNode?.trees.threeDimension.forEach((node: any) => {
        if (node.type === key) {
          mutations3D.SELECT_LAYER_NODE({ node })
          mutations3D.TOGGLE_EDIT_FORM({ node })
        }
      })
    }

    return {
      store,
      detailsList,
      selectItem
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-details-processes-3d-main {
  @apply w-full h-full flex-row;
}
</style>
