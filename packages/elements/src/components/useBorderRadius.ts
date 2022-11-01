import { computed } from 'vue'
import { toPx } from '../../../../src/share/util/base'

export default function useBorderRadius(props){
  const borderRadius = computed(() => {
    return toPx({
      borderTopLeftRadius: props.node.option.matrixOption.borderTopLeftRadius,
      borderTopRightRadius: props.node.option.matrixOption.borderTopRightRadius,
      borderBottomLeftRadius: props.node.option.matrixOption.borderBottomLeftRadius,
      borderBottomRightRadius: props.node.option.matrixOption.borderBottomRightRadius
    })
  })
  return {
    borderRadius
  }
}