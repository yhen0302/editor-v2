<template>
  <div class="editor">
    <!--  上方导航工具  -->
    <nav-bar></nav-bar>
    <!--  2d, 3d 切换  -->
    <section class="dimension-toggle-box relative z-10 flex items-center text-12 text-gray-light cursor-pointer">
      <div class="dimension-toggle" :class="{active:editorStore.dimensionType==='3d'}"
           @click="mutations.CHANGE_DIMENSION({dimensionType:'3d'})">3d
      </div>
      <div class="dimension-toggle" :class="{active:editorStore.dimensionType==='2d'}"
           @click="mutations.CHANGE_DIMENSION({dimensionType:'2d'})">2d
      </div>
    </section>
    <!--  编辑区域  -->
    <section class="editor-area flex justify-between">
      <!--   组件选择   -->
      <aside class="select-area h-full flex">
        <ul class="select-type-bar bg-gray-dark h-full relative z-10">
          <li class="dimension-type-item text-blue text-12">{{ editorStore.dimensionType }}</li>
          <li class="select-item relative" :class="{active:item.type===editorStore.selectBarToolType}"
              v-for="item in selectBarData[editorStore.dimensionType]"
              @click="mutations.CHANGE_SELECT_BAR_TOOL_TYPE({selectBarToolType:item.type})" :key="item.type">
            <tip-button :name="item.name" :active="item.type===editorStore.selectBarToolType"
                        :icon="item.icon"></tip-button>
          </li>
        </ul>
        <transition name="bounceInLeft">
          <div class="select-detail bg-gray-dark" v-show="editorStore.selectBarToolType"
               v-memo="[editorStore.selectBarToolType,navIndex]">
            <nav-tab v-model:index="navIndex" :title="activeTitle">
              <nav-tab-item v-for="select in stack" :key="select.key">
                <ul class="select-detail-list grid grid-cols-2  box-border p-16" v-if="select.viewType==='block'">
                  <li class="select-detail-item  flex flex-col items-center border-box justify-between"
                      v-for="item in select.list" :key="item.type" @click="clickSelectItem(item)">
                    <img :src="item.icon" class="select-detail-sub-icon flex-shrink-0">
                    <p class="select-detail-name text-12 text-gray-light">{{ item.name }}</p>
                  </li>
                </ul>
              </nav-tab-item>
            </nav-tab>
            <after-process v-show="editorStore.selectBarToolType==='afterProcess'"></after-process>
            <shadow-radio v-show="isShadow"></shadow-radio>
          </div>
        </transition>

      </aside>
      <!--   画板   -->
      <art-board class="flex-1"></art-board>
      <!--   图层选择/编辑   -->
      <aside class="layer-option-area flex flex-col">
        <section class="layer-tree-box">
          <nav-tab v-model:index="layerTreeIndex">
            <!--screen tree-->
            <nav-tab-item>
              <div class="screen-tree-box">
                <div class="search-box flex items-center">
                  <img class="search-icon" width="16" height="16" src="~@/assets/images/editor_search_icn_dark.png">
                  <input class="search-inp text-12" type="text" placeholder="搜索所有元素">
                </div>
                <layer-list :node="editorStore.layerTree2d" v-show="editorStore.dimensionType==='2d'">
                  <template v-slot:prefix>
                    <div></div>
                  </template>
                  <template v-slot:placeholder="node" v-once>
                    <div style="padding-right: 8px">
                      <img :src="layerIcon[node.type]">
                    </div>
                  </template>
                  <template v-slot:suffix="node">
                    <img src="~@/assets/images/editor_unseen_btn_dark.png" v-if="node.show">
                    <img src="~@/assets/images/editor_seen_btn_dark.png" v-else>
                  </template>
                  <template v-slot:folderPrefix>
                    <img src="~@/assets/images/editor_elementgroup_icn_dark.png" style="margin-right:8px;">
                  </template>
                </layer-list>
                <layer-list :node="editorStore.layerTree2d" class="tree-3d" v-show="editorStore.dimensionType==='3d'">
                  <template v-slot:prefix>
                    <div></div>
                  </template>
                  <template v-slot:placeholder v-once>
                    <div>
                    </div>
                  </template>
                  <template v-slot:suffix="node">
                    <img src="~@/assets/images/editor_unseen_btn_dark.png" v-if="node.show">
                    <img src="~@/assets/images/editor_seen_btn_dark.png" v-else>
                  </template>
                  <template v-slot:folderPrefix>
                    <div></div>
                  </template>
                </layer-list>
              </div>
            </nav-tab-item>
            <!--screen page-->
            <nav-tab-item>
              <div class="screen-page-tree-box">
                <div class="add-screen-wrap box-border flex items-center justify-end">
                  <img src="@/assets/images/editor_newscene_btn_dark.png" alt="">
                </div>
                <layer-list :node="editorStore.layerTree2d">
                  <template v-slot:prefix>
                    <div></div>
                  </template>
                  <template v-slot:placeholder v-once>
                    <div style="padding-right: 8px">
                      <img src="@/assets/images/editor_page_icn_dark.png">
                    </div>
                  </template>

                  <template v-slot:suffix="node">
                    <img src="~@/assets/images/editor_unseen_btn_dark.png" v-if="node.show">
                    <img src="~@/assets/images/editor_seen_btn_dark.png" v-else>
                  </template>
                  <template v-slot:folderPrefix>
                    <img src="~@/assets/images/editor_elementgroup_icn_dark.png" style="margin-right:8px;">
                  </template>
                </layer-list>
              </div>
            </nav-tab-item>
            <template v-slot:header>
              <ul class="nav-tab-header items-center flex text-14">
                <li class="nav-tab-h-item cursor-pointer " v-for="(item,index) in ['场景树','场景页面']"
                    :class="{active:layerTreeIndex===index}" @click="layerTreeIndex=index" :key="item">{{ item }}
                </li>
              </ul>
            </template>
          </nav-tab>
        </section>
        <section class="property-edit-box">
          <nav-tab v-model:index="propertyEditIndex">
            <nav-tab-item>1</nav-tab-item>
            <nav-tab-item>2</nav-tab-item>
            <template v-slot:header>
              <ul class="nav-tab-header items-center flex text-14">
                <li class="nav-tab-h-item cursor-pointer " v-for="(item,index) in ['基础设置','交互事件']"
                    :class="{active:propertyEditIndex===index}" @click="propertyEditIndex=index" :key="item">{{ item }}
                </li>
              </ul>
            </template>
          </nav-tab>
        </section>
      </aside>
    </section>
  </div>
