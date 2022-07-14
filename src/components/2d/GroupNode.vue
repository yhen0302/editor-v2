<template>
  <div class="group absolute">
    <element-node
      v-for="child in [...groupNode.children].reverse()"
      :key="child.id"
      :node="child"
    ></element-node>
  </div>
</template>

<script lang='ts'>
import ElementNode from '@/components/2d/ElementNode.vue'
export default {
  name: 'GroupNode',
  components: { ElementNode },
  props:['groupNode']
}
</script>

<style scoped>

</style>