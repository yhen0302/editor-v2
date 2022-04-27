<template>
  <section class="upload-el grid place-content-center cursor-pointer w-full h-full"
           :class="{active:dragEntered}"
           draggable
           @dragover.prevent.stop
           @dragenter.prevent.stop="dragEntered=true"
           @dragleave.prevent.stop="dragEntered=false"
           @drop.prevent.stop="drop"
           @click="inp.click()">
    <div class="upload-content" :text="contentText">
      <slot name="upload-content">
        <div class="upload-icon m-auto"></div>
        <p class="upload-text text-12">{{ contentText || '将图片拖拽到此区域' }}</p>
      </slot>
    </div>
    <input type="file" :multiple="multiple" v-show="false" ref="inp" @change="inpChange">
  </section>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  name: "UploadEl",
  props: {
    multiple: {type: Boolean, default: false},
    value: {type: Array, default: () => []},
    typeVerification: {type: Function, default: () => true},
    contentText: String
  },
  emits: ['update:value'],
  setup(props, context) {
    const inp = ref(null)
    const files = ref([])
    const dragEntered = ref(false)

    function inpChange(ev) {
      let files = inp.value.files
      filesProcess()
    }

    function drop(ev) {
      let files = ev.dataTransfer.files
      filesProcess(files)
      dragEntered.value = false
    }

    function filesProcess(files) {
      for (let file of files) {
        if (props.typeVerification(file)) {
          if (!props.multiple) {
            files.value = [file]
            break
          }
          files.value.push(file)
        }
      }
      context.emit('update:value', files.value)
    }

    return {inp, inpChange, drop, dragEntered}
  }
}
</script>

<style scoped>
.upload-el {
  min-width: 240px;
  min-height: 140px;
  background: #323440;
  color: #757A87;
  border-radius: 2px;
}

.upload-el:hover, .upload-el.active {
  opacity: .7;
}


.upload-icon {
  width: 24px;
  height: 24px;
  background: linear-gradient(#757A87, #757A87 100%) center/2px 16px no-repeat,
  linear-gradient(#757A87, #757A87 100%) center/16px 2px no-repeat;
}


</style>