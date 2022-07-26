<template>
  <div
    class="table-wrapper absolute"
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
    <table-el :data="tableData">
      <template #default>
        <column-el :prop="key" :label="val" v-for="(val, key) in node.option.tableMap" :key="key">
          <template v-slot:default="data">
            <div
              class="col-content"
              @blur="editTableContentBlur($event, data, key)"
              @dblclick="editTableContentData($event, data)"
            >
              {{ data.row[key] }}
            </div>
          </template>
          <template v-slot:header="data">
            <div
              class="col-header"
              @blur="editTableHeaderBlur($event, data, key)"
              @dblclick="editTableData($event, data)"
            >
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
import { computed, ref } from 'vue'

export default {
  name: 'BaseTable',
  mixins: [matrixMixin],
  props: ['node'],
  components: {
    TableEl,
    ColumnEl
  },
  setup(props) {
    console.log(props.node)
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
    return { tableData, editTableData, editTableContentBlur, editTableHeaderBlur }
  }
}
</script>

<style scoped>
.table-wrapper{
  overflow: hidden;
}
.col-content {
  outline: none;
  overflow: auto;
}
</style>
