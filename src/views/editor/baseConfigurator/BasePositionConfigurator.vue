<template>
  <section class="base-position-configurator-wrap">
    <fold-el
      :title="GET_SELECT_NODE.name"
      :show-line="false"
      :control-fold="false"
    >
      <template #default>
        <div class="base-p-c-content-box flex flex-col">
          <div class="base-p-c-c-content flex position items-center">
            <p class="text-12 config-pre">位置</p>
            <input-el type="number" class="inp-wrap" v-model:value="GET_SELECT_NODE.option.matrixOption.left">
              <template #prefix
                ><span class="inp-suffix text-12">X</span></template
              >
            </input-el>
            <input-el
              type="number"
              class="inp-wrap"
              v-model:value="GET_SELECT_NODE.option.matrixOption.top"
            >
              <template #prefix
                ><span class="inp-suffix text-12">Y</span></template
              >
            </input-el>
          </div>
          <div class="base-p-c-c-content flex size items-center">
            <p class="text-12 config-pre">尺寸</p>
            <input-el
              type="number"
              class="inp-wrap"
              v-model:value="GET_SELECT_NODE.option.matrixOption.width"
            >
              <template #prefix
                ><span class="inp-suffix text-12">W</span></template
              >
            </input-el>
            <input-el
              type="number"
              class="inp-wrap"
              v-model:value="GET_SELECT_NODE.option.matrixOption.height"
            >
              <template #prefix
                ><span class="inp-suffix text-12">H</span></template
              >
            </input-el>
          </div>
          <div class="base-p-c-c-content flex position items-center">
            <p class="text-12 config-pre">旋转角度</p>
            <input-el type="number" class="inp-wrap">
              <template #prefix
                ><img src="~@/assets/images/editor_angle_icn_dark.png" alt=""
              /></template>
            </input-el>
            <div></div>
          </div>
        </div>
        <line-el color="#363741"></line-el>
      </template>
    </fold-el>
  </section>
</template>

<script>
import FoldEl from '@/component/common/FoldEl'
import InputEl from '@/component/common/InputEl'
import LineEl from '@/component/common/LineEl'
import { useStore } from 'vuex'
import { useGetter } from '@/store/helper'
import { computed } from 'vue'

export default {
  name: 'BasePositionConfigurator',
  components: { LineEl, InputEl, FoldEl },
  setup() {
    const store = useStore()
    const editorGetters = useGetter(store, 'editor', ['GET_SELECT_NODE'])

    return {
      ...editorGetters,
      // top,
      // width,
      // height
    }
  }
}
</script>

<style scoped>
.base-p-c-content-box {
  gap: 16px;
}

.base-p-c-content-box {
  padding: 16px 16px 16px 0;
}

.base-p-c-c-content {
  gap: 8px;
}

.config-pre {
  padding-left: 16px;
  text-align: left;
  width: 72px;
}

.inp-wrap {
  height: 32px;
  width: 80px;
}

.inp-suffix {
  margin-right: 4px;
  vertical-align: top;
  color: #a6a9c4;
}
</style>
