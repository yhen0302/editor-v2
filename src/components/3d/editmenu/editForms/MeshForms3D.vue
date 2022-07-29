<template>
  <div class="mesh-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem
          :active="item.active"
          :name="item.name"
          :type="item.type"
          @mouseup.stop="chooseNav(item)"
        />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="title" :height="48" :width="128" />

    <LineEl :color="'#363741'" />

    <div class="content mesh" v-show="headerItems[0].active">
      <div v-for="(item, key) in formSettings" :key="key" class="content-details">
        <div class="content-item" v-if="item.show">
          <div class="setting-item">
            <BaseTitle :value="key" :height="32" :width="108" :marginTop="12" :marginRight="8" />
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
              />

              <BaseSwitch
                v-else-if="setting.type === 'switch'"
                :height="32"
                :width="108"
                :value="setting.value"
                :marginRight="4"
                :marginTop="12"
                :change="switchChange"
                :target="{ key, setting }"
              />
            </div>
          </div>

          <LineEl class="division" :color="'#363741'" />
        </div>
      </div>
    </div>

    <div class="content mat" v-show="headerItems[1].active">
      <div v-for="(item, key) in formSettings2" :key="key" class="content-details">
        <div class="content-item" v-if="item.show">
          <div class="setting-item">
            <BaseTitle :value="key" :height="32" :width="144" :marginTop="12" :marginRight="8" />
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
              />

              <BaseSwitch
                v-else-if="setting.type === 'switch'"
                :height="32"
                :width="108"
                :value="setting.value"
                :marginRight="4"
                :marginTop="12"
                :change="switchChange"
                :target="{ key, setting }"
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
              />
            </div>
          </div>
          <LineEl class="division" :color="'#363741'" />
        </div>
      </div>
    </div>

    <div class="content object" v-show="headerItems[2].active">
      <EventBind :node="node"></EventBind>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import { EventsBus } from '@/core/EventsBus'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import BaseSwitch from '@/components/utils/baseComponents/BaseSwitch.vue'
import BaseColor from '@/components/utils/baseComponents/BaseColor.vue'
import EventBind from '../../rightKanBan/EventBind.vue'

import { colorRGBtoHex, hex2rgb } from '@/core/utils/base'

declare const Bol3D: any

