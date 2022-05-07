<template>
  <div class="nav-menu-2d-main">
    <div class="title">
      <img src="@/assets/images/main/left/editor_card_backarrow_btn_dark.png" v-show="pageIndex != 0" @click="goBack" />
      <p>{{ title }}</p>
    </div>

    <LineEl :color="'#363741'" />

    <div class="content"><component :is="type" v-if="type != ''" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { EventsBus } from '@/core/EventsBus'
import LineEl from '@/components/utils/common/LineEl.vue'
import NavMenuText2D from './navmenus/NavMenuText2D.vue'
import NavMenuShape2D from './navmenus/NavMenuShape2D.vue'
import NavMenuMedia2D from './navmenus/NavMenuMedia2D.vue'
import NavMenuChart2D from './navmenus/NavMenuChart2D.vue'

export default defineComponent({
  name: 'NavMenu2D',
  components: {
    LineEl,
    NavMenuText2D,
    NavMenuShape2D,
    NavMenuMedia2D,
    NavMenuChart2D
  },
  setup() {
    const title = ref('')
    const type = ref('')
    const pageIndex = ref(0)

    EventsBus.on('navMenuChanged', (e: any) => {
      if (e.dimension != '2d') return

      title.value = e.name
      pageIndex.value = 0

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

    EventsBus.on('navMenuItemChoosed', (e: any) => {
      if (e.dimension != '2d') return
      pageIndex.value = e.pageIndex
    })

    const goBack = () => {
      pageIndex.value = 0

      EventsBus.emit('navMenuGoBack', {
        dimension: '2d',
        pageIndex: pageIndex.value
      })
    }

    return {
      title,
      type,
      pageIndex,
      goBack
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-menu-2d-main {
  @apply w-full h-full;
}
.title {
  height: 64px;
  @apply flex w-full items-center justify-center;
}
.title p {
  width: 208px;
  height: 24px;
  @apply text-gray-light;
}
.content {
  height: calc(100% - 64px - 1px);
  @apply overflow-y-auto overflow-x-hidden w-full;
}
.title img {
  left: 20px;
  @apply absolute cursor-pointer;
}
</style>
