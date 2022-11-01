<template>
  <div
    class='text-wrapper absolute flex'
    v-drag='{ rect: node.option.matrixOption, select: node.select }'
    draggable='false'
    :style='{
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
    }'
    @click.stop
    @mousedown='onMouseDown'
    @wheel.stop.passive
    @scroll.stop
    ref='el'
    @dblclick.stop='dbClickText'
  >
    <img src='' class='emitter-icon absolute' draggable='false'
         v-show='Object.keys(node.option.emitters).length > 0' />
    <h3
      class='big-title flex-1'
      :class='fontStyle'
      :style='{
        color: fontColor,
        fontSize,
        fontFamily
      }'
      ref='h1'
      @input='textElInput'
      @keydown.stop
      @keyup.stop
      @keypress.stop
    >
      {{ value }}
    </h3>
  </div>
</template>

<script lang='ts'>
import baseTextHook from './baseTextHook'
import useMatrix from '../useMatrix'
import useBorderRadius from '../useBorderRadius'

export default {
  name: 'BaseTitle',
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

.emitter-icon {
  right: 0;
  top: 0;
  width: 50px;
}
</style>
