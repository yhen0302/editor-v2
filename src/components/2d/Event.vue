<template>
  <div class="event">
    <nav-tab v-model:index="navIndex">
      <template #header>
        <div></div>
      </template>

      <nav-tab-item>
        <div class="add-event-wrapper">
          <button class="add-event-button text-12" @click="navIndex = 1">添加事件</button>
        </div>
      </nav-tab-item>
      <nav-tab-item>
        <div class="add-event-detail property-box">
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
                <scene-tree></scene-tree>
              </div>
            </div>
          </div>
          <line-el color="#363741" style="margin-top: 72px"></line-el>
          <div class="footer-box text-12 flex justify-between">
            <button class="footer-button cancel-button" @click="navIndex = 0">取消</button>
            <button class="footer-button save-button" @click="saveEventBehavior">保存</button>
          </div>
        </div>
      </nav-tab-item>
    </nav-tab>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from 'vue'
import { eventAction, eventList } from './eventConstant'
import LineEl from '@/components/2d/common/LineEl.vue'
import { useStore } from 'vuex'
import SelectEl from '@/components/2d/common/SelectEl.vue'
import NavTab from '@/components/2d/common/navTab/NavTab.vue'
import NavTabItem from '@/components/2d/common/navTab/NavTabItem.vue'
import SceneTree from '@/components/utils/editmenu/SceneTree.vue'
import { useGetter, useMutation, useState } from '@/store/helper'

export default {
  name: 'Event',
  components: { SceneTree, NavTabItem, NavTab, SelectEl, LineEl },
  setup() {
    const store = useStore()
    const navIndex = ref(0)
    const selectEvent = ref('click')
    const selectEventAction = ref('linkToPage')
    const stateGlobal = useState(store, 'global')
    const mutation = useMutation(store, '2d', ['ADD_EMITTER_TO_NODE'])
    const getters2D = useGetter(store, '2d', ['GET_SELECT_NODE'])

    function saveEventBehavior() {
      const eventType = selectEvent.value as string
      const eventAction = selectEventAction.value
      const node = getters2D.GET_SELECT_NODE.value
      const effect = { effect: stateGlobal.selectedPageTreeNode?.uuid }
      mutation['ADD_EMITTER_TO_NODE']({ node, eventType, eventAction, effect: effect })
      navIndex.value = 0
    }
    return { navIndex, eventList, selectEvent, eventAction, selectEventAction, stateGlobal, saveEventBehavior }
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
  background: #7aa6ff;
}

.add-event-button:hover {
  opacity: 0.9;
}

.add-event-detail {
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
  background: #31333d;
}

.event-page-tree :deep(.layer-child-list > .layer-item) {
  padding-left: calc((var(--level) - 1) * 14px + var(--default-pl));
}
.footer-box {
  padding: 16px 40px 0;
}
.footer-button {
  padding: 8px 28px;
  border-radius: 2px;
}
.footer-button:hover {
  opacity: 0.8;
}
.cancel-button {
  background: #31333d;
}
.save-button {
  background: #7aa6ff;
}
</style>
