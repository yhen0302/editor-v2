<template>
  <div class="home" @contextmenu.prevent>
    <section class="header">
      <Header />
    </section>

    <section class="main">
      <Main />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Main from '@/components/Main.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Main
  },
  setup() {
    return {
      //
    }
  }
})
</script>

<style lang="postcss" scoped>
.home {
  @apply flex-col w-screen h-screen;
}
.header {
  height: 64px;
  @apply w-full bg-gray-dark;
}
.main {
  height: calc(100vh - 64px);
  background-color: #1b1b21;
  @apply w-full;
}
</style>
