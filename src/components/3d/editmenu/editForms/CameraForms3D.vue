<template>
  <div class="camera-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'相机'" :height="48" :width="72" />

    <LineEl :color="'#363741'" />

    <div class="content camera">
      <!-- 
        <div class="content-item">
            <BaseTitle  />
        </div> -->

      <div v-for="item in formSettings" :key="item" class="content-item">
        <BaseTitle :value="item.name" :height="48" :width="72" :marginRight="8" :marginTop="16" :marginBottom="16" />

        <div v-for="setting in item.settings" :key="setting">
          <BaseInput v-if="setting.type === 'input'" :name="setting.name" :value="setting.value" :width="56" :height="32" :marginRight="4" :marginTop="16" :marginBottom="16" />
        </div>
        <LineEl class="division" :color="'#363741'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseInput from '@/components/utils/baseComponents/BaseInput.vue'

export default defineComponent({
  name: 'CameraForms3D',
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

    onMounted(() => {
      const { type, options } = props.node
      // 展示编辑表单
      switch (type) {
        case 'PerspectiveCamera':
          formSettings.value = [
            {
              type: 'position',
              name: 'position',
              settings: [
                {
                  value: options.position[0],
                  type: 'input'
                },
                {
                  value: options.position[1],
                  type: 'input'
                },
                {
                  value: options.position[2],
                  type: 'input'
                }
              ]
            },
            {
              type: 'near',
              name: 'near',
              settings: [
                {
                  value: options.near,
                  type: 'input'
                }
              ]
            },
            {
              type: 'far',
              name: 'far',
              settings: [
                {
                  value: options.far,
                  type: 'input'
                }
              ]
            }
          ]

          break
      }
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
.camera-forms-3d-main {
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
  @apply w-full h-auto flex items-center relative;
}
.setting-item {
  @apply flex flex-col;
}
.division {
  bottom: 0;
  @apply absolute;
}
</style>
