<template>
  <div class="nav-details-light-3d-main">
    <div v-for="(item, key) in detailsList" :key="key">
      <NavDetailsSelectItem :name="item.name" :type="key" :selected="item.selected" @click="selectItem({ key, target: item })" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { EventsBus } from '@/core/EventsBus'

import NavDetailsSelectItem from '@/components/utils/navdetails/NavDetailsSelectItem.vue'

export default defineComponent({
  name: 'NavDetailsLight3D',
  components: {
    NavDetailsSelectItem
  },
  setup() {
    const store = useStore()
    const detailsList: any = ref({
      AmbientLight: {
        name: '环境光',
        selected: false
      },
      HemisphereLight: {
        name: '半球光',
        selected: false
      },
      DirectionLights: {
        name: '平行光',
        selected: false
      },
      SpotLights: {
        name: '聚光灯',
        selected: false
      },
      PointLights: {
        name: '点光源',
        selected: false
      },
      RectAreaLights: {
        name: '矩形面光',
        selected: false
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

    onMounted(() => {
      EventsBus.on('formsReload', reloadEditForms)
      EventsBus.on('navDetailsValidate', validateDetails)
      validateDetails()
    })

    onUnmounted(() => {
      EventsBus.off('formsReload', reloadEditForms)
      EventsBus.off('navDetailsValidate', validateDetails)
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
.nav-details-light-3d-main {
  @apply w-full h-full flex-row;
}
</style>
