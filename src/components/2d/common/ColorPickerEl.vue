<template>
  <div class="color-selector box-border relative">
    <!--    <div
      class="color-box z-10 relative"
      @click="onClick"
      :style="{ background: colorComputed }"
    ></div>
    <div class="color-box-bg absolute" @click="onClick"></div>
    <input
      class="inp absolute"
      type="color"
      ref="inpEl"
      v-model="colorComputed"
    />-->
    <div class="color-box z-10 relative" @click="onClick" :style="{ background: showColor }"></div>
    <div class="color-box-bg absolute" @click="onClick"></div>
    <div class="picker-wrapper" v-show="isShowPicker" :style="pickerPositionStyle">
      <nav-tab :index="pickerNavIndex">
        <template #header>
          <div class="nav-header-wrapper relative">
            <ul class="nav-tab-header items-center flex text-14">
              <li
                class="nav-tab-h-item cursor-pointer"
                v-for="(item, index) in ['纯色', '渐变色']"
                :class="{ active: pickerNavIndex === index }"
                @click="pickerNavIndex = index"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
            <div class="close-btn absolute" @click="isShowPicker = false"></div>
          </div>
        </template>
        <template #default>
          <nav-tab-item>
            <div class="picker-box">
              <color-picker-gradient
                class="color-picker"
                type="linear"
                @changeColor="changeColor"
                :pDeg="90"
                :pColor="colorComputed"
                :showClose="false"
                :closeOnClickBody="false"
              />
            </div>
          </nav-tab-item>
          <nav-tab-item>
            <div class="picker-box">
              <color-picker-gradient
                class="color-picker"
                type="gradient"
                @changeColor="changeColor"
                :pDeg="90"
                :pColors="colorComputed"
                :showClose="false"
                :closeOnClickBody="false"
              />
            </div>
          </nav-tab-item>
        </template>
      </nav-tab>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import NavTab from './navTab/NavTab'
import NavTabItem from './navTab/NavTabItem'
import { toPx } from '@/share/util/base'

export default {
  name: 'ColorPickerEl',
  components: { NavTabItem, NavTab },
  props: { value: Object, type: { type: String, default: 'linear' } },
  emits: ['update:value'],
  setup(props, context) {
    const pickerNavIndex = ref(props.type === 'linear' ? 0 : 1)

    const showColor = computed(() => {
      let val
      if (pickerNavIndex.value === 0) val = props.value.color.color
      else val = props.value.style
      return val
    })
    const colorComputed = computed({
      get() {
        const type = pickerNavIndex.value ? 'gradient' : 'linear'
        return type === 'linear' ? props.value.color : props.value.colors
      },
      set(newVal) {
        const type = pickerNavIndex.value ? 'gradient' : 'linear'
        newVal.style = newVal.style && newVal.style.substr(0, newVal.style.length - 1)
        context.emit('update:value', { type, ...newVal })
      }
    })

    const isShowPicker = ref(false)

    // toggle
    function onClick(ev) {
      isShowPicker.value = !isShowPicker.value
      x = ev.pageX
      y = ev.pageY
    }
    // style
    const windowRect = ref({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', () => {
      windowRect.value = { width: window.innerWidth, height: window.innerHeight }
    })
    let x, y
    const pickerPositionStyle = computed(() => {
      let left = -258,
        top = -560 / 2
      if (isShowPicker.value) {
        left += x
        top += y
        if (top + 560 > windowRect.value.height) {
          top -= top + 560 - windowRect.value.height
        }
      }
      return { left: toPx(left), top: toPx(top) }
    })

    function changeColor(color) {
      colorComputed.value = color
    }
    return {
      colorComputed,
      onClick,
      pickerPositionStyle,
      changeColor,
      showColor,
      isShowPicker,
      pickerNavIndex
    }
  }
}
</script>

<style scoped>
.color-selector {
  width: 32px;
  height: 32px;
  padding: 2px;
  background: #31333d;
  border-radius: 2px;
}

.inp {
  pointer-events: none;
  left: 2px;
  top: 2px;
  display: inline-block;
  opacity: 0;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
}

.color-box {
  width: 100%;
  height: 100%;
}

.color-box-bg {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  top: 2px;
  left: 2px;
  z-index: 2;
  background: linear-gradient(90deg, #fff 0%, #fff 50%, #e5e5e5 50%, #e5e5e5 100%) left top/10px 5px
      repeat-x,
    linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left 5px/10px 5px repeat-x,
    linear-gradient(90deg, #fff 0%, #fff 50%, #e5e5e5 50%, #e5e5e5 100%) left 10px/10px 5px repeat-x,
    linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left 15px/10px 5px repeat-x,
    linear-gradient(90deg, #fff 0%, #fff 50%, #e5e5e5 50%, #e5e5e5 100%) left 20px/10px 5px repeat-x,
    linear-gradient(90deg, #e5e5e5 0%, #e5e5e5 50%, #fff 50%, #fff 100%) left 25px/10px 5px repeat-x;
}
.picker-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  padding: 10px 0;
  z-index: 9999999999;
  background: #25262d;
  box-shadow: 0 0 2px rgba(200, 200, 200, 0.5);
}
.nav-tab-h-item {
  width: 80px;
  height: 100%;
  line-height: 64px;
}

.nav-tab-h-item.active {
  color: #f2f2f2;
  border-bottom: 2px solid #6582fe;
}
.close-btn {
  width: 20px;
  height: 20px;
  top: 0;
  right: 10px;
  background: red;
}
.picker-box {
  padding: 10px 20px;
}
</style>
