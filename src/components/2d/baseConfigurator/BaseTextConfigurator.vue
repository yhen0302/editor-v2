<template>
  <section class="base-text-configurator">
    <fold-el title="文本">
      <template #default>
        <div class="sub-fold-content pr-16 pb-16 title-cnf">
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12">字体</div>
            <select-el class="select" v-model:value="fontFamily" :list="FONT_FAMILY"></select-el>
          </div>
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12"></div>
            <div class="config-item-suf flex">
              <color-picker-el style="flex-shrink: 0" v-model:value="fontColor"></color-picker-el>
              <input-el style="height: 32px" type="number" v-model:value="fontSize">
                <template #prefix><span class="inp-prefix text-12">px</span></template>
              </input-el>
            </div>
          </div>
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12"></div>
            <check-box-el v-model="fontStyle" :list="FONT_STYLE">
              <template v-slot:default="data">
                <div class="h-full w-full grid place-content-center">
                  <img :src="data.item.label" />
                </div>
              </template>
            </check-box-el>
          </div>
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12">对齐</div>
            <check-box-el v-model="align" :list="FONT_ALIGN" :radio="true">
              <template v-slot:default="data">
                <div class="h-full w-full grid place-content-center">
                  <img :src="data.item.label" />
                </div>
              </template>
            </check-box-el>
          </div>
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12"></div>
            <check-box-el v-model="verticalAlign" :list="FONT_VERTICAL_ALIGN" :radio="true">
              <template v-slot:default="data">
                <div class="h-full w-full grid place-content-center">
                  <img :src="data.item.label" />
                </div>
              </template>
            </check-box-el>
          </div>
        </div>
      </template>
    </fold-el>
  </section>
</template>

<script lang="ts">
import FoldEl from '@/components/2d/common/FoldEl'
import SwitchEl from '@/components/2d/common/SwitchEl'
import SelectEl from '@/components/2d/common/SelectEl'
import InputEl from '@/components/2d/common/InputEl'
import CheckBoxEl from '@/components/2d/common/CheckBoxEl'
import LineEl from '@/components/2d/common/LineEl'
import ColorPickerEl from '@/components/2d/common/ColorPickerEl'
import { computed, markRaw, SetupContext } from 'vue'
import { FONT_STYLE, FONT_ALIGN, FONT_VERTICAL_ALIGN, FONT_FAMILY } from '../../../../packages/elements/src/components/constant'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { fontType } from '../type'

export default {
  name: 'BaseTextConfigurator',
  components: {
    ColorPickerEl,
    LineEl,
    CheckBoxEl,
    InputEl,
    SelectEl,
    SwitchEl,
    FoldEl
  },
  setup(props: any, context: SetupContext) {
    const store = useStore()
    const editorStore = store.state
    const editorGetter = useGetter(store, 'global', ['GET_SELECT_NODE'])

    const fontFamily = computed<fontType>({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.textOption.fontFamily
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.textOption.fontFamily = newVal
      }
    })
    const fontColor = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.textOption.color
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.textOption.color = newVal
      }
    })
    const fontSize = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.textOption.fontSize
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.textOption.fontSize = newVal
      }
    })
    const fontStyle = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.textOption.fontStyle
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.textOption.fontStyle = newVal
      }
    })

    const align = computed({
      get() {
        return [editorGetter['GET_SELECT_NODE'].value.option.textOption.align]
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.textOption.align = newVal[0]
      }
    })
    const verticalAlign = computed({
      get() {
        return [editorGetter['GET_SELECT_NODE'].value.option.textOption.verticalAlign]
      },
      set(newVal) {
        console.log('verticalAlign', newVal)
        editorGetter['GET_SELECT_NODE'].value.option.textOption.verticalAlign = newVal[0]
      }
    })
    return {
      FONT_STYLE: markRaw(FONT_STYLE),
      FONT_ALIGN: markRaw(FONT_ALIGN),
      FONT_FAMILY: markRaw(FONT_FAMILY),
      FONT_VERTICAL_ALIGN: markRaw(FONT_VERTICAL_ALIGN),
      fontFamily,
      fontColor,
      fontSize,
      fontStyle,
      align,
      verticalAlign
    }
  }
}
</script>

<style scoped></style>
