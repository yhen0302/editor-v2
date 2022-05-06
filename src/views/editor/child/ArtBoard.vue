<template>
  <section
    class="art-board"
    ref="artBoard"
    tabindex="0"
    :class="{ 'cursor-grab': keySpace, 'cursor-grabbing': isMoving }"
    @wheel.capture.prevent="onWheel"
    @keydown.space.prevent.capture="spaceDown"
    @mouseenter.prevent="enterBoard"
    @mouseleave.prevent="leaveBoard"
    @mousemove="boardMoveEvent"
    @mousedown="boardDownEvent"
    @mouseup="boardUpEvent"
    @keyup.space.prevent.capture="spaceUp"
    v-dropable
  >
    <section class="art-board-wrapper grid place-content-center" :style="{ width: wrapperWidthPx, height: wrapperHeightPx }">
      <section class="art-board-box relative" :style="{ width: widthPx, height: heightPx, transform: `scale(${editorStore.artBoardScale})` }">
        <canvas ref="scene" class="canvas-renderer" :width="width" :height="height"></canvas>
        <div class="art-board-content"></div>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { computed, markRaw, nextTick, onMounted, watch } from 'vue'
import { Ref, ref, reactive } from '@vue/reactivity'
import { cssUnitToNumber, getCss } from '@/util/base'
import { EditorStore } from '@/store/editor/type'
import { useMutation, useState } from '@/store/helper'
import { EditorMutation } from '@/store/editor/mutations'
import { useStore } from 'vuex'
import { loadScene } from '@/core/3d'

declare const Bol3D: any

export default {
  name: 'ArtBoard',
  props: {
    width: { type: Number, default: 1920 },
    height: { type: Number, default: 1080 }
  },
  setup(props: any) {
    // store
    const editorStore: EditorStore = useState(useStore(), 'editor')
    const editorMutation = useMutation(useStore(), 'editor', [EditorMutation.CHANGE_ART_BOARD_SCALE])

    const artBoard: Ref<HTMLDivElement | null> = ref<HTMLDivElement | null>(null)
    const scene: Ref<HTMLCanvasElement | null> = ref<HTMLCanvasElement | null>(null)

    // wheel
    const keySpace = ref(false)

    function onWheel(ev: WheelEvent) {
      if (ev.ctrlKey || keySpace.value) {
        ev.deltaY > 0
          ? editorStore.artBoardScale > 0.3
            ? editorMutation.CHANGE_ART_BOARD_SCALE({ artBoardScale: editorStore.artBoardScale - 0.05 })
            : null
          : editorStore.artBoardScale < 3
          ? editorMutation.CHANGE_ART_BOARD_SCALE({ artBoardScale: editorStore.artBoardScale + 0.05 })
          : null
      }
    }

    // size
    const widthPx = computed(() => props.width + 'px')
    const heightPx = computed(() => props.height + 'px')

    const wrapperWidthPx = computed(() => {
      let offset: number = Number(artBoard.value?.getBoundingClientRect().width) * 2
      return props.width * editorStore.artBoardScale + offset + 'px'
    })
    const wrapperHeightPx = computed(() => {
      let offset: number = Number(artBoard.value?.getBoundingClientRect().height) * 2
      return props.height * editorStore.artBoardScale + offset + 'px'
    })

    nextTick(() => {
      if (artBoard.value) {
        artBoard.value.scrollTo(
          Number(((cssUnitToNumber(wrapperWidthPx.value) - cssUnitToNumber(getCss(artBoard.value, 'width') as string)) / 2).toFixed()),
          Number(((cssUnitToNumber(wrapperHeightPx.value) - cssUnitToNumber(getCss(artBoard.value, 'height') as string)) / 2).toFixed())
        )
      }
    })
    // move
    let isForces = false,
      isMoving = ref(false),
      preX = 0,
      preY = 0

    // const move = reactive()
    // mouse
    function boardDownEvent(ev: MouseEvent) {
      if (keySpace.value) {
        isMoving.value = true
        preX = ev.pageX
        preY = ev.pageY
      }
    }

    function boardMoveEvent(ev: MouseEvent) {
      if (isMoving.value) {
        let offsetX = ev.pageX - preX,
          offsetY = ev.pageY - preY
        if (artBoard.value) {
          artBoard.value.scrollLeft -= offsetX
          artBoard.value.scrollTop -= offsetY
        }
        preX = ev.pageX
        preY = ev.pageY
      }
    }

    function boardUpEvent(ev: MouseEvent) {
      isMoving.value = false
    }

    function enterBoard(ev: MouseEvent) {
      isForces = true
      artBoard.value?.focus()
    }

    function leaveBoard(ev: MouseEvent) {
      isForces = false
      keySpace.value = false
      artBoard.value?.blur()
    }

    // key
    function spaceDown(ev: KeyboardEvent) {
      !keySpace.value ? (keySpace.value = true) : null
    }

    function spaceUp(ev: KeyboardEvent) {
      keySpace.value ? (keySpace.value = false) : null
    }

    // mounted
    onMounted(() => {
      const publicPath = './'
      const modelUrls = [
        // NeiBu
        // 'models/HangKong/NeiBu/FeiJi_02.glb',
        // 'models/HangKong/NeiBu/FeiJi_03.glb',
        // 'models/HangKong/NeiBu/FJ_01.glb',
        // 'models/HangKong/NeiBu/FJ_02.glb',
        // 'models/HangKong/NeiBu/NeiBu.glb',
        // 'models/HangKong/NeiBu/NeiBu01.glb',
        // 'models/HangKong/NeiBu/NeiBu02.glb',
        // 'models/HangKong/NeiBu/NeiBu03.glb',
        // 'models/HangKong/NeiBu/NeiBu04.glb',
        // 'models/HangKong/NeiBu/NeiBu05.glb',
        // 'models/HangKong/NeiBu/Qiang.glb',
        // ChangJing
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
      // size
      widthPx,
      heightPx,
      wrapperWidthPx,
      wrapperHeightPx,
      editorStore,
      artBoard,
      // wheel
      onWheel,
      // move
      keySpace,
      boardMoveEvent,
      enterBoard,
      leaveBoard,
      boardDownEvent,
      boardUpEvent,
      spaceUp,
      spaceDown,
      isMoving,
      scene
    }
  }
}
</script>

<style scoped>
.art-board {
  overflow: scroll;
  outline: none;
}

.art-board::-webkit-scrollbar {
  background: #1b1b21;
  width: 5px;
  height: 5px;
}

.art-board::-webkit-scrollbar-thumb {
  background: #c2c2c2;
  border-radius: 10px;
  width: 10px;
}

.art-board::-webkit-scrollbar-corner {
  background: transparent;
}

.cursor-grab {
  cursor: grab;
}
.cursor-grabbing {
  cursor: grabbing;
}
.art-board-wrapper {
  background: #1b1b21;
}

.art-board-content {
  width: 100%;
  height: 100%;
  background: coral;
}

.art-board-content,
.canvas-renderer {
  position: absolute;
}
</style>
