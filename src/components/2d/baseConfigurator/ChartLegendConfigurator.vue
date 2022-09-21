<template>
  <section class="chart-legend-configurator-wrap">
    <fold-el title="图例" :line-show="false" :show="false">
      <template #default>
        <fold-el :line-show="false">
          <template #header>
            <div class="sub-fold-header title-cnf flex justify-between items-center">
              <span class="text-12">图例显示</span>
              <switch-el v-model:value="legendShow"></switch-el>
            </div>
          </template>
          <template #default>
            <!--            <line-el color="#363741" class="mt-16 ml-16"></line-el>-->
          </template>
        </fold-el>
      </template>
    </fold-el>
  </section>
</template>

<script>
import FoldEl from '@/components/2d/common/FoldEl.vue'
import SwitchEl from '@/components/2d/common/SwitchEl.vue'
import LineEl from '@/components/2d/common/LineEl.vue'
import { useGetter } from '@/store/helper'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'ChartLegendConfigurator',
  components: { LineEl, SwitchEl, FoldEl },
  data() {
    return { mic: 'mic', t: 'cc' }
  },
  setup() {
    const store = useStore()
    const getters2D = useGetter(store, '2d', ['GET_SELECT_NODE'])

    const legendShow = computed({
      get() {
        return getters2D['GET_SELECT_NODE'].value.option.echartsOption.legend.show
      },
      set(newVal) {
        getters2D['GET_SELECT_NODE'].value.option.echartsOption.legend.show = newVal
      }
    })

    return { legendShow }
  }
}
</script>

<style scoped>
@import 'common.css';
</style>
