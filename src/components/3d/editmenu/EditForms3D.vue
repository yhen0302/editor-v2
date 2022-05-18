<template>
  <div class="edit-forms-3d-main">
    <component :is="type" v-if="type != ''" :node="node" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import CameraForms3D from './editForms/CameraForms3D.vue'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'EditForms3D',
  components: {
    CameraForms3D
  },
  setup() {
    const store = useStore()
    const type = ref('')
    const node = ref([])

    EventsBus.on('treeSelected', (e: any) => {
      console.log('e.node.type', e.node)

      // 展示编辑表单
      switch (e.node.type) {
        case 'PerspectiveCamera':
          type.value = 'CameraForms3D'
          node.value = e.node
          break
      }
    })

    return {
      store,
      type,
      node
    }
  }
})
</script>

<style lang="postcss" scoped>
.edit-forms-3d-main {
  @apply w-full h-full;
}
</style>
