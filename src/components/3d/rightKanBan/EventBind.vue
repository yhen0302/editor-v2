<template>
  <div>
    <div class="content-item">
      <div class="setting-item leftHead">触发条件</div>

      <div class="setting-item">
        <div class="settingLineList">
          <select-el v-model:value="eventType.value" :list="eventType.list"></select-el>
        </div>
      </div>

      <LineEl class="division" :color="'#363741'" />
    </div>

    <div class="content-item">
      <div class="setting-item leftHead">事件类型</div>

      <div class="setting-item">
        <div class="settingLineList">
          <select-el v-model:value="eventResponse.value" :list="eventResponse.list"></select-el>
        </div>
      </div>

      <LineEl class="division" :color="'#363741'" />
    </div>

    <div class="content-item" v-show="eventResponse.value == 'colorOverlay'">
      <div class="setting-item leftHead">叠加颜色</div>

      <div class="setting-item">
        <div class="settingLineList">
          <color-picker-el v-model:value="colorOverlay"></color-picker-el>
        </div>
      </div>

      <LineEl class="division" :color="'#363741'" />
    </div>

    <div
      v-for="(item, key) in viewFocus"
      :key="key"
      class="content-item"
      v-show="eventResponse.value == 'viewFocus'"
    >
      <div class="setting-item">
        <BaseTitle :value="key" :height="56" :width="72" :marginRight="8" />
      </div>

      <div class="setting-item">
        <div v-for="setting in item" :key="setting" class="setting">
          <BaseInput
            v-if="setting.type === 'input'"
            :target="{ key, setting }"
            :change="inputChange"
            :name="setting.name"
            :value="setting.value"
            :width="100"
            :height="32"
            :marginRight="4"
            :marginTop="12"
            :marginBottom="0"
          />
        </div>
      </div>

      <LineEl class="division" :color="'#363741'" />
    </div>

    <div class="btnBox" v-show="eventResponse.value != 'none'">
      <div
        :class="`btnStyle btnStyleAuto ${autoView ? `sureBtn` : `recelBtn`}`"
        @click="autoViewInterval"
        v-show="eventResponse.value == 'viewFocus'"
      >
        拖动选择视角
      </div>
      <div class="btnStyle sureBtn" @click="saveMsg">保存</div>
      <div class="btnStyle recelBtn" @click="resetMsg">重置</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onUnmounted, onMounted } from 'vue'
import store from '../../../store'
import LineEl from '@/components/utils/common/LineEl.vue'
import SelectEl from '@/components/common/SelectEl.vue'
import ColorPickerEl from '@/components/common/ColorPickerEl.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'

var uuid, container, object

const props = defineProps({
  node: Object
})

const eventType = ref({
  value: 'click',
  list: [
    { label: '鼠标悬浮', value: 'hover' },
    { label: '鼠标单击', value: 'click' },
    { label: '鼠标双击', value: 'dbclick' }
  ]
})

const eventResponse = ref({
  value: 'none',
  list: [
    { label: '无', value: 'none' },
    { label: '颜色叠加', value: 'colorOverlay' },
    { label: '视角聚焦', value: 'viewFocus' }
  ]
})

const colorOverlay = ref('')
const viewFocus = ref({
  target: [
    {
      name: 'X',
      value: 0,
      type: 'input'
    },
    {
      name: 'Y',
      value: 0,
      type: 'input'
    },
    {
      name: 'Z',
      value: 0,
      type: 'input'
    }
  ],
  position: [
    {
      name: 'X',
      value: 0,
      type: 'input'
    },
    {
      name: 'Y',
      value: 0,
      type: 'input'
    },
    {
      name: 'Z',
      value: 0,
      type: 'input'
    }
  ],
  time: [
    {
      name: 'S',
      value: 0,
      type: 'input'
    }
  ]
})
const autoView = ref(false)

const saveMsg = () => {
  // eslint-disable-next-line vue/no-mutating-props
  props.node.event[eventType.value.value] = {
    status: false,
    type: eventResponse.value.value
  }
  object.userData[eventType.value.value] = {
    status: false,
    type: eventResponse.value.value
  }
  let options
  if (eventResponse.value.value == 'colorOverlay') {
    if (colorOverlay.value == '') return false
    options = {
      value: colorOverlay.value
    }
  } else if (eventResponse.value.value == 'viewFocus') {
    options = {
      target: [
        parseFloat(viewFocus.value.target[0].value),
        parseFloat(viewFocus.value.target[1].value),
        parseFloat(viewFocus.value.target[2].value)
      ],
      position: [
        parseFloat(viewFocus.value.position[0].value),
        parseFloat(viewFocus.value.position[1].value),
        parseFloat(viewFocus.value.position[2].value)
      ],
      time: viewFocus.value.time[0].value
    }
    viewInter && clearInterval(viewInter)
    autoView.value = false
  }
  object.userData[eventType.value.value].options = options
  // eslint-disable-next-line vue/no-mutating-props
  props.node.event[eventType.value.value].options = options
}

const resetMsg = () => {
  if (eventResponse.value.value == 'colorOverlay') {
    colorOverlay.value = ''
  } else if (eventResponse.value.value == 'viewFocus') {
    for (const key in viewFocus.value) {
      for (const ck in viewFocus.value[key]) {
        viewFocus.value[key][ck].value = 0
      }
    }
  }
  object.userData[eventType.value.value] = {}
}

