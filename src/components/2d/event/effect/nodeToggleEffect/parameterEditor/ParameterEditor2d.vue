<template>
  <div class='parameter-editor-2d'>
    <div class='parameter-box'>
      <h1 class='parameter-title'>基础参数</h1>
      <div class='parameter-list flex flex-wrap'>
        <div class='parameter-item flex items-center'>
          <input-el class='inp-wrap' v-model:value='left'>
            <template #prefix><span class='inp-suffix text-12'>X</span></template>
          </input-el>
        </div>
        <div class='parameter-item flex items-center'>
          <input-el class='inp-wrap' v-model:value='top'>
            <template #prefix><span class='inp-suffix text-12'>Y</span></template>
          </input-el>
        </div>
        <div class='parameter-item flex items-center'>
          <input-el class='inp-wrap' v-model:value='width'>
            <template #prefix><span class='inp-suffix text-12'>W</span></template>
          </input-el>
        </div>
        <div class='parameter-item flex items-center'>
          <input-el class='inp-wrap' v-model:value='height'>
            <template #prefix><span class='inp-suffix text-12'>H</span></template>
          </input-el>
        </div>
        <div class='parameter-item flex items-center'>
          <input-el class='inp-wrap' v-model:value='rotate'>
            <template #prefix><img src='~@/assets/images/editor_angle_icn_dark.png' alt='' /></template>
          </input-el>
        </div>
        <div class='parameter-item flex items-center'>
          <input-el class='inp-wrap' v-model:value='scale'>
            <template #prefix><span class='inp-suffix text-12'>S</span></template>
          </input-el>
        </div>
      </div>
      <line-el color='rgb(54, 55, 65)' style='margin: 10px 0;'></line-el>
    </div>
    <div class='parameter-box show-hide-box'>
      <h1 class='parameter-title'>显示/隐藏</h1>
      <div class='parameter-list flex flex-wrap justify-between'>
        <div class='parameter-item' v-for='item in toggleTypeList' :key='item.value'>
          <span class='toggle-desc'>{{ item.name }}</span>
          <radio-el :value='toggleType===item.value' @update:value='toggleType=item.value'></radio-el>
        </div>
      </div>
    </div>
    <line-el color='rgb(54, 55, 65)' style='margin: 10px 0;'></line-el>
    <div class='footer-box text-12 flex justify-center '>
      <button class='footer-button cancel-button' @click='$emit("update",null)'>删除</button>
      <button class='footer-button confirm-button' @click='confirm'>保存</button>
    </div>
  </div>
</template>

<script>
import LineEl from '@/components/2d/common/LineEl'
import InputEl from '@/components/2d/common/InputEl'
import RadioEl from '@/components/2d/common/RadioEl'
import { findNodeByIdInTree } from '@/share/util/node'
import { reactive, toRaw, toRefs, computed, watch } from 'vue'
import { clone } from '@/share/util/base'

export default {
  name: 'ParameterEditor2d',
  components: { RadioEl, InputEl, LineEl },
  props: ['nodeId', 'nodeTree', 'echo'],
  emits: ['update'],
  setup(props, { emit }) {

    const originNode = computed(() => {
      if(props.echo){
        return clone(toRaw(props.echo))
      }else {
        const data = findNodeByIdInTree(toRaw(props.nodeTree.twoDimension), props.nodeId)
        return { width: data.option.matrixOption.width,
          height: data.option.matrixOption.height,
          left: data.option.matrixOption.left,
          top: data.option.matrixOption.top,
          scale: 1,
          toggleType: null,
          rotate: data.option.matrixOption.rotate,}
      }
    })
    const data = reactive(originNode.value)

    const toggleTypeList = [{ name: '显示', value: 'SHOW' },
      { name: '隐藏', value: 'HIDE' },
      { name: '显隐切换', value: 'TOGGLE' }]

    function confirm() {
      emit('update', toRaw(data))
    }

    return {
      ...toRefs(data),
      toggleTypeList,
      confirm
    }
  }
}
</script>

<style scoped>
.parameter-editor-2d {
  box-sizing: border-box;
  width: 300px;
  padding: 20px 0;
  background: #25262D;
}

.inp-wrap {
  height: 32px;
  width: 80px;
}

.inp-suffix {
  margin-right: 2px;
}

.parameter-title {
  line-height: 1;
  margin-bottom: 6px;
}

.parameter-box {
  padding: 0 10px;
}

.parameter-list {
  gap: 10px;
}

.parameter-item {
  gap: 4px;
}

.show-hide-box .parameter-list {
  font-size: 12px;
}

.toggle-desc {
  margin-right: 4px;
}

.footer-box {
  gap: 30px;
}

.footer-button {
  padding: 8px 28px;
  border-radius: 2px;
}

.footer-button:hover {
  opacity: 0.8;
}

.footer-button:active {
  opacity: 1;
}

.cancel-button {
  background: #31333d;
}

.confirm-button {
  background: #7aa6ff;
}

</style>