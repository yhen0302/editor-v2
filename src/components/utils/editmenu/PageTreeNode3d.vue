<template>
  <div class="node">
    <!-- <div class="item" :class="node.selected ? 'item-selected' : ''" @mouseup="spread(node)">
      <div class="spread-btn" :class="node.spread ? 'animation-spread' : 'animation-packup'">
        <img src="@/assets/images/main/right/editor_unfold_icn_dark.png" />
      </div>

      <div class="item-name">
        <p>{{ node.name }}</p>
      </div>

      <div class="item-visible-btn">
        <img src="@/assets/images/main/right/editor_newpage_btn_dark.png" />
      </div>
    </div>
  --></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageTreeNode3d',
  props: ['node'],
  components: {},
  setup() {
    //
  }
})
</script>

<style lang="postcss" scoped></style>
