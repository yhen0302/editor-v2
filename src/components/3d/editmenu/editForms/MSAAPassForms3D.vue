<template>
  <div class="msaa-pass-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <BaseTitle :value="'MSAAPass'" :height="48" :width="108" />

    <LineEl :color="'#363741'" />

    <div class="content msaa">
      <div v-for="(item, key) in formSettings" :key="key" class="content-details">
        <div class="content-item" v-if="item.show">
          <div class="setting-item">
            <BaseTitle :value="key" :height="56" :width="72" :marginRight="8" />
          </div>

          <div class="setting-item">
            <div v-for="setting in item.data" :key="setting" class="setting">
              <BaseSwitch
                v-if="setting.type === 'switch'"
                :height="32"
                :width="144"
                :value="setting.value"
                :marginRight="4"
                :marginTop="12"
                :marginBottom="0"
                :change="switchChange"
                :target="{ key, setting }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <LineEl class="division" :color="'#363741'" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, toRaw } from 'vue'
import { useStore } from 'vuex'
import LineEl from '@/components/utils/common/LineEl.vue'
import EditFormsNavItem from '@/components/utils/editmenu/EditFormsNavItem.vue'
import BaseTitle from '@/components/utils/baseComponents/BaseTitle.vue'
import BaseSwitch from '@/components/utils/baseComponents/BaseSwitch.vue'

declare const Bol3D: any

export default defineComponent({
  name: 'MSAAPassForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
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
    const formSettings: any = ref({})

    onMounted(() => {
      const { type, options } = props.node

      // 展示编辑表单
      formSettings.value = {
        supersampling: {
          show: true,
          data: [
            {
              value: options.supersampling,
              type: 'switch'
            }
          ]
        }
      }
    })

    onUnmounted(() => {
      //
    })

    const switchChange = (e: any) => {
      const { target, value } = e
      const { setting, key } = target

      const threeDimensionContainer = store.state.threeDimensionContainer

      if (key === 'supersampling') {
        setting.value = value

        threeDimensionContainer.supersampling = value
        const size = threeDimensionContainer.renderer.getDrawingBufferSize(new Bol3D.Vector2())

        if (value) {
          threeDimensionContainer.msaaTarget.setSize(size.width * 2, size.height * 2)
        } else {
          threeDimensionContainer.msaaTarget.setSize(size.width, size.height)
        }
      }

      Object.assign(store.state.selectedPageTreeNode.options, {
        supersampling: value
      })
    }

    return {
      store,
      headerItems,
      formSettings,
      switchChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.gamma-pass-forms-3d-main {
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
