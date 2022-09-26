<template>
  <div :id="treeId" class="trees-3d-main" v-if="stateGlobal.selectedPageTreeNode" contextmenu.prevent>
    <div class="node-item" v-for="item in stateGlobal.selectedPageTreeNode.trees.threeDimension" :key="item">
      <PageTreeNode3D :node="item" v-if="item.show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref } from 'vue'
import PageTreeNode3D from '@/components/utils/editmenu/PageTreeNode3D.vue'
import { useStore } from 'vuex'
import { useState } from '@/store/helper'

export default defineComponent({
  name: 'Trees3D',
  components: {
    PageTreeNode3D
  },
  setup() {
    const store = useStore()

    const stateGlobal = useState(store, 'global')
    const treeId = ref('')

    onUpdated(() => {
      try {
        treeId.value = stateGlobal.selectedPageTreeNode ? `场景${parseInt(stateGlobal.selectedPageTreeNode?.parent) + 1}-${stateGlobal.selectedPageTreeNode.name}` : ''
      } catch {
        throw new Error('tree3d updated error.')
      }
    })

    return {
      store,
      treeId,
      stateGlobal
    }
  }
})
</script>

<style lang="postcss" scoped>
.trees-3d-main {
  @apply w-full h-full overflow-scroll;
}
</style>