</template>

<script lang="ts">
import {
  dimensionSelectBarType2d, dimensionSelectBarType3d,
  dimensionType,
  EditorStore,
  SelectBarItem,
  selectItemType2d,
  selectItemType3d,
} from "@/store/editor/type";
import {defineComponent, watch, markRaw, computed} from 'vue'
import NavBar from "./child/NavBar.vue"

import {useStore, mapMutations, MutationMethod} from "vuex";
import {EditorMutation} from "@/store/editor/mutations";

import NavTab from "@/component/common/navTab/NavTab.vue";
import NavTabItem from "@/component/common/navTab/NavTabItem.vue";
import {Ref, ref} from "@vue/reactivity";
import RadioEl from "@/component/common/RadioEl.vue";
import TipButton from "@/component/content/TipButton.vue";
import AfterProcess from "@/views/editor/child/AfterProcess.vue";
import ShadowRadio from "@/views/editor/child/ShadowRadio.vue";
import ArtBoard from "@/views/editor/child/ArtBoard.vue";
import {MutationsMapper} from "@/store";
import {useMutation} from "@/store/helper";
import LayerList from "@/plugins/layerPlugin/LayerList.vue";

const selectBarList2d: Array<SelectBarItem> = [
  {icon: require("@/assets/images/editor_text_btn_dark.png"), name: "文本", type: "text"},
  {icon: require("@/assets/images/editor_shape_btn_dark.png"), name: "形状", type: "shape"},
  {icon: require("@/assets/images/editor_media_btn_dark.png"), name: "多媒体", type: "media"},
  {icon: require("@/assets/images/editor_chart_btn_dark.png"), name: "图表", type: "chart"},
]
const selectBarList3d: Array<SelectBarItem> = [
  {icon: require("@/assets/images/editor_model_btn_dark.png"), name: "添加元素", type: "element"},
  {icon: require("@/assets/images/editor_sceneeffect_btn_dark.png"), name: "场景配置", type: "scenes"},
  {icon: require("@/assets/images/editor_postprocessing_btn_dark.png"), name: "后处理", type: "afterProcess"},
]

const selectBarData: Record<dimensionType, Array<SelectBarItem>> = {
  "2d": selectBarList2d,
  "3d": selectBarList3d
}

interface SelectItem {
  type?: selectItemType2d | selectItemType3d,
  icon: string,
  name: string,
  key?: string,
  children?: ViewSelectItem,
  // children?:any
}

interface ViewSelectItem {
  list: Array<SelectItem>,
  viewType: "block" | "switch" | "radio",
  key?: string
}

