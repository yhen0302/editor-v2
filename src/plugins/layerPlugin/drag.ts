/* eslint-disable */
import {ref, watch} from "vue";
import {Ref} from "@vue/reactivity";

interface TreeNode {
  name: string,
  children?: TreeRoot,
  depth: number,
  parent: TreeNode | TreeRoot
}

type TreeRoot = Array<TreeNode>

enum DRAG_AREA {
  NULL,
  INSET,
  TOP,
  BOTTOM
}


let dragOriginEl: Ref<HTMLElement | null> = ref<HTMLElement | null>(null),// 拖拽的元素
  dragOriginNode: Ref<TreeNode | null> = ref<TreeNode | null>(null), // 拖拽元素对应的节点
  dragTargetEl: Ref<HTMLElement | null> = ref<HTMLElement | null>(null), // 目标元素
  dragTargetNode: Ref<TreeNode | null> = ref<TreeNode | null>(null), // 目标元素节点
  dragOverArea: Ref<DRAG_AREA> = ref<DRAG_AREA>(DRAG_AREA.NULL),
  // ##记录enter和leave, 因为当进入子元素时会触发父元素的leave事件, 则午饭判断当前drag元素是否在target中
  counter: number = 0, // 用于层级计数
  isOriginDir: boolean = false, // 拖拽的对象是否是个文件夹
  isTargetDir: boolean = false// 拖拽的目标元素是否是个文件夹


function toInitial() {
  dragOriginEl.value = null
  dragOriginNode.value = null
  dragTargetEl.value = null
  dragTargetNode.value = null
  dragOverArea.value = DRAG_AREA.NULL
  counter = 0
  isOriginDir = false
  isTargetDir = false

}

function treePathFind(target: TreeNode, node: TreeNode | null) {
  do {
    if (target === node) return true
  } while ((target = (target.parent as TreeNode)))

  return false
}

function isEffectiveEvent(el: HTMLElement) {
  return dragOriginEl.value &&
    el.getAttribute('treenode')
}

function findParentPathHasEl(target: HTMLElement | null, el: HTMLElement | null): boolean {
  do {
    if (target === el) return true
  } while (target = target?.parentElement || null);

  return false
}

// 拖拽
export const dragEnterEventFn = (ev: Event, node: TreeNode) => {
  const target = ev.target as HTMLElement
  // 选中的源是一个文件夹对象时判断当前节点是否是 源节点的子节点
  if (isOriginDir && treePathFind(node, dragOriginNode.value)) return
  if (!findParentPathHasEl(target, dragOriginEl.value)) {
    isTargetDir = !!node.children
    counter++
    if (isEffectiveEvent(target)) {
      dragTargetEl.value = target
      dragTargetNode.value = node as TreeNode
    }
  }
}

export const dragExitEventFn = (ev: Event, node: object) => {
}

export const dragLeaveEventFn = (ev: Event, node: TreeNode) => {
  if (isOriginDir && treePathFind(node, dragOriginNode.value)) return
  const target = ev.target as HTMLElement
  if (!findParentPathHasEl(target, dragOriginEl.value)) {
    counter--
    if (!counter) {
      dragTargetEl.value = null
      dragTargetNode.value = null
      isTargetDir = false
    }
  }
}

export const dragStartEventFn = (ev: Event, node: TreeNode) => {
  // 如果拖拽的对象是个文件夹对象
  if (node.children) {
    isOriginDir = true
  }
  dragOriginEl.value = ev.target as HTMLElement
  dragOriginNode.value = node as TreeNode
}

export const dragDropEventFn = (ev: Event, node: object) => {
}

export const dragOverEventFn = (ev: MouseEvent, node: TreeNode) => {

  if ((isOriginDir && treePathFind(node, dragOriginNode.value)) ||
    findParentPathHasEl(ev.target as HTMLElement, dragOriginEl.value)) return

  const targetBoundingClient = dragTargetEl.value?.getBoundingClientRect()
  const diff = ev.pageY - Number(targetBoundingClient?.y)
  if (isTargetDir) {
    if (diff < Number(targetBoundingClient?.height) / 3)
      dragOverArea.value = DRAG_AREA.TOP
    else if (diff < Number(targetBoundingClient?.height) / 3 * 2)
      dragOverArea.value = DRAG_AREA.INSET
    else if (diff < Number(targetBoundingClient?.height))
      dragOverArea.value = DRAG_AREA.BOTTOM
  } else {
    if (diff < Number(targetBoundingClient?.height) / 2)
      dragOverArea.value = DRAG_AREA.TOP
    else
      dragOverArea.value = DRAG_AREA.BOTTOM
  }
  ev.preventDefault()
}

export const dragEndEventFn = (ev: Event, node: object) => {
  if (dragOriginNode.value && dragTargetNode.value) {
    moveTreeNode(dragOriginNode.value, dragTargetNode.value, dragOverArea.value)
    toInitial()
  }
}

function removeTreeNode(node: TreeNode) {
  let originList: TreeRoot = (node?.parent as TreeNode)?.children || (node?.parent as TreeRoot)
  // 从原来的节点中移除
  originList.some((item, index) => {
    if (item === node) {
      originList.splice(index, 1)
      return true
    }
  })
}

function moveTreeNode(originNode: TreeNode, targetNode: TreeNode, symbol: DRAG_AREA) {
  let temp = originNode
  let targetList: TreeRoot = (targetNode?.parent as TreeNode)?.children || (targetNode?.parent as TreeRoot)

  removeTreeNode(originNode)

  let offset: number = 0
  switch (symbol) {
    case DRAG_AREA.TOP:
      offset = 0
      break
    case DRAG_AREA.BOTTOM:
      offset = 1
      break
  }

  if (symbol === DRAG_AREA.INSET) {
    targetNode.children?.splice(0, 0, temp)
    return
  }
  // 追加到目标节点
  targetList.some((item, index) => {

    if (item === dragTargetNode.value) {
      targetList.splice(index + offset, 0, temp)
      return true
    }
  })
}

watch(() => dragOverArea.value, (newValue, oldValue) => {
  if (dragTargetEl.value) {
    switch (oldValue) {
      case DRAG_AREA.INSET:
        dragTargetEl.value.style.border = ""
        break;
      case DRAG_AREA.TOP:
        dragTargetEl.value.style.borderTop = ""
        break;
      case DRAG_AREA.BOTTOM:
        dragTargetEl.value.style.borderBottom = ""
        break;
    }
    switch (newValue) {
      case DRAG_AREA.INSET:
        dragTargetEl.value.style.border = "1px solid white"
        break;
      case DRAG_AREA.TOP:
        dragTargetEl.value.style.borderTop = "3px double white"
        break;
      case DRAG_AREA.BOTTOM:
        dragTargetEl.value.style.borderBottom = "3px double white"
        break;
    }
  }
})


watch(() => dragTargetEl.value, (newEl, oldEl) => {
  if (oldEl) {
    oldEl.style.border = ""
    oldEl.style.borderTop = ""
    oldEl.style.borderBottom = ""
  }
})