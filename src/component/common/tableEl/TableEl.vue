<template>
  <section class="table-el">
    <div class="table-header" :style="{ width: toPx(bodyWidth) }">
      <table class="table">
        <colgroup>
          <col
            v-for="item in columns"
            span="1"
            :width="item.realWidth"
            :key="item.prop"
          />
        </colgroup>
        <thead>
          <th v-for="item in columns" :key="item.prop">{{ item.label }}</th>
        </thead>
      </table>
    </div>
    <div class="table-body" :style="{ width: toPx(bodyWidth) }">
      <table class="table">
        <colgroup>
          <col
            v-for="item in columns"
            span="1"
            :width="item.realWidth"
            :key="item.prop"
          />
        </colgroup>
        <tbody>
          <tr v-for="item in data" :key="item">
            <td v-for="col in columns" :key="col.prop">{{ item[col.prop] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { clone, toPx } from '@/util/base'
import { getCurrentInstance, onMounted, onUpdated, reactive, ref } from 'vue'

export default {
  name: 'TableEl',
  props: ['data'],
  setup(props, context) {
    const instance = getCurrentInstance()
    let fixedWidth = 0
    const columns = reactive(
      context.slots.default().map((item) => {
        const res = clone(item.props)
        !isNaN(item.props.width) &&
          (fixedWidth += res.realWidth = Number(item.props.width))
        return res
      })
    )

    onUpdated(() => {
      console.log('update')
    })
    // 记录自动适应宽度的列
    const flexColumn = columns.filter((item) => !item.realWidth)

    const bodyWidth = ref(0)
    onMounted(() => {
      bodyWidth.value = instance.vnode.el.clientWidth
      const diffWidth = bodyWidth.value - fixedWidth
      flexColumn.forEach((item) => {
        item.realWidth = diffWidth / flexColumn.length
      })
    })

    return { toPx, columns, bodyWidth }
  }
}
</script>

<style scoped>
.table-header {
  background: #1d1d1d;
}
.table-body {
  background: #141414;
}
.table {
  border-collapse: collapse;
}
.table-header th {
  border: 1px solid #eee;
  border-bottom: none;
}
.table-body td {
  border: 1px solid #eee;
}
</style>
