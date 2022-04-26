<template>
  <section class="chart-legend-configurator-wrap">
    <fold-el title="图例" :line-show="false">
      <template #default>
        <fold-el :line-show="false">
          <template #header>
            <div class="sub-fold-header title-cnf flex justify-between items-center">
              <span class="text-12">图例显示</span>
              <switch-el></switch-el>
            </div>
          </template>
          <template #default>
            <!--            <line-el color="#363741" class="mt-16 ml-16"></line-el>-->
          </template>
        </fold-el>
      </template>
    </fold-el>
    <line-el color="#363741"></line-el>
  </section>
</template>

<script>
import FoldEl from "@/component/common/FoldEl";
import SwitchEl from "@/component/common/SwitchEl";
import LineEl from "@/component/common/LineEl";

export default {
  name: "ChartLegendConfigurator",
  components: {LineEl, SwitchEl, FoldEl},
  data() {
    return {mic: "mic", t: "cc"}
  },
}
</script>

<style scoped>
@import "common.css";
</style>