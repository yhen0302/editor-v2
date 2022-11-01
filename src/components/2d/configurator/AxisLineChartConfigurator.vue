<template>
  <div class='axis-line-chart property-box'>
    <base-position-configurator></base-position-configurator>
    <base-exterior-configurator></base-exterior-configurator>
    <chart-color-configurator></chart-color-configurator>
    <chart-data-configurator></chart-data-configurator>
    <chart-title-configurator></chart-title-configurator>
    <chart-grid-configurator></chart-grid-configurator>
    <chart-legend-configurator></chart-legend-configurator>
  </div>
</template>

<script>
import BasePositionConfigurator from '../baseConfigurator/BasePositionConfigurator'
import ChartColorConfigurator from '../baseConfigurator/ChartColorConfigurator'
import ChartTitleConfigurator from '../baseConfigurator/ChartTitleConfigurator'
import ChartGridConfigurator from '../baseConfigurator/ChartGridConfigurator'
import ChartLegendConfigurator from '../baseConfigurator/ChartLegendConfigurator'
import ChartDataConfigurator from '../baseConfigurator/ChartDataConfigurator'
import BaseExteriorConfigurator from '@/components/2d/baseConfigurator/BaseExteriorConfigurator'

export default {
  name: 'AxisLineChartConfigurator',
  components: {
    BaseExteriorConfigurator,
    ChartDataConfigurator,
    ChartLegendConfigurator,
    ChartGridConfigurator,
    ChartTitleConfigurator,
    ChartColorConfigurator,
    BasePositionConfigurator
  }
}
</script>

<style scoped></style>
