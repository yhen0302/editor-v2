<template>
  <div class="nav-menu-3d-main">
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
import LineEl from '@/components/utils/common/LineEl.vue'
import { EventsBus } from '@/core/EventsBus'
import NavMenuElement3D from './navmenus/NavMenuElement3D.vue'
import NavMenuScenes3D from './navmenus/NavMenuScenes3D.vue'
import NavMenuPostProcesses3D from './navmenus/NavMenuPostProcesses3D.vue'

export default defineComponent({
  name: 'NavMenu3D',
  components: {
    LineEl,
    NavMenuElement3D,
    NavMenuScenes3D,
    NavMenuPostProcesses3D
  },
  setup() {
    const title = ref('')
    const type = ref('')
    const pageIndex = ref(0)

    EventsBus.on('navMenuChanged', (e: any) => {
      if (e.dimension != '3d') return

      title.value = e.name
      pageIndex.value = 0

      switch (e.type) {
        case 'element':
          type.value = 'NavMenuElement3D'
          break
        case 'scenes':
          type.value = 'NavMenuScenes3D'
          break
        case 'afterProcess':
          type.value = 'NavMenuPostProcesses3D'
          break
      }
    })

    EventsBus.on('navMenuItemChoosed', (e: any) => {
      if (e.dimension != '3d') return
      pageIndex.value = e.pageIndex
      title.value = e.name
    })

    const goBack = () => {
      pageIndex.value = 0

      switch (type.value) {
        case 'NavMenuElement3D':
          title.value = '添加元素'
          break
        case 'NavMenuScenes3D':
          title.value = '场景配置'
          break
      }

      EventsBus.emit('navMenuGoBack', {
        dimension: '3d',
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
.nav-menu-3d-main {
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
