<template>
  <div class="shadow-radio">
    <ul class="shadow-radio-list">
      <li class="list-item">
        <list-item content="Shadow" title="阴影" key="Outline">
          <template v-slot:suffix>
            <radio-el v-model:value="editorStore.shadow"></radio-el>
          </template>
        </list-item>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import RadioEl from "../../../component/common/RadioEl.vue";
import ListItem from "../../../component/content/ListItem.vue";
import {EditorStore} from "../../../store/editor/type";
import {useStore} from "vuex";
export default {
  name: "ShadowRadio",
  components:{RadioEl,ListItem},
  setup() {
    const editorStore: EditorStore = useStore().state.editor
    return {editorStore}
  }
}
</script>

<style scoped>
.shadow-radio-list {
  padding: 16px 0 0;
}

.list-item {
  padding: 8px 16px;
}
</style>