const inputChange = (val) => {
  const e = event
  const value = parseFloat(e.target.value)
  if (val.key == 'target') {
    if (val.setting.name == 'X') {
      viewFocus.value.target[0].value = value
      container.orbitControls.target.x = value
    } else if (val.setting.name == 'Y') {
      viewFocus.value.target[1].value = value
      container.orbitControls.target.y = value
    } else if (val.setting.name == 'Z') {
      viewFocus.value.target[2].value = value
      container.orbitControls.target.z = value
    }
  } else if (val.key == 'position') {
    if (val.setting.name == 'X') {
      viewFocus.value.position[0].value = value
      container.orbitCamera.position.x = value
    } else if (val.setting.name == 'Y') {
      viewFocus.value.position[1].value = value
      container.orbitCamera.position.y = value
    } else if (val.setting.name == 'Z') {
      viewFocus.value.position[2].value = value
      container.orbitCamera.position.z = value
    }
  } else if (val.key == 'time') {
    viewFocus.value.time[0].value = value
  }
}

var viewInter = null
const autoViewInterval = () => {
  autoView.value = !autoView.value
  if (autoView.value) {
    viewInter = setInterval(() => {
      const position = container.orbitCamera.position
      const target = container.orbitControls.target
      viewFocus.value.target[0].value = target.x.toFixed(2)
      viewFocus.value.target[1].value = target.y.toFixed(2)
      viewFocus.value.target[2].value = target.z.toFixed(2)
      viewFocus.value.position[0].value = position.x.toFixed(2)
      viewFocus.value.position[1].value = position.y.toFixed(2)
      viewFocus.value.position[2].value = position.z.toFixed(2)
    }, 100)
  } else {
    viewInter && clearInterval(viewInter)
  }
}

onMounted(() => {
  uuid = props.node.uuid
  container = store.state.threeDimensionContainer
  object = container.scene.getObjectByProperty('uuid', uuid)
  if (object.userData.click && JSON.stringify(object.userData.click) != '{}') {
    eventResponse.value.list.forEach((item) => {
      if (item.value == object.userData.click.type) {
        eventResponse.value.value = item.value
        if (item.value == 'colorOverlay') {
          colorOverlay.value = object.userData.click.options.value
        } else if (item.value == 'viewFocus') {
          viewFocus.value.target[0].value = object.userData.click.options.target[0]
          viewFocus.value.target[1].value = object.userData.click.options.target[1]
          viewFocus.value.target[2].value = object.userData.click.options.target[2]
          viewFocus.value.position[0].value = object.userData.click.options.position[0]
          viewFocus.value.position[1].value = object.userData.click.options.position[1]
          viewFocus.value.position[2].value = object.userData.click.options.position[2]
          viewFocus.value.time[0].value = object.userData.click.options.time
        }
      }
    })
  }
})

onUnmounted(() => {
  viewInter && clearInterval(viewInter)
})

watch(
  () => eventResponse.value.value,
  (v1) => {
    if (v1 == 'none') {
      object.userData[eventType.value.value] = {}
    } else {
      if (
        object.userData[eventType.value.value] &&
        JSON.stringify(object.userData[eventType.value.value]) != '{}'
      ) {
        if (v1 == 'colorOverlay' && object.userData[eventType.value.value].type == 'colorOverlay') {
          colorOverlay.value = object.userData[eventType.value.value].options.value
        } else if (
          v1 == 'viewFocus' &&
          object.userData[eventType.value.value].type == 'viewFocus'
        ) {
          viewFocus.value.target[0].value = object.userData[eventType.value.value].options.target[0]
          viewFocus.value.target[1].value = object.userData[eventType.value.value].options.target[1]
          viewFocus.value.target[2].value = object.userData[eventType.value.value].options.target[2]
          viewFocus.value.position[0].value =
            object.userData[eventType.value.value].options.position[0]
          viewFocus.value.position[1].value =
            object.userData[eventType.value.value].options.position[1]
          viewFocus.value.position[2].value =
            object.userData[eventType.value.value].options.position[2]
          viewFocus.value.time[0].value = object.userData[eventType.value.value].options.time
        }
      }
    }
  }
)

watch(
  () => eventType.value.value,
  (v1) => {
    if (object.userData[v1] && JSON.stringify(object.userData[v1]) != '{}') {
      eventResponse.value.value = object.userData[v1].type
      if (v1 == 'colorOverlay' && object.userData[v1].type == 'colorOverlay') {
        colorOverlay.value = object.userData[v1].options.value
      } else if (v1 == 'viewFocus' && object.userData[v1].type == 'viewFocus') {
        viewFocus.value.target[0].value = object.userData[v1].options.target[0]
        viewFocus.value.target[1].value = object.userData[v1].options.target[1]
        viewFocus.value.target[2].value = object.userData[v1].options.target[2]
        viewFocus.value.position[0].value = object.userData[v1].options.position[0]
        viewFocus.value.position[1].value = object.userData[v1].options.position[1]
        viewFocus.value.position[2].value = object.userData[v1].options.position[2]
        viewFocus.value.time[0].value = object.userData[v1].options.time
      }
    } else {
      eventResponse.value.value = 'none'
    }
  }
)
</script>

<style lang="postcss" scoped>
.content-item {
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

.leftHead {
  width: 80px;
  font-size: 12px;
  line-height: 48px;
}

.settingLineList {
  margin-top: 8px;
  color: #fff;
  width: 181px;
  vertical-align: top;
}
.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 12px;
  margin-bottom: 20px;
}
.btnStyle {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.btnStyleAuto {
  width: 80px;
}
.sureBtn {
  background-color: #6582fe;
}
.recelBtn {
  background-color: #808080;
}
</style>
