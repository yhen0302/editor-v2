<template>
  <div class="left-main">
    <div class="left1">
      <div class="title">
        <p>{{ store.state.dimensionType }}</p>
      </div>
      <div class="nav">
        <Nav2D v-if="store.state.dimensionType === '2d'" />
        <Nav3D v-else-if="store.state.dimensionType === '3d'" />
      </div>
    </div>

    <transition name="bounceInLeft">
      <NavMenu2D v-if="store.state.dimensionType === '2d' && store.state.selectBarToolType" />
      <div class="left2" v-else-if="store.state.dimensionType === '3d' && store.state.selectBarToolType !== ''">
        <NavMenu3D />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Nav2D from '@/components/2d/toolbar/Nav2D.vue'
import NavMenu2D from '@/components/2d/toolbar/NavMenu2D.vue'
import Nav3D from '@/components/3d/toolbar/Nav3D.vue'
import NavMenu3D from '@/components/3d/toolbar/NavMenu3D.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ToolBar',
  components: {
    Nav2D,
    Nav3D,
    NavMenu2D,
    NavMenu3D
  },
  setup() {
    const store = useStore()

    return {
      store
    }
  }
})
</script>

<style lang="postcss" scoped>
.left-main {
  @apply w-full h-full flex flex-row relative;
}
.left1 {
  padding-top: 16px;
  left: 0;
  top: 0;
  @apply w-full h-full flex-row z-20 absolute bg-gray-dark;
}
.title {
  height: 24px;
  @apply text-blue text-12;
}
.nav {
  @apply w-full flex-row;
  height: calc(100% - 24px);
}

.left2 {
  width: 272px;
  left: 68px;
  top: 0;
  @apply h-full absolute bg-gray-dark z-10;
}

.bounceInLeft-enter-from,
.bounceInLeft-leave-to {
  transform: translateX(-272px);
  opacity: 0;
  pointer-events: none;
}

.bounceInLeft-enter-active,
.bounceInLeft-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.bounceInLeft-enter-to,
.bounceInLeft-leave-from {
  transform: translateX(0);
  opacity: 1;
  pointer-events: auto;
}
</style>
