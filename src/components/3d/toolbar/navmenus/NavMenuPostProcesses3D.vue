<template>
  <div class="nav-details-processes-3d-main">
    <div v-for="(item, key) in detailsList" :key="key">
      <NavDetailsSelectItem :icon="item.icon" :name="item.name" :type="key" :selected="item.selected" @click="selectItem({ key, target: item })" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { EventsBus } from '@/core/EventsBus'

import NavDetailsSelectItem from '@/components/utils/navdetails/NavDetailsSelectItem.vue'

export default defineComponent({
  name: 'NavMenuPostProcesses3D',
  components: {
    NavDetailsSelectItem
  },
  setup() {
    const store = useStore()

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
      },
      // MSAAPass: {
      //   name: 'msaa抗锯齿',
      //   selected: false,
      //   icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      // },
      SSRPass: {
        name: '屏幕空间反射',
        selected: false,
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      },
      SSAOPass: {
        name: '屏幕空间环境光遮蔽',
        selected: false,
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png')
      }
    })

    const selectItem = (options: any) => {
      const { key, target } = options

      let flag = target.selected
      for (const k in detailsList.value) {
        const detail = detailsList.value[k]
        detail.selected = false
      }
      target.selected = !flag

      store.state.selectedSceneTreeNode.trees.threeDimension.forEach((node: any) => {
        if (node.type === key) {
          EventsBus.emit('treeSelected', { node })
          EventsBus.emit('toolBarSelected', { node })
        }
      })
    }

    const reloadEditForms = () => {
      let selectedItem: any
      let key = ''
      for (const k in detailsList.value) {
        const detail = detailsList.value[k]
        if (detail.selected) {
          selectedItem = detail
          key = k
          break
        }
      }

      store.state.selectedSceneTreeNode.trees.threeDimension.forEach((node: any) => {
        if (node.type === key) {
          node.selected = selectedItem.selected
          store.state.selectedPageTreeNode = node.selected ? node : null
          EventsBus.emit('toolBarSelected', { node })
        }
      })
    }

    const validateDetails = () => {
      store.state.selectedSceneTreeNode.trees.threeDimension.forEach((node: any) => {
        for (const k in detailsList.value) {
          if (node.type === k) {
            const detail = detailsList.value[k]
            detail.selected = node.selected
          }
        }
      })
    }

    const navMenuGoBackReset = () => {
      let key = ''
      // 找出选中的元素
      for (const k in detailsList.value) {
        const detail = detailsList.value[k]
        if (detail.selected) {
          key = k
          break
        }
      }

      store.state.selectedSceneTreeNode.trees.threeDimension.forEach((node: any) => {
        if (node.type === key) {
          node.selected = false
          store.state.selectedPageTreeNode = null
          EventsBus.emit('toolBarSelected', { node })
        }
      })
    }

    onMounted(() => {
      EventsBus.on('formsReload', reloadEditForms)
      EventsBus.on('navDetailsValidate', validateDetails)
      EventsBus.on('navMenuGoBackReset', navMenuGoBackReset)
      validateDetails()
    })

    onUnmounted(() => {
      EventsBus.off('formsReload', reloadEditForms)
      EventsBus.off('navDetailsValidate', validateDetails)
      EventsBus.off('navMenuGoBackReset', navMenuGoBackReset)
    })

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
