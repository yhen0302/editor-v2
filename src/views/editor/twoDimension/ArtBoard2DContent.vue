<script lang="tsx">
import {useStore} from "vuex";
import {useState} from "@/store/helper";
import {EditorStore} from "@/store/editor/type";

export default {
  name: "ArtBoard2DContent",
  setup() {
    const sotre = useStore()
    const editorStore = useState(sotre, 'editor') as EditorStore

    // 解析二维树的内容，然后渲染
    return () => <div class="art-board-content w-full h-full absolute">

    </div>

  }
}
</script>

<style scoped>
.art-board-content {
  width: 100%;
  height: 100%;
}
</style>