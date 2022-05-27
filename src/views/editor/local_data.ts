import {
  dimensionSelectBarType2d,
  dimensionSelectBarType3d,
  dimensionType,
  SelectBarItem,
  selectItemType2d,
  selectItemType3d
} from '../../store/editor/type'
import { clone, getChartUrl } from '@/util/base'
import RectShape from '@/views/editor/twoDimension/elements/shape/RectShape.vue'
import { RectShapeProps } from '@/views/editor/twoDimension/elements/shape/RectShapeProps'
import { TextAlignOption } from '@/views/editor/twoDimension/elements/option'
import { fontType } from '@/views/editor/type'

export const selectBarList2d: Array<SelectBarItem> = [
  {
    icon: require('@/assets/images/editor_text_btn_dark.png'),
    name: '文本',
    type: 'text'
  },
  {
    icon: require('@/assets/images/editor_shape_btn_dark.png'),
    name: '形状',
    type: 'shape'
  },
  {
    icon: require('@/assets/images/editor_media_btn_dark.png'),
    name: '多媒体',
    type: 'media'
  },
  {
    icon: require('@/assets/images/editor_chart_btn_dark.png'),
    name: '图表',
    type: 'chart'
  }
]
export const selectBarList3d: Array<SelectBarItem> = [
  {
    icon: require('@/assets/images/editor_model_btn_dark.png'),
    name: '添加元素',
    type: 'element'
  },
  {
    icon: require('@/assets/images/editor_sceneeffect_btn_dark.png'),
    name: '场景配置',
    type: 'scenes'
  },
  {
    icon: require('@/assets/images/editor_postprocessing_btn_dark.png'),
    name: '后处理',
    type: 'afterProcess'
  }
]

export const selectBarData: Record<dimensionType, Array<SelectBarItem>> = {
  '2d': selectBarList2d,
  '3d': selectBarList3d
}

interface SelectItem {
  type?: selectItemType2d | selectItemType3d | string
  icon: string
  name: string
  key?: string
  option?: any
  children?: ViewSelectItem
  // children?:any
}

interface ViewSelectItem {
  list: Array<SelectItem>
  // 2xn的块布局 | 开关 | 按钮 | 列表布局
  viewType: 'block' | 'switch' | 'radio' | 'list'
  key?: string
}

export const selectData: Record<
  dimensionSelectBarType2d | dimensionSelectBarType3d,
  ViewSelectItem