export default defineComponent({
  name: 'MeshForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseSwitch,
    BaseColor,
    EventBind
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
      },
      {
        active: false,
        name: '材质设置',
        type: 'matSetting'
      },
      {
        active: false,
        name: '事件设置',
        type: 'eventSetting'
      }
    ])
    // title val
    const title = computed(() => {
      let val = ''

      if (headerItems.value[0].active) {
        val = 'Object'
      } else if (headerItems.value[1].active) {
        val = 'Material'
      } else if (headerItems.value[2].active) {
        val = 'Material'
      }

      return val
    })

    // content settings
    const formSettings: any = ref([]) // mesh settings
    const formSettings2: any = ref([]) // mat settings

    let currentObj: any

    onMounted(() => {
      const { type, options, uuid, matOptions } = props.node

      const threeDimensionContainer = toRaw(store.state.threeDimensionContainer)

      threeDimensionContainer.scene.traverse((c: any) => {
        if (c.uuid == uuid) currentObj = c
      })

      // 编辑表单 Mesh
      formSettings.value = {
        position: {
          show: true,
          data: [
            {
              name: 'X',
              value: options.position[0],
              type: 'input'
            },
            {
              name: 'Y',
              value: options.position[1],
              type: 'input'
            },
            {
              name: 'Z',
              value: options.position[2],
              type: 'input'
            }
          ]
        },
        rotation: {
          show: true,
          data: [
            {
              name: 'X',
              value: options.rotation[0],
              type: 'input'
            },
            {
              name: 'Y',
              value: options.rotation[1],
              type: 'input'
            },
            {
              name: 'Z',
              value: options.rotation[2],
              type: 'input'
            }
          ]
        },
        scale: {
          show: true,
          data: [
            {
              name: 'X',
              value: options.scale[0],
              type: 'input'
            },
            {
              name: 'Y',
              value: options.scale[1],
              type: 'input'
            },
            {
              name: 'Z',
              value: options.scale[2],
              type: 'input'
            }
          ]
        },
        castShadow: {
          show: true,
          data: [
            {
              value: options.castShadow,
              type: 'switch'
            }
          ]
        },
        receiveShadow: {
          show: true,
          data: [
            {
              value: options.receiveShadow,
              type: 'switch'
            }
          ]
        }
      }

      // 编辑表单 Material
      // console.log('node', props.node, currentObj)

      const mapOpts = props.node.matOptions
      const colorVal = Array.isArray(mapOpts.color) ? mapOpts.color : hex2rgb(mapOpts.color)

      formSettings2.value = {
        transparent: {
          show: true,
          data: [
            {
              value: mapOpts.transparent,
              type: 'switch'
            }
          ]
        },
        opacity: {
          show: true,
          data: [
            {
              value: mapOpts.opacity,
              type: 'input'
            }
          ]
        },
        color: {
          show: true,
          data: [
            {
              value: colorVal,
              type: 'color'
            }
          ]
        },
        depthWrite: {
          show: true,
          data: [
            {
              value: mapOpts.depthWrite,
              type: 'switch'
            }
          ]
        },
        depthTest: {
          show: true,
          data: [
            {
              value: mapOpts.depthTest,
              type: 'switch'
            }
          ]
        },
        wireframe: {
          show: true,
          data: [
            {
              value: mapOpts.wireframe,
              type: 'switch'
            }
          ]
        }
      }

      formSettings2.value.opacity.show = computed(() => {
        return formSettings2.value.transparent.data[0].value
      })

      // material extends
      if (mapOpts.type === 'MeshStandardMaterial') {
        const emissiveVal = Array.isArray(mapOpts.extends.emissive)
          ? mapOpts.extends.emissive
          : hex2rgb(mapOpts.extends.emissive)
        const extendOptions = {
          emissive: {
            show: true,
            data: [
              {
                value: emissiveVal,
                type: 'color'
              }
            ]
          },
          emissiveIntensity: {
            show: true,
            data: [
              {
                value: mapOpts.extends.emissiveIntensity,
                type: 'input'
              }
            ]
          },
          envMapIntensity: {
            show: true,
            data: [
              {
                value: mapOpts.extends.envMapIntensity,
                type: 'input'
              }
            ]
          },
          lightMapIntensity: {
            show: true,
            data: [
              {
                value: mapOpts.extends.lightMapIntensity,
                type: 'input'
              }
            ]
          },
          metalness: {
            show: true,
            data: [
              {
                value: mapOpts.extends.metalness,
                type: 'input'
              }
            ]
          },
          roughness: {
            show: true,
            data: [
              {
                value: mapOpts.extends.roughness,
                type: 'input'
              }
            ]
          }
        }

        Object.assign(formSettings2.value, extendOptions)
      }

      // console.log('mapOpts', mapOpts)
    })

    onUnmounted(() => {})

    const inputChange = (target: any) => {
      const e = event as any
      const val = e.target.value
      // update mesh node --- Geometry
      if (title.value === 'Geometry') {
        if (isNaN(val)) return

        const { key, setting } = target
        const { name } = setting
        setting.value = parseFloat(val)

        if (key === 'position') {
          if (name === 'X') {
            currentObj.position.x = parseFloat(val)
          } else if (name === 'Y') {
            currentObj.position.y = parseFloat(val)
          } else if (name === 'Z') {
            currentObj.position.z = parseFloat(val)
          }
        } else if (key === 'rotation') {
          if (name === 'X') {
            currentObj.rotation.x = (parseFloat(val) * Math.PI) / 180
          } else if (name === 'Y') {
            currentObj.rotation.y = (parseFloat(val) * Math.PI) / 180
          } else if (name === 'Z') {
            currentObj.rotation.z = (parseFloat(val) * Math.PI) / 180
          }
        } else if (key === 'scale') {
          if (name === 'X') {
            currentObj.scale.x = parseFloat(val)
          } else if (name === 'Y') {
            currentObj.scale.y = parseFloat(val)
          } else if (name === 'Z') {
            currentObj.scale.z = parseFloat(val)
          }
        }

        // update pageTreeNode
        const position = [
          formSettings.value['position'].data[0].value,
          formSettings.value['position'].data[1].value,
          formSettings.value['position'].data[2].value
        ]
        const rotation = [
          formSettings.value['rotation'].data[0].value,
          formSettings.value['rotation'].data[1].value,
          formSettings.value['rotation'].data[2].value
        ]
        const scale = [
          formSettings.value['scale'].data[0].value,
          formSettings.value['scale'].data[1].value,
          formSettings.value['scale'].data[2].value
        ]

        Object.assign(store.state.selectedPageTreeNode.options, {
          position,
          rotation,
          scale
        })
      } else if (title.value === 'Material') {
        const { key, setting } = target

        if (key === 'color' || key === 'emissive') {
          currentObj.material[key].set(val)
          setting.value = val
        } else if (
          key === 'opacity' ||
          key === 'emissiveIntensity' ||
          key === 'envMapIntensity' ||
          key === 'lightMapIntensity' ||
          key === 'metalness' ||
          key === 'roughness'
        ) {
          const v = parseFloat(val)
          setting.value = v
          currentObj.material[key] = v
        }

        // update pageTreeNode
        const opacity = formSettings2.value['opacity'].data[0].value
        const color = formSettings2.value['color'].data[0].value

        Object.assign(store.state.selectedPageTreeNode.matOptions, {
          opacity,
          color
        })

        // update pageTreeNode extends
        if (store.state.selectedPageTreeNode.matOptions.type === 'MeshStandardMaterial') {
          const emissive = formSettings2.value['emissive'].data[0].value
          const emissiveIntensity = formSettings2.value['emissiveIntensity'].data[0].value
          const envMapIntensity = formSettings2.value['envMapIntensity'].data[0].value
          const lightMapIntensity = formSettings2.value['lightMapIntensity'].data[0].value
          const metalness = formSettings2.value['metalness'].data[0].value
          const roughness = formSettings2.value['roughness'].data[0].value

          Object.assign(store.state.selectedPageTreeNode.matOptions.extends, {
            emissive,
            emissiveIntensity,
            envMapIntensity,
            lightMapIntensity,
            metalness,
            roughness
          })
        }
      }
    }

    const chooseNav = (item: any) => {
      const e = event as any
      if (e.button !== 0) return

      headerItems.value.forEach((nav: any) => {
        nav.active = false
      })

      item.active = true
    }

    const switchChange = (e: any) => {
      const { target, value } = e
      const { setting, key } = target

      setting.value = value
      currentObj.material[key] = value
      // update pageTreeNode
      if (
        key === 'transparent' ||
        key === 'depthWrite' ||
        key === 'depthTest' ||
        key === 'wireframe'
      )
        store.state.selectedPageTreeNode.matOptions[key] = value
    }

    return {
      store,
      headerItems,
      formSettings,
      formSettings2,
      inputChange,
      chooseNav,
      title,
      switchChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.mesh-forms-3d-main {
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
.details {
  height: 57px;
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
