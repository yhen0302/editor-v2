<template>
  <section
    class="upload-el flex justify-center items-center cursor-pointer w-full h-full"
    :class="{ active: dragEntered }"
    draggable
    @dragover.prevent.stop
    @dragenter.prevent.stop="dragEntered = true"
    @dragleave.prevent.stop="dragEntered = false"
    @drop.prevent.stop="drop"
    @click="inp.click()"
  >
    <slot name="upload-content">
      <div class="upload-content" :text="contentText">
        <div class="upload-icon m-auto"></div>
        <p class="upload-text text-12">
          {{ contentText || '将图片拖拽到此区域' }}
        </p>
      </div>
    </slot>

    <input
      type="file"
      :multiple="multiple"
      v-show="false"
      ref="inp"
      @input="inpChange"
    />
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'UploadEl',
  props: {
    multiple: { type: Boolean, default: false },
    placeHolderUrl: String,
    typeVerification: { type: Function, default: () => true },
    contentText: String
  },
  emits: ['update'],
  setup(props, context) {
    const inp = ref(null)
    const files = ref([])
    const dragEntered = ref(false)

    function inpChange(ev) {
      let files = inp.value.files
      filesProcess(files)
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
      inp.value.value = ''
      context.emit('update', files.value)
    }

    return { inp, inpChange, drop, dragEntered }
  }
}
</script>

<style scoped>
.upload-el {
  width: 240px;
  height: 140px;
  background: #323440;
  color: #757a87;
  border-radius: 2px;
}

.upload-el:hover,
.upload-el.active {
  opacity: 0.7;
}

.upload-icon {
  width: 24px;
  height: 24px;
  background: linear-gradient(#757a87, #757a87 100%) center/2px 16px no-repeat,
    linear-gradient(#757a87, #757a87 100%) center/16px 2px no-repeat;
}
</style>
