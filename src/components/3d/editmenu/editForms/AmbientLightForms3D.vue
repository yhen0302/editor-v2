<template>
  <div class="ambient-light-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'AmbientLight'" :height="48" :width="144" />

    <LineEl :color="'#363741'" />

    <div class="content ambientLight">
      <div v-for="(item, key) in formSettings" :key="item" class="content-item">
        <div class="setting-item">
          <BaseTitle :value="key" :height="56" :width="72" :marginRight="8" />
        </div>

        <div class="setting-item">
          <div v-for="setting in item" :key="setting" class="setting">
            <BaseInput
              v-if="setting.type === 'input'"
              :target="{ key, setting }"
              :change="inputChange"
              :name="setting.name"
              :value="setting.value"
              :width="100"
              :height="32"
              :marginRight="4"
              :marginTop="12"
              :marginBottom="0"
            />

            <BaseColor
              v-else-if="setting.type === 'color'"
              :target="{ key, setting }"
              :change="inputChange"
              :value="setting.value"
              :type="'rgb'"
              :height="32"
              :marginRight="4"
              :marginTop="12"
              :marginBottom="0"
            />
          </div>
        </div>

        <LineEl class="division" :color="'#363741'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { EventsBus } from '@/core/EventsBus'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import BaseColor from '@/components/utils/baseComponents/BaseColor.vue'
import { hex2rgb } from '@/core/utils/base'
import { useGetter, useState } from '@/store/helper'

export default defineComponent({
  name: 'AmbientLightForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseColor
  },
  props: ['node'],
  setup(props: any) {
    const store = useStore()

    const state3D = useState(store, '3d')

    const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])

    // header nav
    const headerItems = ref([
      {
        active: true,
        name: '基础设置',
        type: 'basicSetting'
      }
    ])

    // content settings
    const formSettings: any = ref([])

    let currentObj: any

    onMounted(() => {
      const { options } = props.node

      const threeDimensionContainer = state3D.threeDimensionContainer

      threeDimensionContainer.scene.traverse((c: any) => {
        if (c.type == 'AmbientLight') currentObj = c
      })

      // 展示编辑表单
      formSettings.value = {
        color: [
          {
            value: options.color,
            type: 'color'
          }
        ],
        intensity: [
          {
            value: options.intensity,
            type: 'input'
          }
        ]
      }
    })

    onUnmounted(() => {
      //
    })

    const inputChange = (target: any, type?: string) => {
      const e = event as any

      const { setting, key } = target
      const val = e.target.value

      if (key === 'intensity') {
        if (isNaN(val)) return
        currentObj.intensity = parseFloat(val)
        setting.value = parseFloat(val)
      } else if (key === 'color') {
        if (type === 'hex') {
          const rgb: Array<number> = hex2rgb(val)
          currentObj.color.r = rgb[0] / 255
          currentObj.color.g = rgb[1] / 255
          currentObj.color.b = rgb[2] / 255
          setting.value = rgb
        }
      }

      // update pageTreeNode
      const color = [formSettings.value['color'][0].value[0], formSettings.value['color'][0].value[1], formSettings.value['color'][0].value[2]]
      const intensity = formSettings.value['intensity'][0].value

      Object.assign(getters3D.SELECTED_LAYER_NODE.value.options, {
        color,
        intensity
      })
    }

    return {
      store,
      headerItems,
      formSettings,
      inputChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.ambient-light-forms-3d-main {
  @apply w-full h-full;
}
.header {
  height: 64px;
  @apply w-full flex;
}
.content {
  height: calc(100% - 64px - 1px - 48px - 1px);
  @apply w-full overflow-scroll;
}
.content-title {
  height: @apply w-full flex;
}
.header-item {
  width: 80px;
  height: 64px;
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
