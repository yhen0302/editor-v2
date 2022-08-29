<template>
  <div class="check-el flex items-center cursor-pointer" @click="computedVal=!computedVal">
    <button class="check-btn" :class="{active:value}">
      <img src="~@/assets/images/editor_selected_btn_btn.png" v-show="value">
    </button>
    <span class="text-12">{{ label }}</span>

  </div>
</template>

<script>
export default {
  name: "CheckEl",
  props: {value: {default: false, type: Boolean}, label: String},
  emits: ['update:value'],
  computed: {
    computedVal: {
      set(newVal) {
        this.$emit('update:value', newVal)
      },
      get() {
        return this.value
      }
    }
  }
}
</script>

<style scoped>
.check-btn {
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 2px;
  background: #464858;
}

.check-btn.active {
  background: #6582FE;
}
</style>