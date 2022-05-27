<template>
  <div class="nav-details-light-3d-main">
    <div v-for="(item, key) in detailsList" :key="key">
      <NavDetailsSelectItem :name="item.name" :type="key" :selected="item.selected" @click="selectItem({ key, target: item })" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
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
      ambientLight: {
        name: '环境光',
        selected: false
      },
      directionLight: {
        name: '平行光',
        selected: false
      },
      spotLight: {
        name: '聚光灯',
        selected: false
      },
      pointLight: {
        name: '点光源',
        selected: false
      },
      hemisphereLight: {
        name: '半球光',
        selected: false
      },
      rectAreaLight: {
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

      console.log('store.state.selectedSceneTreeNode', store.state.selectedSceneTreeNode)
      if (key === 'ambientLight') {
        // find ambientLightNode
        store.state.selectedSceneTreeNode.trees.threeDimension.forEach((node: any) => {
          if (node.type === 'AmbientLight') {
            node.selected = target.selected
            store.state.selectedPageTreeNode = node.selected ? node : null
            EventsBus.emit('toolBarSelected', { node })
          }
        })
      }
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
