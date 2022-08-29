<template>
  <div class="animation-forms-3d">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>
    <LineEl :color="'#363741'" />
    <Universal :value="formSettings"></Universal>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onUnmounted, onMounted } from 'vue'
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
    name: '是否播放',
    content: [
      {
        value: true,
        type: 'switch'
      }
    ]
  },
  {
    name: '循环次数',
    content: [
      {
        type: 'labelList',
        value: '2201',
        list: [
          { label: '循环一次', value: '2200' },
          { label: '无限循环', value: '2201' },
          { label: '前后交替', value: '2202' }
        ]
      }
    ]
  },
  {
    name: '播放速度',
    content: [
      {
        value: 1,
        type: 'input',
        typeText: 'number',
        scope: [0, Infinity]
      }
    ]
  }
])

onMounted(() => {
  const options = props.node.name.options
  formSettings.value.forEach((item) => {
    if (item.name == '是否播放') {
      item.content[0].value = !options.paused
    } else if (item.name == '循环次数') {
      item.content[0].value = options.loop.toString()
    } else if (item.name == '播放速度') {
      item.content[0].value = options.timeScale
    }
  })
})

watch(
  () => formSettings,
  (v1) => {
    const uuid = props.node.name.uuid
    var paused, loop, timeScale
    v1.value.forEach((item) => {
      if (item.name == '是否播放') {
        paused = !item.content[0].value
      } else if (item.name == '循环次数') {
        loop = parseInt(item.content[0].value)
      } else if (item.name == '播放速度') {
        timeScale = item.content[0].value
      }
    })

    store.state.threeDimensionContainer.mixerActions.forEach((item) => {
      let name = item._mixer.name + item._mixer._root.uuid
      if (uuid == name) {
        item.paused = paused
        item.loop = loop
        item.timeScale = timeScale
        if (loop != 2200) {
          item.enabled = true
        } else {
          item.time = 0
        }
      }
    })

    store.state.selectedSceneTreeNode.trees.threeDimension.forEach((item) => {
      if (item.uuid == 'MixerActionsUuid') {
        item.children.forEach((dev) => {
          if (dev.uuid == uuid) {
            dev.options.paused = paused
            dev.options.loop = loop
            dev.options.timeScale = timeScale
          }
        })
      }
    })
  },
  {
    deep: true
  }
)
</script>

<style lang="postcss" scoped>
.animation-forms-3d {
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
