<template>
  <div class="setting-slide" v-if="setting.type == 'slide_input'">
    <slider-el class="slider-set" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value"></slider-el>
    <input-el class="input-set" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value" type="number">
      <template #suffix>
        <span class="percent">%</span>
      </template>
    </input-el>
  </div>

  <div class="setting-slide" v-if="setting.type == 'slide_input_three'">
    <span class="slider-head">{{ setting.name }}</span>
    <slider-el class="slider-set-three" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value"></slider-el>
    <input-el class="input-set" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value" type="number">
      <template #suffix>
        <span class="percent">°</span>
      </template>
    </input-el>
  </div>

  <div class="setting-input" v-else-if="setting.type == 'three_input'">
    <input-el class="input-three" v-model:value="setting.value" type="number">
      <template #prefix>
        <span class="input-text">{{ setting.name }}</span>
      </template>
    </input-el>
  </div>

  <div class="setting-input" v-else-if="setting.type == 'two_input'">
    <input-el class="input-three" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value" type="number">
      <template #prefix>
        <span class="input-text">{{ setting.name }}</span>
      </template>
    </input-el>
  </div>

  <div class="setting-input" v-else-if="setting.type == 'input'">
    <input-el :class="setting.typeText == '' ? 'setting-input-line' : 'input-three'" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value" :type="setting.typeText"> </input-el>
  </div>

  <div class="setting-font" v-else-if="setting.type == 'fontStyle'">
    <div class="setting-fontFamily">
      <select-el v-model:value="setting.value.fontFamily.value" :list="setting.value.fontFamily.list"></select-el>
    </div>
    <div class="setting-fontColor">
      <color-picker-el v-model:value="setting.value.color.value"></color-picker-el>
    </div>
    <div class="setting-fontSize">
      <input-el class="fontSizeInput" :min="setting.value.fontSize.scope[0]" :max="setting.value.fontSize.scope[1]" v-model:value="setting.value.fontSize.value" type="number">
        <template #prefix>
          <span class="input-text">{{ setting.value.fontSize.name }}</span>
        </template>
      </input-el>
    </div>
    <div class="setting-fontWeight">
      <select-el v-model:value="setting.value.fontWeight.value" :list="setting.value.fontWeight.list"></select-el>
    </div>
  </div>

  <div v-else-if="setting.type == 'fontAlign'">
    <CheckBoxEl class="setting-Align" v-model="setting.value.textAlign.value" :list="setting.value.textAlign.list" :radio="true">
      <template v-slot:default="{ item }">
        <img class="alignImg" :src="item.label" />
      </template>
    </CheckBoxEl>
    <CheckBoxEl class="setting-Align" v-model="setting.value.lineAlign.value" :list="setting.value.lineAlign.list" :radio="true">
      <template v-slot:default="{ item }">
        <img class="alignImg" :src="item.label" />
      </template>
    </CheckBoxEl>
  </div>

  <div v-else-if="setting.type == 'colorOpacity'" class="setting-colorOpacity">
    <color-picker-el v-model:value="setting.value.color.value"></color-picker-el>
    <slider-el class="slider-set-1" :min="setting.value.opacity.scope[0]" :max="setting.value.opacity.scope[1]" v-model:value="setting.value.opacity.value"></slider-el>
    <input-el class="input-set" :min="setting.value.opacity.scope[0]" :max="setting.value.opacity.scope[1]" v-model:value="setting.value.opacity.value" type="number">
      <template #suffix>
        <span class="percent">%</span>
      </template>
    </input-el>
    <UploadEl @update="upFun" class="setting-upload">
      <template #upload-content v-if="setting.value.loadPicture.value != ''">
        <img :src="setting.value.loadPicture.value" alt="" class="uploadImg" />
      </template>
    </UploadEl>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import SliderEl from '@/components/common/SliderEl.vue'
import InputEl from '@/components/common/InputEl.vue'
import ColorPickerEl from '@/components/common/ColorPickerEl.vue'
import SelectEl from '@/components/common/SelectEl.vue'
import CheckBoxEl from '@/components/common/CheckBoxEl.vue'
import UploadEl from '@/components/common/UploadEl.vue'

const upFun = (file) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.value.value.loadPicture.value = URL.createObjectURL(file[0])
}

const props = defineProps({
  value: Object
})
const setting = ref(props.value)
</script>

<style lang="postcss" scoped>
.setting-item {
  @apply flex flex-col h-auto;
}
.setting:last-child {
  margin-bottom: 12px;
}
.setting-slide {
  display: flex;
  margin-top: 12px;
}
.slider-set {
  width: 108px;
}
.slider-set-three {
  width: 96px;
}
.input-set {
  width: 62px;
  margin-left: 10px;
}
.percent {
  color: #6e6e6e;
  font-size: 12px;
}
.setting-input {
  margin-top: 12px;
  margin-right: 10px;
}
.setting-input-line {
  margin-top: 12px;
  width: 181px;
  height: 32px;
}
.right-setting {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.input-three {
  width: 85px;
  height: 32px;
}
.input-text {
  margin-right: 6px;
  color: #6e6e6e;
  font-size: 12px;
}
.setting-font {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.setting-fontFamily {
  margin-top: 12px;
  color: #fff;
  width: 181px;
}
.setting-fontColor {
  margin-top: 12px;
}
.setting-fontSize {
  margin-top: 12px;
  margin-left: 5px;
}
.fontSizeInput {
  width: 70px;
  height: 32px;
}
.setting-fontWeight {
  margin-left: 5px;
  margin-top: 12px;
  color: #fff;
  width: 69px;
}
.setting-Align {
  width: 181px;
  margin-top: 12px;
}
.alignImg {
  margin-top: 6px;
  margin-left: 21px;
}
.setting-colorOpacity {
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
}
.slider-set-1 {
  width: 76px;
}
.setting-upload {
  width: 180px !important;
  height: 90px !important;
  margin-top: 12px;
}
.uploadImg {
  width: 100%;
  height: 100%;
}
.slider-head {
  margin-top: 7px;
  margin-right: 5px;
}
</style>
