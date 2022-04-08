export declare type dimensionType = "2d" | "3d"


export declare interface EditorStore {
  dimensionType: dimensionType,
  selectBarToolType:selectBarType|null

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
export declare type selectItemChartType2d =
  selectItemTextType
  | selectItemShapeType
  | selectItemMediaType
  | selectItemChartType


export declare type selectItemElementType = "model" | "icon" | "text" | "mark" | "line" | "streamer"
export declare type selectItemScreenType = "light" | "shadow" | "camera" | "background" | "HDR" | "fog"
export declare type selectItemChartType3d = selectItemElementType | selectItemScreenType

export declare interface SelectItem extends SelectBarItem {
  subType: selectItemChartType2d | selectItemChartType3d
}

/*export declare interface DimensionSelectDetail2d {
  [key in dimensionSelectType2d]: SelectItem
}*/
