<template>
  <section class="table-el" ref="tableEl">
    <div class="table-header" :class='headerClass' :style="{ width: toPx(bodyWidth) }">
      <table class="table">
        <colgroup>
          <col v-for="item in columnsProps" span="1" :width="item.realWidth" :key="item.prop" />
        </colgroup>
        <component :is="tableHead"></component>
      </table>
    </div>
    <div class="table-body" :class="bodyClass" :style="{ width: toPx(bodyWidth) }">
      <table class="table">
        <colgroup>
          <col v-for="item in columnsProps" span="1" :width="item.realWidth" :key="item.prop" />
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
import { clone, toPx } from '../../../../share/util/base'
import {
  computed,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  Fragment
} from 'vue'

export default {
  name: 'TableEl',
  props: ['data','bodyClass','headerClass'],
  setup: function (props, context) {
    const instance = getCurrentInstance()
    const tableEl = ref(null)
    let fixedWidth = 0
    const columnVnodes = computed(() => {
      const list = []
      const clsDefault = context.slots.default()
      clsDefault.forEach((item) => {
        // v-for
        if (item.type === Fragment) list.push(...item.children)
        else list.push(item)
      })
      return list
    })

    const columnsProps = reactive(
      columnVnodes.value.map((item) => {
        const res = clone(item.props)
        !isNaN(item.props.width) && (fixedWidth += res.realWidth = Number(item.props.width))
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
      if (bodyWidth.value === instance.vnode.el.clientWidth) return
      bodyWidth.value = instance.vnode.el.clientWidth
      const diffWidth = bodyWidth.value - fixedWidth
      flexColumn.forEach((item) => {
        item.realWidth = diffWidth / flexColumn.length
      })
    }
    let loop
    onMounted(() => {
      observer.observe(instance.vnode.el)
      loop = () => {
        computedWidth()
        requestAnimationFrame(loop || new Function())
      }
      loop()
    })
    onUpdated(() => {
      requestAnimationFrame(computedWidth)
    })
    onUnmounted(() => {
      observer.disconnect()
      loop = null
    })

    const tableBody = () => (
      <tbody>
        {...props.data.map((item, rowI) => {
          return (
            <tr>
              {...columnVnodes.value.map((col) => (
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
          {columnVnodes.value.map((col, i) => (
            <th>
              {' '}
              {col?.children?.header
                ? col.children.header(clone({ column: col.props.label, $index: i }))
                : col.props.label}
            </th>
          ))}
        </tr>
      </thead>
    )

    return { toPx, columnsProps, bodyWidth, tableBody, tableHead, tableEl }
  }
}
</script>

<style scoped>
.table-el {
  width: 100%;
  text-align: center;
  color: #fff;
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
.table-header:deep(th) {
  height: 30px;
  border: 1px solid #313131;
  border-bottom: none;
  vertical-align: middle;
}
.table-body:deep(td) {
  height: 50px;
  vertical-align: middle;
  border: 1px solid #313131;
}
</style>
