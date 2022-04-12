<template>
  <div class="editor">
    <nav-bar></nav-bar>
    <section class="dimension-toggle-box flex items-center text-12 text-gray-light cursor-pointer">
      <div class="dimension-toggle" :class="{active:editorStore.dimensionType==='3d'}"
           @click="mutations.CHANGE_DIMENSION({dimensionType:'3d'})">3d
      </div>
      <div class="dimension-toggle" :class="{active:editorStore.dimensionType==='2d'}"
           @click="mutations.CHANGE_DIMENSION({dimensionType:'2d'})">2d
      </div>
    </section>
    <section class="editor-area flex justify-between">
      <aside class="select-area h-full flex">
        <ul class="select-type-bar bg-gray-dark h-full relative z-10">
          <li class="dimension-type-item text-blue text-12">{{ editorStore.dimensionType }}</li>
          <li class="select-item relative" :class="{active:item.type===editorStore.selectBarToolType}"
              v-for="item in selectBarData[editorStore.dimensionType]"
              @click="mutations.CHANGE_SELECT_BAR_TOOL_TYPE({selectBarToolType:item.type})" :key="item.icon">
            <img class="select-icon" width="24" height="24" :src="item.icon">
            <span class="select-tip absolute text-12 pointer-events-none">{{ item.name }}</span>
          </li>
        </ul>
        <transition name="bounceInLeft">
          <div class="select-detail bg-gray-dark" v-show="editorStore.selectBarToolType">
            <nav-tab v-model:index="navIndex">
              <nav-tab-item v-for="select in stack" :key="select.key">
                <ul class="select-detail-list grid grid-cols-2  box-border p-16">
                  <li class="select-detail-item  flex flex-col items-center border-box justify-between"
                      v-for="item in select" :key="item.type" @click="clickSelectItem(item)">
                    <img :src="item.icon" class="select-detail-sub-icon flex-shrink-0">
                    <p class="select-detail-name text-12 text-gray-light">{{ item.name }}</p>
                  </li>
                </ul>
              </nav-tab-item>
            </nav-tab>
          </div>
        </transition>
      </aside>
      <aside class="layer-option-area">
      </aside>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent, watch, markRaw} from 'vue'
import NavBar from "./child/NavBar.vue"

import {useStore, mapMutations} from "vuex";
import {EditorMutation} from "@/store/editor/mutations";
import {
  dimensionSelectBarType2d, dimensionSelectBarType3d,
  dimensionType,
  EditorStore,
  SelectBarItem,
  selectItemType2d,
  selectItemType3d,
} from "@/store/editor/type";
import NavTab from "@/component/common/navTab/NavTab.vue";
import NavTabItem from "@/component/common/navTab/NavTabItem.vue";
import {Ref, ref} from "@vue/reactivity";
import RadioEl from "@/component/common/RadioEl.vue";

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
      {icon: require("@/assets/images/editor_sceneeffect_shadow_btn_dark.png"), name: "阴影", type: "shadow"},
      {icon: require("@/assets/images/editor_sceneeffect_camea_btn_dark.png"), name: "相机/控制器", type: "camera"},
      {icon: require("@/assets/images/editor_sceneeffect_background_btn_dark.png"), name: "背景", type: "background"},
      {icon: require("@/assets/images/editor_sceneeffect_hdr_btn_dark.png"), name: "HDR", type: "HDR"},
      {icon: require("@/assets/images/editor_sceneeffect_fog_btn_dark.png"), name: "雾", type: "fog"},

    ], viewType: "block"
  },
  afterProcess: {
    list: [],
    viewType: "block"
  }
}

/* 编辑器 */
export default defineComponent({
  name: 'Editor',
  // eslint-disable-next-line vue/no-unused-components
  components: {RadioEl, NavTabItem, NavTab, NavBar},
  setup() {
    // store
    const editorStore: EditorStore = useStore().state.editor
    const mutations = mapMutations('editor', [EditorMutation.CHANGE_DIMENSION, EditorMutation.CHANGE_SELECT_BAR_TOOL_TYPE])
    for (let key of Object.keys(mutations)) {
      mutations[key] = mutations[key].bind({$store: useStore()})
    }

    // other
    const stack: Ref<Array<any>> = ref<Array<any>>([])
    watch(() => editorStore.selectBarToolType, (newVal, oldVal) => {
      if (newVal) {
        let data: any = markRaw(selectData2d[newVal as dimensionSelectBarType2d].list)
        data.key = newVal
        stack.value = [data]
        navIndex.value = 0
      }
    })
    const navIndex: Ref<number> = ref<number>(0)
    watch(() => navIndex.value, (newVal, oldVal) => {
      if (newVal < oldVal)
        stack.value.pop()
    })

    function clickSelectItem(selectItem: SelectItem) {
      if (selectItem.children) {
        stack.value.push(selectItem.children.list)
        navIndex.value++
      }
    }

    return {mutations, editorStore, selectBarData, navIndex, stack, clickSelectItem}
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
}

.select-item {
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  transition: background-color .2s linear;
}

.select-item:hover {
  background: #323440;
}

.select-item:hover > .select-tip {
  opacity: .8;
  transform: translate(100%, -50%)
}

.select-item.active {
  background-color: #6582FE;
}

.select-tip {
  top: 50%;
  right: -4px;
  white-space: nowrap;
  background: #ECECEC;
  border-radius: 4px;
  padding: 8px 16px;
  opacity: 0;
  transform: translate(0px, -50%);
  transition-property: transform, opacity;
  transition: .15s ease-in-out;
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

/*
layer-option-area
*/
.layer-option-area {
  height: 100%;
  width: 272px;
  left: 4px;
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
</style>
