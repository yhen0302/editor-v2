<template>
  <div class="header">
    <aside class="title">
      <img src="~@/assets/images/header/editor_back_big_btn_dark.png" class="cursor-pointer" />
      <p class="text-16 text-gray-light">智慧景区管理模板</p>
    </aside>

    <section class="content">
      <div class="content-left">
        <div class="back-front-btn-box">
          <img src="~@/assets/images/header/editor_nav_revocation_btn_dark.png" class="cursor-pointer" />
          <img src="~@/assets/images/header/editor_nav_remake_btn_dark.png" class="cursor-pointer" />
        </div>
        <div class="select-box">{{ scaleRatio }}%</div>
      </div>

      <div class="content-right" v-once>
        <TipButton :icon="require('@/assets/images/header/editor_preview_btn_dark.png')" name="1" tip-position="tb" @click="preview">
          <template v-slot:tip>
            <p>预览</p>
            <p>Ctrl+P</p>
          </template>
        </TipButton>
        <TipButton :icon="require('@/assets/images/header/editor_save_btn_dark.png')" name="1" tip-position="tb">
          <template v-slot:tip>
            <p>保存</p>
            <p>Ctrl+S</p>
          </template>
        </TipButton>
        <TipButton :icon="require('@/assets/images/header/editor_download_btn_dark.png')" name="1" tip-position="middle">
          <template v-slot:tip>
            <p>导出配置</p>
          </template>
        </TipButton>
        <TipButton :icon="require('@/assets/images/header/editor_import_btn_dark.png')" name="1" tip-position="middle">
          <template v-slot:tip>
            <p>导入配置</p>
          </template>
        </TipButton>
      </div>
    </section>

    <aside class="auto-save">
      <img class="save-icon cursor-pointer" src="~@/assets/images/header/editor_savetime_icn_dark.png" />
      <span class="text-gray-800 text-14">上次保存时间：<Timer formatter="hh:mm" /></span>
    </aside>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue'
import Timer from '@/components/utils/common/Timer.vue'
import TipButton from '@/components/utils/TipButton.vue'
import { useStore } from 'vuex'
import createPreviewTemplate from '@/core/utils/createPreviewTemplate'
import htmlToUrl from '@/core/utils/htmlToUrl'
import { clone } from '@/core/2d/util/base'
export default defineComponent({
  name: 'Header',
  components: {
    Timer,
    TipButton
  },
  setup() {
    const store = useStore()
    const scaleRatio = computed(() => {
      return (store.state.drawingBoard.scale * 100).toFixed()
    })

    async function preview() {
      const sdk = await (await fetch('/sdk/index.js')).text()
      const html = createPreviewTemplate(sdk, `console.log(EDITOR_SDK(${JSON.stringify({ pageTreeNodes: getAvailablePageTreeNodes(), drawingBoard: store.state.drawingBoard })}))`)
      console.log(window.open(htmlToUrl(html)))
    }

    function getAvailablePageTreeNodes() {
      const pageTreeNodes = clone(toRaw(store.state.pageTreeNodes))
      for (const scene of pageTreeNodes) {
        for (const page of scene.children) {
          deleteTreeParentQuote(page.trees.twoDimension)
        }
      }
      return pageTreeNodes
    }

    function deleteTreeParentQuote(tree: any) {
      let nodes = [...tree],
        node = null

      // eslint-disable-next-line no-cond-assign
      while (node = nodes.pop()) {
        node.parent = null
        if (node?.children?.length > 0) {
          nodes.unshift(...node?.children)
        }
      }
    }
    return {
      store,
      scaleRatio,
      preview
    }
  }
})
</script>

<style lang="postcss" scoped>
.header {
  height: 64px;
  @apply box-border w-full bg-gray-dark flex justify-between;
}

.title {
  width: 272px;
  padding-left: 16px;
  gap: 16px;
  @apply flex items-center h-full;
}
.content {
  padding: 0 10px;
  width: calc(100% - 272px - 272px);
  @apply box-border h-full flex items-center justify-between relative;
}
.content-left {
  @apply flex items-center;
}
.content-right {
  width: 242px;
  padding: 0 10px;
  @apply flex justify-between;
}
.back-front-btn-box {
  @apply flex items-center justify-between;
  width: 92px;
  padding: 0 10px;
  margin-right: 36px;
}
.select-box {
  @apply text-gray-light;
}
.auto-save {
  width: 272px;
  padding-right: 16px;
  @apply flex items-center h-full justify-end;
}
.save-icon {
  margin-right: 4px;
}
</style>
