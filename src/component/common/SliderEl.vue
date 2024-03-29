<template>
  <div class="slider-el flex items-center" @mousedown="onMouseDown">
    <div class="slider-wrapper flex items-center" ref="sliderWrapper">
      <div class="slider-process" :style="{ width: widthRatio + '%' }"></div>
      <div
        class="slider-button-wrapper relative grid place-content-center"
        :class="{ active: run }"
        @mousedown.capture.prevent
      >
        <span class="slider-tip text-12 absolute" v-show="tip">{{ valueComputed }}</span>
        <div class="slider-button relative pointer-events-none"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, ref } from 'vue'

export default {
  name: 'SliderEl',
  props: {
    value: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    direction: { type: String, default: 'x' },
    tip:{type:Boolean,default:true}
  },
  emits: ['update:value'],
  setup(props, context) {
    let valueComputed = computed({
        get() {
          return props.value
        },
        set(val) {
          context.emit('update:value', Number(val))
        }
      }),
      sliderWrapper = ref(null),
      run = ref(false),
      rect,
      pre = 0

    nextTick(() => (rect = getSliderWrapperClientRect()))

    let offsetVal = computed(() => props.max - props.min)

    function getSliderWrapperClientRect() {
      return sliderWrapper.value.getBoundingClientRect()
    }

    function onMouseDown(ev) {
      rect = getSliderWrapperClientRect()
      run.value = true
    }

    function onMouseMove(ev) {
      if (!run.value) return

      let newVal =
        props.direction === 'y'
          ? (((ev.pageY - rect.top) / rect.height) * offsetVal.value).toFixed()
          : (((ev.pageX - rect.left) / rect.width) * offsetVal.value).toFixed()

      valueComputed.value =
        newVal > props.max ? props.max : newVal < props.min ? props.min : newVal
    }

    function onMouseUp() {
      if (!run.value) return
      run.value = false
    }

    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', onMouseMove)

    const widthRatio = computed(() => {
      return ((valueComputed.value / offsetVal.value) * 100).toFixed()
    })
    return {
      valueComputed,
      widthRatio,
      onMouseDown,
      sliderWrapper,
      run
    }
  }
}
</script>

<style scoped>
.slider-el {
  height: 32px;
  padding: 0 4px;
}

.slider-wrapper {
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: #31333d;
}

.slider-process {
  background: #6582fe;
  flex-shrink: 0;
  height: 100%;
}

.slider-button-wrapper {
  left: -7px;
  width: 14px;
  height: 14px;
  cursor: grab;
}

.slider-button-wrapper.active > .slider-button {
  transform: scale(1.4);
}

.slider-button-wrapper.active > .slider-tip,
.slider-button-wrapper:hover > .slider-tip {
  opacity: 1;
}

.slider-button {
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: #fff;
  transition: 0.3s transform ease;
}

.slider-button::before {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  content: '';
  background: radial-gradient(#6582fe 0%, #6582fe 30%, transparent 100%);
  border-radius: 4px;
  transform: translate(-50%, -50%);
}

.slider-tip {
  top: -28px;
  left: 50%;
  background: #464858;
  padding: 2px 12px;
  border-radius: 4px;
  transform: translateX(-50%);
  opacity: 0;
  pointer-events: none;
  transition: 0.25s opacity ease-out;
}

.slider-tip::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  border: 5px solid transparent;
  border-top: 5px solid #464858;
  transform: translateX(-50%);
}
</style>
