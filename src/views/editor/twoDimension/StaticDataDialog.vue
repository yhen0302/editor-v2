<template>
  <dialog-el :modal="true" :center="true">
    <div class="static-data-dialog">
      <header class="static-data-header flex">
        <div class="title-area items-center flex">
          <span class="header-name">标题</span>
          <input type="text" class="header-inp flex-1" placeholder="输入标题" />
        </div>
        <div class="unit-area items-center flex">
          <span class="header-name">单位</span>
          <input type="text" class="header-inp flex-1" placeholder="输入单位" />
        </div>
      </header>
      <div class="static-data-content">
        <excel-table></excel-table>
      </div>
    </div>
  </dialog-el>
</template>

<script>
import Dialog from '@/component/common/Dialog.vue'
import ExcelTable from "@/component/common/ExcelTable";
export default {
  name: 'StaticDataDialog',
  components: {ExcelTable, DialogEl: Dialog },
  props: { modal: Boolean }
}
</script>

<style scoped>
.static-data-dialog {
  width: 744px;
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

</style>
