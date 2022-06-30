<template>
  <div class="trees-2d-main" >
    <LayerList2d></LayerList2d>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LayerList2d from '@/components/2d/LayerList2d.vue'

export default defineComponent({
  name: 'Trees2D',
  components: { LayerList2d },
  setup() {
    //
  }
})
</script>

<style lang="postcss" scoped>
.trees-2d-main{
  @apply h-full;
  overflow-y: auto;
}
</style>
