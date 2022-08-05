<template>
  <div class="multi-color-picker flex justify-between">
    <color-picker-gradient-el
      :value="item"
      v-for="(item, index) in colors"
      :key="index"
      @update:value="updateFn($event, index)"
    ></color-picker-gradient-el>
  </div>
</template>

<script>
import { computed, } from 'vue'
import ColorPickerGradientEl from './ColorPickerGradientEl'

export default {
  name: 'MultiGradientColorPicker',
  components: { ColorPickerGradientEl },
  props: { value: { type: Array, default: () => [] } },
  emits: ['update'],
  setup(props, context) {
    const colors = computed({
      get() {
        return props.value
      }
    })
    function updateFn(value, index) {
      context.emit('update', { value, index })
    }

    return { updateFn, colors }
  }
}
</script>

<style scoped>
.multi-color-picker {
  padding: 2px 1px;
  background: #31333d;
}
.multi-color-picker :deep(.color-selector) {
  width: 38px;
  padding: 0;
}
</style>
