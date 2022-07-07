<template>
  <section id="app" :style="{ height: toPx(drawingBoard.height), width: toPx(drawingBoard.width) }">
    <div class='box-2d' :style="{ height: toPx(drawingBoard.height), width: toPx(drawingBoard.width) }">
      <component v-for="item in nodes" :key="item.id" :node="item" :is="item.type"></component>
    </div>
    <canvas  ref='canvasRenderer' class='renderer' :width='drawingBoard.width' :height='drawingBoard.height'></canvas>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { toPx } from './util/base'
import { importScene } from '../../../../src/core/3d/importIndex'

export default {
  name: 'ElementParser',
  props: ['pageTreeNodes', 'drawingBoard'],
  setup(props, ctx) {
    const nodes = computed(() => {
      return props.pageTreeNodes[0].children[0]?.trees?.twoDimension || []
    })
    const canvasRenderer = ref(null)
    onMounted(()=>{
      importScene(canvasRenderer.value,props.pageTreeNodes[0].children[0].trees.threeDimension)
    })
    return { nodes, toPx,canvasRenderer}
  }
}
</script>

<style scoped>
#app {
  position: relative;
}
.box-2d{
  pointer-events: none;
  position: absolute;
  z-index: 10;
}
.renderer{
  position: absolute;
}
</style>
