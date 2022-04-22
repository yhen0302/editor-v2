<template>
  <div class="event">
    <nav-tab v-model:index="navIndex">
      <template #header>
        <div></div>
      </template>

      <nav-tab-item>
        <div class="add-event-wrapper">
          <button class="add-event-button text-12">添加事件</button>
        </div>
      </nav-tab-item>
      <nav-tab-item>
        <div class="add-event-detail">
          <div class="add-event-item-wrapper">
            <p class="a-e-i-title">触发事件</p>
            <div class="a-e-i-edit-box">
              <select-el :list="eventList" v-model:value="selectEvent"></select-el>
            </div>
          </div>
          <line-el color="#363741"></line-el>
          <div class="add-event-item-wrapper">
            <p class="a-e-i-title">选择行为</p>
            <div class="a-e-i-edit-box">
              <select-el :list="eventAction" v-model:value="selectEventAction"></select-el>
            </div>
          </div>
          <line-el color="#363741"></line-el>
          <div class="add-event-item-wrapper">
            <p class="a-e-i-title">触发事件</p>
            <div class="a-e-i-edit-box">
              <div class="page-tree-box">
                <layer-list :node="editorStore.screenPageTree" class="event-page-tree">
                  <template v-slot:prefix>
                    <div></div>
                  </template>
                  <template v-slot:placeholder v-once>
                    <div></div>
                  </template>
                  <template v-slot:suffix v-once>
                    <div></div>
                  </template>
                  <template v-slot:folderPrefix v-once>
                    <div></div>
                  </template>
                  <template v-slot:folderSuffix>
                    <div></div>
                  </template>
                </layer-list>
              </div>
            </div>
          </div>
          <line-el color="#363741" style="margin-top: 72px"></line-el>
          <div class="footer-box text-12 flex justify-between">
            <button class="footer-button cancel-button">取消</button>
            <button class="footer-button save-button">保存</button>
          </div>

        </div>
      </nav-tab-item>
    </nav-tab>
  </div>
</template>

<script lang="ts">
import NavTab from "../../../component/common/navTab/NavTab";
import {ref} from "vue";
import NavTabItem from "@/component/common/navTab/NavTabItem";
import SelectEl from "@/component/common/SelectEl";
import {eventAction, eventList} from "@/views/editor/child/eventConstant";
import LineEl from "@/component/common/LineEl.vue";
import {EditorStore} from "@/store/editor/type";
import {useStore} from "vuex";

export default {
  name: "Event",
  components: {LineEl, SelectEl, NavTabItem, NavTab},
  setup(props, context) {
    const navIndex = ref(1)
    const selectEvent = ref('click')
    const selectEventAction = ref('linkToPage')
    const editorStore: EditorStore = useStore().state.editor



    return {navIndex, eventList, selectEvent, eventAction, selectEventAction,editorStore}
  }
}
</script>

<style scoped>
.add-event-wrapper {
  margin-top: 14px;
  padding: 8px 16px;
}

.add-event-button {
  display: inline-block;
  width: 100%;
  height: 32px;
  border-radius: 2px;
  background: #7AA6FF;
}

.add-event-button:hover {
  opacity: .9;
}

.add-event-detail {
  max-height: 48vh;
  min-height: 38vh;
  overflow-y: scroll;
}

.a-e-i-title {
  text-align: left;
  font-size: 12px;
  padding: 16px 0;
}

.add-event-item-wrapper {
  padding: 0 16px;
}

.a-e-i-edit-box {
  margin-bottom: 16px;
}

.page-tree-box {
  max-height: 200px;
  overflow-y: auto;
  background: #31333D;
}

.event-page-tree /deep/ .layer-child-list > .layer-item{
  padding-left: calc((var(--level) - 1) * 14px + var(--default-pl));
}
.footer-box{
  padding: 16px 40px;
}
.footer-button{
  padding: 8px 28px;
  border-radius: 2px;
}
.footer-button:hover{
  opacity: .8;
}
.cancel-button{
  background: #31333D;
}
.save-button{
  background: #7AA6FF;
}
</style>