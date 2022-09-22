<template>
  <div class="bloom-pass-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'BloomPass'" :height="48" :width="108" />

    <LineEl :color="'#363741'" />

    <div class="content bloom">
      <div v-for="(item, key) in formSettings" :key="key" class="content-details">
        <div class="content-item" v-if="item.show">
          <div class="setting-item">
            <BaseTitle :value="key" :height="56" :width="72" :marginRight="8" />
          </div>

          <div class="setting-item">
            <div v-for="setting in item.data" :key="setting" class="setting">
              <BaseInput
                v-if="setting.type === 'input'"
                :target="{ key, setting }"
                :change="inputChange"
                :name="setting.name"
                :value="setting.value"
                :width="144"
                :height="32"
                :marginRight="4"
                :marginTop="12"
                :marginBottom="0"
              />

              <BaseSwitch
                v-else-if="setting.type === 'switch'"
                :height="32"
                :width="144"
                :value="setting.value"
                :marginRight="4"
                :marginTop="12"
                :marginBottom="0"
                :change="switchChange"
                :target="{ key, setting }"
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
import { computed, defineComponent, onMounted, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import BaseSwitch from '@/components/utils/baseComponents/BaseSwitch.vue'
import { useGetter, useState } from '@/store/helper'

export default defineComponent({
  name: 'BloomPassForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseSwitch
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
    const formSettings: any = ref({})

    onMounted(() => {
      const { options } = props.node

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
        strength: {
          show: true,
          data: [
            {
              value: options.strength,
              type: 'input'
            }
          ]
        },
        radius: {
          show: true,
          data: [
            {
              value: options.radius,
              type: 'input'
            }
          ]
        },
        threshold: {
          show: true,
          data: [
            {
              value: options.threshold,
              type: 'input'
            }
          ]
        }
      }

      formSettings.value.strength.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.radius.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.threshold.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })
    })

    const inputChange = (target: any) => {
      const e = event as any

      const val = e.target.value
      if (isNaN(val)) return

      const threeDimensionContainer = toRaw(state3D.threeDimensionContainer)
      const { key, setting } = target
      setting.value = parseFloat(val)

      if (key === 'strength') {
        threeDimensionContainer.bloomPass.strength = parseFloat(val)
        threeDimensionContainer.bloomPass.compositeMaterial.uniforms['bloomStrength'].value = parseFloat(val)
      } else if (key === 'radius') {
        threeDimensionContainer.bloomPass.radius = parseFloat(val)
        threeDimensionContainer.bloomPass.compositeMaterial.uniforms['bloomRadius'].value = parseFloat(val)
      } else if (key === 'threshold') {
        threeDimensionContainer.bloomPass.threshold = parseFloat(val)
        threeDimensionContainer.bloomPass.highPassUniforms['luminosityThreshold'].value = parseFloat(val)
      }

      // update pageTreeNode
      const strength = formSettings.value['strength'].data[0].value
      const radius = formSettings.value['radius'].data[0].value
      const threshold = formSettings.value['threshold'].data[0].value

      Object.assign(getters3D.SELECTED_LAYER_NODE.value.options, {
        strength,
        radius,
        threshold
      })
    }

    const switchChange = (e: any) => {
      const { target, value } = e
      const { setting, key } = target

      const threeDimensionContainer = state3D.threeDimensionContainer

      if (key === 'enabled') {
        setting.value = value

        threeDimensionContainer.bloomPass.enabled = value
        threeDimensionContainer.finalbloomPass.material.uniforms.bloomTexture.value = value ? threeDimensionContainer.bloomComposer.renderTarget2.texture : null
      }

      Object.assign(getters3D.SELECTED_LAYER_NODE.value.options, {
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
.bloom-pass-forms-3d-main {
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
