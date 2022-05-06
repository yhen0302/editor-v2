<template>
  <span>{{ time }}</span>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { formatterDate } from '@/core/utils/base'

export default defineComponent({
  name: 'Timer',
  props: ['formatter'],
  setup(props: any) {
    const timeFormatterTemp = 'hh:mm'
    const time: Ref<string> = ref<string>(formatterDate(props.formatter) as string)

    setInterval(() => (time.value = formatterDate(timeFormatterTemp)), 1000)

    return {
      time,
      props
    }
  }
})
</script>
