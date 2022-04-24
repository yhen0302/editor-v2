<template>
  <div class="check-box-el box-border">
    <ul class="check-content-list flex h-full">
      <li class="check-item h-full" :class="{checked:item.isChecked}" @click="item.isChecked=!item.isChecked"
          v-for="item in valueRef" :key="item.value">
        <slot :item="item">
          <span class="check-item-content">{{ item.label }}</span>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {ref, watch, toRaw, PropType} from "vue";

class PropsDataItem{
  label
  value
}

export default {
  name: "CheckBoxEl",
  props: {modelValue: {default: () => [], type: Array}, list: {type:Array as PropType<PropsDataItem[]>, default: () => []}},
  emits: ['update:modelValue'],
  setup(props, context) {
    let valueRef = ref([])

    initValue()

    function initValue() {
      for (let item of props.list) {
        valueRef.value.push({isChecked: props.modelValue.includes(item.value), label: item.label, value: item.value})
      }
    }

    watch(() => valueRef.value, (newVal, oldVal) => {
      let values = toRaw(newVal),
          newValList = []
      for (let item of values) {
        item.isChecked ? newValList.push(item.value) : null
      }
      context.emit('update:modelValue', newValList)
    }, {deep: true})

    return {valueRef}
  }
}
</script>

<style scoped>
.check-box-el {
  height: 32px;
  padding: 2px;
  background: #31333D;
}

.check-content-list {
  gap: 2px;
}

.check-item {
  width: 56px;
  border-radius: 2px;
}

.check-item.checked {
  background: #464858;
}
</style>