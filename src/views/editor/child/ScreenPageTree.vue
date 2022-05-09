<template>
  <!--screen page-->
  <nav-tab-item key="screenPage">
    <div class="screen-page-tree-box">
      <div class="add-screen-wrap box-border flex items-center justify-end">
        <img src="@/assets/images/editor_newscene_btn_dark.png" alt="" />
      </div>
      <layer-list :node="editorStore.screenPageTree">
        <template v-slot:prefix>
          <div></div>
        </template>
        <template v-slot:placeholder v-once>
          <div style="padding-right: 8px">
            <img src="@/assets/images/editor_page_icn_dark.png" />
          </div>
        </template>
        <template v-slot:suffix v-once>
          <div></div>
        </template>
        <template v-slot:folderPrefix v-once>
          <img src="~@/assets/images/editor_scene_icn_dark.png" style="margin-right: 8px" />
        </template>
        <template v-slot:folderSuffix>
          <img src="~@/assets/images/editor_newpage_btn_dark.png" />
        </template>
      </layer-list>
    </div>
  </nav-tab-item>
</template>

<script lang="ts">
import NavTabItem from '@/component/common/navTab/NavTabItem.vue'
import { useStore } from 'vuex'
import { useState } from '@/store/helper'
export default {
  name: 'ScreenPageTree',
  components: {
    NavTabItem
  },
  setup() {
    const sotre = useStore()
    const editorStore = useState(sotre, 'editor')
    return { editorStore }
  }
}
</script>

<style scoped>
/* page */
.add-screen-wrap {
  padding: 0 16px;
  height: 48px;
  width: 100%;
}
</style>
