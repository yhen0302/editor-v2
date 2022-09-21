<template>
  <div
    class="table-wrapper absolute"
    :class="cssModule['table-wrapper']"
    v-drag="{ rect: node.option.matrixOption, select: node.select }"
    draggable="false"
    :style="{
      width,
      height,
      left,
      top
    }"
    @click.stop
    @mousedown="onMouseDown"
    @wheel.stop.passive
    @scroll.stop
    ref="el"
  >
    <table-el :data="tableData" :body-class="cssModule['table-body']" :header-class="cssModule['table-header']">
      <template #default>
        <column-el :prop="key" :label="val" v-for="(val, key) in node.option.tableMap" :key="key">
          <template v-slot:default="data">
            <div class="col-content" @blur="editTableContentBlur($event, data, key)" @dblclick="editTableData($event, data)">
              {{ data.row[key] }}
            </div>
          </template>
          <template v-slot:header="data">
            <div class="col-header" @blur="editTableHeaderBlur($event, data, key)" @dblclick="editTableData($event, data)">
              {{ val }}
            </div>
          </template>
        </column-el>
      </template>
    </table-el>
  </div>
</template>

<script>
import TableEl from '../../../../../src/components/2d/common/tableEl/TableEl.vue'
import ColumnEl from '../../../../../src/components/2d/common/tableEl/ColumnEl.vue'
import matrixMixin from '../matrixMixin'
import { computed, ref, useCssModule } from 'vue'

export default {
  name: 'BaseTable',
  mixins: [matrixMixin],
  props: ['node'],
  components: {
    TableEl,
    ColumnEl
  },
  setup(props) {
    // console.log(props.node)
    const tableData = computed(() => props.node.option.tableData)
    let _enableEdit = false
    const enableEdit = computed({
      get() {
        return IS_EDITOR && _enableEdit
      },
      set(val) {
        _enableEdit = val
      }
    })

    function editTableData(ev, payload) {
      const target = ev.target
      target.setAttribute('contenteditable', true)
      target.focus()
    }
    // 双向绑定
    function editTableContentBlur(ev, payload, key) {
      // eslint-disable-next-line vue/no-mutating-props
      props.node.option.tableData[payload.$index][key] = ev.target.innerText
      ev.target.setAttribute('contenteditable', false)
    }
    function editTableHeaderBlur(ev, payload, key) {
      // eslint-disable-next-line vue/no-mutating-props
      props.node.option.tableMap[key] = ev.target.innerText
      ev.target.setAttribute('contenteditable', false)
    }

    const cssModule = useCssModule(props.node.option.style)
    return { tableData, editTableData, editTableContentBlur, editTableHeaderBlur, cssModule }
  }
}
</script>

<style scoped>
.table-wrapper {
  overflow: hidden;
  box-sizing: border-box;
}
.col-content {
  outline: none;
  overflow: auto;
}
</style>

<style module="table-1" lang="less">
.table-wrapper {
  background: rgba(225, 231, 227, 0.6);
}
.table-header {
  background: none !important;
  th {
    border: none !important;
    color: rgba(138, 152, 144, 0.6);
    font-size: 12px !important;
  }
}
.table-body {
  background: none !important;
  td {
    height: auto !important;
    padding: 8px 0;
    border: none !important;
    color: rgba(34, 52, 41, 0.6);
    font-size: 12px !important;
  }
}
</style>
<style module="table-2" lang="less">
.table-wrapper {
  background: none;
}
.table-header {
  background: none !important;
  th {
    border: none !important;
    color: rgba(229, 236, 250, 0.5);
    font-size: 12px !important;
  }
  tr {
    background: linear-gradient(90deg, rgba(161, 170, 192, 0) 0%, rgba(161, 170, 192, 0.99) 49%, rgba(161, 170, 192, 0) 100%) bottom/100% 1px no-repeat;
  }
}
.table-body {
  background: none !important;
  td {
    height: auto !important;
    padding: 8px 0;
    border: none !important;
    color: rgb(229, 236, 250);
    font-size: 12px !important;
  }
  tr {
    background: linear-gradient(90deg, rgba(161, 170, 192, 0) 0%, rgba(161, 170, 192, 0.99) 49%, rgba(161, 170, 192, 0) 100%) bottom/100% 1px no-repeat;
  }
}
</style>
<style module="table-3" lang="less">
.table-wrapper {
  background: none;
}
.table-header {
  background: none !important;
  th {
    padding: 8px 0;
    border: none !important;
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px !important;
  }
}
.table-body {
  background: none !important;
  td {
    height: auto !important;
    padding: 8px 0;
    border: none !important;
    color: rgb(255, 255, 255);
    font-size: 12px !important;
  }
  tr:nth-child(odd) {
    background: rgba(57, 57, 57, 0.7);
  }
}
</style>
<style></style>
<style></style>
