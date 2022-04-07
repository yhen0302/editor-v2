export declare type dimensionType = "2d" | "3d"


export declare interface EditorStore {
  dimensionType: dimensionType,
  [key: string]: any
}