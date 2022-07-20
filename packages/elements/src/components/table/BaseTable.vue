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
    <table-el>
      <template #default>
        <column-el></column-el>
      </template>
    </table-el>
  </div>
</template>

<script>
import TableEl from  '../../../../../src/components/2d/common/tableEl/TableEl.vue'
import ColumnEl from '../../../../../src/components/2d/common/tableEl/ColumnEl.vue'
import matrixMixin from '../matrixMixin'
export default {
  name: 'BaseTable',
  mixins: [matrixMixin],
  props: ['node'],
  components: {
    TableEl,
    ColumnEl
  },
  setup() {
    console.log()
  }
}
</script>

<style scoped></style>
