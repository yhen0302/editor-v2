<template>
  <section id="app" :style="{ height: toPx(drawingBoard.height), width: toPx(drawingBoard.width) }">
    <div class="box-2d" :style="{ height: toPx(drawingBoard.height), width: toPx(drawingBoard.width) }">
      <component v-for="item in nodes" :key="item.id" :node="item" :is="item.type"></component>
    </div>
    <canvas ref="canvasRenderer" class="renderer" :width="drawingBoard.width" :height="drawingBoard.height"></canvas>
  </section>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { toPx } from '../../../../src/share/util/base'
import { importScene } from '../../../../src/core/3d/importIndex'

export default {
  name: 'ElementParser',
  props: ['pageTreeNodes', 'drawingBoard'],
  setup(props, ctx) {
    function flatTree(tree) {
      const arr = [],
        nodes = [...tree]
      let node
      // eslint-disable-next-line no-cond-assign
      while ((node = nodes.pop())) {
        if(node.children)nodes.push(...node.children)
        else{arr.push(node)}
      }
      return arr
    }
    const nodes = computed(() => {
      return flatTree(props.pageTreeNodes[0].children[0]?.trees?.twoDimension) || []
    })
    const canvasRenderer = ref(null)
    onMounted(() => {
      console.log(props.pageTreeNodes[0])
      // importScene(canvasRenderer.value, props.pageTreeNodes[0])
    })
    return { nodes, toPx, canvasRenderer }
  }
}
</script>

<style scoped>
#app {
  position: relative;
}
.box-2d {
  pointer-events: none;
  position: absolute;
  z-index: 10;
}
.renderer {
  position: absolute;
}
</style>
