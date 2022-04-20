<template>
  <div class="select-el relative">
    <div class="selected-box box-border flex justify-between" @click="isOpen=!isOpen">
      <span class="selected-value text-12">{{ refVal }}</span>
      <img class="arrow" src="@/assets/images/editor_back_big_btn_dark.png">
    </div>
    <ul class="select-content-box absolute" v-show="isOpen">
      <li>13</li>
    </ul>
  </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "SelectEl",
  props: ['value', 'data'],
  emits: ['update:value'],
  setup(props, context) {
    // model
    const refVal = ref(props.value)
    watch(() => refVal.value, newVal => context.emit('update:value', newVal))

    // pick
    const isOpen = ref(false)


    return {refVal, isOpen}
  }
}
</script>

<style scoped>
.select-el {
  background: #31333D;
  border-radius: 2px;
}

.selected-box {
  padding: 8px;
  height: 32px;
}
.select-content-box{
  width: 100% ;
  background: #31333D;
}
</style>