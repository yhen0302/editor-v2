<template>
  <router-view />
  <context-menu></context-menu>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f2f2f2;
}
::-webkit-scrollbar {
  display: none;
}
</style>
<script lang="ts">
import ContextMenu from '@/components/2d/ContextMenu.vue'

export default {
  components: {  ContextMenu },
}
</script>
