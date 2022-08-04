<template>
  <div class="color-selector box-border relative">
    <div
      class="color-box z-10 relative"
      @click="onClick"
      :style="{ background: colorComputed }"
    ></div>
    <div class="color-box-bg absolute" @click="onClick"></div>
    <input
      class="inp absolute"
      type="color"
      ref="inpEl"
      v-model="colorComputed"
    />
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'

export default {
  name: 'ColorPickerEl',
  props: ['value'],
  emits: ['update:value'],
  setup(props, context) {
    const colorComputed = computed({
      get() {
        return props.value
      },
      set(newVal) {
        context.emit('update:value', newVal)
      }
    })
    const inpEl = ref(null)

    function onClick() {
      inpEl.value.click()
    }

    return { colorComputed, inpEl, onClick }
  }
}
</script>

<style scoped>
.color-selector {
  width: 32px;
  height: 32px;
  padding: 2px;
  background: #31333d;
  border-radius: 2px;
}

.inp {
  pointer-events: none;
  left: 2px;
  top: 2px;
  display: inline-block;
  opacity: 0;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
}

.color-box {
  width: 100%;
  height: 100%;
}

.color-box-bg {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  top: 2px;
  left: 2px;
  z-index: 2;
  background: linear-gradient(
    90deg,
    #fff 0%,
    #fff 50%,
    #e5e5e5 50%,
    #e5e5e5 100%
  )
  left top/10px 5px repeat-x,
  linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left
  5px/10px 5px repeat-x,
  linear-gradient(90deg, #fff 0%, #fff 50%, #e5e5e5 50%, #e5e5e5 100%) left
  10px/10px 5px repeat-x,
  linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left
  15px/10px 5px repeat-x,
  linear-gradient(90deg, #fff 0%, #fff 50%, #e5e5e5 50%, #e5e5e5 100%) left
  20px/10px 5px repeat-x,
  linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left
  25px/10px 5px repeat-x;
}
</style>