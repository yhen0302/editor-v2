import { clone } from '../../share/util/base'
import { toRaw } from 'vue'
import store from '../../store'

export function getAvailablePageTreeNodes() {
  const pageTreeNodes = clone(toRaw(store.state.pageTreeNodes))
  for (const scene of pageTreeNodes) {
    for (const page of scene.children) {
      deleteTreeParentQuote(page.trees.twoDimension)
    }
  }
  return pageTreeNodes
}

export function deleteTreeParentQuote(tree: any) {
  let nodes = [...tree],
    node: any = null

  // eslint-disable-next-line no-cond-assign
  while ((node = nodes.pop())) {
    node.parent = null
    node.select = false
    if (node?.children?.length > 0) {
      nodes.unshift(...node?.children)
    }
  }
}