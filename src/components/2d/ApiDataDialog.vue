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
        <table-el :data="yAxisData" class="dialog-table text-12">
          <column-el prop="colName" label="列名">
            <template v-slot:default="{ column, $index }">
              <div class="inp-wrap">
                <input-el
                  :value="column"
                  class="h-full inline-block"
                  @update:value="yAxisData[$index].colName = $event"
                ></input-el>
              </div>
            </template>
          </column-el>
          <column-el prop="mapping" label="映射">
            <template v-slot:default="{ column, $index }">
              <div class="inp-wrap">
                <input-el
                  :value="column"
                  class="h-full inline-block"
                  @update:value="yAxisData[$index].mapping = $event"
                ></input-el>
              </div>
            </template>
          </column-el>
          <column-el prop="status" label="状态">
            <template v-slot:header="{ column }">
              <span>{{ column }}</span>
            </template>
            <template v-slot:default="{ column }">
              <span v-if="column === 1">匹配成功</span>
              <span v-else style="color: #ef4444">匹配失败</span>
            </template>
          </column-el>
        </table-el>
        <table-el :data="xAxisData" class="dialog-table text-12 mt-16">
          <column-el prop="colName" label="列名"></column-el>
          <column-el prop="mapping" label="映射">
            <template v-slot:default="{ column, $index }">
              <div class="inp-wrap">
                <input-el
                  :value="column"
                  class="h-full inline-block"
                  @update:value="xAxisData[$index].mapping = $event"
                ></input-el>
              </div>
            </template>
          </column-el>
          <column-el prop="status" label="状态">
            <template v-slot:header="{ column }">
              <span>{{ column }}</span>
            </template>
            <template v-slot:default="{ column }">
              <span v-if="column === 1">匹配成功</span>
              <span v-else style="color: #ef4444">匹配失败</span>
            </template>
          </column-el>
        </table-el>
      </div>
      <!--url inp-->
      <div class="api-uri-wrapper items-center flex mt-16">
        <span class="api-uri-desc text-12">API地址</span>
        <input
          type="text"
          class="api-uri-inp flex-1 text-12"
          placeholder="请输入自定义api"
          v-model="apiUrl"
        />
        <button class="default-btn" @click="test">测试</button>
      </div>
      <!--success-->
      <div class="footer-wrap">
        <button class="cancel-btn default-btn mt-16 mr-16" @click="cancel()">
          取消
        </button>
        <button class="default-btn mt-16" @click="saveData">完成</button>
      </div>
    </section>
  </dialog-el>
</template>

<script>
import Dialog from '@/components/2d/common/Dialog.vue'
import ExcelTable from '@/components/2d/common/ExcelTable'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { computed, ref } from 'vue'
import TableEl from '@/components/2d/common/tableEl/TableEl'
import ColumnEl from '@/components/2d/common/tableEl/ColumnEl'
import InputEl from '@/components/2d/common/InputEl'
import { valueHandle } from '@/share/util/base'

export default {
  name: 'ApiDataDialog',
  components: { InputEl, ColumnEl, TableEl, ExcelTable, DialogEl: Dialog },
  props: ['visible'],
  setup(props, context) {
    const store = useStore()
    const editorGetter = useGetter(store, 'global', ['GET_SELECT_NODE'])

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

    const yAxisData = ref([
      {
        colName: 'data.name',
        mapping: 'data.x',
        status: 0
      }
    ])

    const xAxisData = ref([
      {
        colName: 'X轴数据映射',
        mapping: 'x',
        status: 0
      }
    ])

    const apiUrl = ref('http://192.168.0.113:9999/test')

    function verificationUrl(url) {
      return /^http[s]?:\/\/(.+)\.(.+)/.test(url)
    }
    function mappingData(obj) {
      ;[yAxisData, xAxisData].forEach((d) => {
        d.value.forEach((item) => {
          const val = valueHandle(obj, item.mapping)
          const yName = valueHandle(obj, item.colName)
          if (val) {
            item.status = 1
          }
        })
      })
    }
    async function test() {
      // 验证成功
      if (verificationUrl(apiUrl.value)) {
        // 测试
        const res = await (await fetch(apiUrl.value)).json()
        mappingData(res)
      }
    }
    function saveData() {
      const node = editorGetter['GET_SELECT_NODE'].value
      node.option.echartsOption.title.text = title.value
      node.option.echartsOption.unit.text = unit.value
      node.option.apiMapping = []
      node.option.apiUrl = ''
      xAxisData.value.forEach((item) => {
        item.status &&
          node.option.apiMapping.push({ target: 'x', path: item.mapping }) &&
          (node.option.apiUrl = apiUrl.value)
      })
      yAxisData.value.forEach((item) => {
        item.status &&
          node.option.apiMapping.push({
            target: 'y',
            path: item.mapping,
            name: item.colName
          }) &&
          (node.option.apiUrl = apiUrl.value)
      })
      context.emit('update:visible', false)
    }
    function cancel() {
      context.emit('update:visible', false)
    }

    return {
      title,
      unit,
      show,
      saveData,
      yAxisData,
      xAxisData,
      apiUrl,
      test,
      cancel
    }
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
.inp-wrap {
  padding: 0 20px;
  height: 30px;
}
.cancel-btn {
  background: #414141;
}
</style>
