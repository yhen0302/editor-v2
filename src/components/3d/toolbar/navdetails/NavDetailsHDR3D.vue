<template>
  <div class="nav-details-hdr-3d-main">
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
  name: 'NavDetailsHDR3D',
  components: {
    NavDetailsSelectItem
  },
  setup() {
    const store = useStore()

    const stateGlobal = useState(store, 'global')
    const mutations3D = useMutation(store, '3d', ['TOGGLE_EDIT_FORM', 'SELECT_LAYER_NODE'])
    const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])

    const detailsList: any = ref({
      HDR: {
        name: '高动态范围成像',
        selected: computed(() => {
          if (!getters3D.SELECTED_LAYER_NODE.value) return false
          if (getters3D.SELECTED_LAYER_NODE.value.type == 'HDR') {
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
.nav-details-hdr-3d-main {
  @apply w-full h-full flex-row;
}
</style>
