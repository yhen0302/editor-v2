<template>
  <ul class="select-type-bar bg-gray-dark relative z-20">
    <li class="select-item relative" :class="{ active: item.type === stateGlobal.selectBarToolType }" v-for="item in selectBarData['2d']" @click="barToolTypeChange(item.type)" :key="item.type">
      <tip-button :name="item.name" :active="item.type === stateGlobal.selectBarToolType" :icon="item.icon"></tip-button>
    </li>
  </ul>
</template>

<script>
import TipButton from '@/components/utils/TipButton'
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { markRaw } from 'vue'
import { selectBarData } from '@/components/2d/localData'

export default {
  name: 'Nav2D',
  components: { TipButton },
  setup() {
    const store = useStore()
    const stateGlobal = useState(store, 'global')
    const mutationsGlobal = useMutation(store, 'global', ['CHANGE_SELECT_BAR_TOOL_TYPE', 'CHANGE_DIMENSION'])

    const barToolTypeChange = (type) => {
      mutationsGlobal.CHANGE_DIMENSION({ dimensionType: '2d' })
      mutationsGlobal.CHANGE_SELECT_BAR_TOOL_TYPE({ selectBarToolType: type })
    }

    return {
      selectBarData: markRaw(selectBarData),
      stateGlobal,
      mutationsGlobal,
      barToolTypeChange
    }
  }
}
</script>

<style scoped>
.select-item {
  margin: 0 4px 4px 4px;
}
</style>
