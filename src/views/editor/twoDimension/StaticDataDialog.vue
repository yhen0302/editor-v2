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
        <excel-table v-model:data="data"></excel-table>
      </div>
      <button class="success-btn">完成</button>
    </section>
  </dialog-el>
</template>

<script>
import Dialog from '@/component/common/Dialog.vue'
import ExcelTable from '@/component/common/ExcelTable'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { computed, ref } from 'vue'
export default {
  name: 'StaticDataDialog',
  components: { ExcelTable, DialogEl: Dialog },
  props: ['visible'],
  setup(props, context) {
    const store = useStore()
    const editorGetter = useGetter(store, 'editor', ['GET_SELECT_NODE'])

    const title = ref(
      editorGetter['GET_SELECT_NODE'].value.option.echartsOption.title.text
    )
    const unit = ref(
      editorGetter['GET_SELECT_NODE'].value.option.echartsOption.unit.text
    )
    const show = computed({
      get() {
        return props.visible
      },
      set(val) {
        context.emit('update:visible', val)
      }
    })
    function echartsDataToTableByNode(node) {
      return [
        ['', ...node.option.echartsOption.xAxis.data],
        ...node.option.echartsOption.series.map((item) => [
          item.name,
          ...item.data
        ])
      ]
    }
    let cacheVal
    const data = computed({
      get() {
        cacheVal = echartsDataToTableByNode(
          editorGetter['GET_SELECT_NODE'].value
        )
        return cacheVal
      },
      set(payload) {
        if (!cacheVal?.[payload[0]]) cacheVal[payload[0]] = []
        console.log(payload)
        cacheVal[payload[0]][payload[1]] = payload[2]
        console.log(cacheVal)
      }
    })
    return { title, unit, show, data }
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
