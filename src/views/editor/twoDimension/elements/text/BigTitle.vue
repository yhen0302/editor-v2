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
    >
      {{ value }}
    </h1>
  </div>
</template>

<script lang="ts">
import { computed, ref, toRaw, watch } from 'vue'
import { hexColorToRgba, toPx } from '@/util/base'
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { EditorMutation } from '@/store/editor/mutations'

export default {
  name: 'BigTitle',
  props: ['node'],
  emits: ['select', 'append'],
  setup(props: any) {
    const store = useStore()
    const editorStore = useState(store, 'editor')
    const mutation = useMutation(store, 'editor', [
      EditorMutation.SELECT_2D_TREE_NODE
    ])
    const h1 = ref<HTMLElement>()
    // matrix
    const width = computed(() => toPx(props.node.option.matrixOption.width))
    const height = computed(() => toPx(props.node.option.matrixOption.height))
    const left = computed(() => toPx(props.node.option.matrixOption.left))
    const top = computed(() => toPx(props.node.option.matrixOption.top))
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
    if (IS_EDITOR) {
      dbClickText = (ev: MouseEvent) => {
        const target = ev.target as HTMLElement
        props!.node!.contentEditable = true
      }
      watch(
        () => props.node.contentEditable,
        (newVal, oldVal) => {
            h1.value!.contentEditable = String(newVal)
        }
      )
    }

    return {
      width,
      height,
      left,
      top,
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
      h1
    }
  },
  methods: {
    onMouseDown(ev: MouseEvent) {
      // @ts-ignore
      if (this.node.select) return
      if (ev.shiftKey) {
        // @ts-ignore
        this.$emit('append')
        return
      }
      // @ts-ignore
      this.$emit('select')
    }
  }
}
</script>

<style scoped>
.weight {
  font-weight: bold;
}
.underline {
  text-decoration: underline;
}
.italic {
  font-style: oblique;
}
</style>
