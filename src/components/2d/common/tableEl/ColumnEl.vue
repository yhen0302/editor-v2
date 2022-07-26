<template>
  <slot name='header'></slot>
  <slot></slot>
</template>

<script lang="jsx">
export default {
  name: "ColumnEl",
  props:['prop','label','width'],
  setup(){
  }
}
</script>

<style scoped>

</style>