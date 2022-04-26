<template>
  <section class="chart-title-configurator-wrap ">
    <fold-el title="标题单位" :line-show="false">
      <template #default>
        <fold-el :line-show="false">
          <template #header>
            <div class="sub-fold-header title-cnf flex justify-between items-center">
              <span class="text-12">标题显示</span>
              <switch-el></switch-el>
            </div>
          </template>
          <template #default>
            <div class="sub-fold-content pr-16 title-cnf">
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
                <div class="config-item-pre pl-16 text-12">位置</div>
                <check-box-el :value="t" :list="POSITION_ALIGN" :radio="true">
                  <template v-slot:default="data">
                    <div class="h-full w-full grid place-content-center">
                      <img :src="data.item.label">
                    </div>
                  </template>
                </check-box-el>
              </div>
            </div>
            <line-el color="#363741" class="mt-16 ml-16"></line-el>
          </template>
        </fold-el>
        <fold-el :line-show="false" class="mt-16">
          <template #header>
            <div class="sub-fold-header title-cnf flex justify-between items-center">
              <span class="text-12">单位显示</span>
              <switch-el></switch-el>
            </div>
          </template>
          <template #default>
            <div class="sub-fold-content pr-16 title-cnf">
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
                <div class="config-item-pre pl-16 text-12">位置</div>
                <check-box-el :value="t" :list="POSITION_ALIGN" :radio="true">
                  <template v-slot:default="data">
                    <div class="h-full w-full grid place-content-center">
                      <img :src="data.item.label">
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
import FoldEl from "@/component/common/FoldEl";
import SwitchEl from "@/component/common/SwitchEl";
import SelectEl from "@/component/common/SelectEl";
import InputEl from "@/component/common/InputEl";
import CheckBoxEl from "@/component/common/CheckBoxEl";
import {markRaw, SetupContext} from "vue";
import LineEl from "@/component/common/LineEl.vue";
import ColorPickerEl from "@/component/common/ColorPickerEl.vue";
import {POSITION_ALIGN, FONT_STYLE} from "@/views/editor/baseConfigurator/constant";


export default {
  name: "ChartTitleConfigurator",
  components: {ColorPickerEl, LineEl, CheckBoxEl, InputEl, SelectEl, SwitchEl, FoldEl},
  data() {
    return {mic: "mic", t: "cc"}
  },
  setup(props: any, context: SetupContext) {
    return {FONT_STYLE: markRaw(FONT_STYLE), POSITION_ALIGN: markRaw(POSITION_ALIGN)}
  }
}
</script>

<style>
@import "common.css";

</style>