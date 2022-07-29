<template>
  <div class="direction-lights-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="title-nav">
      <BaseTitle :value="'DirectionLights'" :height="48" :width="144" />

      <div class="add-btn" @mouseup="addDirLight">
        <img src="@/assets/images/main/right/editor_newscene_btn_dark.png" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="content directionLights">
      <div v-for="(formSetting, index) in formSettings" :key="index" class="content-details">
        <div class="details-nav">
          <BaseTitle :value="'DirectionLight' + (index + 1)" :height="48" :width="144" />
          <div class="spread-btn" @mouseup="spreadOpts(formSetting)" :class="formSetting.spread ? 'fold' : 'unfold'">
            <img src="@/assets/images/main/left/editor_card_backarrow_btn_dark.png" />
          </div>
        </div>

        <div v-if="formSetting.spread">
          <div v-for="(item, key) in formSetting" :key="item">
            <div v-if="key !== 'spread' && item.show" class="content-item">
              <div class="setting-item">
                <BaseTitle :value="key" :height="56" :width="108" :marginRight="8" />
              </div>

              <div class="setting-item">
                <div v-for="setting in item.data" :key="setting" class="setting">
                  <BaseText v-if="setting.type === 'text'" :value="setting.value" :width="160" :height="32" :marginRight="4" :marginTop="12" :marginBottom="0" />

                  <BaseInput
                    v-else-if="setting.type === 'input'"
                    :target="{ key, setting, uuid: formSetting.uuid.data[0].value }"
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
                    :target="{ key, setting, uuid: formSetting.uuid.data[0].value }"
                    :change="inputChange"
                    :value="setting.value"
                    :type="'rgb'"
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
                    :target="{ key, setting, uuid: formSetting.uuid.data[0].value }"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <LineEl :color="'#363741'" />
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
import BaseText from '@/components/utils/baseComponents/BaseText.vue'
import BaseColor from '@/components/utils/baseComponents/BaseColor.vue'
import BaseSwitch from '@/components/utils/baseComponents/BaseSwitch.vue'

import { hex2rgb } from '@/core/utils/base'

declare const Bol3D: any

