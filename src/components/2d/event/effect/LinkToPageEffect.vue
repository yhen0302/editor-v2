<template>
  <div class='link-to-page-effect'>
    <ul class='scenes-list'>
      <li class='scenes-item' v-for='scenes in scenesTreeNodes' :key='scenes.uuid'>
        <div class='scenes-info flex items-center' @click='toggleOpen(scenes)'>
          <i class='arrow' :class='{ open: scenes.open }'></i>
          <span class='scenes-name'>{{ scenes.name }}</span>
        </div>
        <ul class='page-list' :class='{ open: scenes.open }'>
          <li class='page-item' v-for='page in scenes.children' :class='{active:selectedPage===page.uuid}'
              @click='selectedPage=page.uuid' :key='page.uuid'>{{ page.name }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useState } from '@/store/helper'
import { computed, markRaw, reactive, getCurrentInstance, toRaw } from 'vue'
import { clone } from '@/share/util/base'

export default {
  name: 'LinkToPageEffect',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedPage = computed({
      get() {
        return props.modelValue.pageId
      }, set(pageId) {
        emit('update:modelValue', { pageId })
      }
    })
    const { ctx } = getCurrentInstance()
    const store = useState(useStore(), 'global')
    const scenesTreeNodes = computed(() => {
      // !!! 依赖收集 和场景树保持联动
      store.sceneTreeNodes.forEach((item) => item.children.forEach((item) => item))

      return clone(toRaw(store.sceneTreeNodes)).map((item) => (item.open = false) || item)
    })

    function toggleOpen(scenes) {
      scenes.open = !scenes.open
      ctx.$forceUpdate()
    }

    return { store, scenesTreeNodes, toggleOpen, selectedPage }
  }
}
</script>

<style scoped>
.link-to-page-effect {
  font-size: 14px;
  color: #dadada;
  text-align: left;
  background: #292929;
  padding: 6px 4px;
  height: 400px;
  overflow-y: scroll;
}

.arrow {
  display: inline-block;
  box-sizing: border-box;
  height: 8px;
  width: 8px;
  border: 1px solid transparent;
  border-right: 1px solid #dadada;
  border-top: 1px solid #dadada;
  transform: rotate(45deg);
  transform-origin: 6px center;
  margin-right: 10px;
  transition: transform 0.2s linear;
}

.arrow.open {
  transform: rotate(135deg);
}

.scenes-info {
  padding: 6px 0 6px 0px;
}

.page-list {
  box-sizing: border-box;
  overflow: hidden;
  color: #9c9c9c;
  height: 0;
}

.page-list.open {
  height: auto;
}

.page-item {
  padding: 6px 0 6px 18px;
  font-size: 12px;
}

.page-item:hover {
  background: #4a4a4a;
}

.page-item.active {
  background: #5475FF;
  color: #dadada;
}
</style>
