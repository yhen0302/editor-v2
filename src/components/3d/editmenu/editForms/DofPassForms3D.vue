<template>
  <div class="dof-pass-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'DofPass'" :height="48" :width="108" />

    <LineEl :color="'#363741'" />

    <div class="content dof">
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
  name: 'DofPassForms3D',
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
        focus: {
          show: true,
          data: [
            {
              value: options.focus,
              type: 'input'
            }
          ]
        },
        aperture: {
          show: true,
          data: [
            {
              value: options.aperture,
              type: 'input'
            }
          ]
        },
        maxblur: {
          show: true,
          data: [
            {
              value: options.maxblur,
              type: 'input'
            }
          ]
        }
      }

      formSettings.value.focus.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.aperture.show = computed(() => {
        return formSettings.value.enabled.data[0].value
      })

      formSettings.value.maxblur.show = computed(() => {
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

      if (key === 'focus') {
        threeDimensionContainer.bokehPass.uniforms.focus.value = parseFloat(val)
      } else if (key === 'aperture') {
        threeDimensionContainer.bokehPass.uniforms.aperture.value = parseFloat(val)
      } else if (key === 'maxblur') {
        threeDimensionContainer.bokehPass.uniforms.maxblur.value = parseFloat(val)
      }

      // update pageTreeNode
      const focus = formSettings.value['focus'].data[0].value
      const aperture = formSettings.value['aperture'].data[0].value
      const maxblur = formSettings.value['maxblur'].data[0].value

      Object.assign(getters3D.SELECTED_LAYER_NODE.value.options, {
        focus,
        aperture,
        maxblur
      })
    }

    const switchChange = (e: any) => {
      const { target, value } = e
      const { setting, key } = target

      const threeDimensionContainer = state3D.threeDimensionContainer

      if (key === 'enabled') {
        setting.value = value

        threeDimensionContainer.bokehPass.enabled = value
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
.dof-pass-forms-3d-main {
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
