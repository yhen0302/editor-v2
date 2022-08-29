<template>
  <div class="multi-gauge-chart property-box">
    <base-position-configurator></base-position-configurator>
    <chart-color-configurator></chart-color-configurator>
    <chart-data-configurator></chart-data-configurator>
    <chart-title-configurator></chart-title-configurator>
    <chart-legend-configurator></chart-legend-configurator>
  </div>
</template>

<script>
import BasePositionConfigurator from '../baseConfigurator/BasePositionConfigurator'
import ChartColorConfigurator from '../baseConfigurator/ChartColorConfigurator'
import ChartDataConfigurator from '@/components/2d/baseConfigurator/ChartDataConfigurator'
import ChartLegendConfigurator from '@/components/2d/baseConfigurator/ChartLegendConfigurator'
import ChartTitleConfigurator from '@/components/2d/baseConfigurator/ChartTitleConfigurator'
export default {
  name: 'MultiGaugeChartConfigurator',
  components: { ChartTitleConfigurator, ChartLegendConfigurator, ChartDataConfigurator, ChartColorConfigurator, BasePositionConfigurator }

}
</script>

<style scoped>

</style>