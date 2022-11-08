<template>
  <div class="icon-title-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" @mouseup.stop="chooseNav(item)" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'IconTitle'" :height="48" :width="72" />

    <LineEl :color="'#363741'" />

    <div class="content icon-title" v-show="headerItems[0].active">
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

      <div ref="iconSelector" class="icon-type-selector overflow-y-hidden">
        <div class="icon-type-selector-nav">
          <BaseTitle :value="'样式'" :height="48" :width="72" />
          <div class="spread-btn" @mouseup="spreadStyle" :class="isSpread ? 'fold' : 'unfold'">
            <img src="@/assets/images/main/left/editor_card_backarrow_btn_dark.png" />
          </div>
        </div>

        <div class="icon-list">
          <div
            v-for="item in iconList"
            :key="item"
            class="icon-item"
            :class="item.hovered || item.selected ? 'item-selected' : ''"
            @mouseenter="itemHover(item, true)"
            @mouseleave="itemHover(item, false)"
            @mouseup="itemSelect(item)"
          >
            <img :src="item.url" />
          </div>
        </div>
      </div>

      <LineEl :color="'#363741'" />

      <div class="icon-extend-options">
        <component :is="iconTitleType2ExtendsType(currentType)" :options="extendOptions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'
import { useGetter, useState } from '@/store/helper'
import { iconTitleType2ExtendsType } from '@/core/3d/util'

import IconTitleExtend1 from './IconExtendComponets/IconTitles/IconTitleExtend1.vue'

export default defineComponent({
  name: 'IconTitleForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    IconTitleExtend1
  },
  props: ['node'],
  setup(props: any) {
    const store = useStore()

    const state3D = useState(store, '3d')
    const getters3D = useGetter(store, '3d', ['SELECTED_LAYER_NODE'])

    const iconList = ref([
      {
        type: 0,
        url: '',
        selected: true,
        hovered: false
      },
      {
        type: 1,
        url: '',
        selected: false,
        hovered: false
      },
      {
        type: 2,
        url: '',
        selected: false,
        hovered: false
      },
      {
        type: 3,
        url: '',
        selected: false,
        hovered: false
      }
    ])

    watch(
      () => props.node.options.position,
      (nVal) => {
        formSettings.value.position[0].value = nVal[0]
        formSettings.value.position[1].value = nVal[1]
        formSettings.value.position[2].value = nVal[2]
      }
    )

    watch(
      () => props.node.options.rotation,
      (nVal) => {
        formSettings.value.rotation[0].value = nVal[0]
        formSettings.value.rotation[1].value = nVal[1]
        formSettings.value.rotation[2].value = nVal[2]
      }
    )

    watch(
      () => props.node.options.scale,
      (nVal) => {
        formSettings.value.scale[0].value = nVal[0]
        formSettings.value.scale[1].value = nVal[1]
        formSettings.value.scale[2].value = nVal[2]
      }
    )

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
    // extends
    const extendOptions = ref({})

    let currentObj: any

    onMounted(() => {
      const { options, uuid } = props.node

      const threeDimensionContainer = toRaw(state3D.threeDimensionContainer)

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

      // 编辑扩展属性
      extendOptions.value = {
        title: {
          value: options.title,
          type: 'string'
        },
        color: {
          value: options.color,
          type: 'color'
        },
        titleHeight: {
          value: options.titleHeight,
          type: 'number'
        }
      }

      iconList.value.forEach((ic: any) => {
        if (ic.type == options.type) {
          ic.selected = true
          currentType.value = options.type
        } else {
          ic.selected = false
        }
      })

      // console.log('extendOptions', extendOptions)
      console.log('onmounted,', currentType.value)
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

    const isSpread = ref(false)
    const iconSelector: any = ref(null)
    const currentType = ref(-1)

    const spreadStyle = () => {
      isSpread.value = !isSpread.value

      isSpread.value ? ((iconSelector.value as HTMLElement).className = 'icon-type-selector') : ((iconSelector.value as HTMLElement).className = 'icon-type-selector overflow-y-hidden')
    }

    const itemHover = (item: any, val: boolean) => {
      item.hovered = val
    }

    const itemSelect = (item: any) => {
      iconList.value.forEach((it: any) => {
        it.selected = false
      })

      item.selected = true
      console.log('currentType.value', currentType.value)
      currentType.value = item.type
    }

    return {
      store,
      headerItems,
      formSettings,
      inputChange,
      chooseNav,
      extendOptions,
      iconList,
      spreadStyle,
      isSpread,
      iconSelector,
      itemHover,
      itemSelect,
      currentType,
      iconTitleType2ExtendsType
    }
  }
})
</script>

<style lang="postcss" scoped>
.icon-title-forms-3d-main {
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

.icon-type-selector {
  min-height: 100px;
  @apply w-full flex flex-col;
}
.overflow-y-hidden {
  height: 130px;
}
.icon-type-selector-nav {
  @apply w-full h-auto flex items-center relative;
}
.spread-btn {
  right: 24px;
  @apply absolute cursor-pointer flex items-center;
}
.icon-list {
  grid-auto-rows: 100px;
  @apply w-full grid grid-cols-2;
}
.icon-item {
  width: 100px;
  height: 70px;
  margin-left: 20px;
  margin-right: 10px;
  border-radius: 4px;
  color: black;
  background-color: aliceblue;
  cursor: pointer;
}
.item-selected {
  outline: 2px #6582fe solid;
}

.fold {
  transform: rotate(270deg);
}
.unfold {
  transform: rotate(180deg);
}

.icon-extends {
  width: 100%;
}
</style>
