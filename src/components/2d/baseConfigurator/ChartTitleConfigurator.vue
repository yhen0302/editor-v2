<template>
  <section class="chart-title-configurator-wrap">
    <fold-el title="标题单位" :line-show="false" :height-update="updateHeight">
      <template #default>
        <!--标题-->
        <fold-el :line-show="false" :model="true" v-model:show="titleShow">
          <template #header>
            <div
              class="sub-fold-header title-cnf flex justify-between items-center"
            >
              <span class="text-12">标题显示</span>
              <switch-el v-model:value="titleShow"></switch-el>
            </div>
          </template>
          <template #default>
            <div class="sub-fold-content pr-16 title-cnf">
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12">字体</div>
                <select-el
                  class="select"
                  v-model:value="titleFontFamily"
                  :list="FONT_FAMILY"
                ></select-el>
              </div>
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12"></div>
                <div class="config-item-suf flex">
                  <color-picker-el
                    style="flex-shrink: 0"
                    v-model:value="titleColor"
                  ></color-picker-el>
                  <input-el
                    style="height: 32px"
                    type="number"
                    v-model:value="titleFontSize"
                  >
                    <template #prefix
                      ><span class="inp-prefix text-12">px</span></template
                    >
                  </input-el>
                </div>
              </div>
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12"></div>
                <check-box-el v-model="titleFontStyle" :list="FONT_STYLE">
                  <template v-slot:default="data">
                    <div class="h-full w-full grid place-content-center">
                      <img :src="data.item.label" />
                    </div>
                  </template>
                </check-box-el>
              </div>
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12">位置</div>
                <check-box-el
                  v-model="titleAlign"
                  :list="POSITION_ALIGN"
                  :radio="true"
                >
                  <template v-slot:default="data">
                    <div class="h-full w-full grid place-content-center">
                      <img :src="data.item.label" />
                    </div>
                  </template>
                </check-box-el>
              </div>
            </div>
            <line-el color="#363741" class="mt-16 ml-16"></line-el>
          </template>
        </fold-el>
        <!--单位-->
        <fold-el
          :line-show="false"
          class="mt-16"
          :model="true"
          v-model:show="unitShow"
        >
          <template #header>
            <div
              class="sub-fold-header title-cnf flex justify-between items-center"
            >
              <span class="text-12">单位显示</span>
              <switch-el v-model:value="unitShow"></switch-el>
            </div>
          </template>
          <template #default>
            <div class="sub-fold-content pr-16 title-cnf">
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12">字体</div>
                <select-el
                  class="select"
                  v-model:value="unitFontFamily"
                  :list="FONT_FAMILY"
                ></select-el>
              </div>
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12"></div>
                <div class="config-item-suf flex">
                  <color-picker-el
                    style="flex-shrink: 0"
                    v-model:value="unitColor"
                  ></color-picker-el>
                  <input-el
                    style="height: 32px"
                    v-model:value="unitFontSize"
                    type="number"
                  >
                    <template #prefix
                      ><span class="inp-prefix text-12">px</span></template
                    >
                  </input-el>
                </div>
              </div>
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12"></div>
                <check-box-el v-model="unitFontStyle" :list="FONT_STYLE">
                  <template v-slot:default="data">
                    <div class="h-full w-full grid place-content-center">
                      <img :src="data.item.label" />
                    </div>
                  </template>
                </check-box-el>
              </div>
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12">位置</div>
                <check-box-el
                  v-model="unitAlign"
                  :list="POSITION_ALIGN"
                  :radio="true"
                >
                  <template v-slot:default="data">
                    <div class="h-full w-full grid place-content-center">
                      <img :src="data.item.label" />
                    </div>
                  </template>
                </check-box-el>
              </div>
            </div>
            <line-el color="#363741" class="mt-16 ml-16"></line-el>
          </template>
        </fold-el>
      </template>
    </fold-el>
    <line-el color="#363741"></line-el>
  </section>
</template>

<script lang="ts">
import FoldEl from '@/components/2d/common/FoldEl'
import SwitchEl from '@/components/2d/common/SwitchEl'
import SelectEl from '@/components/2d/common/SelectEl'
import InputEl from '@/components/2d/common/InputEl'
import CheckBoxEl from '@/components/2d/common/CheckBoxEl'
import { computed, markRaw, ref, SetupContext } from 'vue'
import LineEl from '@/components/2d/common/LineEl.vue'
import ColorPickerEl from '@/components/2d/common/ColorPickerEl.vue'
import {
  POSITION_ALIGN,
  FONT_STYLE,
  FONT_FAMILY
} from '@editor-v2/elements/src/components/constant'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { clone } from '@/share/util/base'

