import {align, fontStyle, fontType, legendAlign, verticalAlign} from './type'
import {RectShapeProps} from "@/views/editor/twoDimension/elements/shape/RectShapeProps";

export interface MatrixOption {
  left: number
  top: number
  width: number
  height: number
  angle: number
}

export interface MatchColorsOption {
  colors: string[]
}

export interface TextOption {
  color: string
  fontFamily: fontType
  fontSize: number
  fontStyle: fontStyle[]
}

export interface TextAlignOption extends TextOption {
  align: align
  verticalAlign:verticalAlign
}

export interface TitleOption extends TextAlignOption {
  show: boolean
}

export interface UnitOption extends TextAlignOption {
  show: boolean
}

export interface AxisLabelOption extends TextOption {
  show: boolean
  labelLineShow: boolean
}

export interface GridLienOption {
  x: boolean
  y: boolean
}

export interface TransparencyColor {
  color: string
  transparency: number
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface LegendOption extends TextAlignOption {
  show: boolean
  align: legendAlign
}

// chart

export interface BaseProps {
  matrixOption: MatrixOption
}