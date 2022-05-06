<template>
  <div class="nav-3d-main">
    <div v-for="item in navList" class="select-item relative" :class="{ active: item.type === store.state.selectBarToolType }" @click="barToolTypeChange(item.type)" :key="item">
      <TipButton :name="item.name" :active="item.type === store.state.selectBarToolType" :icon="item.icon"></TipButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import TipButton from '@/components/utils/TipButton.vue'

export default defineComponent({
  name: 'Nav3D',
  components: { TipButton },
  setup() {
    const store = useStore()

    const navList = ref([
      { icon: require('@/assets/images/main/left/editor_model_btn_dark.png'), name: '添加元素', type: 'element' },
      { icon: require('@/assets/images/main/left/editor_sceneeffect_btn_dark.png'), name: '场景配置', type: 'scenes' },
      { icon: require('@/assets/images/main/left/editor_postprocessing_btn_dark.png'), name: '后处理', type: 'afterProcess' }
    ])

    const barToolTypeChange = (type: string) => {
      store.state.selectBarToolType === type ? (store.state.selectBarToolType = '') : (store.state.selectBarToolType = type)
    }

    return {
      navList,
      store,
      barToolTypeChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-3d-main {
  @apply w-full h-full flex-row;
}
.select-item {
  width: 60px;
  height: 60px;
  padding: 16px 4px;
  box-sizing: border-box;
}
</style>
