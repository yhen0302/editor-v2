<template>
  <dialog-el :modal="true" :center="true" v-model:visible="show">
    <section class="static-data-dialog">
      <header class="static-data-header flex">
        <div class="title-area items-center flex">
          <span class="header-name">标题</span>
          <input
            type="text"
            class="header-inp flex-1"
            placeholder="输入标题"
            :value="title"
            @input="title = $event.target.value"
          />
        </div>
        <div class="unit-area items-center flex">
          <span class="header-name">单位</span>
          <input
            type="text"
            class="header-inp flex-1"
            placeholder="输入单位"
            :value="unit"
            @input="unit = $event.target.value"
          />
        </div>
      </header>
      <div class="static-data-content">
        <excel-table v-model:data="data" v-if="visible"></excel-table>
      </div>
      <button class="success-btn" @click="saveData">完成</button>
    </section>
  </dialog-el>
</template>

<script>
import Dialog from '@/components/2d/common/Dialog.vue'
import ExcelTable from '@/components/2d/common/ExcelTable.vue'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { computed, ref } from 'vue'
import { clone } from '@/share/util/base'

export default {
  name: 'StaticDataDialog',
  components: { ExcelTable, DialogEl: Dialog },
  props: ['visible'],
  setup(props, context) {
    const store = useStore()
    const editorGetter = useGetter(store, 'global', ['GET_SELECT_NODE'])

    const title = ref(editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title.text)
    const unit = ref(editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit.text)
    const show = computed({
      get() {
        return props.visible
      },
      set(val) {
        context.emit('update:visible', val)
      }
    })

    function hasAxisEchartsDataToTableHandle(node) {
      return [
        ['', ...node.option.echartsOption.xAxis.data],
        ...node.option.echartsOption.series.map((item) => [item.name, ...item.data])
      ]
    }
    function hasAxisTableDataAssignEchartsHandle(tableData, node) {
      let realIndex = 0
      tableData.forEach((item, index) => {
        if (index === 0) node.option.echartsOption.xAxis.data = item.filter((item, i) => i !== 0)
        else {
          if (!node.option.echartsOption.series[realIndex - 1])
            node.option.echartsOption.series[realIndex - 1] = clone(
              node.option.echartsOption.series[0],
              true
            )
          node.option.echartsOption.series[realIndex - 1].name = item[0]
          node.option.echartsOption.series[realIndex - 1].data = []
          for (let i = 1; i < item.length; i++) {
            if (item[i] === undefined) {
              node.option.echartsOption.series[realIndex - 1].data[i - 1] = 0
              continue
            }
            node.option.echartsOption.series[realIndex - 1].data[i - 1] = item[i]
          }
        }
        realIndex++
      })
    }

    // 饼图
    function pieEchartsDataToTableHandle(node) {
      const line1 = []
      const line2 = []
      node.option.echartsOption.series[0].data.forEach((data) => {
        line1.push(data.name)
        line2.push(data.value)
      })
      return [line1, line2]
    }
    function pieTableDataAssignEchartsHandle(tableData, node) {
      // node.option.echartsOption.series[0].data
      // const m = tableData[0].length>tableData[1].length?tableData[0]:tableData[1]
      const eO = node.option.echartsOption
      tableData[0].forEach((item, index) => {
        if (!eO.series[0].data[index]) eO.series[0].data[index] = {}
        eO.series[0].data[index].name = item
        eO.series[0].data[index].value = tableData[1][index]
      })
      eO.series[0].data.splice(tableData[0].length)
    }

    // 雷达图
    function radarEchartsDataToTableHandle(node) {
      return [
        ['', ...node.option.echartsOption.radar.indicator.map((item) => item.name)],
        ...node.option.echartsOption.series[0].data.map((item) => [item.name, ...item.value])
      ]
    }
    function radarTableDataAssignEchartsHandle(tableData, node) {
      tableData.forEach((row, index) => {
        if (index === 0) {
          row
            .slice(1)
            .forEach((item, i) =>
              node.option.echartsOption.radar.indicator[i]
                ? (node.option.echartsOption.radar.indicator[i].name = item)
                : (node.option.echartsOption.radar.indicator[i] = { name: item })
            )
        } else {
          node.option.echartsOption.series[0].data[index - 1] = {
            name: row[0],
            value: row.slice(1)
          }
        }
      })
    }

    // 散点图
    function scatterEchartsDataToTableHandle(node) {
      console.log(node)
      return [...node.option.echartsOption.series[0].data.map(item=>clone(item))]
    }
    function scatterTableDataAssignEchartsHandle(tableData, node) {
      tableData.forEach((item,i)=>{
        node.option.echartsOption.series[0].data[i]=[...item]
      })
    }
    const handle = computed(() => {
      const node = editorGetter['GET_SELECT_NODE'].value
      console.log(node.type)
      switch (node.type) {
        case 'ChartBar':
        case 'ChartCurve':
        case 'ChartLine':
          return {
            echartsDataToTableHandle: hasAxisEchartsDataToTableHandle,
            tableDataAssignEchartsHandle: hasAxisTableDataAssignEchartsHandle
          }
        case 'ChartPie':
        case 'ChartGauge':
          return {
            echartsDataToTableHandle: pieEchartsDataToTableHandle,
            tableDataAssignEchartsHandle: pieTableDataAssignEchartsHandle
          }
        case 'ChartRadar':
          return {
            echartsDataToTableHandle: radarEchartsDataToTableHandle,
            tableDataAssignEchartsHandle: radarTableDataAssignEchartsHandle
          }
        case 'ChartScatter':
          return {
            echartsDataToTableHandle: scatterEchartsDataToTableHandle,
            tableDataAssignEchartsHandle: scatterTableDataAssignEchartsHandle
          }
      }
      return {
        echartsDataToTableHandle: new Function(),
        tableDataAssignEchartsHandle: new Function()
      }
    })
    function echartsDataToTableByNode(node) {
      return handle.value.echartsDataToTableHandle(node)
    }
    function tableDataAssignEcharts(tableData, node) {
      handle.value.tableDataAssignEchartsHandle(tableData, node)
    }

    let cacheVal
    const data = computed({
      get() {
        cacheVal = echartsDataToTableByNode(editorGetter['GET_SELECT_NODE'].value)
        return cacheVal
      },
      set(payload) {
        if (!cacheVal?.[payload[0]]) cacheVal[payload[0]] = []
        cacheVal[payload[0]][payload[1]] = payload[2]
      }
    })

    function saveData() {
      const node = editorGetter['GET_SELECT_NODE'].value
      tableDataAssignEcharts(cacheVal, node)
      node.option.echartsOption.title.text = title.value
      node.option.echartsOption.unit.text = unit.value

      context.emit('update:visible', false)
    }
    return { title, unit, show, data, saveData }
  }
}
</script>

<style scoped>
.static-data-dialog {
  width: 764px;
  padding: 24px 30px;
  background: #23262d;
}
.static-data-header {
  gap: 100px;
  font-size: 13px;
  white-space: nowrap;
}
.header-name {
  padding-right: 15px;
  font-size: 12px;
}
.title-area {
  flex: 2;
}

.unit-area {
  flex: 1;
}
.header-inp {
  background: #151619;
  padding: 5px 0;
  padding-left: 10px;
}
.static-data-content {
  margin-top: 20px;
}
.success-btn {
  @apply text-12;
  margin-top: 20px;
  padding: 8px 24px;
  background: #6582fe;
  border-radius: 3px;
}
</style>
