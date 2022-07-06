<template>
  <section class="dialog" v-show="show" @click="show = false">
    <div class="dialog-content absolute" @click.stop>
      <slot></slot>
    </div>
  </section>
</template>

<script>
import { computed, watch } from 'vue'

let modalEl
function createModal() {
  const modalEl = document.createElement('div')
  modalEl.className = 'modal'

  return modalEl
}
export default {
  name: 'Dialog',
  props: { modal: Boolean, visible: Boolean, center: Boolean },
  emits: ['update:visible'],
  setup(props, context) {
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
      () => {
        if (show.value) {
          if (props.modal) {
            if (!modalEl) {
              modalEl = createModal()
            }
            document.body.append(modalEl)
          }
        } else {
          modalEl.remove()
        }
      }
    )
    return { show }
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
.dialog-content {
  top: 50%;
  margin-left: 50%;
  transform: translate(-50%, -50%);
}
</style>
