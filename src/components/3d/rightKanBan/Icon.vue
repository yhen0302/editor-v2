<template>
  <div class="icon-forms-3d">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>
    <LineEl :color="'#363741'" />
    <div class="content ambientLight" v-if="store.state.addElementType.mesh">
      <div v-for="(item, key) in formSettings" :key="item" class="content-item">
        <div class="setting-item">
          <BaseTitle :value="key" :height="56" :width="72" :marginRight="8" />
        </div>

        <div class="right-setting">
          <div v-for="setting in item" :key="setting" class="setting">
            <div class="setting-slide" v-if="setting.type == 'slide_input'">
              <slider-el class="slider-set" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value"></slider-el>
              <input-el class="input-set" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value" type="number">
                <template #suffix>
                  <span class="percent">%</span>
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

            <div class="setting-input" v-else-if="setting.type == 'input'">
              <input-el class="input-three" :min="setting.scope[0]" :max="setting.scope[1]" v-model:value="setting.value" type="number"> </input-el>
            </div>
          </div>
        </div>
        <LineEl class="division" :color="'#363741'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import store from '../../../store'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import LineEl from '@/components/utils/common/LineEl.vue'
import SliderEl from '@/components/common/SliderEl.vue'
import InputEl from '@/components/common/InputEl.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'

const headerItems = ref([
  {
    active: true,
    name: '基础设置',
    type: 'basicSetting'
  }
])
const formSettings = ref({
  position: [
    {
      name: 'X',
      value: 0,
      type: 'three_input'
    },
    {
      name: 'Y',
      value: 0,
      type: 'three_input'
    },
    {
      name: 'Z',
      value: 0,
      type: 'three_input'
    }
  ],
  scale: [
    {
      value: 0,
      type: 'input',
      scope: [0, Infinity]
    }
  ],
  opacity: [
    {
      value: 100,
      scope: [0, 100],
      type: 'slide_input'
    }
  ]
})

watch(
  () => store.state.addElementType.moving,
  (v1, v2) => {
    if (store.state.addElementType.mesh) {
      formSettings.value.scale[0].value = store.state.addElementType.mesh.scale.x
      formSettings.value.opacity[0].value = store.state.addElementType.mesh.material.opacity * 100
      formSettings.value.position[0].value = parseInt(store.state.addElementType.mesh.position.x)
      formSettings.value.position[1].value = parseInt(store.state.addElementType.mesh.position.y)
      formSettings.value.position[2].value = parseInt(store.state.addElementType.mesh.position.z)
    }
  }
)

watch(
  () => formSettings,
  (v1, v2) => {
    store.state.addElementType.mesh.position.x = formSettings.value.position[0].value
    store.state.addElementType.mesh.position.y = formSettings.value.position[1].value
    store.state.addElementType.mesh.position.z = formSettings.value.position[2].value
    store.state.addElementType.mesh.scale.set(formSettings.value.scale[0].value, formSettings.value.scale[0].value, formSettings.value.scale[0].value)
    store.state.addElementType.mesh.material.opacity = formSettings.value.opacity[0].value / 100
  },
  {
    deep: true
  }
)
</script>

<style lang="postcss" scoped>
.icon-forms-3d {
  @apply w-full h-full;
}
.header {
  height: 64px;
  @apply w-full flex;
}
.header-item {
  width: 80px;
  height: 64px;
}
.content {
  height: calc(100% - 64px - 1px - 48px - 1px);
  @apply w-full overflow-scroll;
}
.content-title {
  height: @apply w-full flex;
}
.content-item {
  flex-wrap: nowrap;
  @apply w-full h-auto flex items-start relative;
}
.setting-item {
  @apply flex flex-col h-auto;
}
.setting:last-child {
  margin-bottom: 12px;
}
.division {
  bottom: 0;
  @apply absolute;
}
.setting-slide {
  display: flex;
  margin-top: 12px;
}
.slider-set {
  width: 108px;
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
</style>
