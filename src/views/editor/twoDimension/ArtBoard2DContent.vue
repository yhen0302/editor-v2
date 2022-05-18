

<script lang="tsx">
import { useStore } from 'vuex'
import { useMutation, useState } from '@/store/helper'
import { EditorStore, LayerTree2dNode } from '@/store/editor/type'
import { elementComponentsMap } from '@/views/editor/twoDimension/elements'
import { h, resolveDirective, withDirectives } from 'vue'
import { Directive } from '@vue/runtime-core'

export default {
  name: 'ArtBoard2DContent',
  setup() {
    const store = useStore()
    const editorStore = useState(store, 'editor') as EditorStore
    const editorMutations = useMutation(store, 'editor', [
      'SELECT_2D_TREE_NODE'
    ])
    // 解析二维树的内容，然后渲染
    function parseLayerTreeToView(layerTree: LayerTree2dNode[]) {

      const stack = [...layerTree]
      const parentList = []
      const vnodes = []
      while (stack.length > 0) {
        const node = stack.pop()
        console.log(node)
        if (node!.children) {
          parentList.push(node)
        } else {
          const dragDirective = resolveDirective('drag') as Directive
          const directiveOption = {
            select: node?.select,
            active({ el }: any) {
              if (!node!.select) {
                node!.select = true
                editorMutations['SELECT_2D_TREE_NODE']({ node })
              }
            },
            rect: node?.option.matrixOption
          }

            const vnode = h(elementComponentsMap[node!.type], { ...node?.option,key:node!.id})
          vnodes.push(vnode)
        }
      }
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
