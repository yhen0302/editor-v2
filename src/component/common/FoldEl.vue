<template>
  <section class="fold-el">
    <slot name="header" fold="fold">
      <div class="fold-header box-border flex items-center justify-between w-full" @click="fold=!fold"
           :class="{fold:fold}">
        <p class="text-12">{{ title }}</p>
        <img src="~@/assets/images/editor_unfold_icn_dark.png" class="fold-icon">
      </div>
    </slot>
    <line-el color="#363741" v-if="lineShow"></line-el>
    <div class="fold-content-wrapper box-border" ref="foldContent" :style="{height:realHeight}">
      <div class="fold-content">
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
import {computed, nextTick, ref, watch} from "vue";
import LineEl from "@/component/common/LineEl";

export default {
  name: "FoldEl",
  components: {LineEl},
  props: {heightUpdate: {type: Boolean, default: false}, title: String, lineShow: {type: Boolean, default: true}},
  setup(props, context) {
    const fold = ref(true)
    const foldContent = ref(null)
    const cacheHeight = ref(0)

    updateHeight()

    function updateHeight() {
      nextTick(() => {
        cacheHeight.value = foldContent.value.getBoundingClientRect().height
      })
    }

    watch(() => props.heightUpdate, (newVal) => newVal && updateHeight())

    const realHeight = computed(() => {
      return fold.value ? cacheHeight.value ? cacheHeight.value + 'px' : 'auto' : '0px'
    })
    return {fold, foldContent, cacheHeight, realHeight}
  }
}
</script>

<style scoped>
.fold-header {
  height: 48px;
  padding: 16px;
  background: #25262D;
  user-select: none;
  transition: .2s background-color ease-out;
}

.fold-header:hover {
  background: #31333D;
}

.fold-header.fold > .fold-icon {
  transform: rotate(90deg);
}

.fold-icon {
  width: 8px;
  height: 8px;
  transition: .2s transform ease-out;
}

.fold-content-wrapper {
  will-change: height;
  overflow: hidden;
  transition: .2s height ease-out;
}

.fold-content {
  /*padding: 16px;*/
}
</style>