<template>
  <div class="nav-media-2d" v-if="pageIndex === 0">
    <ToolBarItem v-for="item in dataList" :key="item.type" :icon="item.icon" :name="item.name" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'

export default defineComponent({
  name: 'NavMenuMedia2D',
  components: {
    ToolBarItem
  },
  setup() {
    const pageIndex = ref(0)
    const dataList = ref([
      { icon: require('@/assets/images/main/left/editor_media_video_btn_dark.png'), name: '视频', type: 'video' },
      { icon: require('@/assets/images/main/left/editor_media_picture_btn_dark.png'), name: '图片', type: 'image' }
    ])

    return {
      dataList,
      pageIndex
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-media-2d {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
</style>
