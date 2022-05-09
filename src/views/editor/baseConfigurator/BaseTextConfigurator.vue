<template>
  <section class="base-text-configurator">
    <fold-el title="文本">
      <template #default>
        <div class="sub-fold-content pr-16 pb-16 title-cnf">
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12">字体</div>
            <select-el class="select" :value="mic" :list="[{value:'mic',label:'微软雅黑'}]"></select-el>
          </div>
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12"></div>
            <div class="config-item-suf flex">
              <color-picker-el style="flex-shrink: 0"></color-picker-el>
              <input-el style="height: 32px;" type="number">
                <template #prefix><span class="inp-prefix text-12">px</span></template>
              </input-el>
            </div>

          </div>
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12"></div>
            <check-box-el :value="t" :list="FONT_STYLE">
              <template v-slot:default="data">
                <div class="h-full w-full grid place-content-center">
                  <img :src="data.item.label">
                </div>
              </template>
            </check-box-el>
          </div>
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12">对齐</div>
            <check-box-el :value="t" :list="FONT_ALIGN" :radio="true">
              <template v-slot:default="data">
                <div class="h-full w-full grid place-content-center">
                  <img :src="data.item.label">
                </div>
              </template>
            </check-box-el>
          </div>
          <div class="sub-fold-item-wrap flex items-center mt-16">
            <div class="config-item-pre pl-16 text-12"></div>
            <check-box-el :value="t" :list="FONT_VERTICAL_ALIGN" :radio="true">
              <template v-slot:default="data">
                <div class="h-full w-full grid place-content-center">
                  <img :src="data.item.label">
                </div>
              </template>
            </check-box-el>
          </div>
        </div>
      </template>
    </fold-el>
    <line-el color="#363741"></line-el>
  </section>
</template>

<script lang="ts">
import FoldEl from "@/component/common/FoldEl";
import SwitchEl from "@/component/common/SwitchEl";
import SelectEl from "@/component/common/SelectEl";
import InputEl from "@/component/common/InputEl";
import CheckBoxEl from "@/component/common/CheckBoxEl";
import LineEl from "@/component/common/LineEl"
import ColorPickerEl from "@/component/common/ColorPickerEl"
import {markRaw, SetupContext} from "vue";
import {FONT_STYLE, FONT_ALIGN, FONT_VERTICAL_ALIGN} from "@/views/editor/twoDimension/elements/constant";

export default {
  name: "BaseTextConfigurator",
  data() {
    return {mic: "mic", t: "cc"}
  },
  components: {ColorPickerEl, LineEl, CheckBoxEl, InputEl, SelectEl, SwitchEl, FoldEl},
  setup(props: any, context: SetupContext) {
    return {
      FONT_STYLE: markRaw(FONT_STYLE),
      FONT_ALIGN: markRaw(FONT_ALIGN),
      FONT_VERTICAL_ALIGN: markRaw(FONT_VERTICAL_ALIGN)
    }
  }
}
</script>

<style scoped>

</style>