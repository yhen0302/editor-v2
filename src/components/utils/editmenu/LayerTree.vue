<template>
  <div>
    <div class="header">
      <ul class="nav-tab-header items-center flex text-14 h-full">
        <li class="nav-tab-h-item cursor-pointer" :class="{ active: stateGlobal.dimensionType === '2d' }" @click="dimensionTypeChange('2d')"><span>二维图层</span></li>
        <li class="nav-tab-h-item cursor-pointer" :class="{ active: stateGlobal.dimensionType === '3d' }" @click="dimensionTypeChange('3d')"><span>三维图层</span></li>
      </ul>
    </div>
    <line-el color="rgb(54, 55, 65)"></line-el>
    <div class="tree-content overflow-y-auto">
      <Trees2D v-show="stateGlobal.dimensionType === '2d'" />
      <Trees3D v-show="stateGlobal.dimensionType === '3d'" />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Trees2D from '@/components/2d/editmenu/Trees2D.vue'
import Trees3D from '@/components/3d/editmenu/Trees3D.vue'
import LineEl from '@/components/utils/common/LineEl.vue'
import NavTab from '@/components/common/navTab/NavTab.vue'
import NavTabItem from '@/components/common/navTab/NavTabItem.vue'
import { useMutation, useState } from '@/store/helper'

export default {
  name: 'LayerTree',
  components: { NavTabItem, NavTab, LineEl, Trees3D, Trees2D },

  setup() {
    const store = useStore()

    const stateGlobal = useState(store, 'global')
    const mutations = useMutation(store, 'global', ['CHANGE_SELECT_BAR_TOOL_TYPE', 'CHANGE_DIMENSION'])

    const dimensionTypeChange = (type) => {
      mutations.CHANGE_DIMENSION({ dimensionType: type })
      mutations.CHANGE_SELECT_BAR_TOOL_TYPE({ selectBarToolType: null })
    }
    return {
      store,
      dimensionTypeChange,
      stateGlobal
    }
  }
}
</script>

<style lang="postcss" scoped>
.header {
  height: 64px;
  @apply w-full flex items-center;
}
.tree-content {
  height: 50vh;
}
.nav-tab-header {
  /*gap: 0 10px;*/
}
.nav-tab-h-item {
  padding: 0 10px;
  box-sizing: border-box;
  line-height: 64px;
  color: rgb(117, 122, 135);
  @apply h-full;
}
.nav-tab-h-item.active {
  color: rgb(242, 242, 242);
  border-bottom: 2px solid rgb(101, 130, 254);
}
</style>
