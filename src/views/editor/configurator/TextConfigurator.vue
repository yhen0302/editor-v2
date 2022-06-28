`<template>
  <div class="text-configurator">
    <base-position-configurator></base-position-configurator>
    <base-exterior-configurator></base-exterior-configurator>
    <base-text-configurator></base-text-configurator>
  </div>
</template>

<script>
import BasePositionConfigurator from "../baseConfigurator/BasePositionConfigurator";
import BaseExteriorConfigurator from "@/views/editor/baseConfigurator/BaseExteriorConfigurator";
import BaseTextConfigurator from "@/views/editor/baseConfigurator/BaseTextConfigurator";

export default {
  name: "TextConfigurator",
  components: {BaseTextConfigurator, BaseExteriorConfigurator, BasePositionConfigurator}
}
</script>

<style scoped>

</style>