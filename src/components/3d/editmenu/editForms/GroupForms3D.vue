<template>
  <div class="group-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'Group'" :height="48" :width="72" />

    <LineEl :color="'#363741'" />

    <div class="content group">
      <div v-for="item in formSettings" :key="item" class="content-item">
        <div class="setting-item">
          <BaseTitle :value="item.name" :height="56" :width="72" :marginRight="8" />
        </div>

        <div class="setting-item">
          <div v-for="setting in item.settings" :key="setting" class="setting">
            <BaseInput v-if="setting.type === 'input'" :name="setting.name" :value="setting.value" :width="100" :height="32" :marginRight="4" :marginTop="12" :marginBottom="0" />
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

    const groupChanged = (event: any) => {
      //
    }

    onMounted(() => {
      const { type, options } = props.node
      // 展示编辑表单
      formSettings.value = [
        {
          type: 'position',
          name: 'position',
          settings: [
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
        {
          type: 'rotation',
          name: 'rotation',
          settings: [
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
        {
          type: 'scale',
          name: 'scale',
          settings: [
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
      ]

      EventsBus.on('groupChanged', groupChanged)
    })

    onUnmounted(() => {
      EventsBus.off('groupChanged', groupChanged)
    })

    return {
      store,
      headerItems,
      formSettings
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
</style>
