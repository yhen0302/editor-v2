<template>
  <section class="base-upload-configurator">
    <fold-el title="上传图片" :line-show="false">
      <template #default>
        <div class="fold-content">
          <upload-el @update="onUpdate" :accept="accept" :type-verification="typeVerification">
            <template #upload-content>
              <div class="relative w-full h-full flex-1" v-if="src">
                <img :src="src" v-if="viewType === 'ImageMedia'" class="w-full h-full" />
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
import FoldEl from '@/components/2d/common/FoldEl.vue'
import UploadEl from '@/components/2d/common/UploadEl.vue'
import { useStore } from 'vuex'
import { useGetter } from '@/store/helper'
import { computed } from 'vue'
import { fileToBlobUrl } from '@/share/util/base'
import { uploadFile } from '@/api/file'

export default {
  name: 'BaseUploadConfigurator',
  components: { UploadEl, FoldEl },
  setup() {
    const store = useStore()
    const getters2D = useGetter(store, '2d', ['GET_SELECT_NODE'])

    const src = computed({
      get() {
        return getters2D['GET_SELECT_NODE'].value.option.src
      },
      set(newVal) {
        getters2D['GET_SELECT_NODE'].value.option.src = newVal
      }
    })
    function imageMimeTypeVerification(file: File) {
      return file.type === 'image/png' || file.type === 'image/jpeg' || file.type === "image/gif"
    }

    function videoMimeTypeVerification(file: File) {
      return file.type === 'video/x-msvideo' || file.type === 'video/mpeg' || file.type === 'video/mp4'
    }

    function typeVerification(file: File) {
      if (getters2D['GET_SELECT_NODE'].value.type === 'ImageMedia') {
        return imageMimeTypeVerification(file)
      } else {
        return videoMimeTypeVerification(file)
      }
    }
    function onUpdate(files: File[]) {
      if (!files) return
      uploadFileToServer(files)
      const url = fileToBlobUrl(files[0])
      src.value = url
    }
    async function uploadFileToServer(files) {
      const formData = new FormData()
      formData.append('files', files[0])
      const upProcess = (ev) => {
        console.log("已上传：", (ev.loaded / ev.total * 100).toFixed(2) + "%")
      }
      const res = await uploadFile(formData, upProcess)
      // 上传成功
      if (res.code === 200) {
        src.value = res.data[0]
      }
    }

    const tip = computed(() => {
      if (getters2D['GET_SELECT_NODE'].value.type === 'ImageMedia') {
        return '*支持大小不超多5MB的PNG、JPG, GIF格式文件'
      } else {
        return '*最大可以上传10MB的 AVI、MPEG、MP4 视频文件'
      }
    })

    const accept = computed(() => {
      if (getters2D['GET_SELECT_NODE'].value.type === 'ImageMedia') {
        return '.png,.jpg,.gif'
      } else {
        return '.avi,.mpeg,.mp4'
      }
    })
    const viewType = computed(() => {
      return getters2D['GET_SELECT_NODE'].value.type
    })
    return { src, onUpdate, typeVerification, tip, viewType, accept }
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
