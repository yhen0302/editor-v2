<template>
  <div class="multi-polar-chart property-box">
    <base-position-configurator></base-position-configurator>
    <base-exterior-configurator></base-exterior-configurator>
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
import BaseExteriorConfigurator from '@/components/2d/baseConfigurator/BaseExteriorConfigurator'
export default {
  name: 'MultiPolarChartConfigurator',
  components: { BaseExteriorConfigurator, ChartTitleConfigurator, ChartLegendConfigurator, ChartDataConfigurator, ChartColorConfigurator, BasePositionConfigurator }
}
</script>

<style scoped>

</style>