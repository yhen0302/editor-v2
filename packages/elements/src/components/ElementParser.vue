<template>
  <section id="app" :style='{height:toPx(drawingBoard.height),width:toPx(drawingBoard.width)}'>
    <component
      v-for="item in nodes"
      :key="item.id"
      :node="item"
      :is="node.type"
    ></component>
  </section>
</template>

<script>
import { computed } from 'vue'
import {toPx} from './util/base'
export default {
  name: 'ElementParser',
  props: ['pageTreeNodes','drawingBoard'],
  setup(props, ctx) {
    console.log('absd123')
    const nodes = computed(()=>{
      return props.pageTreeNodes[0].children[0]?.trees?.twoDimension || []
    })
    console.log(props)
    return {nodes,toPx}
  }
}
</script>

<style scoped>
#app{
  position: relative;
}
</style>
