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
          <li class="select-item relative">
            <img class="select-icon" width="24" height="24" src="">
            <span class="select-tip absolute text-12">文本</span>
          </li>
        </ul>
        <div class="select-detail bg-gray-dark">
          <nav class="select-detail-header box-border flex items-center p-16 justify-between">
            <div class="back-icon-wrap ">
              <img src="~@/assets/images/editor_card_backarrow_btn_dark.png" alt="" class="back-icon">
            </div>
            <div class="header-title-wrap text-gray-light flex-grow">
              <p class="header-title">基本形状</p>
            </div>
            <div class="nav-right" style="width: 16px"></div>
          </nav>
          <ul class="select-detail-list grid grid-cols-2  box-border p-16">
            <li class="select-detail-item"></li>
            <li class="select-detail-item"></li>

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


/* 编辑器 */
export default defineComponent({
  name: 'Editor',
  components: {NavBar},
  setup() {
    const editorStore = useStore().state.editor
    const mutations = mapMutations('editor', [EditorMutation.CHANGE_DIMENSION])
    for (let key of Object.keys(mutations)) {
      mutations[key] = mutations[key].bind({$store: useStore()})
    }
    return {mutations, editorStore}
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
}

.select-item:hover {
  background: #323440;
}

.select-item:hover > .select-tip {
  opacity: .8;
  transform: translate(100%, -50%)
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
.select-detail{
  height: 100%;
  width: 272px;
  margin-left: 4px;
}
.select-detail-header{
  height: 64px;
}
.select-detail-list{
  border-top: 1px solid #363741;
  gap: 16px;
}
.select-detail-item{
  width: 112px;
  height: 112px;
  background: #31333D;
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
