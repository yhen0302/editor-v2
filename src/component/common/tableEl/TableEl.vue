<template>
  <section class="table-el">
    <div class="table-header" :style="{ width: toPx(bodyWidth) }">
      <table class="table">
        <colgroup>
          <col
            v-for="item in columnsProps"
            span="1"
            :width="item.realWidth"
            :key="item.prop"
          />
        </colgroup>
        <component :is="tableHead"></component>
      </table>
    </div>
    <div class="table-body" :style="{ width: toPx(bodyWidth) }">
      <table class="table">
        <colgroup>
          <col
            v-for="item in columnsProps"
            span="1"
            :width="item.realWidth"
            :key="item.prop"
          />
        </colgroup>
        <!--        <tbody>
               <tr v-for="item in data" :key="item">
            <td v-for="col in columnsProps" :key="col.prop">{{ item[col.prop] }}</td>
          </tr>
        </tbody>-->
        <component :is="tableBody" class="tbody"></component>
      </table>
    </div>
  </section>
</template>

<script lang="jsx">
import { clone, toPx } from '@/util/base'
import {
  getCurrentInstance,
  h,
  nextTick,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  reactive,
  ref
} from 'vue'

export default {
  name: 'TableEl',
  props: ['data'],
  setup: function (props, context) {
    const instance = getCurrentInstance()
    let fixedWidth = 0
    const columnVnodes = context.slots.default()
    const columnsProps = reactive(
      columnVnodes.map((item) => {
        const res = clone(item.props)
        !isNaN(item.props.width) &&
          (fixedWidth += res.realWidth = Number(item.props.width))
        return res
      })
    )

    // 记录自动适应宽度的列
    const flexColumn = columnsProps.filter((item) => !item.realWidth)

    const bodyWidth = ref(0)

    const observer = new IntersectionObserver((mutations) => {
      if (mutations[0].isIntersecting) {
        computedWidth()
      }
    })
    // 计算列宽度
    const computedWidth = () => {
      bodyWidth.value = instance.vnode.el.clientWidth
      const diffWidth = bodyWidth.value - fixedWidth
      flexColumn.forEach((item) => {
        item.realWidth = diffWidth / flexColumn.length
      })
    }

    onMounted(() => {
      observer.observe(instance.vnode.el)
      computedWidth()
    })
    const tableBody = () => (
      <tbody>
        {...props.data.map((item, rowI) => {
          return (
            <tr>
              {...columnVnodes.map((col) => (
                <td>
                  {col?.children?.default
                    ? col.children.default(
                        clone({
                          row: item,
                          $index: rowI,
                          column: item[col.props.prop]
                        })
                      )
                    : item[col.props.prop]}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    )

    const tableHead = () => (
      <thead>
        <tr>
          {columnVnodes.map((col, i) => (
            <th>
              {' '}
              {col?.children?.header
                ? col.children.header(
                    clone({ column: col.props.label, $index: i })
                  )
                : col.props.label}
            </th>
          ))}
        </tr>
      </thead>
    )
    return { toPx, columnsProps, bodyWidth, tableBody, tableHead }
  }
}
</script>

<style scoped>
.table-el {
  width: 100%;
}
.table-header {
  background: #1d1d1d;
}
.table-body {
  background: #141414;
}
.table {
  border-collapse: collapse;
}
.table-header /deep/ th {
  height: 30px;
  border: 1px solid #313131;
  border-bottom: none;
  vertical-align: middle;
}
.table-body /deep/ td {
  height: 50px;
  vertical-align: middle;
  border: 1px solid #313131;
}
</style>
