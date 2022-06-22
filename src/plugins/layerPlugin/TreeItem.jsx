import {
  dragDropEventFn,
  dragEndEventFn,
  dragEnterEventFn,
  dragExitEventFn,
  dragLeaveEventFn,
  dragOverEventFn,
  dragStartEventFn
} from './drag'
import { editElNameEventFn, enterOkEventFn, preventEventFn } from './edit'
import store from '@/store'
import { useMutation } from '../../store/helper'

const editorMutation = useMutation(store, 'editor', [
  'SELECT_2D_TREE_NODE',
  'CANCEL_SELECT_2D_NODE',
  'CLEAR_SELECT_2D_NODES'
])
export default (node, prefix, suffix, placeholder) => {
  function selectNode(ev) {
    if (!node.show) return
    if (!ev.shiftKey) editorMutation['CLEAR_SELECT_2D_NODES']()
    node.select
      ? editorMutation['CANCEL_SELECT_2D_NODE']({ node })
      : editorMutation['SELECT_2D_TREE_NODE']({ node })
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
    >
      <div className="layer-item-prefix">
        {(prefix && prefix(node)) || (prefix && prefix(node)) || (
          <svg-icon
            class="layer-item-prefix-icon"
            url={require('@/assets/icon/show.svg')}
          ></svg-icon>
        )}
      </div>
      {(placeholder && placeholder(node)) || (
        <div className="placeholder-box"></div>
      )}
      <div className="item-name-wrapper">
        <span
          className="item-name"
          onClick={preventEventFn}
          ondblclick={(ev) => editElNameEventFn(ev, node)}
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
