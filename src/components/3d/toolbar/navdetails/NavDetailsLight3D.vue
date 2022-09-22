<template>
  <div class="nav-details-light-3d-main">
    <div v-for="(item, key) in detailsList" :key="key">
      <NavDetailsSelectItem :name="item.name" :type="key" :selected="item.selected" @click="selectItem({ key, target: item })" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'

import NavDetailsSelectItem from '@/components/utils/navdetails/NavDetailsSelectItem.vue'
import { useGetter, useMutation, useState } from '@/store/helper'

export default defineComponent({
  name: 'NavDetailsLight3D',
  components: {
    NavDetailsSelectItem
  },
  setup() {
    const store = useStore()

    const stateGlobal = useState(store, 'global')
    const mutations3D = useMutation(store, '3d', ['TOGGLE_EDIT_FORM', 'SELECT_LAYER_NODE'])
    const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])

    const detailsList: any = ref({
      AmbientLight: {
        name: '环境光',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'AmbientLight') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        })
      },
      HemisphereLight: {
        name: '半球光',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'HemisphereLight') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        })
      },
      DirectionLights: {
        name: '平行光',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'DirectionLights') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        })
      },
      SpotLights: {
        name: '聚光灯',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'SpotLights') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        })
      },
      PointLights: {
        name: '点光源',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'PointLights') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        })
      },
      RectAreaLights: {
        name: '矩形面光',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'RectAreaLights') {
            return getters3D.SELECTED_LAYER_NODE.value.selected
          }
          return false
        })
      }
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
.nav-details-light-3d-main {
  @apply w-full h-full flex-row;
}
</style>
