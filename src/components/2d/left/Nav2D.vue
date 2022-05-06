<template>
  <div class="nav-2d-main">
    <div v-for="item in navList" class="select-item relative" :class="{ active: item.type === store.state.selectBarToolType }" @click="barToolTypeChange(item.type, item.name)" :key="item">
      <TipButton :name="item.name" :active="item.type === store.state.selectBarToolType" :icon="item.icon"></TipButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import TipButton from '@/components/utils/TipButton.vue'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'Nav2D',
  components: {
    TipButton
  },
  setup() {
    const store = useStore()

    const navList = ref([
      { icon: require('@/assets/images/main/left/editor_text_btn_dark.png'), name: '文本', type: 'text' },
      { icon: require('@/assets/images/main/left/editor_shape_btn_dark.png'), name: '形状', type: 'shape' },
      { icon: require('@/assets/images/main/left/editor_media_btn_dark.png'), name: '多媒体', type: 'media' },
      { icon: require('@/assets/images/main/left/editor_chart_btn_dark.png'), name: '图表', type: 'chart' }
    ])

    const barToolTypeChange = (type: string, name: string) => {
      store.state.selectBarToolType === type ? (store.state.selectBarToolType = '') : (store.state.selectBarToolType = type)

      nextTick(() => {
        EventsBus.emit('navMenuChanged', {
          dimension: '2d',
          type,
          name
        })
      })
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
.nav-2d-main {
  @apply w-full h-full flex-row;
}
.select-item {
  width: 60px;
  height: 60px;
  padding: 16px 4px;
  box-sizing: border-box;
}
</style>
