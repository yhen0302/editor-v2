<template>
  <section class="base-upload-configurator">
    <fold-el title="上传图片" :line-show="false">
      <template #default>
        <div class="fold-content">
          <upload-el @update="onUpdate" :type-verification="typeVerification">
            <template #upload-content>
              <div class="relative w-full h-full flex-1" v-if="src">
                <img :src="src" v-if="viewType === 'ImageMedia'" class="w-full h-full"/>
                <video class="upload-placeholder absolute" v-else :src="src" />
              </div>
            </template>
          </upload-el>
        </div>
        <p class="tip text-12">{{ tip }}</p>
      </template>
    </fold-el>
  </section>
</template>

<script lang="ts">
import FoldEl from '../../../component/common/FoldEl'
import UploadEl from '../../../component/common/UploadEl'
import { useStore } from 'vuex'
import { useGetter, useState } from '@/store/helper'
import { computed } from 'vue'
import { fileToBlobUrl } from '@/util/base'

export default {
  name: 'BaseUploadConfigurator',
  components: { UploadEl, FoldEl },
  setup() {
    const store = useStore()
    const editorStore = useState(store, 'editor')
    const editorGetter = useGetter(store, 'editor', ['GET_SELECT_NODE'])

    const src = computed({
      get() {
        return editorGetter['GET_SELECT_NODE'].value.option.src
      },
      set(newVal) {
        editorGetter['GET_SELECT_NODE'].value.option.src = newVal
      }
    })
    function imageMimeTypeVerification(file: File) {
      return file.type === 'image/png' || file.type === 'image/jpeg'
    }

    function videoMimeTypeVerification(file: File) {
      return (
        file.type === 'video/x-msvideo' ||
        file.type === 'video/mpeg' ||
        file.type === 'video/mp4'
      )
    }

    function typeVerification(file: File) {
      if (editorGetter['GET_SELECT_NODE'].value.type === 'ImageMedia') {
        return imageMimeTypeVerification(file)
      } else {
        return videoMimeTypeVerification(file)
      }
    }
    function onUpdate(files: File[]) {
      if (!files) return
      const url = fileToBlobUrl(files[0])
      src.value = url
    }

    const tip = computed(() => {
      if (editorGetter['GET_SELECT_NODE'].value.type === 'ImageMedia') {
        return '*支持大小不超多5MB的PNG、JPG格式文件'
      } else {
        return '*最大可以上传10MB的 AVI、MPEG、MP4 视频文件'
      }
    })

    const viewType = computed(() => {
      return editorGetter['GET_SELECT_NODE'].value.type
    })
    return { src, onUpdate, typeVerification, tip, viewType }
  }
}
</script>

<style scoped>
.fold-content {
  padding: 0 16px;
}

.tip {
  margin-top: 4px;
  padding: 0 16px;
  color: #757a87;
  text-align: left;
}
.upload-placeholder {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
</style>
