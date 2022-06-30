<template>
  <section class="media-configurator">
    <base-position-configurator></base-position-configurator>
    <base-upload-configurator></base-upload-configurator>
  </section>
</template>

<script>
import BasePositionConfigurator from "../baseConfigurator/BasePositionConfigurator";
import BaseUploadConfigurator from "@/views/editor/baseConfigurator/BaseUploadConfigurator";

export default {
  name: "MediaConfigurator",
  components: {BaseUploadConfigurator, BasePositionConfigurator}
}
</script>

<style scoped>
.media-configurator {

}
</style>