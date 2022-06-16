<template>
  <section class="dialog ">
    <div class="dialog-content absolute">
      <slot></slot>
    </div>
  </section>
</template>

<script>
let modalEl
function createModal() {
  const modalEl = document.createElement('div')
  modalEl.className = 'modal'

  return modalEl
}
export default {
  name: 'Dialog',
  props: {modal: Boolean,visible: Boolean,center:Boolean},
  setup(props, context) {
    if (props.modal) {
      if (!modalEl) {
        modalEl = createModal()
      }
      document.body.append(modalEl)
    }
  }
}
</script>

<style scoped>
.dialog{
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2018;
}
.dialog-content{
  top: 50%;
  margin-left: 50%;
  transform: translate(-50%,-50%);
}

</style>
