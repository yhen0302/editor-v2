<template>
  <div class="edit-forms-nav-item-main" :type="type">
    <div class="title" :class="active ? 'title-active' : ''">
      <p>{{ name }}</p>
    </div>

    <div class="active" v-show="active"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EditFormsNavItem',
  props: ['active', 'name', 'type'],
  components: {},
  setup() {
    return {
      //
    }
  }
})
</script>

<style lang="postcss" scoped>
.edit-forms-nav-item-main {
  @apply w-full h-full flex items-center justify-center relative cursor-pointer;
}
.title {
  width: 64px;
  height: 24px;
}
.title p {
  width: 64px;
  height: 24px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #757a87;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}
.title-active p {
  color: #f2f2f2 !important;
}
.active {
  width: 80px;
  height: 2px;
  background: #6582fe !important;
  border-radius: 2px;
  @apply absolute bottom-0;
}
</style>
