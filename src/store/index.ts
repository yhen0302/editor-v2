import { createStore } from 'vuex'
import { store2D as module2d } from '@/store/2d'
import { store3D as module3d } from '@/store/3d'
import { toRaw } from 'vue'
import { selectSceneNodeByUUID } from './util'
import { useState } from './helper'
import { Mutation3D } from './3d/mutations'
import { reloadThreeDimensionScene, traverseResetSpreadOfNodes } from '@/core/3d/util'

type DrawingBoardOpts = {
  width: number
  height: number
  scale: number
}

type TemplateOpts = {
  threeDimension: Array<LayerTreeNode3D>
  twoDimension: Array<LayerTreeNode2D>
}

type ContextmenuOpts = {
  show: boolean
  x: number
  y: number
}

export type dimensionType = '2d' | '3d' | null
export type dimensionSelectBarType2d = 'text' | 'shape' | 'media' | 'chart' | 'table'
export type dimensionSelectBarType3d = 'element' | 'scenes' | 'afterProcess'
export type selectBarType = dimensionSelectBarType2d | dimensionSelectBarType3d | null

export type selectItemTextType = 'title' | 'bigTitle' | 'smallTitle' | 'content'
export type selectItemShapeType = 'base' | 'button' | 'icon'
export type selectItemMediaType = 'video' | 'image'
export type selectItemChartType = 'bar' | 'line' | 'pie' | 'gauge' | 'curve'
export type selectItemType2d = selectItemTextType | selectItemShapeType | selectItemMediaType | selectItemChartType

export interface SceneTreeNode {
  name: string
  type: string
  selected: boolean
  spread: boolean
  uuid: string
  children: PageTreeNode[]
}

export interface PageTreeNode {
  name: string
  type: string
  selected: boolean
  parent: string
  uuid: string
  trees: LayerTree
}

export interface LayerTree {
  threeDimension: LayerTreeNode3D[]
  twoDimension: LayerTreeNode2D[]
}

export interface LayerTreeNode3D {
  uuid: string | number
  name: string
  visible?: boolean
  parent?: string | number
  selected: boolean
  index: number
  spread: boolean
  type: string
  show: boolean
  // event: { [k: string]: any }
  options: { [k: string]: any }
  matOptions?: { [k: string]: any }
  children: LayerTreeNode3D[]
}

export interface LayerTreeNode2D {
  name: string
  id: number
  type: dimensionSelectBarType2d | 'group'
  subType?: selectItemType2d
  option: any
  contentEditable?: boolean
  parent?: any
  select: boolean
  lock: boolean
  show: boolean
  children?: LayerTreeNode2D[]
}

export interface SelectBarItem {
  icon: string
  name: string
  type: selectBarType
}

export type selectItemElementType = 'model' | '3dicon' | 'text' | 'mark' | 'flyline' | 'streamer'
export type selectItemScreenType = 'light' | 'shadow' | 'camera' | 'background' | 'HDR' | 'fog'
export type switchItemAfterProcessType = 'outline' | 'bloom' | 'dof' | 'gammaCorrection' | 'ssaa' | 'ssr' | 'ssao'

export type selectItemType3d = selectItemElementType | selectItemScreenType

export interface StateGlobalI {
  dimensionType: dimensionType
  selectBarToolType: selectBarType
  selectedSceneTreeNode: SceneTreeNode | null
  selectedPageTreeNode: PageTreeNode | null
  sceneTreeNodes: SceneTreeNode[]
  drawingBoard: DrawingBoardOpts
  template: TemplateOpts
  contextmenu: ContextmenuOpts
  clipboard: Array<any>
}

export interface MutationGlobalI {
  CHANGE_DIMENSION: 'CHANGE_DIMENSION' // 切换2D/3D
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE' // 切换工具类型
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE' // 改变 drawingBoard 大小
  SCENE_TREE_LOADED: 'SCENE_TREE_LOADED' // 场景树加载完成
  ADD_SCENE_NODE: 'ADD_SCENE_NODE' // 添加 SCENE NODE
  ADD_PAGE_NODE: 'ADD_PAGE_NODE' // 添加 PAGE NODE
  SELECT_PAGE_NODE: 'SELECT_PAGE_NODE' // 选择 PAGE NODE
}
const MutationGlobal: MutationGlobalI = {
  CHANGE_DIMENSION: 'CHANGE_DIMENSION',
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE',
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE',
  SCENE_TREE_LOADED: 'SCENE_TREE_LOADED',
  ADD_SCENE_NODE: 'ADD_SCENE_NODE',
  ADD_PAGE_NODE: 'ADD_PAGE_NODE',
  SELECT_PAGE_NODE: 'SELECT_PAGE_NODE'
}

export interface ActionsGlobalI {
  TEST_ACTIONS: 'TEST_ACTIONS'
}

export interface GettersGlobalI {
  GET_CONFIGURATOR: 'GET_CONFIGURATOR'
  GET_SELECT_STATUS: 'GET_SELECT_STATUS'
  GET_SELECT_NODE: 'GET_SELECT_NODE'
}

