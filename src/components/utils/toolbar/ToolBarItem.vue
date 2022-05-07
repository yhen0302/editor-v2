<template>
  <div class="toolbar-item" :key="icon.type">
    <img :src="props.icon" />
    <p>{{ props.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToolBarItem',
  components: {},
  props: {
    type: { default: '', type: String },
    icon: { default: '', type: String },
    name: { default: '', type: String }
  },
  setup(props: any) {
    return { props }
  }
})
</script>

<style lang="postcss" scoped>
.toolbar-item {
  width: 112px;
  height: 112px;
  border-radius: 4px;
  background-color: #31333d;
  @apply flex items-center flex-col justify-between select-none;
  margin-top: 16px;
  margin-bottom: 0;
  padding-top: 8px;
  padding-bottom: 16px;
}
.toolbar-item:nth-child(odd) {
  margin-left: 16px;
  margin-right: 8px;
}
.toolbar-item:nth-child(even) {
  margin-left: 8px;
  margin-right: 16px;
}
.toolbar-item:hover {
  outline: 2px #6582fe solid;
}
.toolbar-item img {
  width: 64px;
  height: 64px;
}
.toolbar-item p {
  @apply text-gray-light text-12;
}
</style>
