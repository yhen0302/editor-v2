<template>
  <div class="axis-line-chart property-box">
    <base-position-configurator></base-position-configurator>
    <chart-color-configurator></chart-color-configurator>
    <chart-title-configurator></chart-title-configurator>
    <chart-legend-configurator></chart-legend-configurator>
  </div>
</template>

<script>
import BasePositionConfigurator from '../baseConfigurator/BasePositionConfigurator'
import ChartColorConfigurator from '../baseConfigurator/ChartColorConfigurator'
import ChartTitleConfigurator from '../baseConfigurator/ChartTitleConfigurator'
import ChartGridConfigurator from '../baseConfigurator/ChartGridConfigurator'
import ChartLegendConfigurator from '../baseConfigurator/ChartLegendConfigurator'

export default {
  name: 'PieChartConfigurator',
  components: {
    ChartLegendConfigurator,
    ChartTitleConfigurator,
    ChartColorConfigurator,
    BasePositionConfigurator
  }
}
</script>

<style scoped></style>
