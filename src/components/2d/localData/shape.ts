import { toColor } from '@/share/util/node'

export const baseShapeList = [
  {
    icon: require('../../../assets/images/editor_shape_roundedrectangle_btn_dark.png'),
    name: '圆角矩形',
    type: 'RoundedRectShape',
    option: {
      emitters: {},
      matrixOption: {
        left: 0,
        top: 0,
        height: 100,
        width: 200,
        angle: 0
      },
      transparency: 100,
      color:{color:'#6582fe'},
      value: ''
    }
  },
  {
    icon: require('../../../assets/images/editor_shape_rectangle_btn_dark.png'),
    name: '矩形',
    type: 'RectShape',
    option: {
      emitters: {},
      matrixOption: {
        left: 0,
        top: 0,
        height: 100,
        width: 200,
        angle: 0
      },
      transparency: 100,
      color:{color:'#6582fe'},
      value: ''
    }
  },
  {
    icon: require('../../../assets/images/editor_shape_circular_btn_dark.png'),
    name: '圆形',
    type: 'CircleShape',
    option: {
      emitters: {},
      matrixOption: {
        left: 0,
        top: 0,
        height: 200,
        width: 200,
        angle: 0
      },
      transparency: 100,
      color:toColor('#6582fe'),
      value: ''
    }
  },
  {
    icon: require('../../../assets/images/editor_shape_righttriangle_btn_dark.png'),
    name: '直角三角形',
    type: 'TriangleShape',
    option: {
      emitters: {},
      matrixOption: {
        left: 0,
        top: 0,
        height: 100,
        width: 200,
        angle: 0
      },
      transparency: 100,
      color:{color:'#6582fe'},
      value: ''
    }
  }
]
