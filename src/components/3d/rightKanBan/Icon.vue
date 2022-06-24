<template>
  <div class="icon-forms-3d">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>
    <LineEl :color="'#363741'" />
    <Universal :value="formSettings" v-if="store.state.addElementType.mesh"></Universal>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
import store from '../../../store'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import LineEl from '@/components/utils/common/LineEl.vue'
import Universal from './Universal.vue'

const props = defineProps({
  node: Object
})

const headerItems = ref([
  {
    active: true,
    name: '基础设置',
    type: 'basicSetting'
  }
])
const formSettings = ref([
  {
    name: 'position',
    content: [
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
    ]
  },
  {
    name: 'scale',
    content: [
      {
        value: 0,
        type: 'input',
        typeText: 'number',
        scope: [0, Infinity]
      }
    ]
  },
  {
    name: 'opacity',
    content: [
      {
        value: 100,
        scope: [0, 100],
        type: 'slide_input'
      }
    ]
  }
])

if (props.node.clickObj) {
  formSettings.value[1].content[0].value = store.state.addElementType.mesh.scale.x
  formSettings.value[2].content[0].value = store.state.addElementType.mesh.material.opacity * 100
  formSettings.value[0].content[0].value = parseInt(store.state.addElementType.mesh.position.x)
  formSettings.value[0].content[1].value = parseInt(store.state.addElementType.mesh.position.y)
  formSettings.value[0].content[2].value = parseInt(store.state.addElementType.mesh.position.z)
}

watch(
  () => store.state.addElementType.moving,
  (v1, v2) => {
    if (store.state.addElementType.mesh) {
      formSettings.value[1].content[0].value = store.state.addElementType.mesh.scale.x
      formSettings.value[2].content[0].value = store.state.addElementType.mesh.material.opacity * 100
      formSettings.value[0].content[0].value = parseInt(store.state.addElementType.mesh.position.x)
      formSettings.value[0].content[1].value = parseInt(store.state.addElementType.mesh.position.y)
      formSettings.value[0].content[2].value = parseInt(store.state.addElementType.mesh.position.z)
    }
  }
)

watch(
  () => formSettings,
  (v1, v2) => {
    store.state.addElementType.mesh.position.x = formSettings.value[0].content[0].value
    store.state.addElementType.mesh.position.y = formSettings.value[0].content[1].value
    store.state.addElementType.mesh.position.z = formSettings.value[0].content[2].value
    store.state.addElementType.mesh.scale.set(formSettings.value[1].content[0].value, formSettings.value[1].content[0].value, formSettings.value[1].content[0].value)
    store.state.addElementType.mesh.material.opacity = formSettings.value[2].content[0].value / 100
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
</style>
