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
import { computed, defineComponent, onMounted, onUnmounted, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import { EventsBus } from '@/core/EventsBus'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import BaseDropdown from '@/components/utils/baseComponents/BaseDropdown.vue'
import BaseColor from '@/components/utils/baseComponents/BaseColor.vue'
import { hex2rgb } from '@/core/utils/base'

import * as UnderScore from 'underscore'

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

    onMounted(() => {
      const { options } = props.node
      const { type, value } = options
      const threeDimensionContainer = toRaw(store.state.threeDimensionContainer)

      // console.log(value)

      selectType.value = {
        name: type,
        value: type
      }

      if (type === 'color') {
        formSettings.value = {
          color: {
            show: true,
            data: [
              {
                value: hex2rgb(value),
                type: 'color'
              }
            ]
          }
        }
      } else if (type === 'texture') {
        formSettings.value = {
          sources: {
            show: true,
            data: [
              {
                options: [
                  {
                    name: '无',
                    value: ''
                  },
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
                  name: '无',
                  value: ''
                },
                type: 'dropdown'
              }
            ]
          },
          encoding: {
            show: true,
            data: [
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
                  name: 'LinearEncoding',
                  value: 3000
                },
                type: 'dropdown'
              }
            ]
          },
          wrapping: {
            show: true,
            data: [
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
            ]
          },
          repeat: {
            show: true,
            data: [
              {
                name: 'X',
                value: options.opts.repeat ? options.opts.repeat[0] : 1,
                type: 'input'
              },
              {
                name: 'Y',
                value: options.opts.repeat ? options.opts.repeat[1] : 1,
                type: 'input'
              }
            ]
          }
        }

        // show computed
        formSettings.value.encoding.show = computed(() => {
          return formSettings.value.sources.data[0].selected.value !== ''
        })

        formSettings.value.wrapping.show = computed(() => {
          return formSettings.value.sources.data[0].selected.value !== ''
        })

        formSettings.value.repeat.show = computed(() => {
          return formSettings.value.sources.data[0].selected.value !== '' && formSettings.value.wrapping.data[0].selected.value !== 1001
        })

        // sources selected
        formSettings.value.sources.data[0].options.forEach((op: any) => {
          if (UnderScore.isEqual(op.value, value)) {
            formSettings.value.sources.data[0].selected = op
          }
        })
        // encoding
        formSettings.value.encoding.data[0].options.forEach((op: any) => {
          if (UnderScore.isEqual(op.value, options.opts.encoding)) {
            formSettings.value.encoding.data[0].selected = op
          }
        })
        // wrapping
        formSettings.value.wrapping.data[0].options.forEach((op: any) => {
          if (UnderScore.isEqual(op.value, options.opts.wrapping)) {
            formSettings.value.wrapping.data[0].selected = op
          }
        })
      } else if (type === 'panorama') {
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
                    value: ['/panorama/gongchang.jpg']
                  },
                  {
                    name: 'default2',
                    value: ['/panorama/sky_px.jpg', '/panorama/sky_nx.jpg', '/panorama/sky_py.jpg', '/panorama/sky_ny.jpg', '/panorama/sky_pz.jpg', '/panorama/sky_nz.jpg']
                  }
                ],
                selected: {
                  name: '无',
                  value: []
                },
                type: 'dropdown'
              }
            ]
          },
          scale: {
            show: true,
            data: [
              {
                value: options.opts.scale ? options.opts.scale : 1,
                type: 'input'
              }
            ]
          },
          rotation: {
            show: true,
            data: [
              {
                name: 'X',
                value: options.opts.rotation ? options.opts.rotation[0] : 0,
                type: 'input'
              },
              {
                name: 'Y',
                value: options.opts.rotation ? options.opts.rotation[1] : 0,
                type: 'input'
              },
              {
                name: 'Z',
                value: options.opts.rotation ? options.opts.rotation[2] : 0,
                type: 'input'
              }
            ]
          }
        }

        // show computed
        formSettings.value.scale.show = computed(() => {
          return !UnderScore.isEqual(formSettings.value.sources.data[0].selected.value, [])
        })

        formSettings.value.rotation.show = computed(() => {
          return !UnderScore.isEqual(formSettings.value.sources.data[0].selected.value, [])
        })

        // sources selected
        formSettings.value.sources.data[0].options.forEach((op: any) => {
          if (UnderScore.isEqual(op.value, value)) {
            formSettings.value.sources.data[0].selected = op
          }
        })
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
      // 更新过后的options
      let changedOptions = {}

      if (selectType.value.value === 'color') {
        if (key === 'color') {
          if (type === 'hex') {
            threeDimensionContainer.bgColor = val
            threeDimensionContainer.renderer.setClearColor(val)
            if (threeDimensionContainer.ssaaPass) threeDimensionContainer.ssaaPass.clearColor = val
            setting.value = val
          }
        }
        changedOptions = {
          opts: {},
          type: 'color',
          value: val
        }
      } else if (selectType.value.value === 'texture') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        const { name } = setting
        if (key === 'repeat') {
          if (name === 'X') {
            threeDimensionContainer.scene.background.repeat.x = parseFloat(val)
          } else if (name === 'Y') {
            threeDimensionContainer.scene.background.repeat.y = parseFloat(val)
          }
        }
        const valArr = threeDimensionContainer.scene.background.image.src.split('//')
        const bgGroundVal = '/' + valArr[valArr.length - 1]
        const bgGroundOpts = {
          encoding: threeDimensionContainer.scene.background.encoding,
          wrapping: threeDimensionContainer.scene.background.wrapS,
          repeat: [threeDimensionContainer.scene.background.repeat.x, threeDimensionContainer.scene.background.repeat.y]
        }
        changedOptions = {
          type: 'texture',
          value: bgGroundVal,
          opts: bgGroundOpts
        }
      } else if (selectType.value.value === 'panorama') {
        if (isNaN(val)) return
        setting.value = parseFloat(val)
        const { name } = setting
        if (key === 'scale') {
          const s = parseFloat(val)
          threeDimensionContainer.sky.scale.set(s, s, s)
          threeDimensionContainer.attrs.background.scale = s
        } else if (key === 'rotation') {
          if (!threeDimensionContainer.attrs.background.rotation) threeDimensionContainer.attrs.background.rotation = []
          if (name === 'X') {
            threeDimensionContainer.sky.rotation.x = (parseFloat(val) * Math.PI) / 180
            threeDimensionContainer.attrs.background.rotation[0] = (parseFloat(val) * Math.PI) / 180
          } else if (name === 'Y') {
            threeDimensionContainer.sky.rotation.y = (parseFloat(val) * Math.PI) / 180
            threeDimensionContainer.attrs.background.rotation[1] = (parseFloat(val) * Math.PI) / 180
          } else if (name === 'Z') {
            threeDimensionContainer.sky.rotation.z = (parseFloat(val) * Math.PI) / 180
            threeDimensionContainer.attrs.background.rotation[2] = (parseFloat(val) * Math.PI) / 180
          }
        }
        const bgGroundVal = threeDimensionContainer.sky.userData.value
        const bgGroundOpts = {
          scale: threeDimensionContainer.sky.scale.x,
          rotation: [
            parseFloat(((threeDimensionContainer.sky.rotation.x * 180) / Math.PI).toFixed(4)),
            parseFloat(((threeDimensionContainer.sky.rotation.y * 180) / Math.PI).toFixed(4)),
            parseFloat(((threeDimensionContainer.sky.rotation.z * 180) / Math.PI).toFixed(4))
          ]
        }
        changedOptions = {
          type: 'panorama',
          value: bgGroundVal,
          opts: bgGroundOpts
        }
      }

      // update selected pageTreeNode
      Object.assign(store.state.selectedPageTreeNode.options, changedOptions)
    }

    const typeChange = (e: any) => {
      const { value } = e
      selectType.value = value
      const threeDimensionContainer = store.state.threeDimensionContainer

      // console.log('selectType.value.value', selectType.value.value)
      threeDimensionContainer.bgType = selectType.value.value

      let bgGroundVal: any
      if (selectType.value.value === 'color') {
        if (threeDimensionContainer.sky) threeDimensionContainer.sky.visible = false
        if (threeDimensionContainer.scene.background) threeDimensionContainer.scene.background = null
        formSettings.value = {
          color: {
            show: true,
            data: [
              {
                value: hex2rgb(threeDimensionContainer.bgColor),
                type: 'color'
              }
            ]
          }
        }
        bgGroundVal = threeDimensionContainer.bgColor
        const backgroundOptions = {
          type: threeDimensionContainer.bgType,
          value: bgGroundVal,
          opts: {}
        }
        // update selected pageTreeNode
        Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
      } else if (selectType.value.value === 'texture') {
        if (threeDimensionContainer.sky) threeDimensionContainer.sky.visible = false
        formSettings.value = {
          sources: {
            show: true,
            data: [
              {
                options: [
                  {
                    name: '无',
                    value: ''
                  },
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
                  name: '无',
                  value: ''
                },
                type: 'dropdown'
              }
            ]
          },
          encoding: {
            show: true,
            data: [
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
            ]
          },
          wrapping: {
            show: true,
            data: [
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
                  name: 'ClampToEdgeWrapping',
                  value: 1001
                },
                type: 'dropdown'
              }
            ]
          },
          repeat: {
            show: true,
            data: [
              {
                name: 'X',
                value: 1,
                type: 'input'
              },
              {
                name: 'Y',
                value: 1,
                type: 'input'
              }
            ]
          }
        }

        // show computed
        formSettings.value.encoding.show = computed(() => {
          return formSettings.value.sources.data[0].selected.value !== ''
        })

        formSettings.value.wrapping.show = computed(() => {
          return formSettings.value.sources.data[0].selected.value !== ''
        })

        formSettings.value.repeat.show = computed(() => {
          return formSettings.value.sources.data[0].selected.value !== '' && formSettings.value.wrapping.data[0].selected.value !== 1001
        })
        // reset
        threeDimensionContainer.scene.background = null
        bgGroundVal = ''
        const backgroundOptions = {
          type: threeDimensionContainer.bgType,
          value: bgGroundVal,
          opts: {}
        }
        // update selected pageTreeNode
        Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
      } else if (selectType.value.value === 'panorama') {
        if (threeDimensionContainer.scene.background) threeDimensionContainer.scene.background = null
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
                    value: ['/panorama/gongchang.jpg']
                  },
                  {
                    name: 'default2',
                    value: ['/panorama/sky_px.jpg', '/panorama/sky_nx.jpg', '/panorama/sky_py.jpg', '/panorama/sky_ny.jpg', '/panorama/sky_pz.jpg', '/panorama/sky_nz.jpg']
                  }
                ],
                selected: {
                  name: '无',
                  value: []
                },
                type: 'dropdown'
              }
            ]
          },
          scale: {
            show: true,
            data: [
              {
                value: 1,
                type: 'input'
              }
            ]
          },
          rotation: {
            show: true,
            data: [
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

        // show computed
        formSettings.value.scale.show = computed(() => {
          return !UnderScore.isEqual(formSettings.value.sources.data[0].selected.value, [])
        })

        formSettings.value.rotation.show = computed(() => {
          return !UnderScore.isEqual(formSettings.value.sources.data[0].selected.value, [])
        })

        bgGroundVal = []
        const backgroundOptions = {
          type: threeDimensionContainer.bgType,
          value: bgGroundVal,
          opts: {}
        }
        // update selected pageTreeNode
        Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
      }
    }

    const sourceChange = (e: any) => {
      const { value, target } = e
      const { setting, key } = target
      const threeDimensionContainer = store.state.threeDimensionContainer

      setting.selected = value

      let bgGroundVal: any
      let bgGroundOpts = {}

      if (selectType.value.value === 'texture') {
        if (key === 'sources') {
          if (value.value === '') {
            threeDimensionContainer.scene.background = null
            bgGroundVal = ''
            const backgroundOptions = {
              type: threeDimensionContainer.bgType,
              value: bgGroundVal,
              opts: bgGroundOpts
            }
            // update selected pageTreeNode
            Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
          } else {
            threeDimensionContainer.texLoader.load(threeDimensionContainer.publicPath + value.value, (texture: any) => {
              threeDimensionContainer.scene.background = texture
              const valArr = threeDimensionContainer.scene.background.image.src.split('//')
              bgGroundVal = '/' + valArr[valArr.length - 1]
              bgGroundOpts = {
                encoding: threeDimensionContainer.scene.background.encoding,
                wrapping: threeDimensionContainer.scene.background.wrapS,
                repeat: [threeDimensionContainer.scene.background.repeat.x, threeDimensionContainer.scene.background.repeat.y]
              }
              const backgroundOptions = {
                type: threeDimensionContainer.bgType,
                value: bgGroundVal,
                opts: bgGroundOpts
              }
              // update selected pageTreeNode
              Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
            })
          }
        } else if (key === 'encoding') {
          threeDimensionContainer.scene.background.encoding = value.value
          threeDimensionContainer.scene.background.needsUpdate = true
          const valArr = threeDimensionContainer.scene.background.image.src.split('//')
          bgGroundVal = '/' + valArr[valArr.length - 1]
          bgGroundOpts = {
            encoding: threeDimensionContainer.scene.background.encoding,
            wrapping: threeDimensionContainer.scene.background.wrapS,
            repeat: [threeDimensionContainer.scene.background.repeat.x, threeDimensionContainer.scene.background.repeat.y]
          }
          const backgroundOptions = {
            type: threeDimensionContainer.bgType,
            value: bgGroundVal,
            opts: bgGroundOpts
          }
          // update selected pageTreeNode
          Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
        } else if (key === 'wrapping') {
          threeDimensionContainer.scene.background.wrapS = threeDimensionContainer.scene.background.wrapT = value.value
          threeDimensionContainer.scene.background.needsUpdate = true
          const valArr = threeDimensionContainer.scene.background.image.src.split('//')
          bgGroundVal = '/' + valArr[valArr.length - 1]
          bgGroundOpts = {
            encoding: threeDimensionContainer.scene.background.encoding,
            wrapping: threeDimensionContainer.scene.background.wrapS,
            repeat: [threeDimensionContainer.scene.background.repeat.x, threeDimensionContainer.scene.background.repeat.y]
          }
          const backgroundOptions = {
            type: threeDimensionContainer.bgType,
            value: bgGroundVal,
            opts: bgGroundOpts
          }
          // update selected pageTreeNode
          Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
        }
      } else if (selectType.value.value === 'panorama') {
        bgGroundVal = []
        if (key === 'sources') {
          if (value.value.length === 0) {
            threeDimensionContainer.sky.visible = false
            const backgroundOptions = {
              type: threeDimensionContainer.bgType,
              value: bgGroundVal,
              opts: bgGroundOpts
            }
            // update selected pageTreeNode
            Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
          } else {
            threeDimensionContainer.setSkyBox(value.value, (sbox: any) => {
              sbox.visible = true
              bgGroundVal = sbox.userData.value
              bgGroundOpts = {
                scale: sbox.scale.x,
                rotation: [
                  parseFloat(((sbox.rotation.x * 180) / Math.PI).toFixed(4)),
                  parseFloat(((sbox.rotation.y * 180) / Math.PI).toFixed(4)),
                  parseFloat(((sbox.rotation.z * 180) / Math.PI).toFixed(4))
                ]
              }
              const backgroundOptions = {
                type: threeDimensionContainer.bgType,
                value: bgGroundVal,
                opts: bgGroundOpts
              }
              // update selected pageTreeNode
              Object.assign(store.state.selectedPageTreeNode.options, backgroundOptions)
            })
          }
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
