<template>
  <section class="chart-color-configurator-wrap">
    <fold-el title="配色方案" :line-show="false">
      <template #default>
        <div class="color-picker-wrap">
          <multi-color-picker
            :value="colors"
            @update="updateColor"
          ></multi-color-picker>
        </div>
      </template>
    </fold-el>
    <line-el color="#363741"></line-el>
  </section>
</template>

<script>
import MultiColorPicker from '@/components/2d/common/MultiColorPicker'
import FoldEl from '@/components/2d/common/FoldEl'
import LineEl from '@/components/2d/common/LineEl'
import { useStore } from 'vuex'
import { useGetter, useMutation, useState } from '@/store/helper'
import { computed } from 'vue'

export default {
  name: 'ChartColorConfigurator',
  components: { LineEl, FoldEl, MultiColorPicker },
  setup(props) {
    const store = useStore()
    const editorStore = store.state
    const editorGetter = useGetter(store, 'global', ['GET_SELECT_NODE'])

    const colors = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.echartsOption.color
      }
    })
    function updateColor({ value, index }) {
      return (editorGetter['GET_SELECT_NODE'].value.option.echartsOption.color[
        index
      ] = value)
    }

    return { colors, updateColor }
  }
}
</script>

<style scoped>
.color-picker-wrap {
  padding: 0 16px 16px;
}
.color-picker-wrap /deep/ .color-selector {
  height: 28px;
}
</style>
