<template>
  <div class="home" @contextmenu.prevent>
    <section class="header">
      <Header />
    </section>

    <!-- 2d/3d切换 -->
<!--    <section class="dimension-toggle-box relative z-30 flex items-center text-12 text-gray-light cursor-pointer">
      <div class="dimension-toggle" :class="{ active: store.state.dimensionType === '3d' }" @click="dimensionTypeChange('3d')">3d</div>
      <div class="dimension-toggle" :class="{ active: store.state.dimensionType === '2d' }" @click="dimensionTypeChange('2d')">2d</div>
    </section>-->

    <section class="main">
      <Main />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '@/components/Header.vue'
import Main from '@/components/Main.vue'
import { useStore } from 'vuex'
import { EventsBus } from '@/core/EventsBus'

export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Main
  },
  setup() {
    const store = useStore()

    const dimensionTypeChange = (type: string) => {
      if (store.state.dimensionType == type) return
      store.state.selectBarToolType = ''
      store.state.dimensionType = type
      // 重置右下角表单
      EventsBus.emit('formsReset', {})
    }

    return {
      dimensionTypeChange,
      store
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

/* 2d 3d切换器 */
.dimension-toggle-box {
  position: absolute;
  left: 50%;
  top: 100px;
  height: 24px;
  width: 240px;
  overflow: hidden;
  transform: translateX(-50%);
}

.dimension-toggle {
  width: 120px;
  height: 24px;
  line-height: 24px;
  background: #282a33;
  transition: background-color 0.2s ease-in;
}

.dimension-toggle:nth-child(1) {
  border-radius: 4px 0 0 4px;
}

.dimension-toggle:nth-child(2) {
  border-radius: 0 4px 4px 0;
}

.dimension-toggle.active {
  background: #6582fe;
}
</style>
