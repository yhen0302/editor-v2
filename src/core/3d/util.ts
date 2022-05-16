export function parseModelNode(node: any, result: any) {
  result.id = node.uuid
  result.name = node.name
  result.show = node.visible
  if (node.children.length > 0) {
    result.children = []
    node.children.forEach((n: any) => {
      const child: any = {
        id: n.uuid,
        name: n.name,
        show: n.visible
      }
      result.children.push(child)
      parseModelNode(n, child)
    })
  }
}
