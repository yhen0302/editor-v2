import { toPx } from '../../../../src/share/util/base'
import { computed, nextTick, watch, getCurrentInstance } from 'vue'
import { ComputedRef } from '@vue/reactivity'

export default function useMatrix(props, { emit }) {
  const instance = getCurrentInstance()!

  function onMouseDown(ev: MouseEvent) {
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

  type matrix = 'left' | 'width' | 'height' | 'top' | 'rotate'
  const matrixComputedMap: { [key in matrix]?: ComputedRef } = {};
  ['left', 'width', 'height', 'top'].forEach((k) => {
    matrixComputedMap[k] = computed(() => toPx(props.node.option.matrixOption[k]))
  })
  matrixComputedMap.rotate = computed(() => `rotate(${props.node.option.matrixOption.rotate}deg)`)

  watch(
    () => props.node.option.matrixOption,
    () => {
      nextTick().then(() => {
        if (IS_EDITOR) (instance as any).appContext.config.globalProperties.$updateRect()
      })
    },
    {
      deep: true
    }
  )

  // animationStyle
  const animationStyle = computed(()=>{
    return props.node.option.animationStyle|| {}
  })


  return {
    ...matrixComputedMap,
    onMouseDown,
    animationStyle
  }
}
