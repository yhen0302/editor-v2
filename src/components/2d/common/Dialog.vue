<template>
  <section class='dialog' v-show='show' @click='show = false'>
    <div class='dialog-content absolute' @click.stop>
      <slot v-if='rendered'></slot>
    </div>
  </section>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'

let modalEl

function createModal() {
  const modalEl = document.createElement('div')
  modalEl.className = 'modal'

  return modalEl
}

export default {
  name: 'Dialog',
  props: { modal: Boolean, visible: Boolean, center: Boolean, destroyOnClose: Boolean },
  emits: ['update:visible'],
  setup(props, context) {
    const rendered = ref(false)
    const show = computed({
      get() {
        return props.visible
      },
      set(val) {

        context.emit('update:visible', val)
      }
    })
    watch(
      () => show.value,
      (val) => {
        if (!val && props.destroyOnClose && rendered.value) {
          rendered.value = false
        } else {
          rendered.value = true
        }
        if (props.modal) {
          if (show.value) {
            if (!modalEl) modalEl = createModal()
            document.body.append(modalEl)
          } else modalEl.remove()
        }
      }
    )
    onMounted(() => {
      rendered.value = true
    })

    return { show, rendered }
  }
}
</script>

<style scoped>
.dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2018;
}

:global(.modal) {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2017;
  background: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  top: 50%;
  margin-left: 50%;
  transform: translate(-50%, -50%);
}
</style>
