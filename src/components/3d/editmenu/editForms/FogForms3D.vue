<template>
  <div class="fog-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="title-nav">
      <BaseTitle :value="'FOG'" :height="48" :width="144" />
    </div>

    <LineEl :color="'#363741'" />

    <div class="content fog">
      <div v-for="(item, key) in formSettings" :key="key" class="details">
        <div class="content-item" v-if="item.show">
          <div class="setting-item">
            <BaseTitle :value="key" :height="48" :width="108" />
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
                :marginBottom="8"
                :marginTop="8"
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
      <LineEl class="division" :color="'#363741'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseColor from '@/components/utils/baseComponents/BaseColor.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'

import { hex2rgb } from '@/core/utils/base'

export default defineComponent({
  name: 'FogForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseColor,
    BaseInput
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
    const formSettings: any = ref([])

    onMounted(() => {
      //
      const { options } = props.node
      const { intensity, color } = options

      formSettings.value = {
        color: {
          show: true,
          data: [
            {
              type: 'color',
              value: hex2rgb(color)
            }
          ]
        },
        intensity: {
          show: true,
          data: [
            {
              type: 'input',
              value: intensity
            }
          ]
        }
      }
    })

    onUnmounted(() => {
      //
    })

    const inputChange = (target: any, type?: string) => {
      const e = event as any
      const threeDimensionContainer = store.state.threeDimensionContainer
      const { key, setting } = target
      const val = e.target.value

      if (key === 'color') {
        if (type === 'hex') {
          threeDimensionContainer.scene.fog.color.set(val)
          setting.value = val
          // update selected pageTreeNode
          Object.assign(store.state.selectedPageTreeNode.options, {
            color: val
          })
        }
      } else if (key === 'intensity') {
        if (isNaN(val)) return
        const v = parseFloat(val)
        setting.value = v
        threeDimensionContainer.scene.fog.density = v
        Object.assign(store.state.selectedPageTreeNode.options, {
          intensity: v
        })
      }
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
.shadow-forms-3d-main {
  @apply w-full h-full;
}
.header {
  height: 64px;
  @apply w-full flex;
}
.title-nav {
  @apply relative flex items-center;
}

.content {
  height: calc(100% - 64px - 1px - 48px - 1px);
  @apply w-full overflow-scroll;
}

.content-item {
  @apply w-full h-auto flex items-start relative;
}

.setting-item {
  @apply flex flex-col h-auto;
}

.header-item {
  width: 80px;
  height: 64px;
}
</style>
