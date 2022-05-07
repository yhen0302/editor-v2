<template>
  <div class="nav-text-2d" v-if="pageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'

export default defineComponent({
  name: 'NavMenuText2D',
  components: {
    ToolBarItem
  },
  setup() {
    const pageIndex = ref(0)
    const dataList = ref([
      { icon: require('@/assets/images/main/left/editor_text_bigtitle_btn_dark.png'), name: '大标题', type: 'bigTitle' },
      { icon: require('@/assets/images/main/left/editor_text_smalltitle_btn_dark.png'), name: '小标题', type: 'smallTitle' },
      { icon: require('@/assets/images/main/left/editor_text_title_btn_dark.png'), name: '标题', type: 'title' },
      { icon: require('@/assets/images/main/left/editor_text_content_btn_dark.png'), name: '正文', type: 'content' }
    ])

    return {
      dataList,
      pageIndex
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-text-2d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
</style>
