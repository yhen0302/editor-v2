<template>
  <section class="base-exterior-configurator">
    <fold-el title="外观" :line-show="false">
      <template #default>
        <div class="sub-fold-item-wrap pr-16 pb-16 flex items-center">
          <div class="config-item-pre pl-16 text-12">填充</div>
          <div class="config-item-suf flex">
            <color-picker-el
              style="flex-shrink: 0"
              v-model:value="color"
            ></color-picker-el>
            <input-el style="height: 32px" v-model:value="color"></input-el>
            <input-el style="height: 32px" v-model:value="colorTransparency">
              <template #suffix
                ><span class="inp-suf text-12">%</span></template
              >
            </input-el>
          </div>
        </div>
        <div class="sub-fold-item-wrap pr-16 pb-16 flex items-center">
          <div class="config-item-pre pl-16 text-12">透明度</div>
          <div class="config-item-suf flex-1 flex">
            <slider-el class="flex-1" v-model:value="transparency"></slider-el>
            <input-el
              style="height: 32px; width: 64px"
              v-model:value="transparency"
            >
              <template #suffix
                ><span class="inp-suf text-12">%</span></template
              >
            </input-el>
          </div>
        </div>
      </template>
    </fold-el>
    <line-el color="#363741"></line-el>
  </section>
</template>

<script lang="ts">
import FoldEl from '@/component/common/FoldEl'
import ColorPickerEl from '@/component/common/ColorPickerEl'
import InputEl from '@/component/common/InputEl'
import LineEl from '@/component/common/LineEl'
import SliderEl from '@/component/common/SliderEl'
import { useGetter } from '@/store/helper'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'BaseExteriorConfigurator',
  components: { SliderEl, LineEl, FoldEl, ColorPickerEl, InputEl },
  setup(props: any) {
    const store = useStore()
    const editorGetters = useGetter(store, 'editor', ['GET_SELECT_NODE'])
    const color = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.transparencyColor.color
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.transparencyColor.color = val
      }
    })
    const colorTransparency = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.transparencyColor
          .transparency
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.transparencyColor.transparency =
          val
      }
    })

    const transparency = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.transparency
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.transparency = val
      }
    })
    return {
      ...editorGetters,
      color,
      colorTransparency,
      transparency
    }
  }
}
</script>

<style scoped>
@import 'common.css';

.inp-suf {
  color: #474a54;
}
</style>
