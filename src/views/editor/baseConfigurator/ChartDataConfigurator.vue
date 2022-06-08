<template>
  <section class="chart-data-configurator">
    <fold-el :line-show="false" :control-fold="false" title="数据绑定">
      <template #default>
        <div class="sub-fold-content pr-16 pb-16">
          <select-el></select-el>
          <button class="btn"><img src="" alt="" /></button>
        </div>
      </template>
    </fold-el>
  </section>
</template>

<script>
import FoldEl from '@/component/common/FoldEl.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useGetter } from '@/store/helper'
import SelectEl from '@/component/common/SelectEl'

export default {
  name: 'ChartDataConfigurator',
  components: {
    SelectEl,
    FoldEl
  },
  setup() {}
}
</script>

<style scoped></style>
