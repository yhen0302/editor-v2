<template>
  <section class="base-exterior-configurator">
    <fold-el title="外观" :line-show="false">
      <template #default>
        <div class="sub-fold-item-wrap pr-16 pb-16 flex items-center">
          <div class="config-item-pre pl-16 text-12">填充</div>
          <div class="config-item-suf flex">
            <color-picker-gradient-el
              style="flex-shrink: 0"
              v-model:value="color"
            ></color-picker-gradient-el>
            <input-el style="height: 32px" v-model:value="colorVal"></input-el>
          </div>
        </div>
        <div class="sub-fold-item-wrap pr-16 pb-16 flex items-center" v-show="isRadiusEdit">
          <div class="config-item-pre pl-16 text-12">圆角</div>
          <div class="config-item-suf flex">
            <input-el
              style="height: 32px"
              type="number"
              v-model:value="borderTopLeftRadius"
            ></input-el>
            <input-el
              style="height: 32px"
              type="number"
              v-model:value="borderTopRightRadius"
            ></input-el>
            <input-el
              style="height: 32px"
              type="number"
              v-model:value="borderBottomLeftRadius"
            ></input-el>
            <input-el
              style="height: 32px"
              type="number"
              v-model:value="borderBottomRightRadius"
            ></input-el>
          </div>
        </div>
        <div class="sub-fold-item-wrap pr-16 pb-16 flex items-center" v-show="isShadowEdit">
          <div class="config-item-pre pl-16 text-12">阴影</div>
          <div class="config-item-suf flex">
            <color-picker-el style="flex-shrink: 0" v-model:value="shadowColor" :key='GET_SELECT_NODE.id'></color-picker-el>
            <input-el style="height: 32px" type="number" v-model:value="shadowX"></input-el>
            <input-el style="height: 32px" type="number" v-model:value="shadowY"></input-el>
            <input-el style="height: 32px" type="number" v-model:value="shadowBlur"></input-el>
          </div>
        </div>

        <div class="sub-fold-item-wrap pr-16 pb-16 flex items-center">
          <div class="config-item-pre pl-16 text-12">透明度</div>
          <div class="config-item-suf flex-1 flex">
            <slider-el class="flex-1" v-model:value="transparency"></slider-el>
            <input-el style="height: 32px; width: 64px" v-model:value="transparency">
              <template #suffix><span class="inp-suf text-12">%</span></template>
            </input-el>
          </div>
        </div>
      </template>
    </fold-el>
  </section>
</template>

<script lang="ts">
import FoldEl from '@/components/2d/common/FoldEl'
import ColorPickerGradientEl from '@/components/2d/common/ColorPickerGradientEl'
import InputEl from '@/components/2d/common/InputEl'
import LineEl from '@/components/2d/common/LineEl'
import SliderEl from '@/components/2d/common/SliderEl'
import { useGetter } from '@/store/helper'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { getColor } from '@/share/util/node'
import { mapComputed } from '@/share/util/vUtil'
import ColorPickerEl from '@/components/utils/common/ColorPickerEl.vue'

export default {
  name: 'BaseExteriorConfigurator',
  components: { ColorPickerEl, SliderEl, LineEl, FoldEl, ColorPickerGradientEl, InputEl },
  setup(props: any) {
    const store = useStore()
    const editorGetters = useGetter(store, 'global', ['GET_SELECT_NODE'])
    const color = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.color
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.color = val
      }
    })
    const colorVal = computed(() => getColor(editorGetters['GET_SELECT_NODE'].value))

    const transparency = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.transparency
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.transparency = val
      }
    })
    // TODO radius
    const isRadiusEdit = computed(() =>
      // eslint-disable-next-line no-prototype-builtins
      editorGetters['GET_SELECT_NODE'].value.option.matrixOption.hasOwnProperty(
        'borderTopLeftRadius'
      )
    )

    const borderTopLeftRadius = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.matrixOption.borderTopLeftRadius
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.matrixOption.borderTopLeftRadius = val
      }
    })
    const borderTopRightRadius = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.matrixOption.borderTopRightRadius
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.matrixOption.borderTopRightRadius = val
      }
    })
    const borderBottomLeftRadius = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.matrixOption.borderBottomLeftRadius
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.matrixOption.borderBottomLeftRadius = val
      }
    })
    const borderBottomRightRadius = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.matrixOption.borderBottomRightRadius
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.matrixOption.borderBottomRightRadius = val
      }
    })

    // TODO shadow
    const isShadowEdit = computed(() => {
      // eslint-disable-next-line no-prototype-builtins
      return editorGetters['GET_SELECT_NODE'].value.option.hasOwnProperty('shadowColor')
    })
    const shadowColor = computed({
      get() {
        return editorGetters['GET_SELECT_NODE'].value.option.shadowColor
      },
      set(val) {
        editorGetters['GET_SELECT_NODE'].value.option.shadowColor = val
      }
    })
    const shadow = mapComputed(editorGetters['GET_SELECT_NODE'], [
      'value.option.shadowX',
      'value.option.shadowY',
      'value.option.shadowBlur'
    ])

    return {
      ...editorGetters,
      color,
      colorVal,
      transparency,
      isRadiusEdit,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      shadowColor,
      isShadowEdit,
      ...shadow
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
