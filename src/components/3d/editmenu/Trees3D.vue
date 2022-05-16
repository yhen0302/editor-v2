<template>
  <div class="trees-3d-main">
    <div class="node-item" v-for="item in nodes" :key="item">
      <PageTreeNode3d :node="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { EventsBus } from '@/core/EventsBus'
import PageTreeNode3d from '@/components/utils/editmenu/PageTreeNode3d.vue'

export default defineComponent({
  name: 'Trees3D',
  components: {
    PageTreeNode3d
  },
  setup() {
    const nodes = ref([])

    // 查看详情页
    EventsBus.on('pageEnter', (e: any) => {
      const { node, parent } = e
      console.log('trees3d', e.node.trees)
    })

    return {
      nodes
    }
  }
})
</script>

<style lang="postcss" scoped>
.trees-3d-main {
  @apply w-full h-full;
}
</style>
