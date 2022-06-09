<template>
  <div class="nav-details-template-3d-main">
    <div class="content">
      <ToolBarItem v-for="item in detailsList" :key="item.type" :icon="item.icon" :name="item.name" @click="chooseItem(item)" />
    </div>

    <div class="upload">
      <div class="upload-btn" @click="uploadFiles">
        <p>上传模板</p>
      </div>
      <input type="file" ref="uploadFileInput" multiple style="display: none" @change="loadFiles" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { EventsBus } from '@/core/EventsBus'
import ToolBarItem from '@/components/utils/toolbar/ToolBarItem.vue'

export default defineComponent({
  name: 'NavDetailsTemplate3D',
  components: { ToolBarItem },
  setup() {
    const store = useStore()

    const uploadFileInput: any = ref(null)

    const detailsList: any = ref([{ icon: require('@/assets/images/main/left/editor_element_model_btn_dark.png'), name: '航天航空', type: 'hthk' }])

    const chooseItem = () => {
      //
    }

    onMounted(() => {})
    onUnmounted(() => {})

    const uploadFiles = () => {
      uploadFileInput.value.click()
    }

    const loadFiles = (e: any) => {
      console.log('e', e.target.files)

      const container = store.state.threeDimensionContainer
      const fileList = e.target.files

      container.loadModels({
        fileList,
        onProgress: () => {
          //
        },
        onLoad: () => {
          console.log('finish models', container)

          // reset trees
          // reset editforms
          // reset store cache
          // reset 3d container
          // update store template
        }
      })
    }

    return {
      store,
      detailsList,
      chooseItem,
      uploadFileInput,
      uploadFiles,
      loadFiles
    }
  }
})
</script>

<style lang="postcss" scoped>
.nav-details-template-3d-main {
  @apply w-full h-full relative;
}
.content {
  grid-auto-rows: 136px;
  @apply h-full w-full grid grid-cols-2;
}
.content-item {
  background: #7aa6ff;
  border-radius: 2px;
}
.upload {
  bottom: 0;
  height: 64px;
  border-top: #464858 1px solid;
  @apply w-full absolute flex items-center justify-center;
}
.upload-btn {
  width: 240px;
  height: 32px;
  background: #464858;
  border-radius: 2px;
  @apply flex items-center justify-center cursor-pointer;
}
.upload-btn:hover {
  background: #7aa6ff;
}
.upload-btn p {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #f2f2f2;
}
</style>
