<template>
  <section class="base-model-position-c">
    <fold-el title="模型名称" :control-fold="false">
      <template #default>
        <div class="sub-fold-item-wrap pr-16 pt-16 flex items-center">
          <div class="config-item-pre pl-16 text-12">填充</div>
          <div class="config-item-suf flex">
            <input-el style="height: 32px;"></input-el>
            <input-el style="height: 32px;"></input-el>
            <input-el style="height: 32px;">
            </input-el>
          </div>
        </div>
        <div class="sub-fold-item-wrap pr-16 pt-16 flex items-center">
          <div class="config-item-pre pl-16 text-12">缩放</div>
          <div class="config-item-suf flex">
            <input-el style="height: 32px;"></input-el>
            <input-el style="height: 32px;"></input-el>
            <input-el style="height: 32px;"> </input-el>
          </div>
        </div>
        <line-el color="#363741" class="mt-16"></line-el>
      </template>
    </fold-el>
  </section>
</template>

<script>
import FoldEl from "../../../component/common/FoldEl";
import InputEl from "@/component/common/InputEl"
import LineEl from "@/component/common/LineEl";

export default {
  name: "BaseModelPositionConfigurator",
  components: {LineEl, FoldEl,InputEl}
}
</script>

<style scoped>
@import "common.css";
.sub-fold-item-wrap{
  gap: 8px;
}
.config-item-suf{
  gap: 4px;
}
</style>