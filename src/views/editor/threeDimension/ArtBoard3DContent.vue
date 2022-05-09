<template>
  <canvas ref="scene" class="canvas-renderer absolute " :width="width" :height="height">
  </canvas>
</template>

<script lang="ts">
import {onMounted, ref} from "vue";
import {Ref} from "@vue/reactivity";
import {loadScene} from "@/core/3d";
export default {
  name: "ArtBoard3DContent",
  props: ['height', 'width'],
  setup() {
    const scene: Ref<HTMLCanvasElement | null> = ref<HTMLCanvasElement | null>(null)

    onMounted(() => {
      const publicPath = './'
      const modelUrls = [
        'models/HangKong/ChangJing/CangFang.glb',
        'models/HangKong/ChangJing/Dimian_BOX.glb',
        'models/HangKong/ChangJing/DiMian.glb',
        'models/HangKong/ChangJing/FangC01.glb',
        'models/HangKong/ChangJing/FangH.glb',
        'models/HangKong/ChangJing/FangT28.glb',
        'models/HangKong/ChangJing/FangX.glb',
        'models/HangKong/ChangJing/PeiLou.glb',
        'models/HangKong/ChangJing/Tree.glb',
        'models/HangKong/ChangJing/WeiQiang.glb'
      ]

      loadScene({
        publicPath,
        modelUrls,
        domElement: scene.value,
        callback: (evt: any) => {
          console.log('container', evt)
        }
      })
    })

    return {
      scene
    }
  }
}
</script>

<style scoped>

</style>