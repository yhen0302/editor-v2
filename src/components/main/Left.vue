<template>
  <div class="left-main">
    <div class="dimension-type-item">
      <p>{{ store.state.dimensionType }}</p>
    </div>

    <div class="nav" v-if="store.state.dimensionType === '2d'">
      <Nav2D />
    </div>

    <div class="nav" v-else-if="store.state.dimensionType === '3d'">
      <Nav3D />
    </div>

    <transition name="bounceInLeft">
      <div class="nav-menu" v-if="store.state.dimensionType === '2d' && store.state.selectBarToolType != ''">
        <NavMenu2D />
      </div>

      <div class="nav-menu" v-else-if="store.state.dimensionType === '3d' && store.state.selectBarToolType != ''">
        <NavMenu3D />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Nav2D from '@/components/2d/left/Nav2D.vue'
import NavMenu2D from '@/components/2d/left/NavMenu2D.vue'
import Nav3D from '@/components/3d/left/Nav3D.vue'
import NavMenu3D from '@/components/3d/left/NavMenu3D.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Left',
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
  @apply w-full h-full flex-row relative;
}
.nav {
  @apply w-full flex-row;
  height: calc(100% - 24px);
}
.dimension-type-item {
  height: 24px;
  padding-top: 12px;
  @apply text-blue text-12;
}
.nav-menu {
  width: 272px;
  left: 68px;
  top: 0;
  @apply h-full absolute bg-gray-dark;
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
