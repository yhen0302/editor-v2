import { computed } from 'vue'

export default function(props) {
  const src = computed(() => props.node.option.src)

  return {src}
}