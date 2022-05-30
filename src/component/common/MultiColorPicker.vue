<template>
  <div class="multi-color-picker flex justify-between">
    <color-picker-el
      :value="value[index]"
      v-for="(item, index) in colors"
      :key="index"
      @update:value="updateFn($event, index)"
    ></color-picker-el>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import ColorPickerEl from '@/component/common/ColorPickerEl'

export default {
  name: 'MultiColorPicker',
  components: { ColorPickerEl },
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
.multi-color-picker /deep/ .color-selector {
  width: 38px;
  padding: 0;
}
</style>
