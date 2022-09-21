<template>
  <div class="nav-menu-3d-main">
    <div class="title">
      <img src="@/assets/images/main/left/editor_card_backarrow_btn_dark.png" v-show="state3D.leftNavPageIndex != 0" @click="goBack" />
      <p>{{ state3D.leftNavTitle }}</p>
    </div>

    <LineEl :color="'#363741'" />

    <div class="content"><component :is="stateGlobal.selectBarToolType" v-if="stateGlobal.dimensionType == '3d' && stateGlobal.selectBarToolType" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LineEl from '@/components/utils/common/LineEl.vue'
import NavMenuElement3D from './navmenus/NavMenuElement3D.vue'
import NavMenuScenes3D from './navmenus/NavMenuScenes3D.vue'
import NavMenuPostProcesses3D from './navmenus/NavMenuPostProcesses3D.vue'
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { toolbarType2Title } from '@/store/util'

export default defineComponent({
  name: 'NavMenu3D',
  components: {
    LineEl,
    NavMenuElement3D,
    NavMenuScenes3D,
    NavMenuPostProcesses3D
  },
  setup() {
    const store = useStore()

    const state3D = useState(store, '3d')
    const stateGlobal = useState(store, 'global')
    const mutations3D = useMutation(store, '3d', ['CHANGE_NAV_PAGE_INDEX', 'CHANGE_NAV_TITLE', 'CHANGE_NAV_DETAILS_TYPE'])

    const goBack = () => {
      mutations3D.CHANGE_NAV_PAGE_INDEX({ index: state3D.leftNavPageIndex - 1 })
      mutations3D.CHANGE_NAV_TITLE({ name: toolbarType2Title(stateGlobal.selectBarToolType) })
      mutations3D.CHANGE_NAV_DETAILS_TYPE({ type: '' })
    }

    return {
      state3D,
      stateGlobal,
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
