<template>
  <div class="nav-menu-2d-main">
    <div class="title">{{ title }}</div>

    <component :is="type" v-if="type != ''" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'NavMenu2D',
  components: {},
  setup() {
    const title = ref('')
    const type = ref('')

    EventsBus.on('navMenuChanged', (e: any) => {
      if (e.dimension != '2d') return

      title.value = e.name

      switch (e.type) {
        case 'text':
          type.value = 'NavMenuText2D'
          break
        case 'shape':
          type.value = 'NavMenuShape2D'
          break
        case 'media':
          type.value = 'NavMenuMedia2D'
          break
        case 'chart':
          type.value = 'NavMenuChart2D'
          break
      }
    })

    return {
      title,
      type
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-menu-2d-main {
}
</style>
