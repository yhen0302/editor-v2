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
      <div v-for="item in formSettings" :key="item" class="content-item">
        <div class="setting-item">
          <BaseTitle :value="item.name" :height="56" :width="72" :marginRight="8" />
        </div>

        <div class="setting-item">
          <div v-for="setting in item.settings" :key="setting" class="setting">
            <BaseInput
              v-if="setting.type === 'input'"
              :target="setting"
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
import { EventsBus } from '@/core/EventsBus'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'

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

    const cameraChanged = (event: any) => {
      const { position } = event
      formSettings.value.forEach((item: any) => {
        if (item.name === 'position') {
          item.settings[0].value = position[0]
          item.settings[1].value = position[1]
          item.settings[2].value = position[2]
        }
      })
    }

    onMounted(() => {
      const { type, options } = props.node
      // 展示编辑表单
      formSettings.value = [
        {
          name: 'position',
          settings: [
            {
              name: 'X',
              value: options.position[0],
              type: 'input',
              root: 'position'
            },
            {
              name: 'Y',
              value: options.position[1],
              type: 'input',
              root: 'position'
            },
            {
              name: 'Z',
              value: options.position[2],
              type: 'input',
              root: 'position'
            }
          ]
        },
        {
          name: 'fov',
          settings: [
            {
              value: options.fov,
              type: 'input',
              root: 'fov'
            }
          ]
        },
        {
          name: 'near',
          settings: [
            {
              value: options.near,
              type: 'input',
              root: 'near'
            }
          ]
        },
        {
          name: 'far',
          settings: [
            {
              value: options.far,
              type: 'input',
              root: 'far'
            }
          ]
        },
        {
          name: 'distance',
          settings: [
            {
              name: 'MIN',
              value: options.minDistance,
              type: 'input',
              root: 'distance'
            },
            {
              name: 'MAX',
              value: options.maxDistance,
              type: 'input',
              root: 'distance'
            }
          ]
        },
        {
          name: 'angle',
          settings: [
            {
              name: 'MIN',
              value: options.minPolarAngle,
              type: 'input',
              root: 'angle'
            },
            {
              name: 'MAX',
              value: options.maxPolarAngle,
              type: 'input',
              root: 'angle'
            }
          ]
        }
      ]

      EventsBus.on('cameraChanged', cameraChanged)
    })

    onUnmounted(() => {
      EventsBus.off('cameraChanged', cameraChanged)
    })

    const inputChange = (setting: any) => {
      const e = event as any

      // console.log('input change', e.target.value, setting)

      const val = e.target.value
      if (isNaN(val)) return

      const threeDimensionContainer = store.state.threeDimensionContainer
      const { name, root } = setting
      setting.value = parseFloat(val)

      let controls: any
      if (threeDimensionContainer.viewState === 'orbit') {
        controls = threeDimensionContainer.orbitControls
      } else if (threeDimensionContainer.viewState === 'firstPerson') {
        controls = threeDimensionContainer.firstPersonControls
      } else if (threeDimensionContainer.viewState === 'map') {
        controls = threeDimensionContainer.mapControls
      }

      if (root === 'position') {
        if (name === 'X') {
          controls.object.position.x = parseFloat(val)
        } else if (name === 'Y') {
          controls.object.position.y = parseFloat(val)
        } else if (name === 'Z') {
          controls.object.position.z = parseFloat(val)
        }
      } else if (root === 'near') {
        controls.object.near = parseFloat(val)
      } else if (root === 'far') {
        controls.object.far = parseFloat(val)
      } else if (root === 'fov') {
        controls.object.fov = parseFloat(val)
      } else if (root === 'distance') {
        if (name === 'MIN') {
          controls.minDistance = parseFloat(val)
        } else if (name === 'MAX') {
          controls.maxDistance = parseFloat(val)
        }
      } else if (root === 'angle') {
        if (name === 'MIN') {
          controls.minPolarAngle = (parseFloat(val) * Math.PI) / 180
        } else if (name === 'MAX') {
          controls.maxPolarAngle = (parseFloat(val) * Math.PI) / 180
        }
      }

      controls.object.updateProjectionMatrix()
      controls.update()

      // update camera node
      EventsBus.emit('cameraInputChanged', { node: formSettings.value })
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
