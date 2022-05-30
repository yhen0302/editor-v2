<template>
  <aside class="select-area h-full flex relative">
    <ul class="select-type-bar bg-gray-dark h-full relative z-20">
      <li class="dimension-type-item text-blue text-12">{{ editorStore.dimensionType }}</li>
      <li
          class="select-item relative"
          :class="{ active: item.type === editorStore.selectBarToolType }"
          v-for="item in selectBarData[editorStore.dimensionType]"
          @click="mutations.CHANGE_SELECT_BAR_TOOL_TYPE({ selectBarToolType: item.type })"
          :key="item.type"
      >
        <tip-button :name="item.name" :active="item.type === editorStore.selectBarToolType"
                    :icon="item.icon"></tip-button>
      </li>
    </ul>
    <transition name="bounceInLeft">
      <div class="select-detail bg-gray-dark" v-show="editorStore.selectBarToolType"
           v-memo="[editorStore.selectBarToolType, navIndex]">
        <nav-tab v-model:index="navIndex" :title="activeTitle">
          <nav-tab-item v-for="select in stack" :key="select.key">
            <ul class="select-detail-list grid grid-cols-2 box-border p-16" v-if="select.viewType === 'block'">
              <li class="select-detail-item flex flex-col items-center border-box justify-between"
                  v-for="item in select.list" :key="item.type" @click="clickSelectItem(item)">
                <img :src="item.icon" class="select-detail-sub-icon flex-shrink-0" draggable="false"
                     v-if="item.children"/>
                <img :src="item.icon" class="select-detail-sub-icon flex-shrink-0" v-dragable="item" v-else/>
                <p class="select-detail-name select-none text-12 text-gray-light">{{ item.name }}</p>
              </li>
            </ul>
            <ul class="select-detail-list-l grid grid-cols-1 box-border p-16" v-once
                v-else-if="select.viewType === 'list'">
              <li class="select-detail-list-l-item w-full" v-for="item in select.list" :key="item.name">
                <img :src="item.icon" v-dragable="item"/>
              </li>
            </ul>
          </nav-tab-item>
        </nav-tab>
        <after-process v-show="editorStore.selectBarToolType === 'afterProcess'"></after-process>
        <shadow-radio v-show="isShadow"></shadow-radio>
      </div>
    </transition>
  </aside>
</template>

<script lang="ts">
import AfterProcess from '@/views/editor/threeDimension/AfterProcess.vue'
import ShadowRadio from '@/views/editor/threeDimension/ShadowRadio.vue'
import NavTab from '@/component/common/navTab/NavTab.vue'
import NavTabItem from '@/component/common/navTab/NavTabItem.vue'
import TipButton from '@/component/content/TipButton.vue'
import {selectBarData, selectData} from '@/views/editor/localData'
import {useStore} from 'vuex'
import {useMutation, useState} from '@/store/helper'
import {computed, markRaw, ref, watch} from 'vue'
import {Ref} from '@vue/reactivity'
import {dimensionSelectBarType2d, dimensionType, SelectBarItem, SelectItem} from '@/store/editor/type'
import {EditorMutation} from "@/store/editor/mutations";

export default {
  name: 'SelectArea',
  components: {
    AfterProcess,
    ShadowRadio,
    NavTab,
    NavTabItem,
    TipButton
  },
  setup() {
    const sotre = useStore()
    const editorStore = useState(sotre, 'editor')
    const mutations = useMutation(useStore(), 'editor', [EditorMutation.CHANGE_DIMENSION, EditorMutation.CHANGE_SELECT_BAR_TOOL_TYPE])


    // element selector area
    const stack: Ref<Array<any>> = ref<Array<any>>([])
    const navIndex: Ref<number> = ref<number>(0)
    const selectTitle: Ref<string> = ref<string>('')

    watch(
        () => editorStore.selectBarToolType,
        (newVal) => {
          if (newVal) {
            let data: any = markRaw(selectData[newVal as dimensionSelectBarType2d])
            data.key = newVal
            stack.value.splice(0, stack.value.length, data)
            navIndex.value = 0
          }
        }
    )

    // shadow config block
    const isShadow = computed(() => {
      return editorStore.selectBarToolType === 'scenes' && stack.value?.[1]?.key === 'shadowSwitch'
    })

    function clickSelectItem(selectItem: SelectItem) {
      if (selectItem.children) {
        selectTitle.value = (selectItem.name && selectItem.name) || ''
        stack.value.push(markRaw(selectItem.children))
        navIndex.value++
      }
    }

    watch(
        () => navIndex.value,
        (newVal, oldVal) => {
          if (newVal < oldVal && stack.value.length > 1) {
            stack.value.pop()
            selectTitle.value = ''
          }
        }
    )
    const activeTitle = computed(() => {
      // console.log(stack.value[navIndex.value])
      return selectTitle.value || selectBarData[editorStore.dimensionType as dimensionType].find((item:SelectBarItem ) => item.type === editorStore.selectBarToolType)?.name
    })

    return {
      editorStore,
      mutations,
      selectBarData,
      activeTitle,
      isShadow,
      clickSelectItem,
      stack,
      navIndex
    }
  }
}
</script>

<style scoped>
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
  right: -276px;
  z-index: 10;
  @apply absolute;
}

.bounceInLeft-enter-from,
.bounceInLeft-leave-to {
  transform: translateX(-276px);
  opacity: 0;
  pointer-events: none;
}

.bounceInLeft-enter-active,
.bounceInLeft-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.bounceInLeft-enter-to,
.bounceInLeft-leave-from {
  transform: translateX(0px);
  opacity: 1;
  pointer-events: auto;
}

/* 添加元素区域 块的样式 */
.select-detail-list {
  gap: 16px;
}

.select-detail-item {
  padding-top: 8px;
  padding-bottom: 16px;
  width: 112px;
  height: 112px;
  background: #31333d;
  border-radius: 4px;
}

.select-detail-item:hover {
  outline: 2px #6582fe solid;
}

.select-detail-sub-icon {
  height: 64px;
  width: 64px;
  object-fit: cover;
}

/* 添加元素区域 列表的样式 */
.select-detail-list-l {
  gap: 16px;
}

.select-detail-list-l-item {
  height: 160px;
  background: #31333d;
  border-radius: 4px;
}

.select-detail-list-l-item:hover {
  outline: 2px solid #6582fe;
}
</style>
