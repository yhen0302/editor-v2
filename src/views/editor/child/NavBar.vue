<template>
  <nav class="editor_nav box-border w-full bg-gray-dark flex justify-between">
    <aside class="nav_left flex items-center h-full">
      <img src="~@/assets/images/editor_back_big_btn_dark.png" class="cursor-pointer"/>
      <p class="text-16 text-gray-light">智慧景区管理模板</p>
    </aside>
    <section class="nav_content box-border h-full flex items-center justify-between">
      <div class="nav_content-left flex items-center">
        <div class="back-front-btn-box flex items-center justify-between">
          <img src="~@/assets/images/editor_nav_revocation_btn_dark.png" class="cursor-pointer"/>
          <img src="~@/assets/images/editor_nav_remake_btn_dark.png" class="cursor-pointer"/>
        </div>
        <div class="select-box">{{scaleRatio}}%</div>
      </div>

      <div class="nav_content-right flex justify-between" v-once>
        <tip-button :icon="require('@/assets/images/editor_preview_btn_dark.png')"></tip-button>
        <tip-button :icon="require('@/assets/images/editor_save_btn_dark.png')" name="1" tip-position="tb">
          <template v-slot:tip>
            <p>保存</p>
            <p>Ctrl+S</p>
          </template>
        </tip-button>
        <tip-button :icon="require('@/assets/images/editor_download_btn_dark.png')"></tip-button>
        <tip-button :icon="require('@/assets/images/editor_import_btn_dark.png')"></tip-button>
      </div>
    </section>
    <aside class="nav_right flex items-center h-full justify-end">
      <img class="save-icon cursor-pointer" src="~@/assets/images/editor_savetime_icn_dark.png"/>
      <span class="text-gray-800 text-14">上次保存时间：<timer formatter="hh:mm"></timer></span>
    </aside>
  </nav>
</template>

<script>
import Timer from "../../../component/common/Timer";
import TipButton from "@/component/content/TipButton";
import {useState} from "@/store/helper";
import {useStore} from "vuex";

export default {
  name: "NavBar",
  components: {TipButton, Timer},
  computed: {
    scaleRatio() {
      return (useState(useStore(),'editor').artBoardScale * 100).toFixed()
    }
  }
}
</script>

<style scoped>
.editor_nav {
  height: 64px;
  gap: 4px;
}

.nav_left,
.nav_right {
  width: 272px;
}

.nav_left {
  padding-left: 16px;
  gap: 16px;
}

.nav_right {
  padding-right: 16px;
}

.nav_content {
  padding: 0 10px;
  flex: 1;
}

.back-front-btn-box {
  width: 92px;
  padding: 0 10px;
  margin-right: 36px;
}

.nav_content-right {
  gap: 4px;
}

.save-icon {
  margin-right: 4px;
}
</style>