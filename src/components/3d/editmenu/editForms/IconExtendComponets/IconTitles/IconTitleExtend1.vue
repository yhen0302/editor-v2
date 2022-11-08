<template>
  <div class="icon-title-extend-1">
    <div v-for="(item, key) in extendsList" :key="key" class="content-item">
      <div class="setting-item">
        <BaseTitle :value="key" :height="56" :width="80" :marginRight="8" />
      </div>

      <div class="setting-item">
        <BaseInput
          v-if="item.type === 'string' || item.type == 'number'"
          :target="{ key, item }"
          :change="inputChange"
          :value="item.value"
          :width="100"
          :height="32"
          :marginRight="4"
          :marginTop="12"
          :marginBottom="0"
        />

        <BaseColor v-else-if="item.type === 'color'" :target="{ key, item }" :change="colorChange" :value="hex2rgb(item.value)" :type="'rgb'" :height="32" :marginRight="4" :marginTop="12" />
      </div>

      <LineEl class="division" :color="'#363741'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue'
import { useStore } from 'vuex'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import BaseColor from '@/components/utils/baseComponents/BaseColor.vue'
import { useGetter, useState } from '@/store/helper'
import { hex2rgb } from '@/core/utils/base'

export default defineComponent({
  name: 'IconTitleExtend1',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseColor
  },
  props: ['options'],
  setup(props: any) {
    const store = useStore()

    const state3D = useState(store, '3d')
    const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])

    const extendsList = ref({})

    onMounted(() => {
      console.log('props.options', props.options)

      const threeDimensionContainer = state3D.threeDimensionContainer

      extendsList.value = Object.assign({}, props.options)
    })

    const inputChange = (target: any, val: any) => {
      console.log('input val', target, val)
    }

    const colorChange = (target: any, val: any) => {
      console.log('color val', target, val)
    }

    return {
      store,
      extendsList,
      hex2rgb,
      inputChange,
      colorChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.icon-title-extend-1 {
  @apply w-full flex flex-col;
}
.content-item {
  @apply w-full h-auto flex items-start relative;
}

.setting-item {
  @apply flex flex-col h-auto;
}
.setting:last-child {
  margin-bottom: 12px;
}
.division {
  bottom: 0;
  @apply absolute;
}
</style>
