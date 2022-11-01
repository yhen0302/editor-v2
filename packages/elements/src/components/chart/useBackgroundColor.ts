import { computed } from 'vue'
import { getColor } from '../../../../../src/share/util/node'

export default function(props){
  const color = computed(() => {
    return getColor(props.node)
  })
  return {color}
}