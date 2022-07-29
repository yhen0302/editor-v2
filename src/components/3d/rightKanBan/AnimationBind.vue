<template>
  <div>
    <div class="content-item">
      <div class="setting-item leftHead">动画类型</div>

      <div class="setting-item">
        <div class="settingLineList">
          <select-el v-model:value="eventType.value" :list="eventType.list"></select-el>
        </div>
      </div>

      <LineEl class="division" :color="'#363741'" />
    </div>

    <!-- <div class="content-item" v-show="eventResponse.value == 'colorOverlay'">
      <div class="setting-item leftHead">叠加颜色</div>

      <div class="setting-item">
        <div class="settingLineList">
          <color-picker-el v-model:value="colorOverlay"></color-picker-el>
        </div>
      </div>

      <LineEl class="division" :color="'#363741'" />
    </div> -->

    <div
      v-for="(item, key) in beatNumber"
      :key="key"
      class="content-item"
      v-show="eventType.value == 'beat'"
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

    <div class="btnBox">
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
import { animationToBeat } from '@/core/3d/util'

var uuid, container, object

const props = defineProps({
  node: Object
})

const eventType = ref({
  value: 'beat',
  list: [{ label: '跳动', value: 'beat' }]
})
// const eventType = ref({
//   value: 'beat',
//   list: [
//     { label: '跳动', value: 'beat' },
//     { label: '闪烁', value: 'flicker' }
//   ]
// })

const beatNumber = ref({
  up: [
    {
      name: 'N',
      value: 1,
      type: 'input'
    }
  ],
  down: [
    {
      name: 'N',
      value: 0,
      type: 'input'
    }
  ],
  time: [
    {
      name: 'MS',
      value: 1000,
      type: 'input'
    }
  ]
})
const colorOverlay = ref('')

const saveMsg = () => {
  if (eventType.value.value == 'beat') {
    animationToBeat(object, false)
    if (
      props.node.animation[eventType.value.value] &&
      props.node.animation[eventType.value.value].position
    ) {
      object.position.set(...props.node.animation[eventType.value.value].position)
    }

    const up = beatNumber.value.up[0].value
    const down = beatNumber.value.down[0].value
    const time = beatNumber.value.time[0].value
    const position = object.position.clone()

    // eslint-disable-next-line vue/no-mutating-props
    props.node.animation[eventType.value.value] = {
      position: [parseFloat(position.x), parseFloat(position.y), parseFloat(position.z)],
      options: {
        up: up,
        down: down,
        time: time
      }
    }
    object.userData[eventType.value.value] = {
      tweenSwitch: null,
      position: [parseFloat(position.x), parseFloat(position.y), parseFloat(position.z)],
      options: {
        up: up,
        down: down,
        time: time
      }
    }
    animationToBeat(object, true)
  } else if (eventType.value.value == 'flicker') {
    //
  }
}
const resetMsg = () => {
  if (eventType.value.value == 'beat') {
    animationToBeat(object, false)
    if (
      props.node.animation[eventType.value.value] &&
      props.node.animation[eventType.value.value].position
    ) {
      object.position.set(...props.node.animation[eventType.value.value].position)
    }
    // eslint-disable-next-line vue/no-mutating-props
    props.node.animation[eventType.value.value] = {}
  }
}
const inputChange = (val) => {
  const e = event
  const value = parseFloat(e.target.value)
  if (val.key == 'up') {
    beatNumber.value.up[0].value = value
  } else if (val.key == 'down') {
    beatNumber.value.down[0].value = value
  } else if (val.key == 'time') {
    beatNumber.value.time[0].value = value
  }
}

onMounted(() => {
  uuid = props.node.uuid
  container = store.state.threeDimensionContainer
  object = container.scene.getObjectByProperty('uuid', uuid)

  if (object.userData.beat && Object.keys(object.userData.beat).length > 0) {
    beatNumber.value.up[0].value = object.userData.beat.options.up
    beatNumber.value.down[0].value = object.userData.beat.options.down
    beatNumber.value.time[0].value = object.userData.beat.options.time
  }
})

onUnmounted(() => {})
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
