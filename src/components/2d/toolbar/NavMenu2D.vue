<template>
  <div class="select-detail bg-gray-dark" v-show="editorStore.selectBarToolType" v-memo="[editorStore.selectBarToolType, navIndex]">
    <nav-tab v-model:index="navIndex" :title="activeTitle">
      <nav-tab-item v-for="select in stack" :key="select.key">
        <ul class="select-detail-list grid grid-cols-2 box-border p-16" v-if="select.viewType === 'block'">
          <li class="select-detail-item flex flex-col items-center border-box justify-between" v-for="item in select.list" :key="item.type" @click="clickSelectItem(item)">
            <img :src="item.icon" class="select-detail-sub-icon flex-shrink-0" draggable="false" v-if="item.children" />
            <img :src="item.icon" class="select-detail-sub-icon flex-shrink-0" v-dragable="item" v-else />
            <p class="select-detail-name select-none text-12 text-gray-light">{{ item.name }}</p>
          </li>
        </ul>
        <ul class="select-detail-list-l grid grid-cols-1 box-border p-16" v-once v-else-if="select.viewType === 'list'">
          <li class="select-detail-list-l-item w-full " v-for="item in select.list" :key="item.name">
            <img :src="item.icon" v-dragable="item" />
          </li>
        </ul>
      </nav-tab-item>
    </nav-tab>
  </div>
</template>

<script lang="js">

import { useStore } from 'vuex'
import { useMutation } from '@/store/helper'
import { computed, markRaw, ref, watch } from 'vue'
import { selectBarData, selectData } from '@/components/2d/localData'
import NavTab from '@/components/2d/common/navTab/NavTab'
import NavTabItem from '@/components/2d/common/navTab/NavTabItem'

export default {
  name: 'NavMenu2D',
  components: {
    NavTabItem,
    NavTab,
  },
  setup() {
    const store = useStore()
    const editorStore = store.state
    const mutations = useMutation(useStore(), '', ['CHANGE_DIMENSION', 'CHANGE_SELECT_BAR_TOOL_TYPE'])


    const initData= markRaw(selectData[editorStore.selectBarToolType])
    initData.key = editorStore.selectBarToolType
    console.log(initData)
    // element selector area
    const stack  = ref([initData])
    const navIndex  = ref(0)
    const selectTitle  = ref('')

    watch(
      () => editorStore.selectBarToolType,
      (newVal) => {
        console.log('selectBarToolType',newVal)
        if (newVal) {
          let data = markRaw(selectData[newVal])
          data.key = newVal
          console.log(data)
          stack.value.splice(0, stack.value.length, data)
          navIndex.value = 0
        }
      }
    )

    // shadow config block
    const isShadow = computed(() => {
      return editorStore.selectBarToolType === 'scenes' && stack.value?.[1]?.key === 'shadowSwitch'
    })

    function clickSelectItem(selectItem) {
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
      return selectTitle.value || selectBarData[editorStore.dimensionType].find((item ) => item.type === editorStore.selectBarToolType)?.name
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
  overflow: hidden;
  height: 160px;
  background: #31333d;
  border-radius: 4px;
}

.select-detail-list-l-item:hover {
  outline: 2px solid #6582fe;
}
</style>
