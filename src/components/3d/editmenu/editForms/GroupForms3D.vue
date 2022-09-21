<template>
  <div class="group-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" @mouseup.stop="chooseNav(item)" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'Group'" :height="48" :width="72" />

    <LineEl :color="'#363741'" />

    <div class="content group" v-show="headerItems[0].active">
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
  name: 'GroupForms3D',
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
      },
      {
        active: false,
        name: '事件设置',
        type: 'eventSetting'
      }
    ])

    // content settings
    const formSettings: any = ref([])

    let currentObj: any

    onMounted(() => {
      const { options, uuid } = props.node

      const threeDimensionContainer = state3D.threeDimensionContainer

      threeDimensionContainer.scene.traverse((c: any) => {
        if (c.uuid == uuid) currentObj = c
      })

      // 展示编辑表单
      formSettings.value = {
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
        rotation: [
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
        ],
        scale: [
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
      }
    })

    onUnmounted(() => {
      //
    })

    const inputChange = (target: any) => {
      const e = event as any

      const val = e.target.value
      if (isNaN(val)) return

      const { setting, key } = target
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
      const position = [formSettings.value['position'][0].value, formSettings.value['position'][1].value, formSettings.value['position'][2].value]
      const rotation = [formSettings.value['rotation'][0].value, formSettings.value['rotation'][1].value, formSettings.value['rotation'][2].value]
      const scale = [formSettings.value['scale'][0].value, formSettings.value['scale'][1].value, formSettings.value['scale'][2].value]

      Object.assign(getters3D.SELECTED_LAYER_NODE.value.options, {
        position,
        rotation,
        scale
      })
    }

    const chooseNav = (item: any) => {
      const e = event as any
      if (e.button !== 0) return

      headerItems.value.forEach((nav: any) => {
        nav.active = false
      })

      item.active = true
    }

    return {
      store,
      headerItems,
      formSettings,
      inputChange,
      chooseNav
    }
  }
})
</script>

<style lang="postcss" scoped>
.group-forms-3d-main {
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

.leftHead {
  width: 80px;
  font-size: 12px;
  line-height: 48px;
}

.settingLineList {
  margin-top: 8px;
  color: #fff;
  width: 181px;
  vertical-align: top;
}
.btnBox {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 12px;
}
.btnStyle {
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.sureBtn {
  background-color: #6582fe;
}
.recelBtn {
  background-color: #808080;
}
</style>
