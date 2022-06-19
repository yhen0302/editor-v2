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
        <table-el :data="tableData" class="dialog-table">
          <column-el prop="date" label="Date" width="180">
            <template v-slot:default="data">
              <span @click="test(data)">{{ data.row.date }}</span>
            </template>
          </column-el>
          <column-el prop="name" label="Name"></column-el>
          <column-el prop="address" label="Address">
            <template v-slot:header="{ column }"
              ><span>{{ column }}</span></template
            >
          </column-el>
        </table-el>
      </div>
      <div class="api-uri-wrapper items-center flex mt-16">
        <span class="api-uri-desc text-12">API地址</span>
        <input
          type="text"
          class="api-uri-inp flex-1 text-12"
          placeholder="请输入自定义api"
        />
        <button class="default-btn">测试</button>
      </div>
      <button class="default-btn mt-16" @click="saveData">完成</button>
    </section>
  </dialog-el>
</template>

<script>
import Dialog from '@/component/common/Dialog.vue'
import ExcelTable from '@/component/common/ExcelTable'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { computed, ref } from 'vue'
import TableEl from '@/component/common/tableEl/TableEl'
import ColumnEl from '@/component/common/tableEl/ColumnEl'

export default {
  name: 'ApiDataDialog',
  components: { ColumnEl, TableEl, ExcelTable, DialogEl: Dialog },
  props: ['visible'],
  setup(props, context) {
    const store = useStore()
    const editorGetter = useGetter(store, 'editor', ['GET_SELECT_NODE'])

    const title = ref(
      editorGetter['GET_SELECT_NODE'].value?.option.echartsOption.title.text
    )
    const unit = ref(
      editorGetter['GET_SELECT_NODE'].value?.option.echartsOption.unit.text
    )
    const show = computed({
      get() {
        return props.visible
      },
      set(val) {
        context.emit('update:visible', val)
      }
    })

    const tableData = ref([
      {
        date: '2016-05-03',
        name: 'Tom1',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom2',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom3',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom4',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ])

    function saveData() {
      const node = editorGetter['GET_SELECT_NODE'].value
      node.option.echartsOption.title.text = title.value
      node.option.echartsOption.unit.text = unit.value

      context.emit('update:visible', false)
    }
    function test(payload) {
      console.log(payload)
    }
    return { title, unit, show, saveData, tableData, test }
  }
}
</script>

<style scoped>
.static-data-dialog {
  width: 764px;
  padding: 24px 30px;
  background: #1d1d1d;
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
.default-btn {
  @apply text-12;
  padding: 0 24px;
  background: #6582fe;
  border-radius: 3px;
  height: 30px;
}
.api-uri-wrapper {
  gap: 10px;
}
.api-uri-inp {
  height: 30px;
  padding-left: 10px;
  background: #292929;
  border-radius: 2px;
}
.dialog-table /deep/ .table-body td {
  border: none;
  border-left: 1px solid #313131;
  border-right: 1px solid #313131;
}
</style>
