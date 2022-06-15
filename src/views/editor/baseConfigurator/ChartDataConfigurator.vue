<template>
  <section class="chart-data-configurator">
    <fold-el :line-show="false" :control-fold="false" title="数据绑定">
      <template #default>
        <div class="sub-fold-content pr-16 pl-16">
          <div class="data-type-box flex">
            <select-el
              class="flex-1"
              :list="[{ label: '表格数据', value: 'table' },{ label: 'api接入', value: 'api' }]"
              v-model:value="dataType"
            ></select-el>
            <button class="btn flex">
              <img src="~@/assets/images/edit.png" width="20" />
            </button>
          </div>
        </div>
      </template>
    </fold-el>
    <static-data-dialog></static-data-dialog>
  </section>
</template>

<script>
import FoldEl from '@/component/common/FoldEl.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import SelectEl from '@/component/common/SelectEl'
import StaticDataDialog from "@/views/editor/twoDimension/StaticDataDialog";

export default {
  name: 'ChartDataConfigurator',
  components: {
    StaticDataDialog,
    SelectEl,
    FoldEl
  },
  setup() {
    const store = useStore()
    const editorGetter = useGetter(store, 'editor', ['GET_SELECT_NODE'])
    const dataType = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.dataType
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.dataType = newVal
      }
    })

    return { dataType }
  }
}
</script>

<style scoped>
.data-type-box {
  width: 100%;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 32px;
  border-radius: 2px;
  background: #31333d;
}

.btn:hover {
  background: #6582fe;
}
</style>
