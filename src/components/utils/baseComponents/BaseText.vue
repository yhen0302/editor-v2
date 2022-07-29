<template>
  <div class="base-text-main" :style="{ width: widthPx, height: heightPx, marginRight: marginRightPx, marginLeft: marginLeftPx, marginTop: marginTopPx, marginBottom: marginBottomPx, background }">
    <p>{{ value }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseText',
  props: ['value', 'width', 'height', 'marginRight', 'marginLeft', 'marginTop', 'marginBottom', 'background'],
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
.base-text-main {
  @apply flex items-center;
}
p {
  user-select: text;
}

.base-text-main p {
  font-size: 12px;
  font-family: Microsoft YaHei;
  color: #757a87;
  text-align: left;
}
</style>
