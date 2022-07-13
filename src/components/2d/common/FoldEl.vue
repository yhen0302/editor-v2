<template>
  <section class="fold-el">
    <slot name="header" fold="fold">
      <div
        class="fold-header box-border flex items-center justify-between w-full"
        @click="controlFold && (fold = !fold)"
        :class="{ fold: fold, 'control-fold': controlFold }"
      >
        <p class="text-12">{{ title }}</p>
        <img
          src="~@/assets/images/editor_unfold_icn_dark.png"
          class="fold-icon"
          v-show="controlFold"
        />
      </div>
    </slot>
    <line-el color="#363741" v-if="lineShow"></line-el>
    <div
      class="fold-content-wrapper box-border"
      ref="foldContent"
      :style="{
        height: realHeight,
        overflow: controlFold ? 'hidden' : 'visible'
      }"
    >
      <div class="fold-content">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import LineEl from './LineEl'
import { cssUnitToNumber } from '@/share/util/base'

export default {
  name: 'FoldEl',
  components: { LineEl },
  props: {
    heightUpdate: Boolean, // 跟新高度
    title: String, // 标题
    lineShow: { type: Boolean, default: true },
    controlFold: { type: Boolean, default: true }, // 这个是否开启折叠功能
    show: Boolean,
    model: Boolean
  },
  setup(props, context) {
    let fold
    const foldContent = ref(null)
    const cacheHeight = ref(0)
    if (props.model) {
      //
      fold = computed({
        get() {
          if (!cacheHeight.value && props.show) updateHeight()
          return props.show
        },
        set(newVal) {
          context.emit('update:fold', newVal)
        }
      })
    } else {
      fold = ref(true)
    }

    updateHeight()

    function updateHeight() {
      nextTick(() => {
        cacheHeight.value = cssUnitToNumber(foldContent.value.scrollHeight)
      })
    }

    watch(
      () => props.heightUpdate,
      (newVal) => {
        newVal && updateHeight()
      },
      { flush: 'sync' }
    )

    const realHeight = computed(() => {
      return fold.value
        ? cacheHeight.value
          ? cacheHeight.value + 'px'
          : 'auto'
        : '0px'
    })
    return { fold, foldContent, cacheHeight, realHeight }
  }
}
</script>

<style scoped>
.fold-header {
  height: 48px;
  padding: 16px;
  background: #25262d;
  user-select: none;
  transition: 0.2s background-color ease-out;
}

.fold-header.control-fold:hover {
  background: #31333d;
}

.fold-header.fold > .fold-icon {
  transform: rotate(90deg);
}

.fold-icon {
  width: 8px;
  height: 8px;
  transition: 0.2s transform ease-out;
}

.fold-content-wrapper {
  will-change: height;
  overflow: hidden;
  transition: 0.2s height ease-out;
}

.fold-content {
  /*padding: 16px;*/
}
</style>
