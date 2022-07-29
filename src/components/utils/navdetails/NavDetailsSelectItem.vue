<template>
  <div class="nav-details-select-item" :key="icon.type" :class="selected ? 'selected' : ''">
    <div class="icon">
      <img :src="props.icon" v-show="props.icon !== ''" />
    </div>

    <div class="title">
      <p>{{ props.name }}</p>
      <p>{{ props.type }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavDetailsSelectItem',
  components: {},
  props: {
    type: { default: '', type: String },
    icon: { default: '', type: String },
    name: { default: '', type: String },
    selected: { default: false, type: Boolean }
  },
  setup(props: any) {
    return { props }
  }
})
</script>

<style lang="postcss" scoped>
.nav-details-select-item {
  background: #31333d;
  border-radius: 4px;
  width: 240px;
  height: 55px;
  margin: 16px 16px;
  @apply flex flex-row items-center relative;
}
.nav-details-select-item:first-child {
  margin-top: 24px;
}
.nav-details-select-item:hover {
  outline: 1px rgba(238, 238, 238, 1) solid;
  cursor: pointer;
}
.selected {
  outline: 1px #6582fe solid !important;
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
</style>
