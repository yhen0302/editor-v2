<template>
  <section id="app" :style="{ height: toPx(drawingBoard.height), width: toPx(drawingBoard.width) }">
    <div class="box-2d" :style="{ height: toPx(drawingBoard.height), width: toPx(drawingBoard.width) }">
      <component v-for="item in nodes" :key="item.id" :node="item" :is="item.type" :style="{pointerEvents:item.lock?'none':'auto'}"
                 @click='eventHandle("click",item,sceneTreeNodes,nodes)' @dblclick='eventHandle("dblclick",item,sceneTreeNodes,nodes)'></component>
    </div>
    <div class="box-3d">
      <canvas ref="canvasRenderer" class="renderer scene-3d" :width="drawingBoard.width" :height="drawingBoard.height"></canvas>
    </div>
    <page-controller></page-controller>
  </section>
</template>

<script>
import { computed, onMounted, ref, defineComponent, watch, reactive } from 'vue'
import { flatTree, toPx } from '../../../../src/share/util/base'
import useScenesRouter from '../feature/scenesRouter'
import PageController from './PageController'
import { getScenePageIndexByRoute } from '../feature/createRouterOfScenesTree'
import eventHandle from '../feature/eventHandle'


export default defineComponent({
  name: 'ElementParser',
  props: ['sceneTreeNodes', 'drawingBoard', 'modelUrls'],
  components:{PageController},
  setup(props, ctx) {
    const [scenesRouter, curRoute] = useScenesRouter()
    const routeIndex = computed(() => {
      return getScenePageIndexByRoute(curRoute.value)
    })
    // ! 后期可做cache
    const nodes = computed(() => {
      return reactive(flatTree(props.sceneTreeNodes[routeIndex.value[0]].children[routeIndex.value[1]]?.trees?.twoDimension) || [])
    })
    watch(curRoute.value, (newVal) => {
      // do anything
    })
    const canvasRenderer = ref(null)
    onMounted(() => {
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
    return { nodes, toPx, canvasRenderer,eventHandle}
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
