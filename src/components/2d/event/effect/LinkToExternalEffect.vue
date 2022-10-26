<template>
  <div class='link-to-external-effect'>
    <input-el v-model:value='urlEffect' style='height: 100%;' placeholder='http://baidu.com'></input-el>
  </div>
</template>

<script>
import InputEl from '@/components/2d/common/InputEl'
import { computed } from 'vue'

export default {
  name: 'LinkToExternalEffect',
  components: { InputEl },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const urlEffect = computed({
      get() {
        return props.modelValue.url
      }, set(url) {
        emit('update:modelValue', { url })
      }
    })
    return { urlEffect }
  }
}
</script>

<style scoped>
.link-to-external-effect {
  height: 34px;
}
</style>