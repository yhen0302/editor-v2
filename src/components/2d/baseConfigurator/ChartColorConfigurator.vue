<template>
  <section class="chart-color-configurator-wrap">
    <fold-el title="配色方案" :line-show="false">
      <template #default>
        <div class="color-picker-wrap">
          <multi-gradient-color-picker :key="node.id" :value="colors" @update="updateColor"></multi-gradient-color-picker>
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
import { useGetter } from '@/store/helper'
import { computed } from 'vue'
import { Color, toColor } from '@/share/util/node'
import { rotatePointer } from '@/share/util/math'
import { clone } from "@/share/util/base"
export default {
  name: 'ChartColorConfigurator',
  components: { LineEl, FoldEl, MultiGradientColorPicker },
  setup() {
    const store = useStore()
    const getters2D = useGetter(store, '2d', ['GET_SELECT_NODE'])

    function getDegFromEchartsColor(echartsColor) {
      let deg
      if (echartsColor.x === 0 && echartsColor.y2 === 0) deg = Math.round((Math.asin(-echartsColor.y) / Math.PI) * 180) + 90
      else if (echartsColor.x === 0 && echartsColor.y === 0) deg = Math.round((Math.acos(echartsColor.x2) / Math.PI) * 180) + 90
      else if (echartsColor.x2 === 0 && echartsColor.y === 0) deg = 270 - Math.round((Math.acos(echartsColor.x) / Math.PI) * 180)
      else if (echartsColor.x2 === 0 && echartsColor.y2 === 0) deg = 270 - Math.round((Math.asin(-echartsColor.y) / Math.PI) * 180)
      return deg
    }
    function echartsColorToPickerColor(echartsColor) {
      if (!echartsColor.type) return toColor(echartsColor)
      else {
        const deg = getDegFromEchartsColor(echartsColor)

        // gradient
        const color = toColor('#FF00FF')
        color.deg = deg
        color.type = 'gradient'
        let style = `linear-gradient(${deg}deg `
        const mappingColor = (item) => ({ pst: item.offset * 100, ...new Color(item.color) })

        const mappingStyle = (item) => {
          style += `,${new Color(item.color).color} ${item.pst}%`
        }
        if (echartsColor.colorStops) color.colors = echartsColor.colorStops.map(mappingColor)
        clone(color.colors)
          .sort((a, b) => a.pst - b.pst)
          .forEach(mappingStyle)
        style += ')'
        color.style = style
        return color
      }
    }
    function pickerColorToEchartsColor(pickerColor) {
      // 注意 pickerColor 的linear类型 **并不是** 线性渐变颜色
      if (pickerColor.type === 'linear') return pickerColor.color.color
      else {
        const toFixedDouble = (val) => Number(val.toFixed(2))
        const boundaryZeroOne = (val) => (val > 1 ? 1 : val < 0 ? 0 : val)
        const deg = pickerColor.deg + 90
        const p1 = rotatePointer(deg)
        const p2 = rotatePointer(deg + 180)
        const pointers = {
          x: toFixedDouble(boundaryZeroOne(p1.x)),
          y: toFixedDouble(boundaryZeroOne(p1.y)),
          x2: toFixedDouble(boundaryZeroOne(p2.x)),
          y2: toFixedDouble(boundaryZeroOne(p2.y))
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
      const node = getters2D['GET_SELECT_NODE'].value
      const tempColors = node.option.echartsOption.color
      const mappingColors = tempColors.map(echartsColorToPickerColor)
      return mappingColors
    })
    function updateColor({ value, index }) {
      getters2D['GET_SELECT_NODE'].value.option.echartsOption.color[index] = pickerColorToEchartsColor(value)
    }
    const node = computed(() => getters2D['GET_SELECT_NODE'].value)

    return { colors, updateColor, node }
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
