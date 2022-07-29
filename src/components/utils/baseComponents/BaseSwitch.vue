<template>
  <div class="base-switch-main" :style="{ width: widthPx, height: heightPx, marginRight: marginRightPx, marginLeft: marginLeftPx, marginTop: marginTopPx, marginBottom: marginBottomPx }">
    <SwitchEl :value="value" @update:value="changeVal" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import SwitchEl from '@/components/utils/common/SwitchEl.vue'

export default defineComponent({
  name: 'BaseSwitch',
  props: ['value', 'width', 'height', 'marginRight', 'marginLeft', 'marginTop', 'marginBottom', 'change', 'target'],
  components: {
    SwitchEl
  },
  setup(props: any) {
    const widthPx = computed(() => props.width + 'px')
    const heightPx = computed(() => props.height + 'px')

    const marginRightPx = computed(() => props.marginRight + 'px')
    const marginLeftPx = computed(() => props.marginLeft + 'px')
    const marginTopPx = computed(() => props.marginTop + 'px')
    const marginBottomPx = computed(() => props.marginBottom + 'px')

    const changeVal = (val: any) => {
      props.target && props.change && props.change({ target: props.target, value: val })
    }

    return {
      widthPx,
      heightPx,
      marginRightPx,
      marginLeftPx,
      marginTopPx,
      marginBottomPx,
      changeVal
    }
  }
})
</script>

<style lang="postcss" scoped>
.base-switch-main {
  border-radius: 2px;
  @apply flex items-center;
}
</style>
