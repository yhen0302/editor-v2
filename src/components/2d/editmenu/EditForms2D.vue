<template>
    <element-edit-configurator></element-edit-configurator>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ElementEditConfigurator from '@/components/2d/ElementEditConfigurator.vue'

export default defineComponent({
  name: 'EditForms2D',
  components: { ElementEditConfigurator },
  setup() {
    //
  }
})
</script>

<style lang="postcss" scoped>
.edit-forms-2d-main {
  @apply w-full h-full;
}
</style>
