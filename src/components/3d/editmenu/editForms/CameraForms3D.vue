<template>
  <div class="camera-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'相机'" :height="48" :width="72" />

    <LineEl :color="'#363741'" />

    <div class="content camera">
      <div v-for="(item, key) in formSettings" :key="key" class="content-item">
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
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import { useGetter, useState } from '@/store/helper'

export default defineComponent({
  name: 'CameraForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput
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
        // position: [
        //   {
        //     name: 'X',
        //     value: options.position[0],
        //     type: 'input'
        //   },
        //   {
        //     name: 'Y',
        //     value: options.position[1],
        //     type: 'input'
        //   },
        //   {
        //     name: 'Z',
        //     value: options.position[2],
        //     type: 'input'
        //   }
        // ],
        fov: [
          {
            value: options.fov,
            type: 'input'
          }
        ],
        near: [
          {
            value: options.near,
            type: 'input'
          }
        ],
        far: [
          {
            value: options.far,
            type: 'input'
          }
        ],
        distance: [
          {
            name: 'MIN',
            value: options.minDistance,
            type: 'input'
          },
          {
            name: 'MAX',
            value: options.maxDistance,
            type: 'input'
          }
        ],
        angle: [
          {
            name: 'MIN',
            value: options.minPolarAngle,
            type: 'input'
          },
          {
            name: 'MAX',
            value: options.maxPolarAngle,
            type: 'input'
          }
        ]
      }
    })

    onUnmounted(() => {})

    const inputChange = (target: any) => {
      const e = event as any

      const val = e.target.value
      if (isNaN(val)) return

      const threeDimensionContainer = state3D.threeDimensionContainer
      const { key, setting } = target
      const { name } = setting
      setting.value = parseFloat(val)

      let controls: any
      if (threeDimensionContainer.viewState === 'orbit') {
        controls = threeDimensionContainer.orbitControls
      } else if (threeDimensionContainer.viewState === 'firstPerson') {
        controls = threeDimensionContainer.firstPersonControls
      } else if (threeDimensionContainer.viewState === 'map') {
        controls = threeDimensionContainer.mapControls
      }

      if (key === 'position') {
        // if (name === 'X') {
        //   controls.object.position.x = parseFloat(val)
        // } else if (name === 'Y') {
        //   controls.object.position.y = parseFloat(val)
        // } else if (name === 'Z') {
        //   controls.object.position.z = parseFloat(val)
        // }
      } else if (key === 'near') {
        controls.object.near = parseFloat(val)
      } else if (key === 'far') {
        controls.object.far = parseFloat(val)
      } else if (key === 'fov') {
        controls.object.fov = parseFloat(val)
      } else if (key === 'distance') {
        if (name === 'MIN') {
          controls.minDistance = parseFloat(val)
        } else if (name === 'MAX') {
          controls.maxDistance = parseFloat(val)
        }
      } else if (key === 'angle') {
        if (name === 'MIN') {
          controls.minPolarAngle = (parseFloat(val) * Math.PI) / 180
        } else if (name === 'MAX') {
          controls.maxPolarAngle = (parseFloat(val) * Math.PI) / 180
        }
      }

      controls.object.updateProjectionMatrix()
      controls.update()

      // update pageTreeNode
      // const position = [formSettings.value['position'][0].value, formSettings.value['position'][1].value, formSettings.value['position'][2].value]
      const near = formSettings.value['near'][0].value
      const far = formSettings.value['far'][0].value
      const fov = formSettings.value['fov'][0].value
      const minDistance = formSettings.value['distance'][0].value
      const maxDistance = formSettings.value['distance'][1].value
      const minPolarAngle = formSettings.value['angle'][0].value
      const maxPolarAngle = formSettings.value['angle'][1].value

      Object.assign(getters3D.SELECTED_LAYER_NODE.value.options, {
        // position,
        near,
        far,
        fov,
        minDistance,
        maxDistance,
        minPolarAngle,
        maxPolarAngle
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
.camera-forms-3d-main {
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
