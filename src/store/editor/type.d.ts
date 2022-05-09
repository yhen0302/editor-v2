export declare type dimensionType = "2d" | "3d"

export interface TreeNode {
  name: string
  show: boolean
  open?: boolean
  children?: TreeNode[]
}

export interface PageNode {
  name: string,
}

export interface ScreenNode {
  name: string
  open: boolean
  children: PageNode[]
}

export interface LayerTree2dNode extends TreeNode {
  type: dimensionSelectBarType2d | 'group'
  subType?: selectItemType2d,
  detail: {componentInstance:any,options:any},
  children?: LayerTree2dNode[]
}

export declare interface EditorStore {
  dimensionType: dimensionType
  selectBarToolType: selectBarType | null
  switchItemAfterProcessType: Record<switchItemAfterProcessType, boolean>
  shadow: boolean
  artBoardScale: number
  layerTree2d: LayerTree2dNode[]
  layerTree3d: TreeNode[]
  screenPageTree: ScreenNode[]
  select2dNodes: TreeNode[],

  [key: string]: any
}

export declare type dimensionSelectBarType2d = "text" | "shape" | "media" | "chart"
export declare type dimensionSelectBarType3d = "element" | "scenes" | "afterProcess"
export declare type selectBarType = dimensionSelectBarType2d | dimensionSelectBarType3d

export declare interface SelectBarItem {
  icon: string,
  name: string,
  type: selectBarType
}

export declare type selectItemTextType = "title" | "bigTitle" | "smallTitle" | "content"
export declare type selectItemShapeType = "base" | "button" | "icon"
export declare type selectItemMediaType = "video" | "image"
export declare type selectItemChartType = "bar" | "line" | "pie" | "gauge" | "curve"
export declare type selectItemType2d =
  selectItemTextType
  | selectItemShapeType
  | selectItemMediaType
  | selectItemChartType


export declare type selectItemElementType = "model" | "3dicon" | "text" | "mark" | "flyline" | "streamer"
export declare type selectItemScreenType = "light" | "shadow" | "camera" | "background" | "HDR" | "fog"
export declare type switchItemAfterProcessType =
  "outline"
  | "bloom"
  | "dof"
  | "gammaCorrection"
  | "ssaa"
  | "ssr"
  | "ssao"


export declare type selectItemType3d = selectItemElementType | selectItemScreenType

export declare interface SelectItem extends SelectBarItem {
  type: selectItemChartType2d | selectItemChartType3d,
  children?: Array<SelectItem> | Array<any>
}

/*export declare interface DimensionSelectDetail2d {
  [key in dimensionSelectType2d]: SelectItem
}*/
