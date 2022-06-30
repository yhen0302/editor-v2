<template>
  <div class="svg-icon-wrapper">
    <img :src="url" class="svg-icon" draggable="false">
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "SvgIcon",
  props: {
    url: String,
  },
}
</script>

<style scoped>
.svg-icon-wrapper {
  display: inline-block;
  width: 1em;
  height: 1em;
}

.svg-icon {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
</style>