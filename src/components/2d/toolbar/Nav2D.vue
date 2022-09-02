<template>
  <ul class="select-type-bar bg-gray-dark relative z-20">
    <li
      class="select-item relative"
      :class="{ active: item.type === editorStore.selectBarToolType }"
      v-for="item in selectBarData['2d']"
      @click="mutations.CHANGE_SELECT_BAR_TOOL_TYPE({ selectBarToolType: item.type })"
      :key="item.type"
    >
      <tip-button :name="item.name" :active="item.type === editorStore.selectBarToolType" :icon="item.icon"></tip-button>
    </li>
  </ul>
</template>

<script>
import TipButton from '@/components/utils/TipButton'
import { useStore } from 'vuex'
import { useMutation } from '@/store/helper'
import { markRaw } from 'vue'
import { selectBarData } from '@/components/2d/localData'

export default {
  name: 'Nav2D',
  components: { TipButton },
  setup() {
    const store = useStore()
    const editorStore = store.state
    const mutations = useMutation(store, '', ['CHANGE_SELECT_BAR_TOOL_TYPE'])
    return {
      selectBarData: markRaw(selectBarData),
      editorStore,
      mutations
    }
  }
}
</script>

<style scoped>
.select-item{
  margin: 0 4px 4px 4px;
}
</style>
