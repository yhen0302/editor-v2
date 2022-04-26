// 节点的文字编辑
let forceEl: null | HTMLElement = null
let forceNode: any = null
export const editElNameEventFn = (ev: Event, node: any) => {
  const el = ev.target as HTMLElement;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  el.contentEditable = true
  forceEl = el
  forceNode = node
  el.focus()
}

// 当点击其他元素 / 按下enter键时取消焦点保存数据
export const enterOkEventFn = (ev: Event, enter?: boolean): void => {
  const target = ev.target
  if (forceEl && (target !== forceEl || enter)) {
    forceNode.name = forceEl.textContent
    forceEl.blur()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    forceEl.contentEditable = false
    forceEl = null
    forceNode = null
    ev.stopPropagation()
  }
}

export const preventEventFn = (ev: Event) => {
  ev.stopPropagation();
  ev.preventDefault()
}
window.document.addEventListener('mousedown', enterOkEventFn)