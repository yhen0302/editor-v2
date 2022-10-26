import { computed } from 'vue'
import { getColor } from '../../../../../src/share/util/node'

export default function(props) {
  const color = computed(() => {
    return getColor(props.node)
  })
  const opacity = computed(() => {
    return (props.node.option.transparency / 100).toFixed(2)
  })

  const boxShadow = computed(() => {
    return `${props.node.option.shadowX}px ${props.node.option.shadowY}px ${props.node.option.shadowBlur}px ${props.node.option.shadowColor}`
  })

  return {color,opacity,boxShadow}
}