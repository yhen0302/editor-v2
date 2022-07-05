<template>
  <section class="property-edit-box">
    <nav-tab v-model:index="propertyEditIndex" class="h-full">
      <template v-slot:header>
        <ul class="nav-tab-header items-center flex text-14">
          <li
            class="nav-tab-h-item cursor-pointer"
            v-for="(item, index) in ['基础设置', '交互事件']"
            :class="{ active: propertyEditIndex === index }"
            @click="propertyEditIndex = index"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </template>
      <nav-tab-item class="attr-editor-area">
        <component :is="GET_CONFIGURATOR"></component>
        <!--<axis-line-chart-configurator></axis-line-chart-configurator>-->
        <!--<text-configurator></text-configurator> -->
        <!--<shape-configurator></shape-configurator>-->
        <!--<media-configurator></media-configurator>-->
        <!--<model-configurator></model-configurator>-->
      </nav-tab-item>
      <nav-tab-item>
        <event></event>
      </nav-tab-item>
    </nav-tab>
  </section>
</template>

<script lang="js">
import NavTab from "@/component/common/navTab/NavTab.vue";
import NavTabItem from "@/component/common/navTab/NavTabItem.vue";
import Event from "@/views/editor/twoDimension/Event.vue";
import {ref} from "vue";
import {useStore} from "vuex";
import {useGetter, useState} from "@/store/helper";
import {EditorGetter} from "@/store/editor/getters";
// configurator
import AxisLineChartConfigurator from '@/views/editor/configurator/AxisLineChartConfigurator.vue'
import TextConfigurator from '@/views/editor/configurator/TextConfigurator.vue'
import ShapeConfigurator from '@/views/editor/configurator/ShapeConfigurator.vue'
import MediaConfigurator from '@/views/editor/configurator/MediaConfigurator.vue'
import ModelConfigurator from '@/views/editor/configurator/ModelConfigurator.vue'
import ElementEditConfigurator from "@/views/editor/child/ElementEditConfigurator.vue";
import PieChartConfigurator from '@/views/editor/configurator/PieChartConfigurator.vue'

export default {
  name: 'ElementEditConfigurator',
  components: {Event, NavTabItem, NavTab,
    AxisLineChartConfigurator,
    TextConfigurator,
    ShapeConfigurator,
    MediaConfigurator,
    ModelConfigurator,
    ElementEditConfigurator,
    PieChartConfigurator,
  },
  setup(){
    const store = useStore()
    const editorStore = useState(store, 'editor')
    const editorGetter = useGetter(store, 'editor', [
      EditorGetter.GET_CONFIGURATOR
    ])
    //property edit
    const propertyEditIndex = ref(0)

    return{
      propertyEditIndex,
      ...editorGetter
    }
  }
}
</script>

<style scoped>
.property-edit-box {
  flex: 1;
  background: #25262d;
  overflow: hidden;
}
.nav-tab-header {
  height: 64px;
  color: #757a87;
}
.nav-tab-h-item {
  width: 80px;
  height: 100%;
  line-height: 64px;
}

.nav-tab-h-item.active {
  color: #f2f2f2;
  border-bottom: 2px solid #6582fe;
}
.attr-editor-area{
  height: calc(100% - 65px);
  overflow-y: auto;
}
</style>
