<template>
  <div class="text-forms-3d">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>
    <LineEl :color="'#363741'" />
    <!-- <Universal :value="formSettings" v-if="store.state.addElementType.mesh"></Universal> -->
    <Universal :value="formSettings"></Universal>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
import store from '../../../store'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import Universal from './Universal.vue'
import * as Fly from '../../../core/utils/flyLine'

const Bol3D = window.Bol3D
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
    name: 'source',
    content: [
      { type: 'three_input', name: 'X', value: 0 },
      { type: 'three_input', name: 'Y', value: 0 },
      { type: 'three_input', name: 'Z', value: 0 }
    ]
  },
  {
    name: 'target',
    content: [
      { type: 'three_input', name: 'X', value: 0 },
      { type: 'three_input', name: 'Y', value: 0 },
      { type: 'three_input', name: 'Z', value: 0 }
    ]
  },
  {
    name: 'color',
    content: [
      {
        value: '#fff000',
        type: 'color'
      }
    ]
  },
  {
    name: 'range',
    content: [
      {
        value: 100,
        type: 'input',
        typeText: 'number',
        scope: [0, Infinity]
      }
    ]
  },
  {
    name: 'height',
    content: [
      {
        value: 100,
        type: 'input',
        typeText: 'number',
        scope: [0, Infinity]
      }
    ]
  },
  {
    name: 'speed',
    content: [
      {
        value: 1,
        type: 'input',
        typeText: 'number',
        scope: [0, Infinity]
      }
    ]
  },
  {
    name: 'size',
    content: [
      {
        value: 10,
        type: 'input',
        typeText: 'number',
        scope: [0, Infinity]
      }
    ]
  }
])

watch(
  () => formSettings,
  (v1) => {
    let source, target, height, speed, color, range, size
    formSettings.value.forEach((item) => {
      if (item.name == 'source') {
        source = new Bol3D.Vector3(item.content[0].value, item.content[1].value, item.content[2].value)
      } else if (item.name == 'target') {
        target = new Bol3D.Vector3(item.content[0].value, item.content[1].value, item.content[2].value)
      } else if (item.name == 'color') {
        color = item.content[0].value
      } else if (item.name == 'range') {
        range = item.content[0].value
      } else if (item.name == 'height') {
        height = item.content[0].value
      } else if (item.name == 'speed') {
        speed = item.content[0].value
      } else if (item.name == 'size') {
        size = item.content[0].value
      }
    })
    Fly.reviseFlyLine({
      source,
      target,
      height,
      speed,
      size,
      color,
      range
    })
  },
  {
    deep: true
  }
)

watch(
  () => store.state.addElementType.moving,
  (v1, v2) => {
    if (store.state.addElementType.mesh && store.state.addElementType.basePoint) {
      store.state.addElementType.mesh.userData.source = store.state.addElementType.basePoint.position.clone()
      store.state.addElementType.mesh.userData.target = store.state.addElementType.movePoint.position.clone()
      let { source, target, height, speed, color, range, size } = store.state.addElementType.mesh.userData
      formSettings.value.forEach((item) => {
        if (item.name == 'source') {
          item.content[0].value = parseInt(source.x)
          item.content[1].value = parseInt(source.y)
          item.content[2].value = parseInt(source.z)
        } else if (item.name == 'target') {
          item.content[0].value = parseInt(target.x)
          item.content[1].value = parseInt(target.y)
          item.content[2].value = parseInt(target.z)
        } else if (item.name == 'color') {
          item.content[0].value = color
        } else if (item.name == 'range') {
          item.content[0].value = range
        } else if (item.name == 'height') {
          item.content[0].value = height
        } else if (item.name == 'speed') {
          item.content[0].value = speed
        } else if (item.name == 'size') {
          item.content[0].value = size
        }
      })
    }
  },
  { deep: true }
)

if (props.node.clickObj) {
  store.state.addElementType.moving = !store.state.addElementType.moving
}
</script>

<style lang="postcss" scoped>
.text-forms-3d {
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
