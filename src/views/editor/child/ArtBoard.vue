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
    <section class="art-board-wrapper grid place-content-center"
             :style="{ width: wrapperWidthPx, height: wrapperHeightPx }">
      <section class="art-board-box relative"
               :style="{ width: widthPx, height: heightPx, transform: `scale(${editorStore.artBoardConfig.artBoardScale})` }">

        <slot name="3dContent" :rect="{width,height}"></slot>
        <slot name="2dContent"></slot>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import {computed, getCurrentInstance, markRaw, nextTick, onMounted, SetupContext, watch} from 'vue'
import {Ref, ref, reactive} from '@vue/reactivity'
import {cssUnitToNumber, debounce, getCss} from '@/util/base'
import {EditorStore} from '@/store/editor/type'
import {useMutation, useState} from '@/store/helper'
import {EditorMutation} from '@/store/editor/mutations'
import {useStore} from 'vuex'
import {loadScene} from '@/core/3d'
import {ComponentInternalInstance} from '@vue/runtime-core'

declare const Bol3D: any

export default {
  name: 'ArtBoard',
  props: {
    width: {type: Number, default: 1920},
    height: {type: Number, default: 1080}
  },
  setup(props: any, context: SetupContext) {
    const app: ComponentInternalInstance = getCurrentInstance() as ComponentInternalInstance
    // store
    const editorStore: EditorStore = useState(useStore(), 'editor')
    const editorMutation = useMutation(useStore(), 'editor', [EditorMutation.CHANGE_ART_BOARD_SCALE])

    const artBoard: Ref<HTMLDivElement | null> = ref<HTMLDivElement | null>(null)

    // wheel
    const keySpace = ref(false)

    function onWheel(ev: WheelEvent) {
      if (ev.ctrlKey || keySpace.value) {
        ev.deltaY > 0
            ? editorStore.artBoardConfig.artBoardScale > 0.3
            ? editorMutation.CHANGE_ART_BOARD_SCALE({artBoardScale: editorStore.artBoardConfig.artBoardScale - 0.05})
            : null
            : editorStore.artBoardConfig.artBoardScale < 3
            ? editorMutation.CHANGE_ART_BOARD_SCALE({artBoardScale: editorStore.artBoardConfig.artBoardScale + 0.05})
            : null
      }
    }

    // size
    const widthPx = computed(() => props.width + 'px')
    const heightPx = computed(() => props.height + 'px')

    const artBoardRect = ref<DOMRect>()
    const wrapperWidthPx = computed(() => {
      let offset: number = Number(artBoardRect.value?.width) * 2
      return props.width * editorStore.artBoardConfig.artBoardScale + offset + 'px'
    })
    const wrapperHeightPx = computed(() => {
      let offset: number = Number(artBoardRect.value?.height) * 2
      return props.height * editorStore.artBoardConfig.artBoardScale + offset + 'px'
    })

    onMounted(() => {
      artBoardRect.value = artBoard.value?.getBoundingClientRect()
    })

    function artBoardToCenter() {
      if (artBoard.value) {
        artBoard.value.scrollTo(
            Number(((cssUnitToNumber(wrapperWidthPx.value) - cssUnitToNumber(getCss(artBoard.value, 'width') as string)) / 2).toFixed()),
            Number(((cssUnitToNumber(wrapperHeightPx.value) - cssUnitToNumber(getCss(artBoard.value, 'height') as string)) / 2).toFixed())
        )
      }
    }

    const artBoardToCenterDebounce = debounce(function () {
      artBoardRect.value = artBoard.value?.getBoundingClientRect()
      console.log('update', artBoardRect.value)
      artBoardToCenter()
    }, 300)
    // resize
    window.addEventListener('resize', () => {
      artBoardToCenterDebounce()
    })

    nextTick(() => {
      artBoardToCenter()
    })
    // move
    let isForces = false,
        isMoving = ref(false),
        preX = 0,
        preY = 0

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



.art-board-content,
.canvas-renderer {
  position: absolute;
}
</style>
