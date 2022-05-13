<template>
  <div class="scene-tree-main">
    <div class="node-item" v-for="item in nodes" :key="item">
      <SceneTreeNode :node="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import SceneTreeNode from './SceneTreeNode.vue'

export default defineComponent({
  name: 'SceneTree',
  components: {
    SceneTreeNode
  },
  setup() {
    const nodes = ref([
      {
        name: '场景1',
        type: 'scene',
        spread: true,
        children: [
          {
            name: '页1',
            type: 'page'
          }
        ]
      },
      {
        name: '场景2',
        type: 'scene',
        spread: false,
        children: [
          {
            name: '页1',
            type: 'page'
          }
        ]
      }
    ])

    return {
      nodes
    }
  }
})
</script>

<style lang="postcss" scoped>
.scene-tree-main {
  @apply w-full h-full flex flex-col;
}
.node-item {
  @apply w-full h-auto;
}
</style>
