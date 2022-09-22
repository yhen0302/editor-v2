<template>
  <div class="rect-area-lights-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="title-nav">
      <BaseTitle :value="'RectAreaLights'" :height="48" :width="144" />

      <div class="add-btn" @mouseup="addAreaLight">
        <img src="@/assets/images/main/right/editor_newscene_btn_dark.png" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="content rectAreaLights">
      <div v-for="(formSetting, index) in formSettings" :key="index" class="content-details">
        <div class="details-nav">
          <BaseTitle :value="'RectAreaLight' + (index + 1)" :height="48" :width="144" />
          <div class="spread-btn" @mouseup="spreadOpts(formSetting)" :class="formSetting.spread ? 'fold' : 'unfold'">
            <img src="@/assets/images/main/left/editor_card_backarrow_btn_dark.png" />
          </div>
        </div>

        <div v-if="formSetting.spread">
          <div v-for="(item, key) in formSetting" :key="item">
            <div v-if="key !== 'spread'" class="content-item">
              <div class="setting-item">
                <BaseTitle :value="key" :height="56" :width="80" :marginRight="8" />
              </div>

              <div class="setting-item">
                <div v-for="setting in item" :key="setting" class="setting">
                  <BaseText v-if="setting.type === 'text'" :value="setting.value" :width="160" :height="32" :marginRight="4" :marginTop="12" :marginBottom="0" />

                  <BaseInput
                    v-else-if="setting.type === 'input'"
                    :target="{ key, setting, uuid: formSetting.uuid[0].value }"
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
                    :target="{ key, setting, uuid: formSetting.uuid[0].value }"
                    :change="inputChange"
                    :value="setting.value"
                    :type="'rgb'"
                    :height="32"
                    :marginRight="4"
                    :marginTop="12"
                    :marginBottom="0"
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
import { hex2rgb } from '@/core/utils/base'
import { useGetter, useState } from '@/store/helper'

declare const Bol3D: any

