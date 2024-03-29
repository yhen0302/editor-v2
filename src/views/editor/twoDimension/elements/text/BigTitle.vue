<template>
  <div
    class="text-wrapper pointer-events-auto absolute flex"
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    draggable="false"
    :style="{
      width,
      height,
      left,
      top,
      backgroundColor: color,
      opacity,
      textAlign: align,
      alignItems: verticalAlign
    }"
    @click.stop
    @mousedown="onMouseDown"
    @wheel.stop.passive
    @scroll.stop
    ref="el"
  >
    <h1
      class="big-title flex-1"
      :class="fontStyle"
      :style="{
        color: fontColor,
        fontSize,
        fontFamily
      }"
      @dblclick.stop="dbClickText"
      ref="h1"
      @input="textElInput"
      @keydown.stop
      @keyup.stop
      @keypress.stop
    >
      {{ value }}
    </h1>
  </div>
</template>

<script lang="ts">
import { computed, ref, toRaw, watch } from 'vue'
import { hexColorToRgba, toPx } from '@/util/base'
import matrixMixin from '@/views/editor/twoDimension/elements/matrixMixin'

export default {
  name: 'BigTitle',
  props: ['node'],
  emits: ['select', 'append'],
  mixins: [matrixMixin],

  setup(props: any) {
    const h1 = ref<HTMLElement>()
    // exterior
    const color = computed(() => {
      return hexColorToRgba(
        props.node.option.transparencyColor.color,
        props.node.option.transparencyColor.transparency
      )
    })
    const opacity = computed(() => {
      return (props.node.option.transparency / 100).toFixed(2)
    })
    // font
    const fontColor = computed(() => {
      return props.node.option.textOption.color
    })
    const fontSize = computed(() => {
      return toPx(props.node.option.textOption.fontSize)
    })

    const fontFamily = computed(() => {
      return props.node.option.textOption.fontFamily
    })
    const fontStyle = computed(() => {
      return props.node.option.textOption.fontStyle
    })
    const align = computed(() => {
      return props.node.option.textOption.align
    })
    const verticalAlign = computed(() => {
      return props.node.option.textOption.verticalAlign
    })
    // value
    const value = computed(() => {
      return props.node.option.value
    })
    let dbClickText
    let textElInput
    // editor
    if (IS_EDITOR) {
      dbClickText = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement
        props!.node!.contentEditable = true
      }
      watch(
        () => props.node.contentEditable,
        (newVal, oldVal) => {
          h1.value!.contentEditable = String(newVal)
          if (newVal) h1.value?.focus()
        }
      )
      textElInput = (ev: FocusEvent) => {
        props!.node.option.value = (ev.target as HTMLElement).innerText
      }
    }

    return {
      color,
      opacity,
      value,
      fontColor,
      fontSize,
      fontFamily,
      fontStyle,
      align,
      verticalAlign,
      dbClickText,
      h1,
      textElInput
    }
  }
}
</script>

<style scoped>
.text-wrapper {
  overflow-y: scroll;
  overscroll-behavior-y: contain;
}
.weight {
  font-weight: bold;
}
.underline {
  text-decoration: underline;
}
.italic {
  font-style: oblique;
}
.big-title {
  outline: none;
  word-break: break-all;
}
</style>
