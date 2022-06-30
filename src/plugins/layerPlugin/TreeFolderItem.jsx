import { editElNameEventFn, enterOkEventFn, preventEventFn } from './edit'
import {
  dragEndEventFn,
  dragEnterEventFn,
  dragLeaveEventFn,
  dragOverEventFn,
  dragStartEventFn
} from './drag'

function getNodeDepLength(node) {
  let length = -1
  let tree = [node]
  while (tree.length > 0) {
    let node = tree.pop()
    length++
    if (node.children) tree.push(...node.children)
  }
  return length
}

export default (node, Children, prefix, suffix) => {
  // const height = node.open ? `max-height:${getNodeDepLength(node) * 32}px;` : 'max-height:0;'
  const height = node.open ? 'height:auto' : 'height:0'

  const arrowIcon = require('@/assets/images/editor_unfold_icn_dark.png')

  return (
    <li className="layer-item_list" style={`--level:${node.depth + 1};`}>
      <div
        className={`layer-folder-item  ${node.select ? 'select' : ''}`}
        draggable="true"
        treenode={true}
        onDragstartCapture={(ev) => dragStartEventFn(ev, node)}
        onDragoverCapture={(ev) => dragOverEventFn(ev, node)}
        onDragenterCapture={(ev) => dragEnterEventFn(ev, node)}
        onDragendCapture={(ev) => dragEndEventFn(ev, node)}
        onDragleaveCapture={(ev) => dragLeaveEventFn(ev, node)}
        onClick={() => (node.open = !node.open)}
      >
        <img
          className={node.open ? 'active arrow-icon' : 'arrow-icon'}
          src={arrowIcon}
          style="font-size:10px;"
        />
        <div className="layer-item-prefix">
          {(prefix && prefix(node)) || (
            <svg-icon
              class="layer-item-prefix-icon"
              url={require('@/assets/icon/show.svg')}
            ></svg-icon>
          )}
        </div>
        <div className="item-name-wrapper">
          <span
            className="item-name"
            onClick={preventEventFn}
            ondblclick={(ev) => editElNameEventFn(ev, node)}
            onKeyDown={(ev) => {
              // 按回撤
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
      </div>
      <ul className="layer-child-list" style={height}>
        {...Children}
      </ul>
    </li>
  )
}
