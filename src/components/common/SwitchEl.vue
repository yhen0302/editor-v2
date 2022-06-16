<template>
  <button
    class="switch-el relative"
    :class="{ active: valueComputed }"
    @click="valueComputed = !valueComputed"
  ></button>
</template>

<script lang="ts">
import { computed, SetupContext } from 'vue'

export default {
  name: 'SwitchEl',
  props: {
    value: { type: Boolean, default: false }
  },
  emits: ['update:value'],
  setup(props: any, context: SetupContext) {
    const valueComputed = computed({
      get() {
        return props.value
      },
      set(newVal) {
        context.emit('update:value', newVal)
      }
    })

    return { valueComputed }
  }
}
</script>

<style scoped>
.switch-el {
  width: 32px;
  height: 16px;
  line-height: 1;
  vertical-align: bottom;
  border-radius: 8px;
  background: #464858;
  transition: background-color 0.15s ease-in-out;
}

.switch-el::before {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(2px);
  transition: transform 0.2s ease-in-out;
}

.switch-el.active::before {
  transform: translateX(18px);
}

.switch-el.active {
  background: #6582fe;
}
</style>