export default defineComponent({
  name: 'RectAreaLightsForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseText,
    BaseColor
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
    const formSettings: any = ref([])

    const selectedObjs: any = []

    onMounted(() => {
      props.node.children.forEach((node: any) => {
        const { options, uuid } = node

        const threeDimensionContainer = state3D.threeDimensionContainer

        threeDimensionContainer.scene.traverse((c: any) => {
          if (c.uuid == uuid) selectedObjs.push(c)
        })

        // 展示编辑表单
        const formSetting = {
          spread: false,
          uuid: [
            {
              value: uuid,
              type: 'text'
            }
          ],
          color: [
            {
              value: options.color,
              type: 'color'
            }
          ],
          intensity: [
            {
              value: options.intensity,
              type: 'input'
            }
          ],
          width: [
            {
              value: options.width,
              type: 'input'
            }
          ],
          height: [
            {
              value: options.height,
              type: 'input'
            }
          ],
          position: [
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
          ],
          target: [
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
      } else if (key === 'target') {
        if (isNaN(val)) return
        const v = parseFloat(val)
        if (name === 'X') {
          currentObj.lookAt(v, currentObj.userData.target[1], currentObj.userData.target[2])
          currentObj.userData.target[0] = v
        } else if (name === 'Y') {
          currentObj.lookAt(currentObj.userData.target[0], v, currentObj.userData.target[2])
          currentObj.userData.target[1] = v
        } else if (name === 'Z') {
          currentObj.lookAt(currentObj.userData.target[0], currentObj.userData.target[1], v)
          currentObj.userData.target[2] = v
        }
        setting.value = parseFloat(val)
      } else if (key === 'width') {
        if (isNaN(val)) return
        currentObj.width = parseFloat(val)
        setting.value = parseFloat(val)
      } else if (key === 'height') {
        if (isNaN(val)) return
        currentObj.height = parseFloat(val)
        setting.value = parseFloat(val)
      }

      // update pageTreeNode
      const options: any = {}

      formSettings.value.forEach((formSetting: any) => {
        if (formSetting.uuid[0].value === uuid) {
          options['color'] = [formSetting['color'][0].value[0], formSetting['color'][0].value[1], formSetting['color'][0].value[2]]
          options['intensity'] = formSetting['intensity'][0].value
          options['position'] = [formSetting['position'][0].value, formSetting['position'][1].value, formSetting['position'][2].value]
          options['width'] = formSetting['width'][0].value
          options['height'] = formSetting['height'][0].value
          options['target'] = [formSetting['target'][0].value, formSetting['target'][1].value, formSetting['target'][2].value]
        }
      })

      getters3D.SELECTED_LAYER_NODE.value.children.forEach((node: any) => {
        if (node.uuid === uuid) Object.assign(node.options, options)
      })
    }

    const addAreaLight = () => {
      const e = event as any
      if (e.button != 0) return

      const threeDimensionContainer = state3D.threeDimensionContainer
      // addTo 3d scene
      const rectAreaLightOpts = {
        color: 0xffffff,
        intensity: 1,
        width: 10,
        height: 10,
        position: [0, 0, 0],
        target: [0, 0, 0]
      }
      const rectAreaLight = new Bol3D.RectAreaLight(rectAreaLightOpts.color, rectAreaLightOpts.intensity, rectAreaLightOpts.width, rectAreaLightOpts.height)
      rectAreaLight.position.set(rectAreaLightOpts.position[0], rectAreaLightOpts.position[1], rectAreaLightOpts.position[2])
      rectAreaLight.lookAt(0, 0, 0)
      rectAreaLight.userData.target = rectAreaLightOpts.target
      threeDimensionContainer.scene.add(rectAreaLight)
      threeDimensionContainer.rectAreaLights.push(rectAreaLight)

      // addTo pageTreeNodes
      const rectAreaLightOptions = {
        color: [rectAreaLight.color.r * 255, rectAreaLight.color.g * 255, rectAreaLight.color.b * 255],
        intensity: rectAreaLight.intensity,
        width: rectAreaLight.width,
        height: rectAreaLight.height,
        position: [parseFloat(rectAreaLight.position.x.toFixed(4)), parseFloat(rectAreaLight.position.y.toFixed(4)), parseFloat(rectAreaLight.position.z.toFixed(4))],
        target: [parseFloat(rectAreaLight.userData.target[0].toFixed(4)), parseFloat(rectAreaLight.userData.target[1].toFixed(4)), parseFloat(rectAreaLight.userData.target[2].toFixed(4))]
      }

      const rectAreaLightNode = {
        uuid: rectAreaLight.uuid,
        name: 'RectAreaLight',
        selected: false,
        index: 1,
        spread: false,
        type: 'RectAreaLight',
        children: [],
        show: false,
        options: rectAreaLightOptions
      }

      getters3D.SELECTED_LAYER_NODE.value.children.push(rectAreaLightNode)

      // addTo formSettings
      const areaLightSettings = {
        spread: false,
        uuid: [
          {
            value: rectAreaLight.uuid,
            type: 'text'
          }
        ],
        color: [
          {
            value: rectAreaLightOptions.color,
            type: 'color'
          }
        ],
        intensity: [
          {
            value: rectAreaLightOptions.intensity,
            type: 'input'
          }
        ],
        width: [
          {
            value: rectAreaLightOptions.width,
            type: 'input'
          }
        ],
        height: [
          {
            value: rectAreaLightOptions.height,
            type: 'input'
          }
        ],
        position: [
          {
            name: 'X',
            value: rectAreaLightOptions.position[0],
            type: 'input'
          },
          {
            name: 'Y',
            value: rectAreaLightOptions.position[1],
            type: 'input'
          },
          {
            name: 'Z',
            value: rectAreaLightOptions.position[2],
            type: 'input'
          }
        ],
        target: [
          {
            name: 'X',
            value: rectAreaLightOptions.target[0],
            type: 'input'
          },
          {
            name: 'Y',
            value: rectAreaLightOptions.target[1],
            type: 'input'
          },
          {
            name: 'Z',
            value: rectAreaLightOptions.target[2],
            type: 'input'
          }
        ]
      }

      formSettings.value.push(areaLightSettings)

      // addTo selectedObjs
      selectedObjs.push(rectAreaLight)
    }

    const spreadOpts = (item: any) => {
      item.spread = !item.spread
    }

    return {
      store,
      headerItems,
      formSettings,
      inputChange,
      addAreaLight,
      spreadOpts
    }
  }
})
</script>

<style lang="postcss" scoped>
.rect-area-lights-forms-3d-main {
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
