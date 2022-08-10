<template>
  <div class="right-main">
    <div class="forms">
      <EditForms2D v-show="store.state.dimensionType === '2d'" />
      <EditForms3D v-show="store.state.dimensionType === '3d'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import LineEl from './utils/common/LineEl.vue'
import SceneTree from '@/components/utils/editmenu/SceneTree.vue'
import Trees2D from '@/components/2d/editmenu/Trees2D.vue'
import Trees3D from '@/components/3d/editmenu/Trees3D.vue'
import EditForms2D from '@/components/2d/editmenu/EditForms2D.vue'
import EditForms3D from '@/components/3d/editmenu/EditForms3D.vue'

import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'Right',
  components: {
    LineEl,
    Trees2D,
    Trees3D,
    SceneTree,
    EditForms2D,
    EditForms3D
  },
  setup() {
    const store = useStore()
    const pageIndex = ref(0)


    // 返回上级
    const goBack = () => {
      const e = event as any
      if (e.button != 0) return
      pageIndex.value--
      // 重置右下角表单
      EventsBus.emit('formsReset', {})
    }

    // 查看详情页
    EventsBus.on('pageEnter', (e: any) => {
      const { node, parent } = e
      // load page details --todo
      pageIndex.value++
      // update title
    })

    // 重置模板
    EventsBus.on('resetTemplate', () => {
      pageIndex.value = 0
    })

    return {
      store,
      pageIndex,
      goBack,
    }
  }
})
</script>

<style lang="postcss" scoped>
.right-main {
  @apply w-full h-full flex flex-col overflow-hidden;
}
.trees {
  width: 272px;
  height: 448px;
  min-height: 448px;
  background: #25262d;
  margin-bottom: 4px;
}
.header {
  height: 64px;
  @apply w-full flex items-center justify-center relative;
}
.title {
  width: 120px;
  max-width: 120px;
}
.title p {
  width: 120px;
  font-size: 14px;
  font-weight: 400;
  color: #f2f2f2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.scene-add-btn img {
  width: 16px;
  height: 16px;
}

.page-back-btn {
  width: 16px;
  height: 16px;
  left: 24px;
  @apply flex items-center justify-center absolute cursor-pointer;
}
.page-back-btn img {
  width: 16px;
  height: 16px;
}

.tree {
  height: calc(100% - 64px - 1px);
  @apply w-full overflow-hidden;
}

.forms {
  width: 272px;
  /*height: calc(100% - 448px - 4px);*/
  height: 100%;
  background: #25262d;
}
</style>
