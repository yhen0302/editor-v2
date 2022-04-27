<template>
  <section class="base-upload-configurator">
    <fold-el title="上传图片" :line-show="false">
      <template #default>
        <div class="fold-content">
          <upload-el></upload-el>
        </div>
        <p class="tip text-12">*支持大小不超多5MB的PNG、JPG格式文件</p>
      </template>
    </fold-el>
  </section>
</template>

<script>
import FoldEl from "../../../component/common/FoldEl";
import UploadEl from "../../../component/common/UploadEl";

export default {
  name: "BaseUploadConfigurator",
  components: {UploadEl, FoldEl}
}
</script>

<style scoped>
.fold-content {
  padding: 0 16px;
}

.tip {
  margin-top: 4px;
  color: #757A87;
}
</style>