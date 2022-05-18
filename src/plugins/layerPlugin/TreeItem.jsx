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

export default (node, prefix, suffix, placeholder) => (
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
    onClick={() => {
      node.select = !node.select
    }}
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
