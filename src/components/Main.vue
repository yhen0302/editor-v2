<template>
  <div class="main">
    <section class="left">
      <Left />
    </section>
    <section class="middle">
      <Middle />
    </section>
    <section class="right">
      <Right />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Left from './main/Left.vue'
import Middle from './main/Middle.vue'
import Right from './main/Right.vue'

export default defineComponent({
  name: 'Main',
  components: {
    Left,
    Middle,
    Right
  },
  setup() {
    //
  }
})
</script>

<style lang="postcss" scoped>
.main {
  padding-top: 4px;
  height: calc(100vh - 64px);
  @apply flex justify-between w-full;
}
.left {
  width: 64px;
  @apply h-full flex bg-gray-dark;
}
.middle {
  width: calc(100vw - 64px - 272px);
}
.right {
  @apply flex flex-col h-full bg-gray-dark;
  width: 272px;
}
</style>
