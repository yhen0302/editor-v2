<template>
  <div class="base-title-main" :style="{ width: widthPx, height: heightPx, marginRight: marginRightPx, marginLeft: marginLeftPx, marginTop: marginTopPx, marginBottom: marginBottomPx }">
    <p :style="{ width: widthPx, height: heightPx, lineHeight: heightPx }">{{ value }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseTitle',
  props: ['value', 'width', 'height', 'marginRight', 'marginLeft', 'marginTop', 'marginBottom'],
  components: {},
  setup(props: any) {
    const widthPx = computed(() => props.width + 'px')
    const heightPx = computed(() => props.height + 'px')

    const marginRightPx = computed(() => props.marginRight + 'px')
    const marginLeftPx = computed(() => props.marginLeft + 'px')
    const marginTopPx = computed(() => props.marginTop + 'px')
    const marginBottomPx = computed(() => props.marginBottom + 'px')

    return {
      widthPx,
      heightPx,
      marginRightPx,
      marginLeftPx,
      marginTopPx,
      marginBottomPx
    }
  }
})
</script>

<style lang="postcss" scoped>
.base-title-main {
  @apply flex items-center justify-center;
}
.base-title-main p {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  padding-left: 16px;
}
</style>
