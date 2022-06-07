<template>
  <div class="point-lights-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="title-nav">
      <BaseTitle :value="'PointLights'" :height="48" :width="144" />

      <div class="add-btn" @mouseup="addPointLight">
        <img src="@/assets/images/main/right/editor_newscene_btn_dark.png" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="content pointLights">
      <div v-for="(formSetting, index) in formSettings" :key="index" class="content-details">
        <div class="details-nav">
          <BaseTitle :value="'PointLight' + (index + 1)" :height="48" :width="144" />
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
import { defineComponent, onMounted, onUnmounted, ref, toRaw } from 'vue'
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
  name: 'PointLightsForms3D',
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

        const threeDimensionContainer = toRaw(store.state.threeDimensionContainer)

        threeDimensionContainer.scene.traverse((c: any) => {
          if (c.uuid == uuid) selectedObjs.push(c)
        })

        // 展示编辑表单
        const formSetting = {
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
          decay: {
            show: true,
            data: [
              {
                value: options.decay,
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
      } else if (key === 'decay') {
        if (isNaN(val)) return
        currentObj.decay = parseFloat(val)
        setting.value = parseFloat(val)
      } else if (key === 'distance') {
        if (isNaN(val)) return
        currentObj.distance = parseFloat(val)
        setting.value = parseFloat(val)
      } else if (key === 'near') {
        if (isNaN(val)) return
        currentObj.shadow.camera.near = parseFloat(val)
        currentObj.shadow.camera.updateProjectionMatrix()
        currentObj.shadow.needsUpdate = true
        setting.value = parseFloat(val)
      } else if (key === 'far') {
        if (isNaN(val)) return
        currentObj.shadow.camera.far = parseFloat(val)
        currentObj.shadow.camera.updateProjectionMatrix()
        currentObj.shadow.needsUpdate = true
        setting.value = parseFloat(val)
      } else if (key === 'bias') {
        if (isNaN(val)) return
        currentObj.shadow.bias = parseFloat(val)
        currentObj.shadow.needsUpdate = true
        setting.value = parseFloat(val)
      } else if (key === 'size') {
        if (isNaN(val)) return
        currentObj.shadow.mapSize.width = parseFloat(val)
        currentObj.shadow.mapSize.height = parseFloat(val)
        currentObj.shadow.camera.updateProjectionMatrix()
        currentObj.shadow.needsUpdate = true
        setting.value = parseFloat(val)
      }

      // update pageTreeNode
      const options: any = {}

      formSettings.value.forEach((formSetting: any) => {
        if (formSetting.uuid.data[0].value === uuid) {
          options['intensity'] = formSetting['intensity'].data[0].value
          options['color'] = [formSetting['color'].data[0].value[0], formSetting['color'].data[0].value[1], formSetting['color'].data[0].value[2]]
          options['position'] = [formSetting['position'].data[0].value, formSetting['position'].data[1].value, formSetting['position'].data[2].value]
          options['decay'] = formSetting['decay'].data[0].value
          options['distance'] = formSetting['distance'].data[0].value
          options['near'] = formSetting['near'].data[0].value
          options['far'] = formSetting['far'].data[0].value
          options['bias'] = formSetting['bias'].data[0].value
          options['size'] = formSetting['size'].data[0].value
        }
      })

      store.state.selectedPageTreeNode.children.forEach((pageTreeNode: any) => {
        if (pageTreeNode.uuid === uuid) Object.assign(pageTreeNode.options, options)
      })
    }

    const addPointLight = () => {
      const e = event as any
      if (e.button != 0) return

      const threeDimensionContainer = toRaw(store.state.threeDimensionContainer)
      // addTo 3d scene
      const pointLightOpts = {
        color: 0xffffff,
        intensity: 1,
        distance: 0,
        decay: 1,
        position: [0, 0, 0],
        near: 1,
        far: 10000,
        bias: 0,
        size: 2048
      }
      const pointLight = new Bol3D.PointLight(pointLightOpts.color, pointLightOpts.intensity, pointLightOpts.distance, pointLightOpts.decay)
      pointLight.position.set(pointLightOpts.position[0], pointLightOpts.position[1], pointLightOpts.position[2])
      // shadow
      pointLight.castShadow = threeDimensionContainer.renderer.shadowMap.enabled
      pointLight.shadow.bias = pointLightOpts.bias
      pointLight.shadow.camera.near = pointLightOpts.near
      pointLight.shadow.camera.far = pointLightOpts.far
      pointLight.shadow.mapSize.width = pointLightOpts.size
      pointLight.shadow.mapSize.height = pointLightOpts.size
      pointLight.shadow.camera.updateProjectionMatrix()
      pointLight.shadow.needsUpdate = true
      threeDimensionContainer.scene.add(pointLight)
      threeDimensionContainer.pointLights.push(pointLight)

      // addTo pageTreeNodes
      const pointLightOptions = {
        color: [pointLight.color.r * 255, pointLight.color.g * 255, pointLight.color.b * 255],
        intensity: pointLight.intensity,
        decay: pointLight.decay,
        distance: pointLight.distance,
        position: [parseFloat(pointLight.position.x.toFixed(4)), parseFloat(pointLight.position.y.toFixed(4)), parseFloat(pointLight.position.z.toFixed(4))],
        castShadow: pointLight.castShadow,
        near: pointLight.shadow.camera.near,
        far: pointLight.shadow.camera.far,
        bias: pointLight.shadow.bias,
        size: pointLight.shadow.mapSize.x
      }

      const pointLightNode = {
        uuid: pointLight.uuid,
        name: 'PointLight',
        selected: false,
        index: 1,
        spread: false,
        type: 'PointLight',
        children: [],
        show: false,
        options: pointLightOptions
      }

      store.state.selectedPageTreeNode.children.push(pointLightNode)

      // addTo formSettings
      const pointLightSettings = {
        spread: false,
        uuid: {
          show: true,
          data: [
            {
              value: pointLight.uuid,
              type: 'text'
            }
          ]
        },
        color: {
          show: true,
          data: [
            {
              value: pointLightOptions.color,
              type: 'color'
            }
          ]
        },
        intensity: {
          show: true,
          data: [
            {
              value: pointLightOptions.intensity,
              type: 'input'
            }
          ]
        },
        decay: {
          show: true,
          data: [
            {
              value: pointLightOptions.decay,
              type: 'input'
            }
          ]
        },
        distance: {
          show: true,
          data: [
            {
              value: pointLightOptions.distance,
              type: 'input'
            }
          ]
        },
        position: {
          show: true,
          data: [
            {
              name: 'X',
              value: pointLightOptions.position[0],
              type: 'input'
            },
            {
              name: 'Y',
              value: pointLightOptions.position[1],
              type: 'input'
            },
            {
              name: 'Z',
              value: pointLightOptions.position[2],
              type: 'input'
            }
          ]
        },
        castShadow: {
          show: true,
          data: [
            {
              value: pointLightOptions.castShadow,
              type: 'switch'
            }
          ]
        },
        near: {
          show: true,
          data: [
            {
              value: pointLightOptions.near,
              type: 'input'
            }
          ]
        },
        far: {
          show: true,
          data: [
            {
              value: pointLightOptions.far,
              type: 'input'
            }
          ]
        },
        bias: {
          show: true,
          data: [
            {
              value: pointLightOptions.bias,
              type: 'input'
            }
          ]
        },
        size: {
          show: true,
          data: [
            {
              value: pointLightOptions.size,
              type: 'input'
            }
          ]
        }
      }

      formSettings.value.push(pointLightSettings)

      // addTo selectedObjs
      selectedObjs.push(pointLight)
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
      addPointLight,
      spreadOpts,
      switchChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.point-lights-forms-3d-main {
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
