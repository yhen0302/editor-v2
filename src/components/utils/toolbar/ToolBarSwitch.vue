<template>
  <div class="toolbar-switch" :key="icon.type">
    <div class="icon">
      <img :src="props.icon" />
    </div>

    <div class="title">
      <p>{{ props.name }}</p>
      <p>{{ props.type }}</p>
    </div>

    <div class="switch">
      <SwitchEl :value="props.val" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SwitchEl from '@/components/utils/common/SwitchEl.vue'

export default defineComponent({
  name: 'ToolBarSwitch',
  components: { SwitchEl },
  props: {
    type: { default: '', type: String },
    icon: { default: '', type: String },
    name: { default: '', type: String },
    val: { default: false, type: Boolean }
  },
  setup(props: any) {
    return { props }
  }
})
</script>

<style lang="postcss" scoped>
.toolbar-switch {
  background: #31333d;
  border-radius: 4px;
  width: 240px;
  height: 55px;
  margin: 16px 16px;
  @apply flex flex-row items-center relative;
}
.toolbar-switch:first-child {
  margin-top: 24px;
}
.icon {
  width: 24px;
  height: 24px;
  @apply m-8;
}
.icon img {
  width: 24px;
  height: 24px;
}
.title {
  @apply flex flex-col items-start;
}
.title p:first-child {
  @apply text-gray-light text-14;
}
.title p:last-child {
  color: #757a87;
  @apply text-12;
}
.switch {
  @apply absolute right-16 flex items-center;
}
</style>
