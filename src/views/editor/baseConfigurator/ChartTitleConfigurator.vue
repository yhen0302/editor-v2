<template>
  <section class="chart-title-configurator-wrap">
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
              <div class="font-select-wrap flex items-center mt-16">
                <div class="config-item-pre pl-16 text-12">字体</div>
                <select-el class="select" :value="mic" :list="[{value:'mic',label:'微软雅黑'}]"></select-el>
              </div>
            </div>
          </template>
        </fold-el>
      </template>
    </fold-el>
  </section>
</template>

<script>
import FoldEl from "@/component/common/FoldEl";
import SwitchEl from "@/component/common/SwitchEl";
import SelectEl from "@/component/common/SelectEl";

export default {
  name: "ChartTitleConfigurator",
  components: {SelectEl, SwitchEl, FoldEl},
  data(){
    return {mic:"mic"}
  }
}
</script>

<style scoped>
.sub-fold-header {
  height: 32px;
  padding: 8px 16px;
}
.font-select-wrap{
  gap: 8px;
}
.config-item-pre{
  text-align: left;
  width: 72px;
}
.select{
  flex: 1;
}
</style>