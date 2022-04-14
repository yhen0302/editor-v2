<template>
  <section class="art-board" @wheel="onWheel">
    <section class="art-board-wrapper grid place-content-center" :style="{width:wrapperWidthPx,height:wrapperHeightPx}">
      <section class="art-board-box relative" :style="{width:widthPx,height:heightPx,transform:`scale(${scale})`}">
        <canvas class="canvas-renderer" :width="width" :height="height"></canvas>
        <div class="art-board-content"></div>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import {computed} from "vue";
import {Ref, ref} from "@vue/reactivity";

export default {
  name: "ArtBoard",
  props: {
    width: {type: Number, default: 1920},
    height: {type: Number, default: 1080},
  },
  setup(props) {
    // wheel
    const scale: Ref<number> = ref<number>(1)

    function onWheel(ev: WheelEvent) {
      if (ev.ctrlKey) {
        ev.deltaY > 0
            ? scale.value > .3
            ? scale.value -= .05
            : null
            : scale.value < 3
            ? scale.value += .05
            : null

        ev.preventDefault()

      }
    }

    // size
    const widthPx = computed(() => props.width + "px")
    const heightPx = computed(() => props.height + "px")
    const WHRatio = computed(()=>props.width/props.height)
    const wrapperWidthPx = computed(() => {
      let offset = 0
      if(scale>.8){
        offset =  props.height / 2 * scale.value
      }
     return  props.width * scale.value + offset + "px"
    })
    const wrapperHeightPx = computed(() => {
      let offset = 0
      if(scale>.8){
        offset =  props.height / 2 * scale.value
      }
      return props.height  + offset+ "px"
    })

    return {widthPx, heightPx, wrapperWidthPx, wrapperHeightPx, onWheel, scale}
  }
}
</script>

<style scoped>
.art-board {
  overflow: scroll;
}

.art-board-wrapper {
  background: #1B1B21;
}

.art-board-content {
  width: 100%;
  height: 100%;
  background: coral;
}

.art-board-content, .canvas-renderer {
  position: absolute;
}
</style>