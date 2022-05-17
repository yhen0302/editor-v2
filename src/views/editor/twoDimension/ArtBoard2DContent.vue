<script lang="tsx">
import { useStore } from 'vuex'
import { useState } from '@/store/helper'
import { EditorStore, LayerTree2dNode } from '@/store/editor/type'
import { elementComponentsMap } from '@/views/editor/twoDimension/elements'
import {h, resolveDirective, withDirectives} from 'vue'
import {Directive} from "@vue/runtime-core";

export default {
  name: 'ArtBoard2DContent',
  setup() {
    const sotre = useStore()
    const editorStore = useState(sotre, 'editor') as EditorStore
    console.log(editorStore.layerTree2d)
    // 解析二维树的内容，然后渲染
    function parseLayerTreeToView(layerTree: LayerTree2dNode[]) {
      const dragDirective = resolveDirective('drag') as Directive
      const stack = [...layerTree]
      const parentList = []
      const vnodes = []
      while (stack.length > 0) {
        const node = stack.pop()
        if (node!.children) {
          parentList.push(node)
        } else {
          const vnode = withDirectives(h(elementComponentsMap[node!.type], { ...node?.option }),[[dragDirective,{select:node?.select}]])

          vnodes.push(vnode)
        }
      }
      console.log('parser')
      return vnodes
    }
    return () => (
      <div class="art-board-content w-full h-full absolute z-10 pointer-events-none">
        <drag-wrapper></drag-wrapper>
        {...parseLayerTreeToView(editorStore.layerTree2d)}
      </div>
    )
  }
}
</script>

<style scoped>
.art-board-content {
  width: 100%;
  height: 100%;
}
</style>