export default {
  name: 'ChartTitleConfigurator',
  components: {
    ColorPickerEl,
    LineEl,
    CheckBoxEl,
    InputEl,
    SelectEl,
    SwitchEl,
    FoldEl
  },
  data() {
    return { mic: 'mic', t: 'cc' }
  },
  setup(props: any, context: SetupContext) {
    const store = useStore()
    const editorStore = store.state
    const editorGetter = useGetter(store, 'global', ['GET_SELECT_NODE'])
    const updateHeight = ref(false)
    // title
    const titleShow = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
          .show
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title.show =
          newVal
        updateHeight.value = true
      }
    })
    const titleFontFamily = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
          .textStyle.fontFamily
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.title.textStyle.fontFamily = newVal
      }
    })
    const titleColor = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
          .textStyle.color
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.title.textStyle.color = newVal
      }
    })
    const titleFontSize = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
          .textStyle.fontSize
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.title.textStyle.fontSize = newVal
      }
    })
    const titleFontStyle = computed<Array<any>>({
      get() {
        const t =
          editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
        const weight = t.textStyle.fontWeight === 'bold'
        const italic = t.textStyle.fontStyle === 'italic'
        return weight ? (italic ? ['weight', 'italic'] : ['weight']) : []
      },
      set(newVal) {
        const t =
          editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
        t.textStyle.fontWeight = 'normal'
        t.textStyle.fontStyle = 'normal'
        newVal.forEach((item) => {
          switch (item) {
            case 'weight':
              t.textStyle.fontWeight = 'bold'
              break
            case 'italic':
              t.textStyle.fontStyle = 'italic'
          }
        })
      }
    })
    const titleAlign = computed({
      get() {
        const l =
            editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
              .left,
          r =
            editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
              .right
        return l === '10%' ? 'left' : r === '10%' ? 'right' : 'center'
      },
      set(newVal) {
        const t =
          editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title
        switch (newVal[0]) {
          case 'left':
            t.left = '10%'
            t.right = 'auto'
            break
          case 'center':
            t.left = 'center'
            t.right = 'auto'
            break
          case 'right':
            t.left = 'auto'
            t.right = '10%'
            break
        }
      }
    })

    // unit
    const unitShow = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit
          .show
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit.show =
          newVal
        updateHeight.value = true
      }
    })
    const unitFontFamily = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit
          .textStyle.fontFamily
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.unit.textStyle.fontFamily = newVal
      }
    })
    const unitColor = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit
          .textStyle.color
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.unit.textStyle.color = newVal
      }
    })
    const unitFontSize = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit
          .textStyle.fontSize
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.unit.textStyle.fontSize = newVal
      }
    })
    const unitFontStyle = computed<Array<any>>({
      get() {
        const u =
          editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit
        const weight = u.textStyle.fontWeight === 'bold'
        const italic = u.textStyle.fontStyle === 'italic'
        return weight ? (italic ? ['weight', 'italic'] : ['weight']) : []
      },
      set(newVal) {
        const u =
          editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit

        console.log('uuuuu',u)
        u.textStyle.fontWeight = 'normal'
        u.textStyle.fontStyle = 'normal'
        newVal.forEach((item) => {
          switch (item) {
            case 'weight':
              u.textStyle.fontWeight = 'bold'
              break
            case 'italic':
              u.textStyle.fontStyle = 'italic'
          }
        })
      }
    })
    const unitAlign = computed({
      get() {
        const l =
            editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit
              .left,
          r =
            editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit
              .right
        return l === '10%' ? 'left' : r === '10%' ? 'right' : 'center'
      },
      set(newVal) {
        const t =
          editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit
        switch (newVal[0]) {
          case 'left':
            t.left = '10%'
            t.right = 'auto'
            break
          case 'center':
            t.left = 'center'
            t.right = 'auto'
            break
          case 'right':
            t.left = 'auto'
            t.right = '10%'
            break
        }
      }
    })
    // const
    const FONT_STYLE_COPY = markRaw(clone(FONT_STYLE))
    FONT_STYLE_COPY[2].disable = true

    return {
      FONT_STYLE: markRaw(FONT_STYLE_COPY),
      FONT_FAMILY: markRaw(FONT_FAMILY),
      POSITION_ALIGN: markRaw(POSITION_ALIGN),
      // title
      titleShow,
      titleFontFamily,
      titleColor,
      titleFontSize,
      titleFontStyle,
      updateHeight,
      titleAlign,
      // unit
      unitShow,
      unitFontFamily,
      unitColor,
      unitFontSize,
      unitFontStyle,
      unitAlign
    }
  }
}
</script>

<style>
@import 'common.css';
</style>