const _clipboard: any[] = []
export default createStore({
  state: {
    dimensionType: '2d', // 2D/3D
    selectBarToolType: null, // 左边工具栏选择类型
    selectedSceneTreeNode: null, // 选中的scene tree node
    selectedPageTreeNode: null, // 选中的page tree node
    sceneTreeNodes: [
      // 场景树
      {
        name: '场景1',
        type: 'scene',
        selected: true,
        spread: true,
        uuid: '0',
        children: [
          {
            name: '页1',
            type: 'page',
            selected: true,
            parent: '0',
            uuid: '0-0',
            trees: {
              threeDimension: [],
              twoDimension: []
            }
          }
        ]
      }
    ],
    drawingBoard: {
      // 中间画布宽高
      width: 1920,
      height: 1080,
      scale: 0.7
    },
    template: {
      // 模板缓存
      threeDimension: [],
      twoDimension: []
    },
    contextmenu: {
      show: false,
      x: 0,
      y: 0
    }, // 判断菜单的显示隐藏
    // ******** 剪贴板 start ********
    get clipboard() {
      return _clipboard
    },
    set clipboard(val: any) {
      _clipboard.unshift(val)
      if (_clipboard.length > 20) {
        _clipboard.pop()
      }
    }
    // ******** 剪贴板 end ********
  },
  mutations: {
    [MutationGlobal.SCENE_TREE_LOADED](state: StateGlobalI) {
      state.selectedSceneTreeNode = state.sceneTreeNodes[0]
      if (state.sceneTreeNodes[0].children) state.selectedPageTreeNode = state.sceneTreeNodes[0].children[0]
    },
    [MutationGlobal.CHANGE_DIMENSION](state: StateGlobalI, payload: { dimensionType: dimensionType }) {
      if (payload.dimensionType != '3d') {
        traverseResetSpreadOfNodes(state.selectedPageTreeNode?.trees.threeDimension)
        module3d.state.threeDimensionContainer.transformControl.detach()
        module3d.state.threeDimensionContainer.outlineObjects = []
        this.commit(`3d/${Mutation3D.CLEAR_EDIT_FORM}` as any)
        this.commit(`3d/${Mutation3D.CLEAR_SELECT_LAYER_NODE}` as any)
      }
      state.dimensionType = payload.dimensionType
    },
    [MutationGlobal.CHANGE_SELECT_BAR_TOOL_TYPE](state: StateGlobalI, payload: { selectBarToolType: selectBarType }) {
      if (state.selectBarToolType === payload.selectBarToolType) {
        state.selectBarToolType = null
        return
      }
      state.selectBarToolType = payload.selectBarToolType
    },
    [MutationGlobal.CHANGE_ART_BOARD_SCALE](state: StateGlobalI, payload: { artBoardScale: number }) {
      state.drawingBoard.scale = payload.artBoardScale
    },
    [MutationGlobal.ADD_SCENE_NODE](state: StateGlobalI) {
      state.sceneTreeNodes.push({
        name: '场景' + (state.sceneTreeNodes.length + 1),
        type: 'scene',
        uuid: '' + state.sceneTreeNodes.length,
        selected: false,
        spread: true,
        children: [
          {
            name: '页1',
            type: 'page',
            selected: false,
            parent: '' + state.sceneTreeNodes.length,
            uuid: '' + state.sceneTreeNodes.length + '-0',
            trees: JSON.parse(JSON.stringify(toRaw(state.template)))
          }
        ]
      })
    },
    [MutationGlobal.ADD_PAGE_NODE](state: StateGlobalI, payload: { selectedSceneTreeNode: SceneTreeNode }) {
      const node = payload.selectedSceneTreeNode
      node.spread = true
      node.children.push({
        name: '页' + (node.children.length + 1),
        type: 'page',
        selected: false,
        parent: node.uuid,
        uuid: '' + node.uuid + '-' + node.children.length,
        trees: JSON.parse(JSON.stringify(toRaw(state.template)))
      })
    },
    [MutationGlobal.SELECT_PAGE_NODE](state: StateGlobalI, payload: { selectedPageTreeNode: PageTreeNode }) {
      // update pageNode select status
      if (state.selectedPageTreeNode) {
        state.selectedPageTreeNode.selected = false
        const sceneTreeNodePreSelected = selectSceneNodeByUUID(state.selectedPageTreeNode.parent)
        if (sceneTreeNodePreSelected) sceneTreeNodePreSelected.selected = false
      }
      state.selectedPageTreeNode = payload.selectedPageTreeNode
      state.selectedPageTreeNode.selected = true
      // update sceneNode select status
      const sceneTreeNodeCurrSelected = selectSceneNodeByUUID(state.selectedPageTreeNode.parent)
      if (sceneTreeNodeCurrSelected) sceneTreeNodeCurrSelected.selected = true

      reloadThreeDimensionScene(state.selectedPageTreeNode)
    }
  },
  actions: {},
  getters: {},
  modules: {
    '2d': module2d,
    '3d': module3d
  }
})
