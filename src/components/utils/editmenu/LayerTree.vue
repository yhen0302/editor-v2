<template>
  <div>
    <div class="header">
        <ul class="nav-tab-header items-center flex text-14 h-full">
          <li class="nav-tab-h-item cursor-pointer" :class='{active:store.state.dimensionType === "2d"}' @click='dimensionTypeChange("2d")'> <span>二维图层</span></li>
          <li class="nav-tab-h-item cursor-pointer" :class='{active:store.state.dimensionType === "3d"}' @click='dimensionTypeChange("3d")'> <span>三维图层</span></li>
        </ul>
    </div>
    <line-el color="rgb(54, 55, 65)"></line-el>
    <div class="tree-content overflow-y-auto">
      <Trees2D v-show="store.state.dimensionType === '2d'" />
      <Trees3D v-show="store.state.dimensionType === '3d'" />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import Trees2D from '@/components/2d/editmenu/Trees2D'
import Trees3D from '@/components/3d/editmenu/Trees3D'
import { ref } from 'vue'
import { EventsBus } from '@/core/EventsBus'
import LineEl from '@/components/utils/common/LineEl'
import NavTab from '@/components/common/navTab/NavTab'
import NavTabItem from '@/components/common/navTab/NavTabItem'
import { Ref } from '@vue/reactivity'

export default {
  name: 'LayerTree',
  components: { NavTabItem, NavTab, LineEl, Trees3D, Trees2D },

  setup() {
    const store = useStore()

    const dimensionTypeChange = (type) => {
      if (store.state.dimensionType == type) return
      store.state.selectBarToolType = ''
      store.state.dimensionType = type
      // 重置右下角表单
      EventsBus.emit('formsReset', {})
    }
    return {
      store,
      dimensionTypeChange
    }
  }
}
</script>

<style lang='postcss' scoped>
.header {
  height: 64px;
  @apply w-full flex items-center;
}
.tree-content {
  height: 50vh;
}
.nav-tab-header{
  /*gap: 0 10px;*/
}
.nav-tab-h-item{
  padding:0 10px;
  box-sizing: border-box;
  line-height: 64px;
  color: rgb(117, 122, 135);
  @apply h-full
}
.nav-tab-h-item.active{
  color: rgb(242, 242, 242);
  border-bottom: 2px solid rgb(101, 130, 254);
}
</style>
