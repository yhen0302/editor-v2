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

const outAngle = (arr) => {
  const center = [0.5, 0.5] //中心点
  const basicPoint = [1, 0.5] // 基本点
  const targetPoint = arr // 目标切点

  const angle =
    Math.atan((targetPoint[1] - center[1]) / (targetPoint[0] - center[0])) -
    Math.atan((basicPoint[1] - center[1]) / (basicPoint[0] - center[0]))
  let theth
  if (targetPoint[0] == basicPoint[0] && targetPoint[1] == basicPoint[1]) {
    theth = (angle * 180) / Math.PI
  } else if (targetPoint[0] != basicPoint[0] && targetPoint[1] == basicPoint[1]) {
    theth = 180
  } else {
    if (targetPoint[1] > 0.5) {
      angle > 0
        ? (theth = (angle * 180) / Math.PI)
        : (theth = 180 - (Math.abs(angle) * 180) / Math.PI)
    } else {
      angle > 0
        ? (theth = 180 + (angle * 180) / Math.PI)
        : (theth = 360 - Math.abs((angle * 180) / Math.PI))
    }
  }
  return theth
}

function inAngle(angle) {
  const center = [0.5, 0.5] //中心点
  const radius = 0.5 // 半径
  const x1 = center[0] + radius * Math.cos((angle * Math.PI) / 180)
  const y1 = center[1] + radius * Math.sin((angle * Math.PI) / 180)
  return [x1, y1]
}

export default {
  name: 'ChartColorConfigurator',
  components: { LineEl, FoldEl, MultiGradientColorPicker },
  setup(props) {
    const store = useStore()
    const editorStore = store.state
    const editorGetter = useGetter(store, 'global', ['GET_SELECT_NODE'])

    function getDegFromEchartsColor(echartsColor) {
      let deg
      if (echartsColor.x === 0 && echartsColor.y2 === 0)
        deg = Math.round((Math.asin(-echartsColor.y) / Math.PI) * 180) + 90
      else if (echartsColor.x === 0 && echartsColor.y === 0)
        deg = Math.round((Math.acos(echartsColor.x2) / Math.PI) * 180) + 90
      else if (echartsColor.x2 === 0 && echartsColor.y === 0)
        deg = 270 - Math.round((Math.acos(echartsColor.x) / Math.PI) * 180)
      else if (echartsColor.x2 === 0 && echartsColor.y2 === 0)
        deg = 270 - Math.round((Math.asin(-echartsColor.y) / Math.PI) * 180)
      return deg
    }
    function echartsColorToPickerColor(echartsColor) {
      if (!echartsColor.type) return toColor(echartsColor)
      else {
        let deg = getDegFromEchartsColor(echartsColor)

        // gradient
        const color = toColor('#FF00FF')
        color.deg = deg
        color.type = 'gradient'
        let style = `linear-gradient(${deg}deg `
        const mappingColor = (item) => {
          const c = new Color(item.color),
            p = item.offset * 100
          style += `,${c.color} ${p}%`
          return {
            pst: p,
            ...c
          }
        }
        if (echartsColor.colorStops) color.colors = echartsColor.colorStops.map(mappingColor)
        console.log('colorStops',echartsColor.colorStops)
        style += ')'
        console.log('return Color', color)
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
