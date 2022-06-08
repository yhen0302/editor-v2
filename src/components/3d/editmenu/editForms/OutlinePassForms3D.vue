<template>
  <div class="outline-pass-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'OutlinePass'" :height="48" :width="108" />

    <LineEl :color="'#363741'" />

    <div class="content outline">
      <div v-for="(item, key) in formSettings" :key="key" class="content-details">
        <div class="content-item" v-if="item.show">
          <div class="setting-item">
            <BaseTitle :value="key" :height="56" :width="144" :marginRight="8" />
          </div>

          <div class="setting-item">
            <div v-for="setting in item.data" :key="setting" class="setting">
              <BaseInput
                v-if="setting.type === 'input'"
                :target="{ key, setting }"
                :change="inputChange"
                :name="setting.name"
                :value="setting.value"
                :width="108"
                :height="32"
                :marginRight="4"
                :marginTop="12"
                :marginBottom="0"
              />

              <BaseSwitch
                v-else-if="setting.type === 'switch'"
                :height="32"
                :width="108"
                :value="setting.value"
                :marginRight="4"
                :marginTop="12"
                :marginBottom="0"
                :change="switchChange"
                :target="{ key, setting }"
              />

              <BaseColor
                v-else-if="setting.type === 'color'"
                :target="{ key, setting }"
                :change="inputChange"
                :value="setting.value"
                :type="'rgb'"
                :width="108"
                :height="32"
                :marginTop="8"
                :marginBottom="8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <LineEl class="division" :color="'#363741'" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import BaseSwitch from '@/components/utils/baseComponents/BaseSwitch.vue'
import BaseColor from '@/components/utils/baseComponents/BaseColor.vue'
import { colorRGBtoHex, hex2rgb } from '@/core/utils/base'

export default defineComponent({
  name: 'OutlinePassForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseSwitch,
    BaseColor
  },
  props: ['node'],
  setup(props: any) {
    const store = useStore()

    // header nav
    const headerItems = ref([
      {
        active: true,
        name: '基础设置',
        type: 'basicSetting'
      }
    ])

    // content settings
    const formSettings: any = ref({})

    onMounted(() => {
      const { type, options } = props.node

      // 展示编辑表单
      formSettings.value = {
        enabled: {
          show: true,
          data: [
            {
              value: options.enabled,
              type: 'switch'
            }
          ]
        },
        edgeStrength: {
          show: true,
          data: [
            {
              value: options.edgeStrength,
              type: 'input'
            }
          ]
        },
        edgeGlow: {
          show: true,
          data: [
            {
              value: options.edgeGlow,
              type: 'input'
            }
          ]
        },
        edgeThickness: {
          show: true,
          data: [
            {
              value: options.edgeThickness,
              type: 'input'
            }
          ]
        },
        pulsePeriod: {
          show: true,
          data: [
            {
              value: options.pulsePeriod,
              type: 'input'
            }
          ]
        },
        visibleEdgeColor: {
          show: true,
          data: [
            {
              value: hex2rgb(options.visibleEdgeColor),
              type: 'color'
            }
          ]
        },
        hiddenEdgeColor: {
          show: true,
          data: [
            {
              value: hex2rgb(options.hiddenEdgeColor),
              type: 'color'
            }
          ]
        }
      }

      formSettings.value.edgeStrength.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.edgeGlow.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.edgeThickness.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.pulsePeriod.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.visibleEdgeColor.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.hiddenEdgeColor.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })
    })

    onUnmounted(() => {
      //
    })

    const inputChange = (target: any) => {
      const e = event as any

      const val = e.target.value

      const threeDimensionContainer = toRaw(store.state.threeDimensionContainer)
      const { key, setting } = target

      if (key === 'edgeStrength') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        threeDimensionContainer.outlinePass.edgeStrength = parseFloat(val)
      } else if (key === 'edgeGlow') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        threeDimensionContainer.outlinePass.edgeGlow = parseFloat(val)
      } else if (key === 'edgeThickness') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        threeDimensionContainer.outlinePass.edgeThickness = parseFloat(val)
      } else if (key === 'pulsePeriod') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        threeDimensionContainer.outlinePass.pulsePeriod = parseFloat(val)
      } else if (key === 'visibleEdgeColor') {
        setting.value = hex2rgb(val)
        threeDimensionContainer.outlinePass.visibleEdgeColor.set(val)
      } else if (key === 'hiddenEdgeColor') {
        setting.value = hex2rgb(val)
        threeDimensionContainer.outlinePass.hiddenEdgeColor.set(val)
      }

      // update pageTreeNode
      const edgeStrength = formSettings.value['edgeStrength'].data[0].value
      const edgeGlow = formSettings.value['edgeGlow'].data[0].value
      const edgeThickness = formSettings.value['edgeThickness'].data[0].value
      const pulsePeriod = formSettings.value['pulsePeriod'].data[0].value
      const visibleEdgeColor = colorRGBtoHex(formSettings.value['visibleEdgeColor'].data[0].value)
      const hiddenEdgeColor = colorRGBtoHex(formSettings.value['hiddenEdgeColor'].data[0].value)

      Object.assign(store.state.selectedPageTreeNode.options, {
        edgeStrength,
        edgeGlow,
        edgeThickness,
        pulsePeriod,
        visibleEdgeColor,
        hiddenEdgeColor
      })
    }

    const switchChange = (e: any) => {
      const { target, value } = e
      const { setting, key } = target

      const threeDimensionContainer = store.state.threeDimensionContainer

      if (key === 'enabled') {
        setting.value = value

        threeDimensionContainer.outlinePass.enabled = value
      }

      Object.assign(store.state.selectedPageTreeNode.options, {
        enabled: value
      })
    }

    return {
      store,
      headerItems,
      formSettings,
      inputChange,
      switchChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.outline-pass-forms-3d-main {
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
