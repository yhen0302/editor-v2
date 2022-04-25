<template>
  <section class="chart-color-configurator-wrap">
    <fold-el title="配色方案" :line-show="false">
      <template #default>
        <div class="color-picker-wrap">
          <multi-color-picker :value="colors"></multi-color-picker>
        </div>
        <line-el color="#363741"></line-el>
      </template>
    </fold-el>
  </section>
</template>

<script>
import MultiColorPicker from "@/component/common/MultiColorPicker";
import FoldEl from "@/component/common/FoldEl";
import LineEl from "@/component/common/LineEl";

export default {
  name: "ChartColorConfigurator",
  components: {LineEl, FoldEl, MultiColorPicker},
  data() {
    return {colors: ['#FF0000', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF']}
  }
}
</script>

<style scoped>
.color-picker-wrap {
  padding: 0 16px 16px;
}
.color-picker-wrap /deep/ .color-selector{
  height: 28px;
}
</style>