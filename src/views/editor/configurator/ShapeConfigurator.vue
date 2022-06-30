<template>
  <div class="shape-configurator">
    <base-position-configurator></base-position-configurator>
    <base-exterior-configurator></base-exterior-configurator>
  </div>
</template>

<script>
import BasePositionConfigurator from "../baseConfigurator/BasePositionConfigurator";
import BaseExteriorConfigurator from "../baseConfigurator/BaseExteriorConfigurator";

export default {
  name: "ShapeConfigurator",
  components: {BaseExteriorConfigurator, BasePositionConfigurator}
}
</script>

<style scoped>

</style>