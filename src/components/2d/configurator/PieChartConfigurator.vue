<template>
  <div class="axis-line-chart property-box">
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
import ChartTitleConfigurator from '../baseConfigurator/ChartTitleConfigurator'
import ChartDataConfigurator from '../baseConfigurator/ChartDataConfigurator'
import ChartLegendConfigurator from '../baseConfigurator/ChartLegendConfigurator'
import BaseExteriorConfigurator from '@/components/2d/baseConfigurator/BaseExteriorConfigurator'

export default {
  name: 'PieChartConfigurator',
  components: {
    BaseExteriorConfigurator,
    ChartLegendConfigurator,
    ChartTitleConfigurator,
    ChartColorConfigurator,
    BasePositionConfigurator,
    ChartDataConfigurator
  }
}
</script>

<style scoped></style>
