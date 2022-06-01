<template>
  <div class="background-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'Background'" :height="48" :width="108" />

    <LineEl :color="'#363741'" />

    <div class="content background">
      <div class="content-item">
        <div class="setting-item">
          <BaseTitle :value="'type'" :height="48" :width="108" />
        </div>

        <div class="setting-item">
          <BaseDropdown :options="typeOptions" :value="selectType" :height="32" :width="108" :marginTop="8" :marginBottom="8" :change="typeChange" />
        </div>
      </div>

      <LineEl :color="'#363741'" />

      <div v-for="(item, key) in formSettings" :key="key" class="content-details">
        <div v-if="(key === 'repeat' && formSettings.wrapping[0].selected.value !== 1001) || key !== 'repeat'" class="content-item">
          <div class="setting-item">
            <BaseTitle :value="key" :height="48" :width="108" />
          </div>

          <div class="setting-item">
            <div v-for="setting in item" :key="setting" class="setting">
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

              <BaseDropdown
                v-else-if="setting.type === 'dropdown'"
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
import { EventsBus } from '@/core/EventsBus'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import BaseDropdown from '@/components/utils/baseComponents/BaseDropdown.vue'
import BaseColor from '@/components/utils/baseComponents/BaseColor.vue'
import { hex2rgb } from '@/core/utils/base'

export default defineComponent({
  name: 'BackgroundForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseDropdown,
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

    // type options
    const typeOptions = ref([
      {
        name: 'color',
        value: 'color'
      },
      {
        name: 'texture',
        value: 'texture'
      },
      {
        name: 'panorama',
        value: 'panorama'
      }
    ])
    const selectType = ref({ name: 'color', value: 'color' })

    // content settings
    const formSettings: any = ref([])

    let currentObj: any

    onMounted(() => {
      const { options } = props.node
      const { type } = options
      const threeDimensionContainer = toRaw(store.state.threeDimensionContainer)

      console.log(threeDimensionContainer.background)

      selectType.value = {
        name: type,
        value: type
      }

      if (type === 'color') {
        formSettings.value = {
          color: [
            {
              value: hex2rgb(threeDimensionContainer.background),
              type: 'color'
            }
          ]
        }
      } else if (type === 'texture') {
        formSettings.value = {
          sources: [
            {
              options: [
                {
                  name: 'default',
                  value: '/textures/bg.png'
                },
                {
                  name: 'default2',
                  value: '/textures/bg2.jpg'
                }
              ],
              selected: {
                name: 'default',
                value: '/textures/bg.png'
              },
              type: 'dropdown'
            }
          ],
          encoding: [
            {
              options: [
                {
                  name: 'LinearEncoding',
                  value: 3000
                },
                {
                  name: 'sRGBEncoding',
                  value: 3001
                }
              ],
              selected: {
                name: 'sRGBEncoding',
                value: 3001
              },
              type: 'dropdown'
            }
          ],
          wrapping: [
            {
              options: [
                {
                  name: 'RepeatWrapping',
                  value: 1000
                },
                {
                  name: 'ClampToEdgeWrapping',
                  value: 1001
                },
                {
                  name: 'MirroredRepeatWrapping',
                  value: 1002
                }
              ],
              selected: {
                name: 'RepeatWrapping',
                value: 1000
              },
              type: 'dropdown'
            }
          ],
          repeat: [
            {
              name: 'X',
              value: 2,
              type: 'input'
            },
            {
              name: 'Y',
              value: 2,
              type: 'input'
            }
          ]
        }
      } else if (type === 'panorama') {
        formSettings.value = {
          sources: [
            {
              options: [
                {
                  name: 'default',
                  value: ['/panorama/gongchang.png']
                },
                {
                  name: 'default2',
                  value: ['/panorama/sky_px.jpg', '/panorama/sky_nx.jpg', '/panorama/sky_py.jpg', '/panorama/sky_ny.jpg', '/panorama/sky_pz.jpg', '/panorama/sky_nz.jpg']
                }
              ],
              selected: {
                name: 'default2',
                value: ['/panorama/sky_px.jpg', '/panorama/sky_nx.jpg', '/panorama/sky_py.jpg', '/panorama/sky_ny.jpg', '/panorama/sky_pz.jpg', '/panorama/sky_nz.jpg']
              },
              type: 'dropdown'
            }
          ],
          scale: [
            {
              name: 'X',
              value: 1,
              type: 'input'
            },
            {
              name: 'Y',
              value: 1,
              type: 'input'
            },
            {
              name: 'Z',
              value: 1,
              type: 'input'
            }
          ],
          rotation: [
            {
              name: 'X',
              value: 0,
              type: 'input'
            },
            {
              name: 'Y',
              value: 0,
              type: 'input'
            },
            {
              name: 'Z',
              value: 0,
              type: 'input'
            }
          ]
        }
      }
    })

    onUnmounted(() => {
      //
    })

    const inputChange = (target: any) => {
      const e = event as any

      const val = e.target.value
      if (isNaN(val)) return

      const threeDimensionContainer = toRaw(store.state.threeDimensionContainer)
      const { key, setting } = target
      const { name } = setting
      setting.value = parseFloat(val)

      if (selectType.value.value === 'texture') {
        if (key === 'repeat') {
          if (name === 'X') {
            threeDimensionContainer.background.repeat.x = parseFloat(val)
          } else if (name === 'Y') {
            threeDimensionContainer.background.repeat.y = parseFloat(val)
          }
        }
      } else if (selectType.value.value === 'panorama') {
        if (key === 'scale') {
          if (name === 'X') {
            threeDimensionContainer.background.scale.x = parseFloat(val)
          } else if (name === 'Y') {
            threeDimensionContainer.background.scale.y = parseFloat(val)
          } else if (name === 'Z') {
            threeDimensionContainer.background.scale.z = parseFloat(val)
          }
        }
      }
    }

    const typeChange = (e: any) => {
      const { value } = e
      selectType.value = value
    }

    const sourceChange = (e: any) => {
      const { value, target } = e
      const { setting, key } = target
      const threeDimensionContainer = store.state.threeDimensionContainer

      setting.selected = value

      if (selectType.value.value === 'texture') {
        if (key === 'sources') {
          threeDimensionContainer.texLoader.load(threeDimensionContainer.publicPath + value.value, (texture: any) => {
            threeDimensionContainer.background = texture
          })
        } else if (key === 'encoding') {
          threeDimensionContainer.background.encoding = value.value
          threeDimensionContainer.background.needsUpdate = true
        } else if (key === 'wrapping') {
          threeDimensionContainer.background.wrapS = threeDimensionContainer.background.wrapT = value.value
          threeDimensionContainer.background.needsUpdate = true
        }
      } else if (selectType.value.value === 'panorama') {
        console.log('value.value', value, threeDimensionContainer, threeDimensionContainer.bgType)
        if (key === 'sources') {
          threeDimensionContainer.setSkyBox(value.value)
          //   threeDimensionContainer.background = toRaw(value.value)
        }
      }
    }

    return {
      store,
      headerItems,
      formSettings,
      inputChange,
      typeOptions,
      selectType,
      sourceChange,
      typeChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.background-forms-3d-main {
  @apply w-full h-full;
}
.header {
  height: 64px;
  @apply w-full flex;
}

.type-dropdown {
  @apply w-full h-auto;
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

.division {
  bottom: 0;
  @apply absolute;
}
</style>
