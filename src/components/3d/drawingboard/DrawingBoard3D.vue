<template>
  <div class="drawing-borad-3d-main" v-if="domShow">
    <canvas ref="scene" class="scene-3d" @contextmenu.stop></canvas>
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
      const publicPath = location.origin + location.pathname
      const modelUrls = [
        // 'models/HangKong/ChangJing/CangFang.glb',
        // 'models/HangKong/ChangJing/Dimian_BOX.glb',
        // 'models/HangKong/ChangJing/DiMian.glb',
        // 'models/HangKong/ChangJing/FangC01.glb',
        // 'models/HangKong/ChangJing/FangH.glb',
        // 'models/HangKong/ChangJing/FangT28.glb',
        // 'models/HangKong/ChangJing/FangX.glb',
        // 'models/HangKong/ChangJing/PeiLou.glb',
        // 'models/HangKong/ChangJing/Tree.glb',
        // 'models/HangKong/ChangJing/WeiQiang.glb'

        'models/GongChang/ChaChe.glb',
        'models/GongChang/ChangXian.glb',
        'models/GongChang/ChanXianJia.glb',
        'models/GongChang/ChiXiang_D.glb',
        'models/GongChang/DianNao.glb',
        'models/GongChang/DiMian.glb',
        'models/GongChang/G01.glb',
        'models/GongChang/HuoJia.glb',
        'models/GongChang/JiaXiang.glb',
        'models/GongChang/JiQi01.glb',
        'models/GongChang/JiQi02.glb',
        'models/GongChang/JiQi03.glb',
        'models/GongChang/Qiang.glb',
        'models/GongChang/Ren.glb',
        'models/GongChang/ZhiXiang.glb',
        'models/GongChang/Zhou.glb',
        'models/GongChang/ZuoZi.glb'
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
          store.state.template = JSON.parse(JSON.stringify(store.state.exportContent.template))
          store.state.pageTreeNodes = JSON.parse(JSON.stringify(store.state.exportContent.tree))
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
