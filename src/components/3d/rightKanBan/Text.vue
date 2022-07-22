<template>
  <div class="text-forms-3d">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>
    <LineEl :color="'#363741'" />
    <Universal :value="formSettings" v-if="store.state.addElementType.mesh"></Universal>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
import { upDateText3D } from '@/core/utils/text3D'
import store from '../../../store'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import Universal from './Universal.vue'

String.prototype.colorHex = function () {
  // RGB颜色值的正则
  var reg = /^(rgb|RGB)/
  var color = this
  if (reg.test(color)) {
    var strHex = '#'
    // 把RGB的3个数值变成数组
    var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    // 转成16进制
    for (var i = 0; i < colorArr.length; i++) {
      var hex = Number(colorArr[i]).toString(16)
      if (hex === '0') {
        hex += hex
      }
      strHex += hex
    }
    return strHex
  } else {
    return String(color)
  }
}
String.prototype.colorRgb = function () {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 把颜色值变成小写
  var color = this.toLowerCase()
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = '#'
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1))
      }
      color = colorNew
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = []
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt('0x' + color.slice(i, i + 2)))
    }
    return colorChange.join(',')
  } else {
    return color
  }
}

let arrs = [
  {
    name: '文本设置',
    fold: true,
    content: [
      {
        name: '内容',
        content: [
          {
            type: 'input',
            value: '新增文本',
            scope: [-Infinity, Infinity],
            typeText: ''
          }
        ]
      },
      {
        name: '尺寸',
        content: [
          {
            name: 'W',
            value: 200,
            type: 'two_input',
            scope: [0, Infinity]
          },
          {
            name: 'H',
            value: 200,
            type: 'two_input',
            scope: [0, Infinity]
          }
        ]
      },
      {
        name: '填充',
        content: [
          {
            type: 'colorOpacity',
            value: {
              color: {
                value: '#000000'
              },
              opacity: {
                value: 100,
                scope: [0, 100]
              },
              loadPicture: {
                value: ''
              }
            }
          }
        ]
      },
      {
        name: '字体',
        content: [
          {
            type: 'fontStyle',
            value: {
              fontFamily: {
                type: 'fontFamily',
                value: 'SimSun',
                list: [
                  { label: '宋体', value: 'SimSun' },
                  { label: '⿊体', value: 'SimHei' },
                  { label: '微软雅⿊', value: 'Microsoft YaHei' },
                  { label: '微软正⿊体', value: 'Microsoft JhengHei' },
                  { label: '新宋体', value: 'NSimSun' },
                  { label: '新细明体', value: 'PMingLiU' },
                  { label: '细明体', value: 'MingLiU' },
                  { label: '标楷体', value: 'DFKai-SB' },
                  { label: '仿宋', value: 'FangSong' },
                  { label: '楷体', value: 'KaiTi' }
                ]
              },
              color: {
                value: '#ffffff'
              },
              fontSize: {
                value: '30',
                name: 'px',
                scope: [0, Infinity]
              },
              fontWeight: {
                value: 'normal',
                list: [
                  { label: 'normal', value: 'normal' },
                  { label: 'bold', value: 'bold' },
                  { label: 'bolder', value: 'bolder' },
                  { label: 'lighter', value: 'lighter' },
                  { label: '100', value: '100' },
                  { label: '200', value: '200' },
                  { label: '300', value: '300' },
                  { label: '400', value: '400' },
                  { label: '500', value: '500' },
                  { label: '600', value: '600' },
                  { label: '700', value: '700' },
                  { label: '800', value: '800' },
                  { label: '900', value: '900' }
                ]
              }
            }
          }
        ]
      },
      {
        name: '偏移',
        content: [
          {
            name: 'W',
            value: 0,
            type: 'two_input',
            scope: [-Infinity, Infinity]
          },
          {
            name: 'H',
            value: 0,
            type: 'two_input',
            scope: [-Infinity, Infinity]
          }
        ]
      },
      {
        name: '对齐',
        content: [
          {
            type: 'fontAlign',
            value: {
              textAlign: {
                value: ['left'],
                list: [
                  {
                    value: 'left',
                    label: require('@/assets/images/editor_leftalign_btn_dark.png')
                  },
                  {
                    value: 'center',
                    label: require('@/assets/images/editor_centralalign_btn_dark.png')
                  },
                  {
                    value: 'right',
                    label: require('@/assets/images/editor_rightalign_btn_dark.png')
                  }
                ]
              },
              lineAlign: {
                value: ['top'],
                list: [
                  {
                    value: 'bottom',
                    label: require('@/assets/images/editor_bottomalign_btn_dark.png')
                  },
                  {
                    value: 'center',
                    label: require('@/assets/images/editor_verticalalign_btn_dark.png')
                  },
                  {
                    value: 'top',
                    label: require('@/assets/images/editor_topalign_btn_dark.png')
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  },
  {
    name: '模型设置',
    fold: true,
    content: [
      {
        name: 'position',
        content: [
          { type: 'three_input', name: 'X', value: 0 },
          { type: 'three_input', name: 'Y', value: 0 },
          { type: 'three_input', name: 'Z', value: 0 }
        ]
      },
      {
        name: 'scale',
        content: [
          {
            name: 'X',
            value: 0,
            type: 'two_input',
            scope: [0, Infinity]
          },
          {
            name: 'Y',
            value: 0,
            type: 'two_input',
            scope: [0, Infinity]
          }
        ]
      },
      {
        name: 'opacity',
        content: [
          {
            value: 100,
            scope: [0, 100],
            type: 'slide_input'
          }
        ]
      }
    ]
  }
]

const props = defineProps({
  node: Object
})

const headerItems = ref([
  {
    active: true,
    name: '基础设置',
    type: 'basicSetting'
  }
])
const formSettings = ref(arrs)
if (props.node.selected == 'RotateText') {
  formSettings.value[1].content.push({
    name: 'center',
    content: [
      {
        name: 'X',
        value: 0.5,
        scope: [-Infinity, Infinity],
        type: 'two_input'
      },
      {
        name: 'Y',
        value: 0.5,
        scope: [-Infinity, Infinity],
        type: 'two_input'
      }
    ]
  })
} else {
  formSettings.value[1].content.push({
    name: 'rotation',
    content: [
      {
        name: 'X',
        value: 0,
        scope: [0, 360],
        type: 'slide_input_three'
      },
      {
        name: 'Y',
        value: 0,
        scope: [0, 360],
        type: 'slide_input_three'
      },
      {
        name: 'Z',
        value: 0,
        scope: [0, 360],
        type: 'slide_input_three'
      }
    ]
  })
}

if (props.node.clickObj) {
  if (props.node.clickObj == true) {
    let data = store.state.addElementType.mesh.userData.editDate
    formSettings.value.forEach((dev) => {
      dev.content.forEach((item) => {
        if (item.name == '字体') {
          item.content[0].value.color.value = data.color
          item.content[0].value.fontFamily.value = data.fontFamily
          item.content[0].value.fontSize.value = data.fontSize
          item.content[0].value.fontWeight.value = data.fontWeight
        } else if (item.name == '内容') {
          item.content[0].value = data.text
        } else if (item.name == '尺寸') {
          item.content[0].value = data.textScale[0]
          item.content[1].value = data.textScale[1]
        } else if (item.name == '填充') {
          let rgb = data.bgColor == '' ? '' : 'rgb(' + data.bgColor + ')'
          item.content[0].value.color.value = rgb.colorHex()
          item.content[0].value.opacity.value = data.bgOpcity
          item.content[0].value.loadPicture.value = data.bgImage
        } else if (item.name == '偏移') {
          item.content[0].value = data.textOffset[0]
          item.content[1].value = data.textOffset[1]
        } else if (item.name == '对齐') {
          item.content[0].value.textAlign.value[0] = data.textAlign
          item.content[0].value.lineAlign.value[0] = data.lineAlign
        } else if (item.name == 'position') {
          item.content[0].value = data.position[0]
          item.content[1].value = data.position[1]
          item.content[2].value = data.position[2]
        } else if (item.name == 'scale') {
          item.content[0].value = data.scale[0]
          item.content[1].value = data.scale[1]
        } else if (item.name == 'opacity') {
          item.content[0].value = data.opacity
        } else if (item.name == 'rotation' && props.node.selected == 'FixedText') {
          item.content[0].value = data.rotation[0]
          item.content[1].value = data.rotation[1]
          item.content[2].value = data.rotation[2]
        } else if (item.name == 'center' && props.node.selected == 'RotateText') {
          item.content[0].value = data.center[0]
          item.content[1].value = data.center[1]
        }
      })
    })
  } else {
    formSettings.value.forEach((dev) => {
      dev.content.forEach((item) => {
        if (item.name == '字体') {
          item.content[0].value.color.value = props.node.clickObj.options.textColor
          item.content[0].value.fontFamily.value = props.node.clickObj.options.textFontFamily
          item.content[0].value.fontSize.value = props.node.clickObj.options.textFontSize
          item.content[0].value.fontWeight.value = props.node.clickObj.options.textFontWeight
        } else if (item.name == '内容') {
          item.content[0].value = props.node.clickObj.options.textText
        } else if (item.name == '尺寸') {
          item.content[0].value = props.node.clickObj.options.textTextScale[0]
          item.content[1].value = props.node.clickObj.options.textTextScale[1]
        } else if (item.name == '填充') {
          let rgb =
            props.node.clickObj.options.textBGColor == ''
              ? ''
              : 'rgb(' + props.node.clickObj.options.textBGColor + ')'
          item.content[0].value.color.value = rgb.colorHex()
          item.content[0].value.opacity.value = props.node.clickObj.options.textBGOpacity
          item.content[0].value.loadPicture.value = props.node.clickObj.options.textBGImage
        } else if (item.name == '偏移') {
          item.content[0].value = props.node.clickObj.options.textTextOffset[0]
          item.content[1].value = props.node.clickObj.options.textTextOffset[1]
        } else if (item.name == '对齐') {
          item.content[0].value.textAlign.value[0] = props.node.clickObj.options.textTextAlign
          item.content[0].value.lineAlign.value[0] = props.node.clickObj.options.textLineAlign
        } else if (item.name == 'position') {
          item.content[0].value = props.node.clickObj.options.meshPosition[0]
          item.content[1].value = props.node.clickObj.options.meshPosition[1]
          item.content[2].value = props.node.clickObj.options.meshPosition[2]
        } else if (item.name == 'scale') {
          item.content[0].value = props.node.clickObj.options.meshScale[0]
          item.content[1].value = props.node.clickObj.options.meshScale[1]
        } else if (item.name == 'opacity') {
          item.content[0].value = props.node.clickObj.options.meshOpacity
        } else if (item.name == 'rotation' && props.node.selected == 'FixedText') {
          item.content[0].value = props.node.clickObj.options.meshRotation[0]
          item.content[1].value = props.node.clickObj.options.meshRotation[1]
          item.content[2].value = props.node.clickObj.options.meshRotation[2]
        } else if (item.name == 'center' && props.node.selected == 'RotateText') {
          item.content[0].value = props.node.clickObj.options.meshCenter[0]
          item.content[1].value = props.node.clickObj.options.meshCenter[1]
        }
      })
    })
    store.state.threeDimensionContainer.scene.children.forEach((item) => {
      if (item.name == 'Text') {
        item.traverse((child) => {
          if (child.uuid == props.node.clickObj.uuid) {
            store.state.addElementType = {
              mesh: child,
              moving: true
            }
          }
        })
      }
    })
  }
}

const movingType = ref(false),
  movingTimeout = ref(null)
watch(
  () => formSettings,
  (v1) => {
    movingTimeout.value && clearTimeout(movingTimeout.value)
    let obj = {}
    v1.value.forEach((dev) => {
      dev.content.forEach((item) => {
        if (item.name == '字体') {
          obj.color = item.content[0].value.color.value
          obj.fontFamily = item.content[0].value.fontFamily.value
          obj.fontSize = item.content[0].value.fontSize.value
          obj.fontWeight = item.content[0].value.fontWeight.value
        } else if (item.name == '内容') {
          obj.text = item.content[0].value
        } else if (item.name == '尺寸') {
          obj.textScale = [item.content[0].value, item.content[1].value]
        } else if (item.name == '填充') {
          obj.bgColor = item.content[0].value.color.value.colorRgb()
          obj.bgOpcity = item.content[0].value.opacity.value
          obj.bgImage = item.content[0].value.loadPicture.value
        } else if (item.name == '偏移') {
          obj.textOffset = [item.content[0].value, item.content[1].value]
        } else if (item.name == '对齐') {
          obj.textAlign = item.content[0].value.textAlign.value[0]
          obj.lineAlign = item.content[0].value.lineAlign.value[0]
        } else if (item.name == 'position') {
          obj.position = [item.content[0].value, item.content[1].value, item.content[2].value]
        } else if (item.name == 'scale') {
          obj.scale = [item.content[0].value, item.content[1].value]
        } else if (item.name == 'opacity') {
          obj.opacity = item.content[0].value
        } else if (item.name == 'rotation' && props.node.selected == 'FixedText') {
          obj.rotation = [item.content[0].value, item.content[1].value, item.content[2].value]
        } else if (item.name == 'center' && props.node.selected == 'RotateText') {
          obj.center = [item.content[0].value, item.content[1].value]
        }
      })
    })

    upDateText3D(obj, movingType.value, props.node.selected)
    store.state.selectedSceneTreeNode.trees.threeDimension.forEach((item) => {
      if (item.name == 'Text') {
        item.children.forEach((dev) => {
          if (dev.uuid == store.state.addElementType.mesh.uuid) {
            dev.options.textColor = obj.color
            dev.options.textFontFamily = obj.fontFamily
            dev.options.textFontSize = obj.fontSize
            dev.options.textFontWeight = obj.fontWeight
            dev.options.textText = obj.text
            dev.options.textTextScale = obj.textScale
            dev.options.textBGColor = obj.bgColor
            dev.options.textBGOpacity = obj.bgOpcity
            dev.options.textBGImage = obj.bgImage
            dev.options.textTextOffset = obj.textOffset
            dev.options.textTextAlign = obj.textAlign
            dev.options.textLineAlign = obj.lineAlign
            dev.options.meshPosition = obj.position
            dev.options.meshScale = obj.scale
            dev.options.meshOpacity = obj.opacity
            dev.options.meshRotation = obj.rotation
            dev.options.meshCenter = obj.center
          }
        })
      }
    })
    movingTimeout.value = setTimeout(() => {
      movingType.value = false
    }, 200)
  },
  {
    deep: true
  }
)

watch(
  () => store.state.addElementType.moving,
  (v1, v2) => {
    if (store.state.addElementType.mesh) {
      movingTimeout.value && clearTimeout(movingTimeout.value)
      movingType.value = true
      formSettings.value.forEach((dev) => {
        dev.content.forEach((item) => {
          if (item.name == 'position') {
            item.content[0].value = parseInt(store.state.addElementType.mesh.position.x)
            item.content[1].value = parseInt(store.state.addElementType.mesh.position.y)
            item.content[2].value = parseInt(store.state.addElementType.mesh.position.z)
          } else if (item.name == 'scale') {
            item.content[0].value = store.state.addElementType.mesh.scale.x
            item.content[1].value = store.state.addElementType.mesh.scale.y
          } else if (item.name == 'opacity') {
            item.content[0].value = store.state.addElementType.mesh.material.opacity * 100
          } else if (item.name == 'rotation' && props.node.selected == 'FixedText') {
            item.content[0].value = (store.state.addElementType.mesh.rotation.x * 180) / Math.PI
            item.content[1].value = (store.state.addElementType.mesh.rotation.y * 180) / Math.PI
            item.content[2].value = (store.state.addElementType.mesh.rotation.z * 180) / Math.PI
          } else if (item.name == 'center' && props.node.selected == 'RotateText') {
            item.content[0].value = store.state.addElementType.mesh.center.x
            item.content[1].value = store.state.addElementType.mesh.center.y
          }
        })
      })
      store.state.selectedSceneTreeNode.trees.threeDimension.forEach((item) => {
        if (item.name == 'Text') {
          item.children.forEach((dev) => {
            if (dev.uuid == store.state.addElementType.mesh.uuid) {
              dev.options.meshPosition = [
                parseInt(store.state.addElementType.mesh.position.x),
                parseInt(store.state.addElementType.mesh.position.y),
                parseInt(store.state.addElementType.mesh.position.z)
              ]
              dev.options.meshScale = [
                store.state.addElementType.mesh.scale.x,
                store.state.addElementType.mesh.scale.y
              ]
              dev.options.meshOpacity = store.state.addElementType.mesh.material.opacity * 100
              if (props.node.selected == 'FixedText') {
                dev.options.meshRotation = [
                  (store.state.addElementType.mesh.rotation.x * 180) / Math.PI,
                  (store.state.addElementType.mesh.rotation.y * 180) / Math.PI,
                  (store.state.addElementType.mesh.rotation.z * 180) / Math.PI
                ]
              } else {
                dev.options.meshCenter = [
                  store.state.addElementType.mesh.center.x,
                  store.state.addElementType.mesh.center.y
                ]
              }
            }
          })
        }
      })
    }
  }
)
</script>

<style lang="postcss" scoped>
.text-forms-3d {
  @apply w-full h-full;
}
.header {
  height: 64px;
  @apply w-full flex;
}
.header-item {
  width: 80px;
  height: 64px;
}
</style>
