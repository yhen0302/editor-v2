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
        <column-el prop="name" label="姓名"></column-el>
        <column-el prop="age" label="年龄"></column-el>
      </template>
    </table-el>
  </div>
</template>

<script>
import TableEl from '../../../../../src/components/2d/common/tableEl/TableEl.vue'
import ColumnEl from '../../../../../src/components/2d/common/tableEl/ColumnEl.vue'
import matrixMixin from '../matrixMixin'
import { computed } from 'vue'

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
    return { tableData }
  }
}
</script>

<style scoped></style>
