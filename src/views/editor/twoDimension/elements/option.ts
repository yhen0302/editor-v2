import {align, fontStyle, fontType, legendAlign} from '../../type'
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
  fontStyle: Record<fontStyle, boolean>
}

export interface TextAlignOption extends TextOption {
  align: align
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
class BaseChart {
  matrixOption: MatrixOption
  matchColorsOption: MatchColorsOption
  titleOption: TitleOption
  unitOption: UnitOption
  legendOption: LegendOption

  constructor(
    matrix: MatrixOption = {left: 0, top: 0, width: 0, height: 0, angle: 0},
    colors: MatchColorsOption = {colors: ['#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF']},
    titleOption: TitleOption = {
      color: '#FFF',
      fontFamily: 'microsoft YaHei',
      fontSize: 12,
      fontStyle: {italic: false, weight: false, underscore: false},
      align: 'left',
      show: false
    },
    unitOption: UnitOption = {
      color: '#FFF',
      fontFamily: 'microsoft YaHei',
      fontSize: 12,
      fontStyle: {italic: false, weight: false, underscore: false},
      align: 'left',
      show: false
    },
    legendOption: LegendOption = {
      color: '#FFF',
      fontFamily: 'microsoft YaHei',
      fontSize: 12,
      fontStyle: {italic: false, weight: false, underscore: false},
      align: 'leftTop',
      show: false
    }
  ) {
    this.matrixOption = matrix
    this.matchColorsOption = colors
    this.titleOption = titleOption
    this.unitOption = unitOption
    this.legendOption = legendOption
  }
}

class AxisChart extends BaseChart {
  xAxisOption: AxisLabelOption
  yAxisOption: AxisLabelOption
  gridLineOption: GridLienOption

  constructor(
    matrix: MatrixOption,
    colors: MatchColorsOption,
    titleOption: TitleOption,
    unitOption: UnitOption,
    legendOption: LegendOption,
    xAxisOption: AxisLabelOption = {
      show: false,
      labelLineShow: false,
      fontFamily: 'microsoft YaHei',
      fontStyle: {weight: false, italic: false, underscore: false},
      fontSize: 12,
      color: '#FFF'
    },
    yAxisOption: AxisLabelOption = {
      show: false,
      labelLineShow: false,
      fontFamily: 'microsoft YaHei',
      fontStyle: {weight: false, italic: false, underscore: false},
      fontSize: 12,
      color: '#FFF'
    },
    gridLineOption: GridLienOption = {x: false, y: false}
  ) {
    super(matrix, colors, titleOption, unitOption, legendOption)
    this.xAxisOption = xAxisOption
    this.yAxisOption = yAxisOption
    this.gridLineOption = gridLineOption
  }
}

export interface BaseProps {
  matrixOption: MatrixOption
}