const selectData2d: Record<dimensionSelectBarType2d | dimensionSelectBarType3d, ViewSelectItem> = {
  text: {
    list: [
      {icon: require("@/assets/images/editor_text_bigtitle_btn_dark.png"), name: "大标题", type: "bigTitle"},
      {icon: require("@/assets/images/editor_text_smalltitle_btn_dark.png"), name: "小标题", type: "smallTitle"},
      {icon: require("@/assets/images/editor_text_title_btn_dark.png"), name: "标题", type: "title"},
      {icon: require("@/assets/images/editor_text_content_btn_dark.png"), name: "正文", type: "content"},],
    viewType: "block"
  },
  shape: {
    list: [{
      icon: require("@/assets/images/editor_shape_shape_btn_dark.png"), name: "基本形状", type: "base",
      children: {
        list: [{icon: require("@/assets/images/editor_shape_roundedrectangle_btn_dark.png"), name: "圆角矩形"},
          {icon: require("@/assets/images/editor_shape_rectangle_btn_dark.png"), name: "矩形"},
          {icon: require("@/assets/images/editor_shape_circular_btn_dark.png"), name: "圆形"},
          {icon: require("@/assets/images/editor_shape_righttriangle_btn_dark.png"), name: "直角三角形"}],
        viewType: "block"
      }
    },
      {icon: require("@/assets/images/editor_shape_button_btn_dark.png"), name: "按钮", type: "button"},
      {icon: require("@/assets/images/editor_shape_icon_btn_dark.png"), name: "图标", type: "base"},],
    viewType: "block"
  },
  media: {
    list: [{icon: require("@/assets/images/editor_media_video_btn_dark.png"), name: "视频", type: "video"},
      {icon: require("@/assets/images/editor_media_picture_btn_dark.png"), name: "图片", type: "image"}],
    viewType: "block"
  },
  chart: {
    list: [{icon: require("@/assets/images/editor_chart_histogram_btn_dark.png"), name: "柱状图", type: "bar"},
      {icon: require("@/assets/images/editor_chart_linechart_btn_dark.png"), name: "折线图", type: "line"},
      {icon: require("@/assets/images/editor_chart_piechart_btn_dark.png"), name: "饼图", type: "pie"},
      {icon: require("@/assets/images/editor_chart_dashboard_btn_dark.png"), name: "柱状图", type: "gauge"},
      {icon: require("@/assets/images/editor_chart_curvelinechart_btn_dark.png"), name: "曲线图", type: "curve"}],
    viewType: "block"
  },
  element: {
    list: [{icon: require("@/assets/images/editor_element_model_btn_dark.png"), name: "模型", type: "model"},
      {icon: require("@/assets/images/editor_element_icon_btn_dark.png"), name: "图标", type: "3dicon"},
      {icon: require("@/assets/images/editor_element_text_btn_dark.png"), name: "文本", type: "text"},
      {icon: require("@/assets/images/editor_element_mark_btn_dark.png"), name: "自由标记", type: "mark"},
      {icon: require("@/assets/images/editor_element_flyline_btn_dark.png"), name: "飞线", type: "flyline"},
      {icon: require("@/assets/images/editor_element_streamer_btn_dark.png"), name: "道路流光", type: "streamer"},],
    viewType: "block"
  },
  scenes: {
    list: [
      {icon: require("@/assets/images/editor_sceneeffect_light_btn_dark.png"), name: "光照", type: "light"},
      {
        icon: require("@/assets/images/editor_sceneeffect_shadow_btn_dark.png"),
        name: "阴影",
        type: "shadow",
        children: {list: [], viewType: 'switch', key: "shadowSwitch"}
      },
      {icon: require("@/assets/images/editor_sceneeffect_camea_btn_dark.png"), name: "相机/控制器", type: "camera"},
      {icon: require("@/assets/images/editor_sceneeffect_background_btn_dark.png"), name: "背景", type: "background"},
      {icon: require("@/assets/images/editor_sceneeffect_hdr_btn_dark.png"), name: "HDR", type: "HDR"},
      {icon: require("@/assets/images/editor_sceneeffect_fog_btn_dark.png"), name: "雾", type: "fog"},

    ], viewType: "block"
  },
  afterProcess: {
    list: [],
    viewType: "switch"
  }
}

