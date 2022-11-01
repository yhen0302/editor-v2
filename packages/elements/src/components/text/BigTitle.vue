<template>
  <div
    class="text-wrapper absolute flex"
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    draggable="false"
    :style="{
      width,
      height,
      left,
      top,
      background: color,
      opacity,
      textAlign: align,
      transform: rotate,
      alignItems: verticalAlign,
      ...borderRadius,
            ...animationStyle

    }"
    @dblclick.stop="dbClickText"
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
import baseTextHook from './baseTextHook'
import useMatrix from '../useMatrix'
import useBorderRadius from '../useBorderRadius'

export default {
  name: 'BigTitle',
  props: ['node'],
  emits: ['select', 'append'],

  setup(props: any,context) {
    return {
      ...baseTextHook(props),
      ...useMatrix(props,context),
      ...useBorderRadius(props)

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
