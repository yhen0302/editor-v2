<template>
  <section class="base-exterior-configurator">
    <fold-el title="外观" :line-show="false">
      <template #default>
        <div class="sub-fold-item-wrap pr-16 pb-16 flex items-center">
          <div class="config-item-pre pl-16 text-12">填充</div>
          <div class="config-item-suf flex">
            <color-picker-el style="flex-shrink: 0"></color-picker-el>
            <input-el style="height: 32px;"></input-el>
            <input-el style="height: 32px;">
              <template #suffix><span class="inp-suf text-12">%</span></template>
            </input-el>
          </div>
        </div>
        <div class="sub-fold-item-wrap pr-16 pb-16 flex items-center">
          <div class="config-item-pre pl-16 text-12">透明度</div>
          <div class="config-item-suf flex-1 flex">
            <slider-el class="flex-1"></slider-el>
            <input-el style="height: 32px;width: 64px;">
              <template #suffix><span class="inp-suf text-12">%</span></template>
            </input-el>
          </div>
        </div>

      </template>
    </fold-el>
    <line-el color="#363741"></line-el>
  </section>
</template>

<script>
import FoldEl from "@/component/common/FoldEl";
import ColorPickerEl from "@/component/common/ColorPickerEl"
import InputEl from "@/component/common/InputEl"
import LineEl from "@/component/common/LineEl";
import SliderEl from "@/component/common/SliderEl";

export default {
  name: "BaseExteriorConfigurator",
  components: {SliderEl, LineEl, FoldEl, ColorPickerEl, InputEl}
}
</script>

<style scoped>
@import "common.css";

.inp-suf {
  color: #474A54;
}
</style>