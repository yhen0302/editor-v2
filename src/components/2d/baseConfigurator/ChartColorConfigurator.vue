<template>
  <section class="chart-color-configurator-wrap">
    <fold-el title="配色方案" :line-show="false">
      <template #default>
        <div class="color-picker-wrap">
          <multi-gradient-color-picker
            :value="colors"
            @update="updateColor"
          ></multi-gradient-color-picker>
        </div>
      </template>
    </fold-el>
    <line-el color="#363741"></line-el>
  </section>
</template>

<script>
import MultiGradientColorPicker from '@/components/2d/common/MultiGradientColorPicker'
import FoldEl from '@/components/2d/common/FoldEl'
import LineEl from '@/components/2d/common/LineEl'
import { useStore } from 'vuex'
import { useGetter, useMutation, useState } from '@/store/helper'
import { computed, toRaw } from 'vue'
import { Color, toColor } from '@/share/util/node'
import { rotatePointer } from '@/share/util/base'

export default {
  name: 'ChartColorConfigurator',
  components: { LineEl, FoldEl, MultiGradientColorPicker },
  setup(props) {
    const store = useStore()
    const editorStore = store.state
    const editorGetter = useGetter(store, 'global', ['GET_SELECT_NODE'])

    function echartsColorToPickerColor(echartsColor) {
      if (!echartsColor.type) return toColor(echartsColor)
      else {

        console.log({
          x: echartsColor.x,
          y: echartsColor.y,
          x2: echartsColor.x2,
          y2: echartsColor.y2
        })
        if(echartsColor.x===0&&echartsColor.y2===0){
          console.log(Math.round((Math.asin(-echartsColor.y) / Math.PI) * 180) + 90)
        }else if(echartsColor.x===0&&echartsColor.y===0){
          console.log(Math.round((Math.asin(-echartsColor.y) / Math.PI) * 180) + 90)
        }
        console.log(
          Math.round((Math.acos(echartsColor.x) / Math.PI) * 180) + 90,
          Math.round((Math.asin(-echartsColor.y) / Math.PI) * 180) + 90
        )
        console.log(
          Math.round((Math.acos(echartsColor.x2) / Math.PI) * 180) + 90 + 180,
          Math.round((Math.asin(-echartsColor.y2) / Math.PI) * 180) + 90 + 180
        )

        // gradient
        const color = toColor('#FF00FF')
        color.type = 'gradient'
        color.colors = echartsColor.colorStops.map((item) => ({
          pst: item.offset * 100,
          ...new Color(item.color)
        }))
        return color
      }
    }
    function pickerColorToEchartsColor(pickerColor) {
      if (pickerColor.type === 'linear') return pickerColor.color.color
      else {
        // const toFixedDouble = (val) => Number(val.toFixed(2))
        const boundaryZeroOne = (val) => (val > 1 ? 1 : val < 0 ? 0 : val)
        const deg = pickerColor.deg + 90
        const p1 = rotatePointer(deg)
        const p2 = rotatePointer(deg + 180)

        const pointers = {
          x: boundaryZeroOne(p1.x),
          y: boundaryZeroOne(p1.y),
          x2: boundaryZeroOne(p2.x),
          y2: boundaryZeroOne(p2.y)
        }
        // gradient
        const color = {
          type: 'linear',
          ...pointers,
          colorStops: pickerColor.colors.map((item) => ({
            offset: item.pst / 100,
            color: item.color
          }))
        }
        return color
      }
    }
    const colors = computed(() => {
      const node = editorGetter['GET_SELECT_NODE'].value
      const tempColors = node.option.echartsOption.color
      const mappingColors = tempColors.map(echartsColorToPickerColor)
      return mappingColors
    })
    function updateColor({ value, index }) {
      editorGetter['GET_SELECT_NODE'].value.option.echartsOption.color[index] =
        pickerColorToEchartsColor(value)
    }

    return { colors, updateColor }
  }
}
</script>

<style scoped>
.color-picker-wrap {
  padding: 0 16px 16px;
}
.color-picker-wrap :deep(.color-selector) {
  height: 28px;
}
</style>
