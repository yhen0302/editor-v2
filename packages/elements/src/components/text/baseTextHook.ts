import { computed, ref, watch } from 'vue'
import { getColor } from '../../../../../src/share/util/node'
import { toPx } from '../../../../../src/share/util/base'

export default function(props) {
  const h1 = ref<HTMLElement>()

  // exterior
  const color = computed(() => {
    return getColor(props.node)
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
  return {color,
    opacity,
    fontColor,
    fontSize,
    fontFamily,
    fontStyle,
    align,
    verticalAlign,
    value,
    dbClickText,
    textElInput,
    h1
  }
}