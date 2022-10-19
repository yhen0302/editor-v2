<template>
  <section class="property-edit-box h-full">
    <nav-tab v-model:index="propertyEditIndex" class="h-full">
      <template v-slot:header>
        <ul class="nav-tab-header items-center flex text-14">
          <li class="nav-tab-h-item cursor-pointer" v-for="(item, index) in ['基础设置', '交互事件']" :class="{ active: propertyEditIndex === index }" @click="propertyEditIndex = index" :key="item">
            {{ item }}
          </li>
        </ul>
      </template>
      <nav-tab-item class="pb-16px" style="height: calc(100% - 65px); overflow: auto">
        <component :is="GET_CONFIGURATOR ? GET_CONFIGURATOR : 'i'"></component>
        <!--<axis-line-chart-configurator></axis-line-chart-configurator>-->
        <!--<text-configurator></text-configurator> -->
        <!--<shape-configurator></shape-configurator>-->
        <!--<media-configurator></media-configurator>-->
        <!--<model-configurator></model-configurator>-->
        <line-el color="#363741"></line-el>
      </nav-tab-item>
      <nav-tab-item class="event-wrap">
        <event></event>
      </nav-tab-item>
    </nav-tab>
  </section>
</template>

<script lang="ts">
import NavTab from '@/components/2d/common/navTab/NavTab.vue'
import NavTabItem from '@/components/2d/common/navTab/NavTabItem.vue'
import Event from './event/Event.vue'
import { ref } from 'vue'
import { Ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
// configurator
import AxisLineChartConfigurator from './configurator/AxisLineChartConfigurator.vue'
import TextConfigurator from './configurator/TextConfigurator.vue'
import ShapeConfigurator from './configurator/ShapeConfigurator.vue'
import MediaConfigurator from './configurator/MediaConfigurator.vue'
import PieChartConfigurator from './configurator/PieChartConfigurator.vue'
import TableConfigurator from './configurator/TableConfigurator.vue'
import AxisPolarChartConfigurator from './configurator/AxisPolarChartConfigurator.vue'
import MultiPolarChartConfigurator from './configurator/MultiPolarChartConfigurator.vue'
import MultiGaugeChartConfigurator from './configurator/MultiGaugeChartConfigurator.vue'

import LineEl from '@/components/utils/common/LineEl.vue'
export default {
  name: 'ElementEditConfigurator',
  components: {
    LineEl,
    Event,
    NavTabItem,
    NavTab,
    AxisLineChartConfigurator,
    TextConfigurator,
    ShapeConfigurator,
    MediaConfigurator,
    PieChartConfigurator,
    TableConfigurator,
    AxisPolarChartConfigurator,
    MultiPolarChartConfigurator,
    MultiGaugeChartConfigurator
  },
  setup() {
    const store = useStore()
    const getters2D = useGetter(store, '2d', ['GET_CONFIGURATOR'])
    //property edit
    const propertyEditIndex: Ref<number> = ref<number>(0)

    return {
      propertyEditIndex,
      ...getters2D
    }
  }
}
</script>

<style scoped>
.property-edit-box {
  height: 100%;
  background: #25262d;
}
.nav-tab-header {
  height: 64px;
  color: #757a87;
}
.nav-tab-h-item {
  width: 80px;
  height: 100%;
  line-height: 64px;
}

.nav-tab-h-item.active {
  color: #f2f2f2;
  border-bottom: 2px solid #6582fe;
}
.event-wrap {
  height: calc(100% - 65px);
  overflow-y: auto;
}
</style>
