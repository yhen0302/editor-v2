<template>
  <button class='radio-el' :class='{active:realValue}' @click='changeValue'></button>
</template>

<script lang='ts'>
import { computed, SetupContext } from 'vue'
import { ref, Ref } from '@vue/reactivity'

export default {
  name: 'RadioEl',
  props: {
    value: { type: Boolean, default: false }
  },
  emits: ['update:value'],
  setup(props: any, context: SetupContext) {
    const realValue: Ref<boolean> = computed<boolean>({
      get() {
        return props.value
      }, set(newVal) {
        context.emit('update:value', realValue.value)
      }
    })

    function changeValue() {
      realValue.value = !realValue.value
    }

    return { realValue, changeValue }
  }
}
</script>

<style scoped>
.radio-el {
  position: relative;
  width: 12px;
  height: 12px;
  background: #464858;
  border-radius: 50%;
}

.radio-el::after {
  display: block;
  margin: 0 auto;
  content: "";
  width: 8px;
  height: 8px;
  background: #464858;
  box-shadow: 0 0 1px 1px #464858;
  border-radius: 50%;
  transition: background-color .2s ease-in-out, box-shadow .2s ease-in-out;
}

.radio-el.active::after {
  background: #7AA6FF;
  box-shadow: 0 0 1px 1px rgba(122, 166, 255, .5);

}

</style>