const layerIcon: { [key in (dimensionSelectBarType2d)]: string } = {
  shape: require('@/assets/images/editor_roundedrectangle_icn_dark.png'),
  chart: require('@/assets/images/editor_chart_icn_dark.png'),
  media: require('@/assets/images/editor_scene_icn_dark.png'), // 暂无图片
  text: require('@/assets/images/editor_title_icon_dark.png'),
}
/* 编辑器 */
export default defineComponent({
  name: 'Editor',
  components: {LayerList, ArtBoard, ShadowRadio, AfterProcess, TipButton, NavTabItem, NavTab, NavBar},
  setup() {
    // store
    const editorStore: EditorStore = useStore().state.editor
    const mutations = useMutation(useStore(), 'editor',
        [EditorMutation.CHANGE_DIMENSION, EditorMutation.CHANGE_SELECT_BAR_TOOL_TYPE])

    // other
    const stack: Ref<Array<any>> = ref<Array<any>>([])
    const navIndex: Ref<number> = ref<number>(0)

    watch(() => editorStore.selectBarToolType, (newVal, oldVal) => {
      if (newVal) {
        let data: any = markRaw(selectData2d[newVal as dimensionSelectBarType2d])
        data.key = newVal
        stack.value.splice(0, stack.value.length, data)
        navIndex.value = 0
      }
    })
    watch(() => navIndex.value, (newVal, oldVal) => {
      if (newVal < oldVal && stack.value.length > 1)
        stack.value.pop()
    })

    // shadow config block
    const isShadow = computed(() => {
      return editorStore.selectBarToolType === 'scenes' && stack.value?.[1]?.key === 'shadowSwitch'
    })

    function clickSelectItem(selectItem: SelectItem) {
      if (selectItem.children) {
        stack.value.push(selectItem.children)
        navIndex.value++
      }
    }

    const activeTitle = computed(() => {
      return selectBarData[editorStore.dimensionType].find(item => item.type === editorStore.selectBarToolType)?.name
    })

    // layer tree
    const layerTreeIndex: Ref<number> = ref<number>(0)

    //property edit
    const propertyEditIndex: Ref<number> = ref<number>(0)
    return {
      mutations,
      editorStore,
      selectBarData,
      navIndex,
      stack,
      clickSelectItem,
      isShadow,
      activeTitle,
      layerTreeIndex,
      propertyEditIndex,
      layerIcon
    }
  }

})
</script>

<style scoped>
.editor-area {
  margin-top: 4px;
  height: calc(100vh - 64px - 4px);
}

.select-type-bar {
  width: 64px;
  padding: 16px 4px;
  box-sizing: border-box;
}

.dimension-type-item {
  height: 24px;
  margin-bottom: 4px;
}

.select-item {
  border-radius: 4px;
  margin-bottom: 4px;
}

/*select-detail*/
.select-detail {
  height: 100%;
  width: 272px;
  margin-left: 4px;
}

.bounceInLeft-enter-from,
.bounceInLeft-leave-to {
  transform: translateX(-272px);
  opacity: 0;
  pointer-events: none;
}

.bounceInLeft-enter-active, .bounceInLeft-leave-active {
  transition: transform .25s ease, opacity .25s ease;

}

.bounceInLeft-enter-to,
.bounceInLeft-leave-from {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
}

.select-detail-list {
  gap: 16px;
}

.select-detail-item {
  padding-top: 8px;
  padding-bottom: 16px;
  width: 112px;
  height: 112px;
  background: #31333D;
  border-radius: 4px;
}

.select-detail-item:hover {
  outline: 2px #6582FE solid;
}

.select-detail-sub-icon {
  height: 64px;
  width: 64px;
  object-fit: cover;
}


/* 2d 3d切换器 */
.dimension-toggle-box {
  position: absolute;
  left: 50%;
  top: 100px;
  height: 24px;
  width: 240px;
  overflow: hidden;
  transform: translateX(-50%);
}

.dimension-toggle {
  width: 120px;
  height: 24px;
  line-height: 24px;
  background: #282A33;
  transition: background-color .2s ease-in;
}

.dimension-toggle:nth-child(1) {
  border-radius: 4px 0 0 4px;
}

.dimension-toggle:nth-child(2) {
  border-radius: 0 4px 4px 0;
}

.dimension-toggle.active {
  background: #6582FE;
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
.layer-tree-box, .property-edit-box {
  flex: 1;
  background: #25262D;
}

.nav-tab-header {
  height: 64px;
  color: #757A87;
}

.nav-tab-h-item {
  width: 80px;
  height: 100%;
  line-height: 64px;
}

.nav-tab-h-item.active {
  color: #F2F2F2;
  border-bottom: 2px solid #6582FE;
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
  color: #757A87;
  background: transparent;
}

.search-icon {
  height: 16px;
}

.tree-3d /deep/ .layer-child-list > .layer-item {
  padding-left: calc((var(--level) - 1) * 14px + var(--default-pl))
}

.tree-3d /deep/ .layer-item_list > .layer-folder-item {
  padding-left: calc((var(--level) - 2) * 14px + var(--default-pl) - 10px)
}

/* page */
.add-screen-wrap{
  padding: 0 16px;
  height: 48px;
  width: 100%;
}
</style>
