import { dragDropEventFn, dragEndEventFn, dragEnterEventFn, dragExitEventFn, dragLeaveEventFn, dragOverEventFn, dragStartEventFn } from './drag'
import { editElNameEventFn, enterOkEventFn, preventEventFn } from './edit'
import store from '@/store'
import { useMutation, useState } from '../../store/helper'

const state2D = useState(store, '2d')
const mutations2D = useMutation(store, '2d', ['SELECT_2D_TREE_NODE', 'CLEAR_SELECT_2D_NODES', 'TOGGLE_NODE'])
export default (node, prefix, suffix, placeholder) => {
  function selectNode(ev) {
    if (!node.show) return
    !ev.shiftKey && (!state2D.select2dNodes.has(node) || state2D.select2dNodes.size > 1) && mutations2D['CLEAR_SELECT_2D_NODES']()
    mutations2D['TOGGLE_NODE']({ node })
  }
  return (
    <li
      className={`layer-item ${node.select ? 'select' : ''}`}
      draggable="true"
      onDragenter={(ev) => dragEnterEventFn(ev, node)}
      onDragoverCapture={(ev) => dragOverEventFn(ev, node)}
      onDragstartCapture={(ev) => dragStartEventFn(ev, node)}
      onDropCapture={(ev) => dragDropEventFn(ev, node)}
      onDragleave={(ev) => dragLeaveEventFn(ev, node)}
      onDragexit={(ev) => dragExitEventFn(ev, node)}
      onDragendCapture={(ev) => dragEndEventFn(ev, node)}
      treenode={true}
      onClick={selectNode}
      onContextmenu={node.select || selectNode}
    >
      <div className="layer-item-prefix">{(prefix && prefix(node)) || (prefix && prefix(node)) || <svg-icon class="layer-item-prefix-icon" url={require('@/assets/icon/show.svg')}></svg-icon>}</div>
      {(placeholder && placeholder(node)) || <div className="placeholder-box"></div>}
      <div className="item-name-wrapper">
        <span
          className="item-name"
          ondblclick={(ev) => {
            mutations2D['SELECT_2D_TREE_NODE']({ node })
            editElNameEventFn(ev, node)
          }}
          onKeyDown={(ev) => {
            // 点击回撤
            if (ev.keyCode === 13) {
              enterOkEventFn(ev, true)
              ev.preventDefault()
            }
          }}
        >
          {node.name}
        </span>
      </div>
      <div className="layer-item-suffix">{suffix && suffix(node)}</div>
    </li>
  )
}
