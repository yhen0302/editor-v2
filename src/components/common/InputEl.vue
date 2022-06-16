<template>
  <div class="input-el-wrapper box-border flex items-center">
    <slot name="prefix"></slot>
    <input class="inp text-12" :type="type" :max="max" :min="min" v-model="valueComputed" />
    <slot name="suffix"></slot>
    <div class="arrow-box flex flex-col justify-between" v-show="type === 'number' && numberIcon">
      <img class="arrow" src="@/assets/images/editor_add_btn_dark.png" @click="value < max && valueComputed++" />
      <img class="arrow" src="@/assets/images/editor_minus_btn_dark.png" @click="value > min && valueComputed--" />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'InputEl',
  props: {
    value: { default: '' },
    type: { type: String, default: '' },
    numberIcon: { type: Boolean, default: true },
    max: { type: Number, default: Infinity },
    min: { type: Number, default: -Infinity }
  },
  setup(props, context) {
    const valueComputed = computed({
      get() {
        return toType(props.type, props.value)
      },
      set(val) {
        val <= props.max && val >= props.min && context.emit('update:value', toType(props.type, val))
      }
    })

    function toType(type, value) {
      switch (type) {
        case '':
          return value.toString()
        case 'number':
          return Number(Number(value).toFixed(0))
        case 'angle':
          return Number(value) + '°'
      }
    }

    return { valueComputed }
  }
}
</script>

<style scoped>
.input-el-wrapper {
  background: #31333d;
  border-radius: 2px;
  padding: 0 8px 0 10px;
}

.inp {
  display: inline-block;
  width: 100%;
  background: inherit;
  color: #f2f2f2;
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
  opacity: 0.5;
}
</style>
