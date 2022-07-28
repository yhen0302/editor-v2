import { clone } from '../../share/util/base'
import { toRaw } from 'vue'
import store from '../../store'
import { deleteTreeParentQuote } from '@/core/2d/util/tree'

export function getAvailablePageTreeNodes() {
  const pageTreeNodes = clone(toRaw(store.state.pageTreeNodes))
  for (const scene of pageTreeNodes) {
    for (const page of scene.children) {
      deleteTreeParentQuote(page.trees.twoDimension)
    }
  }
  return pageTreeNodes
}

