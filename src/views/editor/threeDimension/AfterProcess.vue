<template>
  <div class="after-process">
    <ul class="after-process-list">
      <li class="list-item">
        <list-item content="Outline" title="轮廓" key="Outline">
          <template v-slot:suffix>
            <switch-el v-model:value="editorStore.switchItemAfterProcessType.outline"></switch-el>
          </template>
        </list-item>
      </li>
      <li class="list-item">
        <list-item content="Bloom" title="泛光" key="Bloom">
          <template v-slot:suffix>
            <switch-el v-model:value="editorStore.switchItemAfterProcessType.bloom"></switch-el>
          </template>
        </list-item>
      </li>
    </ul>
    <line-el style="margin-top: 16px;" v-once color="rgb(44, 62, 80)"></line-el>
    <ul class="after-process-list">
      <li class="list-item">
        <list-item content="DOF" title="景深" key="DOF">
          <template v-slot:suffix>
            <switch-el v-model:value="editorStore.switchItemAfterProcessType.dof"></switch-el>
          </template>
        </list-item>
      </li>
      <li class="list-item">
        <list-item content="Gamma Correction" title="颜色校正" key="Gamma Correction">
          <template v-slot:suffix>
            <switch-el v-model:value="editorStore.switchItemAfterProcessType.gammaCorrection"></switch-el>
          </template>
        </list-item>
      </li>
      <li class="list-item">
        <list-item content="SSAA" title="抗锯齿" key="SSAA">
          <template v-slot:suffix>
            <switch-el v-model:value="editorStore.switchItemAfterProcessType.ssaa"></switch-el>
          </template>
        </list-item>
      </li>
      <li class="list-item">
        <list-item content="SSR" title="屏幕空间反射" key="SSR">
          <template v-slot:suffix>
            <switch-el v-model:value="editorStore.switchItemAfterProcessType.ssr"></switch-el>
          </template>
        </list-item>
      </li>
      <li class="list-item">
        <list-item content="SSAO" title="屏幕空间环境光屏蔽" key="SSAO">
          <template v-slot:suffix>
            <switch-el v-model:value="editorStore.switchItemAfterProcessType.ssao"></switch-el>
          </template>
        </list-item>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import ListItem from "../../../component/content/ListItem.vue";
import SwitchEl from "../../../component/common/SwitchEl.vue";
import {useStore} from "vuex";
import {EditorStore} from "../../../store/editor/type";
import LineEl from "../../../component/common/LineEl.vue";

export default {
  name: "AfterProcess",
  components: {LineEl, SwitchEl, ListItem},
  setup() {
    const editorStore: EditorStore = useStore().state.editor
    return {editorStore}
  }
}
</script>

<style scoped>
.after-process-list {
  padding: 16px 0 0;
}

.list-item {
  padding: 8px 16px;
}
</style>