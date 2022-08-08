import { Element } from '@/views/editor/twoDimension/elements'
import { Ref } from '@vue/reactivity'
export declare type dimensionType = '2d' | '3d'

export interface TreeNode {
  name: string
  show: boolean
  open?: boolean
  children?: TreeNode[]
}

export interface PageNode {
  name: string
}

export interface ScreenNode {
  name: string
  open: boolean
  children: PageNode[]
}
export interface EditorMutationI {
  // 2d
  CHANGE_DIMENSION: 'CHANGE_DIMENSION'
  CHANGE_SELECT_BAR_TOOL_TYPE: 'CHANGE_SELECT_BAR_TOOL_TYPE'
  CHANGE_ART_BOARD_SCALE: 'CHANGE_ART_BOARD_SCALE'
  ADD_2D_TREE_NODE: 'ADD_2D_TREE_NODE'
  // SELECT NODES
  SELECT_2D_TREE_NODE: 'SELECT_2D_TREE_NODE'
  CANCEL_SELECT_2D_NODE: 'CANCEL_SELECT_2D_NODE'
  CLEAR_SELECT_2D_NODES: 'CLEAR_SELECT_2D_NODES'
  TOGGLE_NODE: 'TOGGLE_NODE'
  ADD_EMITTER_TO_NODE: 'ADD_EMITTER_TO_NODE'
  DELETE_SELECT_NODES: 'DELETE_SELECT_NODES'
  MARSHALLING_SELECT_NODES: 'MARSHALLING_SELECT_NODES'
  CANCEL_MARSHALLING_SELECT_NODES: 'CANCEL_MARSHALLING_SELECT_NODES'
  MOVE_UP_OF_NODES: 'MOVE_UP_OF_NODES'
  MOVE_DOWNWARD_OF_NODES: 'MOVE_DOWNWARD_OF_NODES'
  MOVE_TO_TOP_OF_NODES: 'MOVE_TO_TOP_OF_NODES'
  MOVE_TO_BOTTOM_OF_NODES: 'MOVE_TO_BOTTOM_OF_NODES'

  // copy
  COPY_NODE_2D: 'COPY_NODE_2D'
  PASTE_NODE_2D: 'PASTE_NODE_2D'
  //Lock
  TOGGLE_LOCK:'TOGGLE_LOCK'
  // 3d
  ADD_3D_TREE_NODE: 'ADD_3D_TREE_NODE'
}

export interface LayerTree2dNode extends TreeNode {
  id: number
  type: dimensionSelectBarType2d | 'group'
  subType?: selectItemType2d
  option: any
  contentEditable?: boolean
  parent?: any
  select: boolean
  lock:boolean
  children?: LayerTree2dNode[]
}

export interface LayerTree3dNode extends TreeNode {
  type: dimensionSelectBarType3d | 'group'
  subType?: selectItemType3d
  option: any
  children?: LayerTree2dNode[]
}

export declare interface EditorStore {
  dimensionType: dimensionType
  selectBarToolType: selectBarType | null
  switchItemAfterProcessType: Record<switchItemAfterProcessType, boolean>
  shadow: boolean
  layerTree2d: LayerTree2dNode[]
  layerTree3d: TreeNode[]
  screenPageTree: ScreenNode[]
  select2dNodes: Set<LayerTree2dNode>
  artBoardConfig: {
    artBoardScale: number
    height: number
    width: number
  }
  addDragging: boolean
  [key: string]: any
}

export declare type dimensionSelectBarType2d = 'text' | 'shape' | 'media' | 'chart'|'table'
export declare type dimensionSelectBarType3d = 'element' | 'scenes' | 'afterProcess'
export declare type selectBarType = dimensionSelectBarType2d | dimensionSelectBarType3d

export declare interface SelectBarItem {
  icon: string
  name: string
  type: selectBarType
}

export declare type selectItemTextType = 'title' | 'bigTitle' | 'smallTitle' | 'content'
export declare type selectItemShapeType = 'base' | 'button' | 'icon'
export declare type selectItemMediaType = 'video' | 'image'
export declare type selectItemChartType = 'bar' | 'line' | 'pie' | 'gauge' | 'curve'
export declare type selectItemType2d = selectItemTextType | selectItemShapeType | selectItemMediaType | selectItemChartType

export declare type selectItemElementType = 'model' | '3dicon' | 'text' | 'mark' | 'flyline' | 'streamer'
export declare type selectItemScreenType = 'light' | 'shadow' | 'camera' | 'background' | 'HDR' | 'fog'
export declare type switchItemAfterProcessType = 'outline' | 'bloom' | 'dof' | 'gammaCorrection' | 'ssaa' | 'ssr' | 'ssao'

export declare type selectItemType3d = selectItemElementType | selectItemScreenType

export declare interface SelectItem extends SelectBarItem {
  type: selectItemChartType2d | selectItemChartType3d
  children?: Array<SelectItem> | Array<any>
}

/*export declare interface DimensionSelectDetail2d {
  [key in dimensionSelectType2d]: SelectItem
}*/
