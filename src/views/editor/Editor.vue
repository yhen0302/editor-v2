<template>
  <div class="editor">
    <!--  上方导航工具  -->
    <nav-bar></nav-bar>
    <!--  2d, 3d 切换  -->
    <dimension-nav-bar></dimension-nav-bar>
    <!--  编辑区域  -->
    <section class="editor-area flex justify-between relative">
      <!--   组件选择   -->
      <select-area></select-area>
      <!--   画板   -->
      <art-board
        class="flex-1"
        :height="editorStore.artBoardConfig.height"
        :width="editorStore.artBoardConfig.width"
      >
        <template #2dContent>
          <art-board2-d-content></art-board2-d-content>
        </template>
        <template v-slot:3dContent="data">
          <art-board3-d-content
            :height="data.rect.height"
            :width="data.rect.width"
          ></art-board3-d-content>
        </template>
      </art-board>
      <!--   图层选择/编辑   -->
      <aside class="layer-option-area flex flex-col">
        <!--    图层管理    -->
        <section class="layer-tree-box">
          <nav-tab v-model:index="layerTreeIndex" class="h-full">
            <template v-slot:header>
              <ul class="nav-tab-header items-center flex text-14">
                <li
                  class="nav-tab-h-item cursor-pointer"
                  v-for="(item, index) in ['场景树', '场景页面']"
                  :class="{ active: layerTreeIndex === index }"
                  @click="layerTreeIndex = index"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </template>
            <!--screen tree-->
            <nav-tab-item key="screenTree" class="screen-tree-wrap">
              <div class="screen-tree-box">
                <div class="search-box flex items-center">
                  <img
                    class="search-icon"
                    width="16"
                    height="16"
                    src="~@/assets/images/editor_search_icn_dark.png"
                  />
                  <input
                    class="search-inp text-12"
                    type="text"
                    placeholder="搜索所有元素"
                  />
                </div>
                <!--二维图层树-->
                <layer-list2d
                  class="layer-tree"
                  v-show="editorStore.dimensionType === '2d'"
                ></layer-list2d>
                <!--三维图层树-->
                <layer-list
                  :node="editorStore.layerTree3d"
                  class="tree-3d layer-tree"
                  v-show="editorStore.dimensionType === '3d'"
                >
                  <template v-slot:prefix>
                    <div></div>
                  </template>
                  <template v-slot:placeholder v-once>
                    <div></div>
                  </template>
                  <template v-slot:suffix="node">
                    <div
                      class="suffix-icon-wrap cursor-pointer"
                      :class="{
                        'opacity-50': findHasFalseShowParentNode(node)
                      }"
                      @click.stop="hiddenControl(node)"
                    >
                      <img
                        src="~@/assets/images/editor_unseen_btn_dark.png"
                        v-if="node.show"
                      />
                      <img
                        src="~@/assets/images/editor_seen_btn_dark.png"
                        v-else
                      />
                    </div>
                  </template>
                  <template v-slot:folderPrefix>
                    <div></div>
                  </template>
                </layer-list>
              </div>
            </nav-tab-item>
            <nav-tab-item>
              <screen-page-tree></screen-page-tree>
            </nav-tab-item>
          </nav-tab>
        </section>
        <!--    元素编辑    -->
        <element-edit-configurator></element-edit-configurator>
      </aside>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Ref, ref } from '@vue/reactivity'
import { layerIcon } from '@/views/editor/localData'

import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { EditorStore } from '@/store/editor/type'
import { EditorGetter } from '@/store/editor/getters'
import ElementEditConfigurator from '@/views/editor/child/ElementEditConfigurator.vue'
import NavTabItem from '@/component/common/navTab/NavTabItem.vue'
import ScreenPageTree from '@/views/editor/child/ScreenPageTree.vue'
import LayerList from '@/plugins/layerPlugin/LayerList.vue'
import LayerList2d from '@/views/editor/twoDimension/LayerList2d.vue'
import ArtBoard from '@/views/editor/child/ArtBoard.vue'
import ArtBoard2DContent from '@/views/editor/twoDimension/ArtBoard2DContent.vue'
import ArtBoard3DContent from '@/views/editor/threeDimension/ArtBoard3DContent.vue'
import NavBar from '@/views/editor/child/NavBar.vue'
import DimensionNavBar from '@/views/editor/child/DimensionNavBar.vue'
import SelectArea from '@/views/editor/child/SelectArea.vue'
import NavTab from '@/component/common/navTab/NavTab.vue'

/* 编辑器 */
export default defineComponent({
  name: 'Editor',
  data() {
    return { testData: false }
  },
  components: {
    NavTab,
    SelectArea,
    DimensionNavBar,
    NavBar,
    ArtBoard3DContent,
    ArtBoard2DContent,
    ArtBoard,
    LayerList2d,
    LayerList,
    ScreenPageTree,
    NavTabItem,
    ElementEditConfigurator
  },
  setup() {
    const store = useStore()
    const editorStore = useState(store, 'editor') as EditorStore
    const editorGetter = useGetter(store, 'editor', [
      EditorGetter.GET_CONFIGURATOR
    ])
    // layer tree
    const layerTreeIndex: Ref<number> = ref<number>(0)

    function hiddenControl(node: any) {
      let n = findHasFalseShowParentNode(node)
      if (n) {
        n.show = true
      }

      node.show = !node.show
    }

    function findHasFalseShowParentNode(node: any) {
      while (node.parent) {
        if (node.parent.show === false) return node.parent
        node = node.parent
      }
      return false
    }

    return {
      layerTreeIndex,
      layerIcon,
      hiddenControl,
      findHasFalseShowParentNode,
      editorStore,
      ...editorGetter
    }
  }
})
</script>

<style scoped lang="postcss">
.editor-area {
  margin-top: 4px;
  height: calc(100vh - 64px - 4px);
}

/*
layer-option-area
*/
.layer-option-area {
  height: 100%;
  width: 272px;
  gap: 4px;
  left: 4px;
}

/* edit */
.layer-tree-box {
  /*flex: 1;*/
  background: #25262d;
  max-height: 35%;
  overflow: hidden;
}

.nav-tab-header {
  height: 64px;
  color: #757a87;
}

.nav-tab-h-item {
  width: 80px;
  height: 100%;
  line-height: 64px;
}

.nav-tab-h-item.active {
  color: #f2f2f2;
  border-bottom: 2px solid #6582fe;
}

.screen-tree-box {
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding-top: 16px;
}

.search-box {
  gap: 4px;
  height: 21px;
  margin: 0 16px 21px;
  border-bottom: 1px solid #363741;
}

.search-inp {
  flex: 1;
  outline: none;
  color: #757a87;
  background: transparent;
}

.search-icon {
  height: 16px;
}

.tree-3d /deep/ .layer-child-list > .layer-item {
  padding-left: calc((var(--level) - 1) * 14px + var(--default-pl));
}

.tree-3d /deep/ .layer-item_list > .layer-folder-item {
  padding-left: calc((var(--level) - 2) * 14px + var(--default-pl) - 10px);
}
.screen-tree-wrap {
  height: calc(100% - 65px);
  overflow-y: hidden;
}
.layer-tree {
  height: calc(100% - 42px);
  overflow-y: auto;
}
</style>
