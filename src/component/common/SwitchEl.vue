<template>
  <button class="switch-el relative" :class="{active:realValue}" @click="changeValue"></button>
</template>

<script lang="ts">
import {Ref, ref} from "@vue/reactivity";
import {SetupContext} from "vue";

export default {
  name: "SwitchEl",
  props: {
    value: {type: Boolean, default: false}
  },
  emits: ["update:value"],
  setup(props: any, context: SetupContext) {
    const realValue: Ref<boolean> = ref<boolean>(props.value)

    function changeValue() {
      realValue.value = !realValue.value
      context.emit('update:value', realValue.value)
    }

    return {realValue, changeValue}
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
  transition: background-color .15s ease-in-out;
}

.switch-el::before {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #FFF;
  transform: translateX(2px);
  transition: transform .2s ease-in-out;
}

.switch-el.active::before {
  transform: translateX(18px);
}

.switch-el.active {
  background: #6582FE;
}
</style>