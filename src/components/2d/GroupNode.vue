<template>
  <div class="group absolute" v-if='groupNode.show'>
    <element-node  v-for="item in [...groupNode.children].reverse()" :key="item.id" :node="item" ></element-node>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'GroupNode',
  components: { ElementNode:defineAsyncComponent(() => import('@/components/2d/ElementNode.vue')) },
  props: ['groupNode'],
  setup(props) {
    console.log(getCurrentInstance())
    console.log(props.groupNode)
  }
})
</script>

<style scoped></style>
