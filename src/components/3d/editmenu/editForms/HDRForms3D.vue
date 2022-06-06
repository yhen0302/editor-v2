<template>
  <div class="hdr-forms-3d-main">
    <div class="header">
      <div v-for="item in headerItems" :key="item" class="header-item">
        <EditFormsNavItem :active="item.active" :name="item.name" :type="item.type" />
      </div>
    </div>

    <LineEl :color="'#363741'" />

    <div class="title-nav">
      <BaseTitle :value="'HDR'" :height="48" :width="144" />
    </div>

    <LineEl :color="'#363741'" />

    <div class="content hdr">
      <div v-for="(item, key) in formSettings" :key="key" class="details">
        <div v-if="key === 'enabled'" class="content-item">
          <div class="setting-item">
            <BaseTitle :value="key" :height="56" :width="200" :marginRight="8" />
          </div>

          <div class="setting-item">
            <BaseSwitch :height="56" :width="144" :value="item.value" :marginRight="4" :change="switchChange" :target="{ key, setting: item }" />
          </div>
        </div>
      </div>
      <LineEl class="division" :color="'#363741'" />
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
import BaseSwitch from '@/components/utils/baseComponents/BaseSwitch.vue'

export default defineComponent({
  name: 'HDRForms3D',
  components: {
    LineEl,
    EditFormsNavItem,
    BaseTitle,
    BaseInput,
    BaseText,
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

    onMounted(() => {
      formSettings.value = {
        enabled: {
          value: props.node.options.enabled,
          type: 'switch'
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

      if (key === 'enabled') {
        setting.value = value
        threeDimensionContainer.renderer.shadowMap.enabled = value
      }

      // update pageTreeNode
      store.state.selectedPageTreeNode.options.enabled = value
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
.shadow-forms-3d-main {
  @apply w-full h-full;
}
.header {
  height: 64px;
  @apply w-full flex;
}
.title-nav {
  @apply relative flex items-center;
}

.content {
  height: calc(100% - 64px - 1px - 48px - 1px);
  @apply w-full overflow-scroll;
}

.content-item {
  @apply w-full h-auto flex items-start relative;
}

.setting-item {
  @apply flex flex-col h-auto;
}

.header-item {
  width: 80px;
  height: 64px;
}
</style>
