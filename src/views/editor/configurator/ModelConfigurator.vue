<template>
  <section class="model-configurator">
    <base-model-position-configurator></base-model-position-configurator>
  </section>
</template>

<script>
import BaseModelPositionConfigurator from "../baseConfigurator/BaseModelPositionConfigurator";
export default {
  name: "ModelConfigurator",
  components: {BaseModelPositionConfigurator}
}
</script>

<style scoped>

</style>