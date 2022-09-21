<template>
  <section id="app" :style="{ height: toPx(drawingBoard.height), width: toPx(drawingBoard.width) }">
    <div class="box-2d" :style="{ height: toPx(drawingBoard.height), width: toPx(drawingBoard.width) }">
      <component v-for="item in nodes" :key="item.id" :node="item" :is="item.type" :style="`pointer-events:${item.lock ? 'none' : 'auto'};`"></component>
    </div>
    <div class="box-3d">
      <canvas ref="canvasRenderer" class="renderer scene-3d" :width="drawingBoard.width" :height="drawingBoard.height"></canvas>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref, defineComponent } from 'vue'
import { toPx } from '../../../../src/share/util/base'

export default defineComponent({
  name: 'ElementParser',
  props: ['sceneTreeNodes', 'drawingBoard', 'modelUrls'],
  setup(props, ctx) {
    function flatTree(tree) {
      const arr = [],
        nodes = [...tree]
      let node
      // eslint-disable-next-line no-cond-assign
      while ((node = nodes.pop())) {
        if (node.children) nodes.push(...node.children)
        else {
          arr.push(node)
        }
      }
      return arr
    }
    const nodes = computed(() => {
      return flatTree(props.sceneTreeNodes[0].children[0]?.trees?.twoDimension) || []
    })
    const canvasRenderer = ref(null)
    onMounted(() => {
      console.log(props)

      const jsonParser = new Bol3D.JSONParser()
      jsonParser.parse(props.sceneTreeNodes[0].children[0].trees.threeDimension)
      // console.log(jsonParser.json, location.origin)
      let json = jsonParser.json
      // const tpParser = new Bol3D.TemplateParser()
      // tpParser.parse()
      // console.log('tpparser', tpParser)
      json = Object.assign(json, {
        modelUrls: props.modelUrls ? props.modelUrls : []
      })

      const container = new Bol3D.Container({
        container: canvasRenderer.value,
        publicPath: location.origin + '/edit/'
      })

      container.loadSceneByJSON({
        data: json,
        onProgress: (model) => {
          console.log('progress', model)
        },
        onLoad: (evt) => {
          console.log('onload', evt)
          window.container = evt
        }
      })
    })
    return { nodes, toPx, canvasRenderer }
  }
})
</script>

<style scoped>
#app {
  position: relative;
}
.box-2d {
  position: absolute;
  pointer-events: none;
  z-index: 10;
}
.box-3d {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.renderer {
  position: absolute;
}
</style>
