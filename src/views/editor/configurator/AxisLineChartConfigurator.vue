<template>
  <div class="axis-line-chart">
    <base-position-configurator></base-position-configurator>
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
import ChartDataConfigurator from "@/views/editor/baseConfigurator/ChartDataConfigurator";

export default {
  name: 'AxisLineChartConfigurator',
  components: {
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
