<template>
  <div class="drawing-borad-3d-main" v-if="domShow">
    <canvas ref="scene" class="scene-3d"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, nextTick } from 'vue'
import { loadScene } from '@/core/3d'
import { importScene } from '@/core/3d/importIndex'
import store from '../../../store'

export default defineComponent({
  name: 'DrawingBoard3D',
  components: {},
  setup() {
    const scene = ref(null)
    const domShow = ref(true)

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
          // console.log('container', evt)
        }
      })
    })

    watch(
      () => store.state.exportType,
      (v1, v2) => {
        domShow.value = false
        setTimeout(() => {
          domShow.value = true
          nextTick(() => {
            importScene(scene.value)
          })
        }, 200)
      },
      { deep: true }
    )

    return {
      scene,
      domShow
    }
  }
})
</script>

<style lang="postcss" scoped>
.drawing-borad-3d-main {
  @apply w-full h-full;
}
.scene-3d {
  left: 0;
  top: 0;
  @apply w-full h-full absolute;
}
</style>
