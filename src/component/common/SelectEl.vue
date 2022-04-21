<template>
  <div class="select-el relative">
    <div class="selected-box box-border flex justify-between" @click.stop="isOpen=!isOpen">
      <span class="selected-value text-12">{{ refLabel }}</span>
      <img class="arrow" src="@/assets/images/editor_back_big_btn_dark.png">
    </div>
    <ul class="select-content-box absolute text-12 text-left z-20" :style="{height:isOpen?height+'px':0}">
      <li class="select-item" v-for="(item,index) in list" :key="item" @click="selectClick(item,index)">{{
          item.label
        }}
      </li>
    </ul>
  </div>
</template>

<script>
import {ref, watch} from "vue";

export default {
  name: "SelectEl",
  props: {
    value: {type: String, default: ''},
    list: {type: Array, default: () => []},
    height: {type: Number, default: 128}
  },
  emits: ['update:value'],
  setup(props, context) {
    // model
    const refVal = ref(props.value)
    const refLabel = ref(props.list.find(item => item.value === props.value).label)
    watch(() => refVal.value, newVal => context.emit('update:value', newVal))
    // pick
    const isOpen = ref(false)


    function selectClick(item, index) {
      refVal.value = item.value
      refLabel.value = item.label
    }

    document.addEventListener('click', () => isOpen.value ? isOpen.value = false : null)
    return {refVal, isOpen, selectClick, refLabel}
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

.select-content-box {
  overflow-y: scroll;
  margin-top: 4px;
  width: 100%;
  background: #31333D;
  transition: .2s height ease-out;
}

.select-item {
  padding: 8px;
}

.select-item:hover {
  background: #464858;
}
</style>