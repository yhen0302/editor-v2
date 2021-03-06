import {RectShapeProps} from "../twoDimension/elements/shape/RectShapeProps";

export const baseShapeList = [
  {
    icon: require('../../../assets/images/editor_shape_roundedrectangle_btn_dark.png'),
    name: '圆角矩形',
    type: 'RoundedRectShape',
    option: {
      matrixOption: {
        left: 0,
        top: 0,
        height: 100,
        width: 200,
        angle: 0
      },
      transparency: 100,
      transparencyColor: { color: '#FF0000', transparency: 100 },
      value: ''
    } as RectShapeProps
  },
  {
    icon: require('../../../assets/images/editor_shape_rectangle_btn_dark.png'),
    name: '矩形',
    type: 'RectShape',
    option: {
      matrixOption: {
        left: 0,
        top: 0,
        height: 100,
        width: 200,
        angle: 0
      },
      transparency: 100,
      transparencyColor: { color: '#FF0000', transparency: 100 },
      value: ''
    } as RectShapeProps
  },
  {
    icon: require('../../../assets/images/editor_shape_circular_btn_dark.png'),
    name: '圆形',
    type: 'CircleShape',
    option: {
      matrixOption: {
        left: 0,
        top: 0,
        height: 100,
        width: 200,
        angle: 0
      },
      transparency: 100,
      transparencyColor: { color: '#FF0000', transparency: 100 },
      value: ''
    } as RectShapeProps
  },
  {
    icon: require('../../../assets/images/editor_shape_righttriangle_btn_dark.png'),
    name: '直角三角形',
    type: 'TriangleShape',
    option: {
      matrixOption: {
        left: 0,
        top: 0,
        height: 100,
        width: 200,
        angle: 0
      },
      transparency: 100,
      transparencyColor: { color: '#FF0000', transparency: 100 },
      value: ''
    } as RectShapeProps
  }
]