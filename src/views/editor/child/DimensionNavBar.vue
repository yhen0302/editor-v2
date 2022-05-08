<template>
  <section class="dimension-toggle-box relative z-10 flex items-center text-12 text-gray-light cursor-pointer">
    <div class="dimension-toggle" :class="{ active: editorStore.dimensionType === '3d' }"
         @click="dimensionTypeChange('3d')">3d
    </div>
    <div class="dimension-toggle" :class="{ active: editorStore.dimensionType === '2d' }"
         @click="dimensionTypeChange('2d')">2d
    </div>
  </section>
</template>

<script lang="ts">
import {Store, useStore} from "vuex";
import {EditorMutation} from "@/store/editor/mutations";

const {useMutation} = require("@/store/helper");

const {useState} = require("@/store/helper");

export default {
  name: "DimensionNavBar",
  setup() {
    const sotre = useStore()
    const editorStore = useState(sotre, 'editor')
    const mutations = useMutation(sotre, 'editor', [EditorMutation.CHANGE_DIMENSION, EditorMutation.CHANGE_SELECT_BAR_TOOL_TYPE])

    // dimension type change
    const dimensionTypeChange = (dimensionType: string) => {
      if (dimensionType == editorStore.dimensionType) return
      mutations.CHANGE_DIMENSION({dimensionType})
      mutations.CHANGE_SELECT_BAR_TOOL_TYPE({selectBarToolType: null})
    }
    return {editorStore, dimensionTypeChange}
  }
}
</script>

<style scoped>
/* 2d 3d切换器 */
.dimension-toggle-box {
  position: absolute;
  left: 50%;
  top: 100px;
  height: 24px;
  width: 240px;
  overflow: hidden;
  transform: translateX(-50%);
}

.dimension-toggle {
  width: 120px;
  height: 24px;
  line-height: 24px;
  background: #282a33;
  transition: background-color 0.2s ease-in;
}

.dimension-toggle:nth-child(1) {
  border-radius: 4px 0 0 4px;
}

.dimension-toggle:nth-child(2) {
  border-radius: 0 4px 4px 0;
}

.dimension-toggle.active {
  background: #6582fe;
}

</style>