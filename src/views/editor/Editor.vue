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
      <art-board class="flex-1" :height="editorStore.artBoardConfig.height" :width="editorStore.artBoardConfig.width">
        <template #2dContent>
          <art-board2-d-content></art-board2-d-content>
        </template>
        <template v-slot:3dContent="data">
          <art-board3-d-content :height="data.rect.height" :width="data.rect.width"></art-board3-d-content>
        </template>
      </art-board>
      <!--   图层选择/编辑   -->
      <aside class="layer-option-area flex flex-col">
        <!--    图层管理    -->
        <section class="layer-tree-box flex-1">
          <nav-tab v-model:index="layerTreeIndex">
            <template v-slot:header>
              <ul class="nav-tab-header items-center flex text-14">
                <li class="nav-tab-h-item cursor-pointer" v-for="(item, index) in ['场景树', '场景页面']" :class="{ active: layerTreeIndex === index }" @click="layerTreeIndex = index" :key="item">
                  {{ item }}
                </li>
              </ul>
            </template>
            <!--screen tree-->
            <nav-tab-item key="screenTree" class="screen-tree-wrap">
              <div class="screen-tree-box">
                <div class="search-box flex items-center">
                  <img class="search-icon" width="16" height="16" src="~@/assets/images/editor_search_icn_dark.png" />
                  <input class="search-inp text-12" type="text" placeholder="搜索所有元素" />
                </div>
                <!--二维图层树-->
                <layer-list :node="editorStore.layerTree2d" v-show="editorStore.dimensionType === '2d'">
                  <template v-slot:prefix>
                    <div></div>
                  </template>
                  <template v-slot:placeholder="node" v-once>
                    <div style="padding-right: 8px">
                      <img :src="layerIcon[node.type]" />
                    </div>
                  </template>
                  <template v-slot:suffix="node">
                    <div class="suffix-icon-wrap cursor-pointer" :class="{ 'opacity-50': findHasFalseShowParentNode(node) }" @click.stop="hiddenControl(node)">
                      <img src="~@/assets/images/editor_unseen_btn_dark.png" v-if="node.show" />
                      <img src="~@/assets/images/editor_seen_btn_dark.png" v-else />
                    </div>
                  </template>
                  <template v-slot:folderPrefix>
                    <img src="~@/assets/images/editor_elementgroup_icn_dark.png" style="margin-right: 8px" />
                  </template>
                </layer-list>
                <!--三维图层树-->
                <layer-list :node="editorStore.layerTree3d" class="tree-3d" v-show="editorStore.dimensionType === '3d'">
                  <template v-slot:prefix>
                    <div></div>
                  </template>
                  <template v-slot:placeholder v-once>
                    <div></div>
                  </template>
                  <template v-slot:suffix="node">
                    <div class="suffix-icon-wrap cursor-pointer" :class="{ 'opacity-50': findHasFalseShowParentNode(node) }" @click.stop="hiddenControl(node)">
                      <img src="~@/assets/images/editor_unseen_btn_dark.png" v-if="node.show" />
                      <img src="~@/assets/images/editor_seen_btn_dark.png" v-else />
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
        <section class="property-edit-box">
          <nav-tab v-model:index="propertyEditIndex">
            <template v-slot:header>
              <ul class="nav-tab-header items-center flex text-14">
                <li
                  class="nav-tab-h-item cursor-pointer"
                  v-for="(item, index) in ['基础设置', '交互事件']"
                  :class="{ active: propertyEditIndex === index }"
                  @click="propertyEditIndex = index"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </template>
            <nav-tab-item>
              <!--<axis-line-chart-configurator></axis-line-chart-configurator>-->
              <!--<text-configurator></text-configurator> -->
              <shape-configurator></shape-configurator>
              <!--<media-configurator></media-configurator>-->
              <!--<model-configurator></model-configurator>-->
            </nav-tab-item>
            <nav-tab-item>
              <event></event>
            </nav-tab-item>
          </nav-tab>
        </section>
      </aside>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Ref, ref } from '@vue/reactivity'
import { layerIcon } from '@/views/editor/local_data'

import NavBar from './child/NavBar.vue'
import NavTab from '@/component/common/navTab/NavTab.vue'
import NavTabItem from '@/component/common/navTab/NavTabItem.vue'
import TipButton from '@/component/content/TipButton.vue'
import AfterProcess from '@/views/editor/threeDimension/AfterProcess.vue'
import ShadowRadio from '@/views/editor/threeDimension/ShadowRadio.vue'
import ArtBoard from '@/views/editor/child/ArtBoard.vue'
import LayerList from '@/plugins/layerPlugin/LayerList.vue'
import Event from '@/views/editor/twoDimension/Event.vue'
import AxisLineChartConfigurator from '@/views/editor/configurator/AxisLineChartConfigurator.vue'
import TextConfigurator from '@/views/editor/configurator/TextConfigurator.vue'
import ShapeConfigurator from '@/views/editor/configurator/ShapeConfigurator.vue'
import MediaConfigurator from '@/views/editor/configurator/MediaConfigurator.vue'
import ModelConfigurator from '@/views/editor/configurator/ModelConfigurator.vue'
import DimensionNavBar from '@/views/editor/child/DimensionNavBar.vue'
import SelectArea from '@/views/editor/child/SelectArea.vue'
import ScreenPageTree from '@/views/editor/child/ScreenPageTree.vue'
import { useStore } from 'vuex'
import { useState } from '@/store/helper'
import ArtBoard3DContent from '@/views/editor/threeDimension/ArtBoard3DContent.vue'
import ArtBoard2DContent from '@/views/editor/twoDimension/ArtBoard2DContent.vue'
import { EditorStore } from '@/store/editor/type'

/* 编辑器 */
export default defineComponent({
  name: 'Editor',
  data() {
    return { testData: false }
  },
  components: {
    ArtBoard2DContent,
    ArtBoard3DContent,
    ScreenPageTree,
    SelectArea,
    DimensionNavBar,
    ModelConfigurator,
    MediaConfigurator,
    ShapeConfigurator,
    TextConfigurator,
    AxisLineChartConfigurator,
    Event,
    LayerList,
    ArtBoard,
    ShadowRadio,
    AfterProcess,
    TipButton,
    NavTabItem,
    NavTab,
    NavBar
  },
  setup() {
    const sotre = useStore()
    const editorStore = useState(sotre, 'editor') as EditorStore
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

    //property edit
    const propertyEditIndex: Ref<number> = ref<number>(0)

    return {
      layerTreeIndex,
      propertyEditIndex,
      layerIcon,
      hiddenControl,
      findHasFalseShowParentNode,
      editorStore
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
.layer-tree-box,
.property-edit-box {
  flex: 1;
  background: #25262d;
  padding-bottom: 16px;
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
  max-height: 50vh;
  overflow-y: scroll;
}
</style>
