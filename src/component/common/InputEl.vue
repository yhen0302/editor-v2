<template>
  <div class="input-el-wrapper box-border flex items-center">
    <slot name="prefix"></slot>
    <input class="inp text-12" :type="type" v-model="valueRef">
    <slot name="suffix"></slot>
    <div class="arrow-box flex flex-col justify-between" v-show="type==='number'&&numberIcon">
      <img class="arrow" src="@/assets/images/editor_add_btn_dark.png" @click="valueRef++">
      <img class="arrow" src="@/assets/images/editor_minus_btn_dark.png" @click="valueRef--">
    </div>
  </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "InputEl",
  props: {value: {default: ''}, type: {type: String, default: ''}, numberIcon: {type: Boolean, default: true}},
  setup(props, context) {
    const valueRef = ref(toType(props.type, props.value))
    watch(() => valueRef.value, (newVal) => context.emit('update:value', toType(props.type, newVal)))

    function toType(type, value) {
      switch (type) {
        case '':
          return value.toString()
        case 'number':
          return Number(value)
        case 'angle':
          return Number(value) + '°'
      }
    }

    return {valueRef}
  }
}
</script>

<style scoped>
.input-el-wrapper {
  background: #31333D;
  border-radius: 2px;
  padding: 0 8px 0 10px;
}

.inp {
  display: inline-block;
  width: 100%;
  background: inherit;
  color: #F2F2F2;
}

.arrow-box {
  gap: 4px;
}

.arrow {
  max-width: none;
  cursor: pointer;
  flex-shrink: 0;
  width: 8px;
  height: 8px;
}

.arrow:hover {
  opacity: .5;
}
</style>