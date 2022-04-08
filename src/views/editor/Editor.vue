<template>
  <div class="editor">
    <nav-bar></nav-bar>
    <section class="dimension-toggle-box flex items-center text-12 text-gray-light">
      <div class="dimension-toggle" :class="{active:editorStore.dimensionType==='3d'}"
           @click="mutations.CHANGE_DIMENSION({dimensionType:'3d'})">3d
      </div>
      <div class="dimension-toggle" :class="{active:editorStore.dimensionType==='2d'}"
           @click="mutations.CHANGE_DIMENSION({dimensionType:'2d'})">2d
      </div>
    </section>
    <section class="editor-area flex justify-between">
      <aside class="select-area h-full flex">
        <ul class="select-type-bar bg-gray-dark h-full">
          <li class="dimension-type-item text-blue text-12">{{ editorStore.dimensionType }}</li>
          <li class="select-item relative" :class="{active:item.type===editorStore.selectBarToolType}"
              v-for="item in selectBarData[editorStore.dimensionType]"
              @click="mutations.CHANGE_SELECT_BAR_TOOL_TYPE({selectBarToolType:item.type})" :key="item.icon">
            <img class="select-icon" width="24" height="24" :src="item.icon">
            <span class="select-tip absolute text-12 pointer-events-none">{{ item.name }}</span>
          </li>
        </ul>
        <div class="select-detail bg-gray-dark">
          <nav class="select-detail-header box-border flex items-center p-16 justify-between">
            <div class="back-icon-wrap ">
              <img src="~@/assets/images/editor_card_backarrow_btn_dark.png" alt="" class="back-icon cursor-pointer">
            </div>
            <div class="header-title-wrap text-gray-light flex-grow">
              <p class="header-title">基本形状</p>
            </div>
            <div class="nav-right" style="width: 16px"></div>
          </nav>
          <line-el color="#363741"></line-el>
          <ul class="select-detail-list grid grid-cols-2  box-border p-16">
            <li class="select-detail-item  flex flex-col items-center border-box justify-between">
              <img src="~@/assets/images/editor_shape_shape_btn_dark.png" alt="" class="select-detail-sub-icon">
              <p class="select-detail-name text-12 text-gray-light">圆角矩形</p>
            </li>
          </ul>
        </div>
      </aside>
      <aside class="layer-option-area">

      </aside>
    </section>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import NavBar from "./child/NavBar.vue"

import {mapState, useStore, mapMutations} from "vuex";
import {EditorMutation} from "@/store/editor/mutations";
import Line from "@/component/common/Line.vue";
import {dimensionType, EditorStore, SelectBarItem} from "@/store/editor/type";
import {Ref, ref} from "@vue/reactivity";

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
/* 编辑器 */
export default defineComponent({
  name: 'Editor',
  components: {LineEl: Line, NavBar},
  setup() {
    // store
    const editorStore: EditorStore = useStore().state.editor
    const mutations = mapMutations('editor', [EditorMutation.CHANGE_DIMENSION, EditorMutation.CHANGE_SELECT_BAR_TOOL_TYPE])
    for (let key of Object.keys(mutations)) {
      mutations[key] = mutations[key].bind({$store: useStore()})
    }

    // other
    return {mutations, editorStore, selectBarData}
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

.select-detail-header {
  height: 64px;
}

.select-detail-list {
  border-top: 1px solid #363741;
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
