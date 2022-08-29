export function deleteTreeParentQuote(tree: any[]) {
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
  return tree
}
