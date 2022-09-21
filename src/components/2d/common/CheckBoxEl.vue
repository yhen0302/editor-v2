<template>
  <div class="check-box-el box-border w-full">
    <ul class="check-content-list flex w-full h-full">
      <li class="check-item flex-1 h-full" :class="{ checked: item.isChecked, disable: item.disable }" @click="itemClick(item)" v-for="item in valueRef" :key="item.value">
        <slot :item="item">
          <span class="check-item-content">{{ item.label }}</span>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { ref, watch, toRaw, PropType } from 'vue'

class PropsDataItem {
  label
  value
}

export default {
  name: 'CheckBoxEl',
  props: {
    modelValue: { default: () => [], type: Array },
    list: { type: Array as PropType<PropsDataItem[]>, default: () => [] },
    radio: Boolean
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const valueRef: any = ref([])

    initValue()

    function initValue() {
      for (const item of props.list) {
        valueRef.value.push({
          isChecked: props.modelValue.includes(item.value),
          label: item.label,
          value: item.value,
          disable: (item as any).disable
        })
      }
    }

    watch(
      () => valueRef.value,
      (newVal, oldVal) => {
        const values = toRaw(newVal),
          newValList: any = []
        for (const item of values) {
          item.isChecked ? newValList.push(item.value) : null
        }
        context.emit('update:modelValue', newValList)
      },
      { deep: true }
    )

    function itemClick(item) {
      if (item.disable) return
      if (props.radio) {
        valueRef.value.forEach((item) => (item.isChecked = false))
        item.isChecked = true
      } else {
        item.isChecked = !item.isChecked
      }
    }

    return { valueRef, itemClick }
  }
}
</script>

<style scoped>
.check-box-el {
  height: 32px;
  padding: 2px;
  background: #31333d;
}

.check-content-list {
  gap: 2px;
}

.check-item {
  border-radius: 2px;
}

.check-item.checked {
  background: #464858;
}
.disable {
  opacity: 0.2;
}
</style>
