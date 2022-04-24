<template>
  <div class="multi-color-picker flex justify-between">
    <color-picker :value="value[index]" v-for="(item,index) in value" :key="index"
                  @update:value="updateFn($event,index)"></color-picker>
  </div>
</template>

<script>
import {ref, watch,} from "vue";
import ColorPicker from "@/component/common/ColorPickerEl";

export default {
  name: "MultiColorPicker",
  components: {ColorPicker},
  props: {value: {type: Array, default: () => []}},
  emits: ['update'],
  setup(props, context) {
    function updateFn(value, index) {
      console.log('emit')
      context.emit('update', {value, index})
    }

    return {updateFn}
  }
}
</script>

<style scoped>
.multi-color-picker{
  padding: 1px 2px;
  background: #31333D;
}
.multi-color-picker /deep/ .color-selector{
  width: 38px;
  padding: 0;
}
</style>