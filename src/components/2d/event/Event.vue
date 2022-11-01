<template>
  <div class='event'>
    <nav-tab v-model:index='navIndex'>
      <template #header>
        <div></div>
      </template>
      <nav-tab-item>
        <div class='event-wrapper'>
          <div class='add-event-wrapper'>
            <button class='add-event-button text-12' @click='navIndex = 1'>添加事件</button>
          </div>
          <p class='event-list-title' v-show='eventList.length > 0'>事件列表</p>
          <ul class='events-list flex flex-col'>
            <li class='event-item justify-between flex' v-for='(item, index) in eventList' :key='index'>
              <div class='event-info-box flex items-center'>
                <img src='~@/assets/images/event-list.png' style='height: 16px' />
                <span class='event-name'>事件{{ index + 1 }}</span>
              </div>
              <div class='event-edit-box flex'>
                <img src='~@/assets/images/edit-event.png' class='event-edit-btn' height='16'
                     @click='editEvent(index)' />
                <img src='~@/assets/images/del.png' class='event-del-btn' height='16' @click='deleteEvent(index)' />
              </div>
            </li>
          </ul>
        </div>
      </nav-tab-item>
      <nav-tab-item>
        <div class='add-event-detail property-box'>
          <div class='add-event-item-wrapper'>
            <p class='a-e-i-title'>触发事件</p>
            <div class='a-e-i-edit-box'>
              <select-el :list='eventTypeList' v-model:value='selectEvent'></select-el>
            </div>
          </div>
          <line-el color='#363741'></line-el>
          <div class='add-event-item-wrapper'>
            <p class='a-e-i-title'>选择行为</p>
            <div class='a-e-i-edit-box'>
              <select-el :list='eventAction' v-model:value='selectEventAction'></select-el>
            </div>
          </div>
          <line-el color='#363741'></line-el>
          <div class='add-event-item-wrapper'>
            <p class='a-e-i-title'>触发事件</p>
            <div class='a-e-i-edit-box'>
              <component :is="toUpperFirstLetter(selectEventAction) + 'Effect'" v-model='effectVal'></component>
            </div>
          </div>
          <line-el color='#363741' style='margin-top: 20px'></line-el>
          <div class='footer-box text-12 flex justify-between'>
            <button class='footer-button cancel-button' @click='navIndex = 0'>取消</button>
            <button class='footer-button save-button' @click='saveEventBehavior'>保存</button>
          </div>
        </div>
      </nav-tab-item>
    </nav-tab>
  </div>
</template>

<script lang='ts'>
import { computed, markRaw, ref, SetupContext, toRaw, watch } from 'vue'
import { eventAction, eventTypeList } from './eventConstant'
import LineEl from '../common/LineEl.vue'
import { useStore } from 'vuex'
import SelectEl from '../common/SelectEl.vue'
import NavTab from '../common/navTab/NavTab.vue'
import NavTabItem from '../common/navTab/NavTabItem.vue'
import LinkToPageEffect from './effect/LinkToPageEffect.vue'
import LinkToExternalEffect from './effect/LinkToExternalEffect.vue'
import NodeTransformEffect from './effect/nodeToggleEffect/NodeTransformEffect.vue'
import { useGetter, useMutation, useState } from '../../../store/helper'
import { toUpperFirstLetter } from '@/share/util/base'

export default {
  name: 'Event',
  components: { NavTabItem, NavTab, SelectEl, LineEl, LinkToPageEffect, LinkToExternalEffect, NodeTransformEffect },
  setup() {
    const navIndex = ref(0)
    const selectEvent = ref('click')
    const selectEventAction = ref('linkToPage')
    // effectVal 和 v-model绑定 统一为对象
    const effectVal = ref({})

    const store = useStore()
    const stateGlobal = useState(store, 'global')
    const mutation = useMutation(store, '2d', ['ADD_EMITTER_TO_NODE', 'DELETE_EMITTER_TO_NODE', 'EDIT_EMITTER_TO_NODE'])
    const getters2D = useGetter(store, '2d', ['GET_SELECT_NODE'])
    const node = computed(() => getters2D.GET_SELECT_NODE.value)

    const eventList = computed(() => {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      Array.isArray(node.value?.option.emitters) || (node.value.option.emitters = [])
      return node.value?.option.emitters
    })

    watch(
      () => node.value,
      () => {
        selectEvent.value = 'click'
        selectEventAction.value = 'linkToPage'
        effectVal.value = {}
        navIndex.value = 0
      }
    )
    watch(
      () => selectEventAction.value,
      () => (effectVal.value = {}),
      {flush:'sync'}
    )

    // save
    let echoIndex = -1

    function addEmitter(node, eventType, eventAction, effect) {
      mutation['ADD_EMITTER_TO_NODE']({ node, eventType, eventAction, effect })
    }

    function editEmitter(node, eventType, eventAction, effect, eventIndex) {
      mutation['EDIT_EMITTER_TO_NODE']({ node, eventType, eventAction, effect, eventIndex })
      echoIndex = -1
    }

    // save
    function saveEventBehavior() {
      const eventType = selectEvent.value as string
      const eventAction = selectEventAction.value
      const effect = effectVal.value
      echoIndex === -1 ? addEmitter(node.value, eventType, eventAction, effect)
        : editEmitter(node.value, eventType, eventAction, effect, echoIndex)
      navIndex.value = 0
    }

    // edit / delete
    function deleteEvent(index) {
      mutation['DELETE_EMITTER_TO_NODE']({ node: node.value, eventIndex: index })
    }

    function editEvent(index) {
      selectEvent.value = node.value.option.emitters[index].eventType
      selectEventAction.value = node.value.option.emitters[index].eventAction
      effectVal.value = toRaw(node.value.option.emitters[index].effect)
      echoIndex = index
      navIndex.value = 1
    }

    return {
      navIndex,
      eventTypeList,
      selectEvent,
      eventAction,
      selectEventAction,
      stateGlobal,
      saveEventBehavior,
      eventList,
      deleteEvent,
      editEvent,
      toUpperFirstLetter,
      effectVal
    }
  }
}
</script>

<style scoped>
img {
  height: unset;
  max-width: unset;
}

.event-edit-btn,
.event-del-btn {
  height: 16px;
  cursor: pointer;
}

.event-wrapper {
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

.event-list-title {
  text-align: left;
  font-size: 13px;
  margin-top: 6px;
  margin-bottom: 3px;
  color: #e8e8e8;
}

.events-list {
  gap: 8px 0;
  font-size: 12px;
  color: #dadada;
  margin-top: 15px;
}

.event-item {
  padding: 6px 8px;
  border-radius: 2px;
  background: #313131;
  transition: all 0.2s linear;
}

.event-item:hover {
  background: #3e3e3e;
}

.event-item:hover:hover > .event-edit-box {
  opacity: 1;
}

.event-edit-box {
  transition: all 0.2s linear;
  opacity: 0;
  gap: 0 4px;
}

.event-info-box {
  gap: 0 2px;
}

.add-event-button:hover {
  opacity: 0.9;
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
