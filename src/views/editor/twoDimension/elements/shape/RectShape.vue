<template>
  <div class="rect-shape" :style="{width:matrixOption.width+'px',height:matrixOption.height+'px'}"></div>
</template>

<script lang="ts">

export default {
  name: 'RectShape',
  props: ["transparency", "transparencyColor","matrixOption"],
}
</script>

<style scoped></style>
