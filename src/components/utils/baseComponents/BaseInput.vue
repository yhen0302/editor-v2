<template>
  <div class="base-input-main" :style="{ width: widthPx, height: heightPx, marginRight: marginRightPx, marginLeft: marginLeftPx, marginTop: marginTopPx, marginBottom: marginBottomPx }">
    <div class="title" v-if="name" :style="{ width: name ? name.length * 16 + 'px' : '0', height: '16px' }">
      <p>{{ name }}</p>
    </div>
    <div class="val-input">
      <input :value="value" @change="change(target)" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseInput',
  props: ['name', 'value', 'width', 'height', 'marginRight', 'marginLeft', 'marginTop', 'marginBottom', 'change', 'target'],
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
.base-input-main {
  background: #31333d;
  border-radius: 2px;
  @apply flex items-center;
}

.title {
  margin-left: 8px;
  @apply flex items-center justify-center;
}
.title p {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #757a87;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}
.val-input {
  padding-left: 4px;
  @apply h-16 w-full flex items-center overflow-hidden;
}
.val-input input {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
  background: transparent;
  @apply outline-none border-0 h-16;
}
</style>
