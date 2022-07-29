<template>
  <section class="chart-grid-configurator-wrap">
    <fold-el title="轴、网格线" :line-show="false">
      <template #default>
        <fold-el :line-show="false" :model="true" v-model:show="labelShow">
          <template #header>
            <div class="sub-fold-header title-cnf flex items-center">
              <span class="config-item-pre pl-16 text-12">绘图坐标</span>
              <check-el
                style="flex-shrink: 0"
                label="标签"
                v-model:value="labelShow"
              ></check-el>
            </div>
          </template>
          <template #default>
            <div class="sub-fold-content pr-16 title-cnf">
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12">字体</div>
                <select-el
                  class="select"
                  v-model:value="labelFontFamily"
                  :list="FONT_FAMILY"
                ></select-el>
              </div>
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12"></div>
                <div class="config-item-suf flex">
                  <color-picker-el
                    style="flex-shrink: 0"
                    v-model:value="labelColor"
                  ></color-picker-el>
                  <input-el
                    style="height: 32px"
                    type="number"
                    v-model:value="labelFontSize"
                  >
                    <template #prefix
                      ><span class="inp-prefix text-12">px</span></template
                    >
                  </input-el>
                </div>
              </div>
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12"></div>
                <check-box-el v-model="labelFontStyle" :list="FONT_STYLE">
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
        <fold-el :line-show="false" :model="true" v-model:show="gridShow">
          <template #header>
            <div class="sub-fold-header title-cnf flex items-center">
              <span class="config-item-pre pl-16 text-12">刻度</span>
              <check-el
                style="flex-shrink: 0"
                label="网格线"
                v-model:value="gridShow"
              ></check-el>
            </div>
          </template>
          <template #default>
            <div class="sub-fold-content pr-16 pb-16 title-cnf">
              <div class="sub-fold-item-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12">填充</div>
                <div class="config-item-suf flex">
                  <color-picker-el
                    style="flex-shrink: 0"
                    v-model:value="gridColor"
                  ></color-picker-el>
                  <input-el
                    style="height: 32px"
                    v-model:value="gridColor"
                  ></input-el>
                  <input-el style="height: 32px" v-model:value="gridOpacity">
                    <template #suffix
                      ><span class="inp-suf text-12">%</span></template
                    >
                  </input-el>
                </div>
              </div>
            </div>
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
import LineEl from '@/components/2d/common/LineEl.vue'
import ColorPickerEl from '@/components/2d/common/ColorPickerEl.vue'
import {
  POSITION_ALIGN,
  FONT_STYLE,
  FONT_FAMILY
} from '../../../../packages/elements/src/components/constant'
import { computed, markRaw, SetupContext } from 'vue'
import CheckEl from '@/components/2d/common/CheckEl.vue'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { clone } from '@/share/util/base'

export default {
  name: 'ChartGridConfigurator',
  components: {
    CheckEl,
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

    const labelShow = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption
          .series[0].label.show
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.series[0].label.show = newVal
      }
    })
    const labelFontFamily = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption
          .series[0].label.fontFamily
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.series[0].label.fontFamily = newVal
      }
    })
    const labelColor = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption
          .series[0].label.color
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.series[0].label.color = newVal
      }
    })
    const labelFontSize = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption
          .series[0].label.fontSize
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.series[0].label.fontSize = newVal
      }
    })
    const labelFontStyle = computed<Array<any>>({
      get() {
        const weight =
          editorGetter['GET_SELECT_NODE'].value.option.echartsOption.series[0]
            .label.fontWeight === 'bold'
        const italic =
          editorGetter['GET_SELECT_NODE'].value.option.echartsOption.series[0]
            .label.fontStyle === 'italic'
        return weight ? (italic ? ['weight', 'italic'] : ['weight']) : []
      },
      set(newVal) {
        console.log(newVal)
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.series[0].label.fontWeight = 'normal'
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.series[0].label.fontStyle = 'normal'
        newVal.forEach((item) => {
          switch (item) {
            case 'weight':
              editorGetter[
                'GET_SELECT_NODE'
              ].value.option.echartsOption.series[0].label.fontWeight = 'bold'
              break
            case 'italic':
              editorGetter[
                'GET_SELECT_NODE'
              ].value.option.echartsOption.series[0].label.fontStyle = 'italic'
          }
        })
      }
    })

    // 网格线
    const gridShow = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.yAxis
          .splitLine.show
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.yAxis.splitLine.show = newVal
      }
    })
    const gridColor = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.yAxis
          .splitLine.lineStyle.color[0]
      },
      set(newVal) {
        return (editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.yAxis.splitLine.lineStyle.color[0] = newVal)
      }
    })

    const gridOpacity = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.yAxis
          .splitLine.lineStyle.opacity * 100
      },
      set(newVal) {
        editorGetter[
          'GET_SELECT_NODE'
        ].value.option.echartsOption.yAxis.splitLine.lineStyle.opacity = newVal/100
      }
    })

    // const
    const FONT_STYLE_COPY = markRaw(clone(FONT_STYLE))
    FONT_STYLE_COPY[2].disable = true

    return {
      FONT_STYLE: markRaw(FONT_STYLE_COPY),

      POSITION_ALIGN: markRaw(POSITION_ALIGN),
      FONT_FAMILY: markRaw(FONT_FAMILY),
      labelShow,
      labelFontFamily,
      labelColor,
      labelFontSize,
      labelFontStyle,
      gridShow,
      gridColor,
      gridOpacity
    }
  }
}
</script>

<style scoped>
@import 'common.css';

.sub-fold-header {
  padding: 8px 16pc 8px 0;
}

.inp-suf {
  color: #474a54;
}
</style>
