<template>
  <div class="hdr-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="title-nav">
      <BaseTitle :value="'HDR'" :height="48" :width="144" />
    </div>

    <LineEl :color="'#363741'" />

    <div class="content hdr">
      <div v-for="(item, key) in formSettings" :key="key" class="details">
        <div class="content-item" v-if="item.show">
          <div class="setting-item">
            <BaseTitle :value="key" :height="48" :width="108" />
          </div>

          <div class="setting-item">
            <div v-for="setting in item.data" :key="setting" class="setting">
              <BaseDropdown
                v-if="setting.type === 'dropdown'"
                :target="{ key, setting }"
                :options="setting.options"
                :value="setting.selected"
                :height="32"
                :width="144"
                :marginTop="8"
                :marginBottom="8"
                :change="sourceChange"
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
import { defineComponent, onMounted, onUnmounted, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseDropdown from '@/components/utils/baseComponents/BaseDropdown.vue'

import * as UnderScore from 'underscore'

export default defineComponent({
  name: 'HDRForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseDropdown
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
      const { value } = options

      formSettings.value = {
        sources: {
          show: true,
          data: [
            {
              options: [
                {
                  name: '无',
                  value: []
                },
                {
                  name: 'default',
                  value: ['/hdr/dikhololo_night_1k.hdr']
                }
              ],
              selected: {
                name: '无',
                value: []
              },
              type: 'dropdown'
            }
          ]
        }
      }

      // sources selected
      formSettings.value.sources.data[0].options.forEach((op: any) => {
        if (UnderScore.isEqual(op.value, value)) {
          formSettings.value.sources.data[0].selected = op
        }
      })
    })

    onUnmounted(() => {
      //
    })

    const sourceChange = (e: any) => {
      const { value, target } = e
      const { setting, key } = target
      const threeDimensionContainer = toRaw(store.state.threeDimensionContainer)

      setting.selected = value

      if (key === 'sources') {
        threeDimensionContainer.hdrUrls = value.value
        if (UnderScore.isEqual(value.value, [])) {
          threeDimensionContainer.envMap = null
          threeDimensionContainer.scene.traverse((c: any) => {
            if (c.isMesh) {
              c.material.envMap = null
            }
          })
          // update selected pageTreeNode
          Object.assign(store.state.selectedPageTreeNode.options, {
            value: []
          })
        } else {
          threeDimensionContainer.setHDR(value.value, () => {
            Object.assign(store.state.selectedPageTreeNode.options, {
              value: value.value
            })
          })
        }
      }
    }

    return {
      store,
      headerItems,
      formSettings,
      sourceChange
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
