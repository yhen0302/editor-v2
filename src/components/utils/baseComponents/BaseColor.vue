<template>
  <div class="base-color-main" :style="{ width: widthPx, height: heightPx, marginRight: marginRightPx, marginLeft: marginLeftPx, marginTop: marginTopPx, marginBottom: marginBottomPx }">
    <div class="color-content">
      <ColorPickerEl :value="hexVal" @update:value="colorChange" />
    </div>

    <div class="color-hex">
      <input @change="rgbChange" :value="hexVal" />
    </div>

    <div class="color-opacity" v-if="type === 'rgba'">
      <input @change="alphaChange" :value="alpha" />
      <p class="opacity-unit">%</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import ColorPickerEl from '@/components/utils/common/ColorPickerEl.vue'
import { colorRGBtoHex } from '@/core/utils/base'

export default defineComponent({
  name: 'BaseColor',
  props: ['width', 'height', 'marginRight', 'marginLeft', 'marginTop', 'marginBottom', 'type', 'change', 'target', 'value'],
  components: {
    ColorPickerEl
  },
  setup(props: any) {
    const widthPx = computed(() => props.width + 'px')
    const heightPx = computed(() => props.height + 'px')

    const marginRightPx = computed(() => props.marginRight + 'px')
    const marginLeftPx = computed(() => props.marginLeft + 'px')
    const marginTopPx = computed(() => props.marginTop + 'px')
    const marginBottomPx = computed(() => props.marginBottom + 'px')

    const hexVal = ref(colorRGBtoHex(props.value))
    const alpha = ref(100)

    const colorChange = (val: string) => {
      hexVal.value = val

      props.target && props.change && props.change(props.target, 'hex')
    }

    const hexColorPattern = /^#([a-fA-F\d]{6})$/g

    const rgbChange = () => {
      const e = event as any
      if (!e.target.value.match(hexColorPattern)) return
      hexVal.value = e.target.value

      props.target && props.change && props.change(props.target, 'hex')
    }

    const alphaChange = () => {
      const e = event as any
      if (isNaN(e.target.value) || e.target.value < 0 || e.target.value > 100) return
      alpha.value = e.target.value

      props.target && props.change && props.change(props.target, 'alpha')
    }

    return {
      widthPx,
      heightPx,
      marginRightPx,
      marginLeftPx,
      marginTopPx,
      marginBottomPx,
      hexVal,
      alpha,
      colorChange,
      rgbChange,
      alphaChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.base-color-main {
  border-radius: 2px;
  @apply flex items-center;
}
.color-content {
  width: 32px;
  height: 32px;
  background: #31333d;
  border-radius: 2px;
  margin-right: 8px;
}
.color-hex {
  width: 64px;
  height: 32px;
  background: #31333d;
  border-radius: 2px;
  margin-right: 8px;
  padding-left: 4px;
  @apply flex items-center overflow-hidden;
}
.color-opacity {
  width: 64px;
  height: 32px;
  background: #31333d;
  border-radius: 2px;
  padding-left: 4px;
  @apply flex items-center overflow-hidden relative;
}
.color-opacity p {
  right: 8px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #474a54;
  @apply absolute;
}

input {
  width: 58px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
  background: transparent;
  @apply outline-none border-0 h-16;
}

.color-opacity input {
  width: 38px;
}
</style>
