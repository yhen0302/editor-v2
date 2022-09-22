<template>
  <div class="nav-details-processes-3d-main">
    <div v-for="(item, key) in detailsList" :key="key">
      <NavDetailsSelectItem :icon="item.icon" :name="item.name" :type="key" :selected="item.selected" @click="selectItem({ key, target: item })" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'

import NavDetailsSelectItem from '@/components/utils/navdetails/NavDetailsSelectItem.vue'
import { useGetter, useMutation, useState } from '@/store/helper'

export default defineComponent({
  name: 'NavMenuPostProcesses3D',
  components: {
    NavDetailsSelectItem
  },
  setup() {
    const store = useStore()

    const stateGlobal = useState(store, 'global')
    const mutations3D = useMutation(store, '3d', ['SELECT_LAYER_NODE', 'TOGGLE_EDIT_FORM'])
    const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])

    const detailsList: any = ref({
      BloomPass: {
        name: '泛光',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'BloomPass') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        }),
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      },
      // OutlinePass: {
      //   name: '轮廓',
      //   selected: false,
      //   icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      // },
      DOFPass: {
        name: '景深',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'DOFPass') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        }),
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      },
      GammaPass: {
        name: 'gamma校正',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'GammaPass') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        }),
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
      const { key } = options

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
