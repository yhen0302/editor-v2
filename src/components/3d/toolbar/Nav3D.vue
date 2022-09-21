<template>
  <div class="nav-3d-main">
    <div
      v-for="item in navList"
      class="select-item relative"
      :class="{ active: item.type === itemType && stateGlobal.selectBarToolType && stateGlobal.dimensionType == '3d' }"
      @click="barToolTypeChange(item.type, item.name)"
      :key="item"
    >
      <TipButton :name="item.name" :active="item.type === itemType && stateGlobal.selectBarToolType && stateGlobal.dimensionType == '3d'" :icon="item.icon"></TipButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import TipButton from '@/components/utils/TipButton.vue'
import { useMutation, useState } from '@/store/helper'
import { nodeType2ToolBarType } from '@/store/util'

export default defineComponent({
  name: 'Nav3D',
  components: { TipButton },
  setup() {
    const store = useStore()

    const stateGlobal = useState(store, 'global')

    const navList = ref([
      {
        icon: require('@/assets/images/main/left/editor_model_btn_dark.png'),
        name: '添加元素',
        type: 'element'
      },
      {
        icon: require('@/assets/images/main/left/editor_sceneeffect_btn_dark.png'),
        name: '场景配置',
        type: 'scenes'
      },
      {
        icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'),
        name: '后处理',
        type: 'afterProcess'
      }
    ])

    const itemType = ref('')

    const mutations = useMutation(store, 'global', ['CHANGE_SELECT_BAR_TOOL_TYPE', 'CHANGE_DIMENSION'])
    const mutations3D = useMutation(store, '3d', ['CHANGE_NAV_TITLE', 'CHANGE_NAV_PAGE_INDEX'])

    const barToolTypeChange = (type: string, name: string) => {
      // 样式type
      itemType.value = type
      // 2d/3d
      mutations.CHANGE_DIMENSION({ dimensionType: '3d' })
      // toolbarType
      mutations.CHANGE_SELECT_BAR_TOOL_TYPE({ selectBarToolType: nodeType2ToolBarType(type) })
      // title
      mutations3D.CHANGE_NAV_TITLE({ name })
      // pageIndex
      mutations3D.CHANGE_NAV_PAGE_INDEX({ index: 0 })
    }

    return {
      navList,
      barToolTypeChange,
      itemType,
      stateGlobal
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-3d-main {
  @apply w-full h-full flex-row;
}
.select-item {
  width: 56px;
  height: 56px;
  margin: 0 4px 4px 4px;
  box-sizing: border-box;
}

.test {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  /* z-index: 2; */
  background: red;
}
</style>
