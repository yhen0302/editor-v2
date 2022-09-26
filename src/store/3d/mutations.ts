import { State3DI } from '.'
import store, { LayerTreeNode3D } from '..'
import { useState } from '../helper'
import { nodeType2IsType } from '../util'
import { spreadChainNodes } from '@/core/3d/util'
import { nextTick } from 'vue'

// mutations
export interface Mutation3DI {
  TEMPLATE_3D_LOADED: 'TEMPLATE_3D_LOADED' // 3D template loaded
  SELECT_LAYER_NODE: 'SELECT_LAYER_NODE' // 3D Tree 选中节点（单选）
  CLEAR_SELECT_LAYER_NODE: 'CLEAR_SELECT_LAYER_NODE' // 3D Tree 清空选中节点
  TOGGLE_EDIT_FORM: 'TOGGLE_EDIT_FORM' // 3D 根据节点展示/隐藏 编辑表单
  CHANGE_NAV_TITLE: 'CHANGE_NAV_TITLE' // 3D 改变左侧导航标题
  CHANGE_NAV_PAGE_INDEX: 'CHANGE_NAV_PAGE_INDEX' // 3D 改变左侧导航页码
  CHANGE_NAV_DETAILS_TYPE: 'CHANGE_NAV_DETAILS_TYPE' // 3D 改变左侧二级导航标题
  CLEAR_EDIT_FORM: 'CLEAR_EDIT_FORM' // 清空右侧表单内容
  SELECT_LAYER_NODE_CONTROLS: 'SELECT_LAYER_NODE_CONTROLS' // 3D Tree 通过控件选中节点（单选）
  UPDATE_SELECT_LAYER_NODE_CONTROLS: 'UPDATE_SELECT_LAYER_NODE_CONTROLS' // 3D Tree 通过控件更新选中节点（单选）
}
export const Mutation3D = {
  TEMPLATE_3D_LOADED: 'TEMPLATE_3D_LOADED',
  SELECT_LAYER_NODE: 'SELECT_LAYER_NODE',
  CLEAR_SELECT_LAYER_NODE: 'CLEAR_SELECT_LAYER_NODE',
  TOGGLE_EDIT_FORM: 'TOGGLE_EDIT_FORM',
  CHANGE_NAV_TITLE: 'CHANGE_NAV_TITLE',
  CHANGE_NAV_PAGE_INDEX: 'CHANGE_NAV_PAGE_INDEX',
  CHANGE_NAV_DETAILS_TYPE: 'CHANGE_NAV_DETAILS_TYPE',
  CLEAR_EDIT_FORM: 'CLEAR_EDIT_FORM',
  SELECT_LAYER_NODE_CONTROLS: 'SELECT_LAYER_NODE_CONTROLS',
  UPDATE_SELECT_LAYER_NODE_CONTROLS: 'UPDATE_SELECT_LAYER_NODE_CONTROLS'
}

export default {
  [Mutation3D.TEMPLATE_3D_LOADED](state: State3DI, payload: { container: any }) {
    // cache container
    state.threeDimensionContainer = payload.container

    const stateGlobal = useState(store, 'global')

    if (stateGlobal.sceneTreeNodes[0].children) stateGlobal.sceneTreeNodes[0].children[0].trees.threeDimension = JSON.parse(JSON.stringify(stateGlobal.template.threeDimension))
  },
  [Mutation3D.SELECT_LAYER_NODE](state: State3DI, payload: { node: LayerTreeNode3D }) {
    store.commit(`3d/${Mutation3D.CLEAR_SELECT_LAYER_NODE}`)
    payload.node.selected = !payload.node.selected
    state.selectedLayerNodes.add(payload.node)
  },
  [Mutation3D.CLEAR_SELECT_LAYER_NODE](state: State3DI) {
    const it = state.selectedLayerNodes.values()
    const first = it.next()
    if (first.value) first.value.selected = false
    state.selectedLayerNodes.clear()
  },
  [Mutation3D.TOGGLE_EDIT_FORM](state: State3DI, payload: { node: LayerTreeNode3D }) {
    state.editedFormType = nodeType2IsType(payload.node.type)
  },
  [Mutation3D.CLEAR_EDIT_FORM](state: State3DI) {
    state.editedFormType = null
  },
  [Mutation3D.CHANGE_NAV_TITLE](state: State3DI, payload: { name: string }) {
    state.leftNavTitle = payload.name
  },
  [Mutation3D.CHANGE_NAV_PAGE_INDEX](state: State3DI, payload: { index: number }) {
    state.leftNavPageIndex = payload.index
  },
  [Mutation3D.CHANGE_NAV_DETAILS_TYPE](state: State3DI, payload: { type: string }) {
    state.leftNavDetailsType = payload.type
  },
  [Mutation3D.SELECT_LAYER_NODE_CONTROLS](state: State3DI, payload: { node: LayerTreeNode3D; flattenNodes: LayerTreeNode3D[] }) {
    store.commit(`3d/${Mutation3D.SELECT_LAYER_NODE}`, payload)
    store.commit(`3d/${Mutation3D.TOGGLE_EDIT_FORM}`, payload)
    // spread chain nodes
    spreadChainNodes(payload.flattenNodes, payload.node)
    nextTick(() => {
      const stateGlobal = useState(store, 'global')
      const treeId = stateGlobal.selectedPageTreeNode ? `场景${parseInt(stateGlobal.selectedPageTreeNode?.parent) + 1}-${stateGlobal.selectedPageTreeNode.name}` : ''
      const nodeTree = document.getElementById(treeId)
      const domNode = nodeTree?.getElementsByClassName(payload.node.uuid as string)[0]
      nodeTree?.scrollBy({
        top: (domNode?.getBoundingClientRect().top as number) - 138 // -138是因为获取的是clientHeight  减去offest
      })
    })
  },
  [Mutation3D.UPDATE_SELECT_LAYER_NODE_CONTROLS](state: State3DI, payload: { node: any }) {
    const it = state.selectedLayerNodes.values()
    const first = it.next()
    if (first.value) {
      const n = payload.node
      const mode = state.threeDimensionContainer.transformControl.getMode()
      if (mode == 'translate') {
        first.value.options.position = [parseFloat(n.position.x).toFixed(4), parseFloat(n.position.y).toFixed(4), parseFloat(n.position.z).toFixed(4)]
      } else if (mode == 'rotate') {
        first.value.options.rotation = [((n.rotation.x * 180) / Math.PI).toFixed(4), ((n.rotation.y * 180) / Math.PI).toFixed(4), ((n.rotation.z * 180) / Math.PI).toFixed(4)]
      } else if (mode == 'scale') {
        first.value.options.scale = [parseFloat(n.scale.x).toFixed(4), parseFloat(n.scale.y).toFixed(4), parseFloat(n.scale.z).toFixed(4)]
      }
    }
  }
}
