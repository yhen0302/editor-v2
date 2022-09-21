<template>
  <div class="trees-3d-main" v-if="stateGlobal.selectedPageTreeNode">
    <div class="node-item" v-for="item in stateGlobal.selectedPageTreeNode.trees.threeDimension" :key="item">
      <PageTreeNode3D :node="item" v-if="item.show" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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

    return {
      store,
      stateGlobal
      // nodes
    }
  }
})
</script>

<style lang="postcss" scoped>
.trees-3d-main {
  @apply w-full h-full overflow-scroll;
}
</style>
