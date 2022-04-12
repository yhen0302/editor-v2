<template>
  <button class="switch-el relative" :class="{active:realValue}" @click="realValue=!realValue"></button>
</template>

<script lang="ts">
import {Ref, ref} from "@vue/reactivity";


export default {
  name: "SwitchEl",
  props: {
    value: {type: Boolean, default: false}
  },
  setup(props, context) {
    const realValue: Ref<boolean> = ref<boolean>(props.value)
    return {realValue}
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
  background: #6582FE;
}

.switch-el::before {
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #FFF;
  transform: translateX(2px);
  transition: transform .25s ease-in-out;
}

.switch-el.active::before {
  transform: translateX(18px);
}

</style>