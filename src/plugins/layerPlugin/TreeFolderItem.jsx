import { editElNameEventFn, enterOkEventFn, preventEventFn } from './edit'
import { dragEndEventFn, dragEnterEventFn, dragLeaveEventFn, dragOverEventFn, dragStartEventFn } from './drag'
import store from '@/store'
import { useMutation, useState } from '@/store/helper'

const stateGlobal = useState(store, 'global')
const state2D = useState(store, '2d')
const mutations2D = useMutation(store, '2d', ['SELECT_2D_TREE_NODE', 'CLEAR_SELECT_2D_NODES'])

function getNodeDepLength(node) {
  let length = -1
  const tree = [node]
  while (tree.length > 0) {
    const node = tree.pop()
    length++
    if (node.children) tree.push(...node.children)
  }
  return length
}

export default (node, Children, prefix, suffix) => {
  // const height = node.open ? `max-height:${getNodeDepLength(node) * 32}px;` : 'max-height:0;'
  const height = node.open ? 'height:auto' : 'height:0'
  const arrowIcon = require('@/assets/images/editor_unfold_icn_dark.png')

  function selectNode(ev) {
    if (!node.show) return
    !ev.shiftKey && (!state2D.select2dNodes.has(node) || state2D.select2dNodes.size > 1) && mutations2D['CLEAR_SELECT_2D_NODES']()
    mutations2D['SELECT_2D_TREE_NODE']({ node })
  }
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
        onClick={selectNode}
        onContextmenu={node.select || selectNode}
      >
        <img
          className={node.open ? 'active arrow-icon' : 'arrow-icon'}
          src={arrowIcon}
          style="font-size:10px;"
          onClick={(ev) => {
            node.open = !node.open
            console.log(node.open)
            ev.stopPropagation()
          }}
        />
        <div className="layer-item-prefix">{(prefix && prefix(node)) || <svg-icon class="layer-item-prefix-icon" url={require('@/assets/icon/show.svg')}></svg-icon>}</div>
        <div className="item-name-wrapper">
          <span
            className="item-name"
            ondblclick={(ev) => {
              mutations2D['SELECT_2D_TREE_NODE']({ node })
              editElNameEventFn(ev, node)
            }}
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