> = {
  text: {
    list: [
      {
        icon: require('@/assets/images/editor_text_bigtitle_btn_dark.png'),
        name: '大标题',
        type: 'BigTitle',
        option: {
          matrixOption: {
            left: 0,
            top: 0,
            height: 40,
            width: 300,
            angle: 0
          },
          transparency: 100,
          transparencyColor: { color: '', transparency: 100 },
          value: '大标题',
          contentEditable: false,
          textOption: {
            color: '#FFFFFF',
            fontFamily: 'microsoft YaHei',
            fontSize: 30,
            fontStyle: [],
            align: 'left',
            verticalAlign: 'start'
          } as TextAlignOption
        }
      },
      {
        icon: require('@/assets/images/editor_text_smalltitle_btn_dark.png'),
        name: '小标题',
        type: 'SmallTitle',
        option: {
          matrixOption: {
            left: 0,
            top: 0,
            height: 30,
            width: 300,
            angle: 0
          },
          transparency: 100,
          transparencyColor: { color: '', transparency: 100 },
          value: '小标题',
          contentEditable: false,
          textOption: {
            color: '#FFFFFF',
            fontFamily: 'microsoft YaHei',
            fontSize: 20,
            fontStyle: [],
            align: 'left',
            verticalAlign: 'start'
          } as TextAlignOption
        }
      },
      {
        icon: require('@/assets/images/editor_text_title_btn_dark.png'),
        name: '标题',
        type: 'BaseTitle',
        option: {
          matrixOption: {
            left: 0,
            top: 0,
            height: 30,
            width: 300,
            angle: 0
          },
          transparency: 100,
          transparencyColor: { color: '', transparency: 100 },
          value: '标题',
          contentEditable: false,
          textOption: {
            color: '#FFFFFF',
            fontFamily: 'microsoft YaHei',
            fontSize: 24,
            fontStyle: [],
            align: 'left',
            verticalAlign: 'start'
          } as TextAlignOption
        }
      },
      {
        icon: require('@/assets/images/editor_text_content_btn_dark.png'),
        name: '正文',
        type: 'TextContent',
        option: {
          matrixOption: {
            left: 0,
            top: 0,
            height: 30,
            width: 300,
            angle: 0
          },
          transparency: 100,
          transparencyColor: { color: '', transparency: 100 },
          value: '正文',
          contentEditable: false,
          textOption: {
            color: '#FFFFFF',
            fontFamily: 'microsoft YaHei',
            fontSize: 16,
            fontStyle: [],
            align: 'left',
            verticalAlign: 'start'
          } as TextAlignOption
        }
      }
    ],
    viewType: 'block'
  },
  shape: {
    list: [
      {
        icon: require('@/assets/images/editor_shape_shape_btn_dark.png'),
        name: '基本形状',
        type: 'base',
        children: {
          list: [
            {
              icon: require('@/assets/images/editor_shape_roundedrectangle_btn_dark.png'),
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
              icon: require('@/assets/images/editor_shape_rectangle_btn_dark.png'),
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
              icon: require('@/assets/images/editor_shape_circular_btn_dark.png'),
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
              icon: require('@/assets/images/editor_shape_righttriangle_btn_dark.png'),
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
          ],
          viewType: 'block'
        }
      },
      {
        icon: require('@/assets/images/editor_shape_button_btn_dark.png'),
        name: '按钮',
        type: 'button'
      },
      {
        icon: require('@/assets/images/editor_shape_icon_btn_dark.png'),
        name: '图标',
        type: 'base'
      }
    ],
    viewType: 'block'
  },
  media: {
    list: [
      {
        icon: require('@/assets/images/editor_media_video_btn_dark.png'),
        name: '视频',
        type: 'VideoMedia',
        option: {
          matrixOption: {
            left: 0,
            top: 0,
            height: 100,
            width: 200,
            angle: 0
          },
          src: ''
        }
      },
      {
        icon: require('@/assets/images/editor_media_picture_btn_dark.png'),
        name: '图片',
        type: 'ImageMedia',
        option: {
          matrixOption: {
            left: 0,
            top: 0,
            height: 100,
            width: 200,
            angle: 0
          },
          src: ''
        }
      }
    ],
    viewType: 'block'
  },
  chart: {
    list: [
      {
        icon: require('@/assets/images/editor_chart_histogram_btn_dark.png'),
        name: '柱状图',
        type: 'bar'
      },

      {
        icon: require('@/assets/images/editor_chart_linechart_btn_dark.png'),
        name: '折线图',
        type: 'line',
        children: {
          viewType: 'list',
          list: [
            {
              name: '图表样式x001',
              option: {
                matrixOption: {
                  left: 0,
                  top: 0,
                  height: 100,
                  width: 200,
                  angle: 0
                },
                echartsOption: {
                  color: [
                    '#5470c6',
                    '#91cc75',
                    '#fac858',
                    '#ee6666',
                    '#73c0de',
                    '#3ba272',
                  ],
                  xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  grid: {
                    top: '10%',
                    bottom: '10%'
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      data: [10, 40, 50, 80, 100, 25, 40],
                      type: 'line',
                      smooth: true
                    }
                  ]
                }
              },
              icon: ''
            }
          ].map((item: SelectItem): SelectItem => {
            const option = clone(item.option.echartsOption, true)
            option.grid.bottom = '15%'
            option.grid.top = '15%'

            item.icon = getChartUrl(option)
            item.type = 'ChartBar'
            return item
          })
        }
      },
      {
        icon: require('@/assets/images/editor_chart_piechart_btn_dark.png'),
        name: '饼图',
        type: 'pie'
      },
      {
        icon: require('@/assets/images/editor_chart_dashboard_btn_dark.png'),
        name: '仪表盘',
        type: 'gauge'
      },
      {
        icon: require('@/assets/images/editor_chart_curvelinechart_btn_dark.png'),
        name: '曲线图',
        type: 'curve'
      }
    ],
    viewType: 'block'
  },
  // 3d
  element: {
    list: [
      {
        icon: require('@/assets/images/editor_element_model_btn_dark.png'),
        name: '模型',
        type: 'model'
      },
      {
        icon: require('@/assets/images/editor_element_icon_btn_dark.png'),
        name: '图标',
        type: '3dicon'
      },
      {
        icon: require('@/assets/images/editor_element_text_btn_dark.png'),
        name: '文本',
        type: 'text'
      },
      {
        icon: require('@/assets/images/editor_element_mark_btn_dark.png'),
        name: '自由标记',
        type: 'mark'
      },
      {
        icon: require('@/assets/images/editor_element_flyline_btn_dark.png'),
        name: '飞线',
        type: 'flyline'
      },
      {
        icon: require('@/assets/images/editor_element_streamer_btn_dark.png'),
        name: '道路流光',
        type: 'streamer'
      }
    ],
    viewType: 'block'
  },
  scenes: {
    list: [
      {
        icon: require('@/assets/images/editor_sceneeffect_light_btn_dark.png'),
        name: '光照',
        type: 'light'
      },
      {
        icon: require('@/assets/images/editor_sceneeffect_shadow_btn_dark.png'),
        name: '阴影',
        type: 'shadow',
        children: { list: [], viewType: 'switch', key: 'shadowSwitch' }
      },
      {
        icon: require('@/assets/images/editor_sceneeffect_camea_btn_dark.png'),
        name: '相机/控制器',
        type: 'camera'
      },
      {
        icon: require('@/assets/images/editor_sceneeffect_background_btn_dark.png'),
        name: '背景',
        type: 'background'
      },
      {
        icon: require('@/assets/images/editor_sceneeffect_hdr_btn_dark.png'),
        name: 'HDR',
        type: 'HDR'
      },
      {
        icon: require('@/assets/images/editor_sceneeffect_fog_btn_dark.png'),
        name: '雾',
        type: 'fog'
      }
    ],
    viewType: 'block'
  },
  afterProcess: {
    list: [],
    viewType: 'switch'
  }
}

export const layerIcon: { [key in dimensionSelectBarType2d]: string } = {
  shape: require('@/assets/images/editor_roundedrectangle_icn_dark.png'),
  chart: require('@/assets/images/editor_chart_icn_dark.png'),
  media: require('@/assets/images/editor_scene_icn_dark.png'), // 暂无图片
  text: require('@/assets/images/editor_title_icon_dark.png')
}
