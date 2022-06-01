<template>
  <div class="base-dropdown-main" :style="{ width: widthPx, marginRight: marginRightPx, marginLeft: marginLeftPx, marginTop: marginTopPx, marginBottom: marginBottomPx }">
    <div class="options-item" :style="{ height: heightPx }" @mouseup="dropped = !dropped">
      <div class="item-value">
        <p>{{ value.name }}</p>
      </div>

      <div class="spread-btn" :class="dropped ? 'fold' : 'unfold'">
        <img src="@/assets/images/main/left/editor_card_backarrow_btn_dark.png" />
      </div>
    </div>

    <div class="options" v-show="dropped">
      <div class="options-item" v-for="item in options" :key="item" :style="{ height: heightPx }" :class="item.value === value.value ? 'selected' : ''" @mouseup="choosed(item)">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'BaseDropdown',
  props: ['options', 'value', 'width', 'height', 'marginRight', 'marginLeft', 'marginTop', 'marginBottom', 'change', 'target'],
  components: {},
  setup(props: any) {
    console.log('value', props.value)
    const widthPx = computed(() => props.width + 'px')
    const heightPx = computed(() => props.height + 'px')

    const marginRightPx = computed(() => props.marginRight + 'px')
    const marginLeftPx = computed(() => props.marginLeft + 'px')
    const marginTopPx = computed(() => props.marginTop + 'px')
    const marginBottomPx = computed(() => props.marginBottom + 'px')

    const dropped = ref(false)

    const choosed = (item: any) => {
      if (item.value === props.value) return
      dropped.value = !dropped.value
      props.change && props.change({ target: props.target, value: item })
    }

    return {
      dropped,
      widthPx,
      heightPx,
      marginRightPx,
      marginLeftPx,
      marginTopPx,
      marginBottomPx,
      choosed
    }
  }
})
</script>

<style lang="postcss" scoped>
.base-dropdown-main {
  background: #31333d;
  border-radius: 2px;
  @apply flex flex-col;
}
.options {
  @apply w-full;
}
.options-item {
  text-align: center;
  @apply w-full flex items-center relative;
}
p {
  padding-left: 8px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
}
.item-value {
  @apply h-full flex items-center;
}
.options-item:hover {
  outline: 1px solid rgb(202, 202, 202);
  cursor: pointer;
}
.selected {
  outline: 1px solid #6582fe !important;
}
.spread-btn {
  width: 16px;
  height: 16px;
  right: 10px;
  @apply h-full flex items-center absolute;
}
.fold {
  transform: rotate(270deg);
}
.unfold {
  transform: rotate(180deg);
}
</style>