export default defineComponent({
  name: 'DirectionLightsForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseText,
    BaseColor,
    BaseSwitch
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

    let selectedObjs: any = []

    onMounted(() => {
      props.node.children.forEach((node: any) => {
        const { options, uuid } = node

        const threeDimensionContainer = store.state.threeDimensionContainer

        threeDimensionContainer.scene.traverse((c: any) => {
          if (c.uuid == uuid) selectedObjs.push(c)
        })

        // 展示编辑表单
        const formSetting: any = {
          spread: false,
          uuid: {
            show: true,
            data: [
              {
                value: uuid,
                type: 'text'
              }
            ]
          },
          color: {
            show: true,
            data: [
              {
                value: options.color,
                type: 'color'
              }
            ]
          },
          intensity: {
            show: true,
            data: [
              {
                value: options.intensity,
                type: 'input'
              }
            ]
          },
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
          target: {
            show: true,
            data: [
              {
                name: 'X',
                value: options.target[0],
                type: 'input'
              },
              {
                name: 'Y',
                value: options.target[1],
                type: 'input'
              },
              {
                name: 'Z',
                value: options.target[2],
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
          near: {
            show: true,
            data: [
              {
                value: options.near,
                type: 'input'
              }
            ]
          },
          far: {
            show: true,
            data: [
              {
                value: options.far,
                type: 'input'
              }
            ]
          },
          bias: {
            show: true,
            data: [
              {
                value: options.bias,
                type: 'input'
              }
            ]
          },
          distance: {
            show: true,
            data: [
              {
                value: options.distance,
                type: 'input'
              }
            ]
          },
          size: {
            show: true,
            data: [
              {
                value: options.size,
                type: 'input'
              }
            ]
          }
        }

        formSettings.value.push(formSetting)
      })
    })

    onUnmounted(() => {
      //
    })

    const inputChange = (target: any, type?: string) => {
      const e = event as any

      const { setting, key, uuid } = target
      const { name } = setting
      const val = e.target.value
      let currentObj: any

      selectedObjs.forEach((obj: any) => {
        if (obj.uuid === uuid) currentObj = obj
      })

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
      } else if (key === 'position') {
        if (isNaN(val)) return
        if (name === 'X') {
          currentObj.position.x = parseFloat(val)
        } else if (name === 'Y') {
          currentObj.position.y = parseFloat(val)
        } else if (name === 'Z') {
          currentObj.position.z = parseFloat(val)
        }
        setting.value = parseFloat(val)
      } else if (key === 'distance') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        currentObj.shadow.camera.left = -parseFloat(val)
        currentObj.shadow.camera.right = parseFloat(val)
        currentObj.shadow.camera.top = parseFloat(val)
        currentObj.shadow.camera.bottom = -parseFloat(val)
        currentObj.shadow.camera.updateProjectionMatrix()
        currentObj.shadow.needsUpdate = true
      } else if (key === 'near' || key === 'far') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        currentObj.shadow.camera[key] = parseFloat(val)
        currentObj.shadow.camera.updateProjectionMatrix()
        currentObj.shadow.needsUpdate = true
      } else if (key === 'bias') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        currentObj.shadow.bias = parseFloat(val)
        currentObj.shadow.needsUpdate = true
      } else if (key === 'size') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        currentObj.shadow.mapSize.width = parseFloat(val)
        currentObj.shadow.mapSize.height = parseFloat(val)
        currentObj.shadow.needsUpdate = true
      } else if (key === 'target') {
        if (isNaN(val)) return
        const v = parseFloat(val)
        setting.value = v
        if (name === 'X') {
          currentObj.target.position.x = v
        } else if (name === 'Y') {
          currentObj.target.position.y = v
        } else if (name === 'Z') {
          currentObj.target.position.z = v
        }
      }

      // update pageTreeNode
      const options: any = {}

      formSettings.value.forEach((formSetting: any) => {
        if (formSetting.uuid.data[0].value === uuid) {
          options['color'] = [formSetting['color'].data[0].value[0], formSetting['color'].data[0].value[1], formSetting['color'].data[0].value[2]]
          options['intensity'] = formSetting['intensity'].data[0].value
          options['position'] = [formSetting['position'].data[0].value, formSetting['position'].data[1].value, formSetting['position'].data[2].value]
          options['distance'] = formSetting['distance'].data[0].value
          options['near'] = formSetting['near'].data[0].value
          options['far'] = formSetting['far'].data[0].value
          options['bias'] = formSetting['bias'].data[0].value
          options['size'] = formSetting['size'].data[0].value
          options['target'] = [formSetting['target'].data[0].value, formSetting['target'].data[1].value, formSetting['target'].data[2].value]
        }
      })

      store.state.selectedPageTreeNode.children.forEach((pageTreeNode: any) => {
        if (pageTreeNode.uuid === uuid) Object.assign(pageTreeNode.options, options)
      })
    }

    const addDirLight = () => {
      const e = event as any
      if (e.button != 0) return

      const threeDimensionContainer = store.state.threeDimensionContainer
      // addTo 3d scene
      let directionLightOpts = {
        color: 0xffffff,
        intensity: 1,
        position: [0, 0, 0],
        mapSize: [2048, 2048],
        near: 0.01,
        far: 10000,
        bias: -0.0004,
        distance: 1000
      }
      const dirLight = new Bol3D.DirectionalLight(directionLightOpts.color, directionLightOpts.intensity)
      dirLight.position.set(directionLightOpts.position[0], directionLightOpts.position[1], directionLightOpts.position[2])
      dirLight.castShadow = threeDimensionContainer.renderer.shadowMap.enabled
      dirLight.shadow.mapSize.width = directionLightOpts.mapSize[0]
      dirLight.shadow.mapSize.height = directionLightOpts.mapSize[1]
      dirLight.shadow.camera.near = directionLightOpts.near
      dirLight.shadow.camera.far = directionLightOpts.far
      dirLight.shadow.bias = directionLightOpts.bias
      dirLight.shadow.camera.left = -directionLightOpts.distance
      dirLight.shadow.camera.right = directionLightOpts.distance
      dirLight.shadow.camera.top = directionLightOpts.distance
      dirLight.shadow.camera.bottom = -directionLightOpts.distance
      threeDimensionContainer.scene.add(dirLight.target)
      threeDimensionContainer.scene.add(dirLight)
      threeDimensionContainer.directionLights.push(dirLight)
      // addTo PageTreeNodes
      const directionLightOptions = {
        color: [dirLight.color.r * 255, dirLight.color.g * 255, dirLight.color.b * 255],
        intensity: dirLight.intensity,
        position: [parseFloat(dirLight.position.x.toFixed(4)), parseFloat(dirLight.position.y.toFixed(4)), parseFloat(dirLight.position.z.toFixed(4))],
        // shadow options
        near: dirLight.shadow.camera.near,
        far: dirLight.shadow.camera.far,
        bias: dirLight.shadow.bias,
        distance: dirLight.shadow.camera.top,
        size: dirLight.shadow.mapSize.width,
        castShadow: dirLight.castShadow,
        // target options
        target: [parseFloat(dirLight.target.position.x.toFixed(4)), parseFloat(dirLight.target.position.y.toFixed(4)), parseFloat(dirLight.target.position.z.toFixed(4))]
      }

      const directionLightNode = {
        uuid: dirLight.uuid,
        name: 'DirectionLight',
        selected: false,
        index: 1,
        spread: false,
        type: 'DirectionLight',
        children: [],
        show: false,
        options: directionLightOptions
      }

      store.state.selectedPageTreeNode.children.push(directionLightNode)

      // addTo formSettings
      const dirLightSetting: any = {
        spread: false,
        uuid: {
          show: true,
          data: [
            {
              value: dirLight.uuid,
              type: 'text'
            }
          ]
        },
        color: {
          show: true,
          data: [
            {
              value: directionLightOptions.color,
              type: 'color'
            }
          ]
        },
        intensity: {
          show: true,
          data: [
            {
              value: directionLightOptions.intensity,
              type: 'input'
            }
          ]
        },
        position: {
          show: true,
          data: [
            {
              name: 'X',
              value: directionLightOptions.position[0],
              type: 'input'
            },
            {
              name: 'Y',
              value: directionLightOptions.position[1],
              type: 'input'
            },
            {
              name: 'Z',
              value: directionLightOptions.position[2],
              type: 'input'
            }
          ]
        },
        target: {
          show: true,
          data: [
            {
              name: 'X',
              value: directionLightOptions.target[0],
              type: 'input'
            },
            {
              name: 'Y',
              value: directionLightOptions.target[1],
              type: 'input'
            },
            {
              name: 'Z',
              value: directionLightOptions.target[2],
              type: 'input'
            }
          ]
        },
        castShadow: {
          show: true,
          data: [
            {
              value: directionLightOptions.castShadow,
              type: 'switch'
            }
          ]
        },
        near: {
          show: true,
          data: [
            {
              value: directionLightOptions.near,
              type: 'input'
            }
          ]
        },
        far: {
          show: true,
          data: [
            {
              value: directionLightOptions.far,
              type: 'input'
            }
          ]
        },
        bias: {
          show: true,
          data: [
            {
              value: directionLightOptions.bias,
              type: 'input'
            }
          ]
        },
        distance: {
          show: true,
          data: [
            {
              value: directionLightOptions.distance,
              type: 'input'
            }
          ]
        },
        size: {
          show: true,
          data: [
            {
              value: directionLightOptions.size,
              type: 'input'
            }
          ]
        }
      }
      formSettings.value.push(dirLightSetting)

      // addTo selectedObjs
      selectedObjs.push(dirLight)
    }

    const spreadOpts = (item: any) => {
      item.spread = !item.spread
    }

    const switchChange = (e: any) => {
      const { target, value } = e
      const { setting, key, uuid } = target

      let currentObj: any

      selectedObjs.forEach((obj: any) => {
        if (obj.uuid === uuid) currentObj = obj
      })

      if (key === 'castShadow') {
        setting.value = value
        currentObj.castShadow = value

        // show/hide shadow opts
        formSettings.value.forEach((formSetting: any) => {
          if (formSetting.uuid.data[0].value === uuid) {
            formSetting.near.show = value
            formSetting.far.show = value
            formSetting.bias.show = value
            formSetting.distance.show = value
            formSetting.size.show = value
          }
        })
      }

      // update pageTreeNode
      const options: any = {}

      formSettings.value.forEach((formSetting: any) => {
        if (formSetting.uuid.data[0].value === uuid) {
          options['castShadow'] = formSetting['castShadow'].data[0].value
        }
      })

      store.state.selectedPageTreeNode.children.forEach((pageTreeNode: any) => {
        if (pageTreeNode.uuid === uuid) Object.assign(pageTreeNode.options, options)
      })
    }

    return {
      store,
      headerItems,
      formSettings,
      inputChange,
      addDirLight,
      spreadOpts,
      switchChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.direction-lights-forms-3d-main {
  @apply w-full h-full;
}
.header {
  height: 64px;
  @apply w-full flex;
}
.title-nav {
  @apply relative flex items-center;
}
.add-btn {
  right: 24px;
  @apply absolute cursor-pointer;
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
.details-nav {
  @apply w-full h-auto flex items-center relative;
}
.spread-btn {
  right: 24px;
  @apply absolute cursor-pointer flex items-center;
}
.fold {
  transform: rotate(270deg);
}
.unfold {
  transform: rotate(180deg);
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
