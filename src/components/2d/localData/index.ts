import { dimensionSelectBarType2d, SelectBarItem, selectItemType2d, selectItemType3d } from '../../../store'
import { clone, getChartUrl } from '../../../share/util/base'
import { baseTitle, bigTitle, smallTitle, textContent } from './text'
import { baseShapeList } from './shape'
import { imageOption, videoOption } from './media'
import { lineChartList } from './chart/line'
import { barChartList } from './chart/bar'
import { pieChartList } from './chart/pie'
import { gaugeChartList } from './chart/gauge'
import { curveChartList } from './chart/curve'
import { radarChartList } from '@/components/2d/localData/chart/radar'
import { scatterChartList } from '@/components/2d/localData/chart/scatter'
import { tableList } from '@/components/2d/localData/table'
import { toColor } from '@/share/util/node'
import { JadePieceList } from '@/components/2d/localData/chart/jadePiece'
import { yBarChartList } from '@/components/2d/localData/chart/ybar'
import { areaChartList } from '@/components/2d/localData/chart/area'
import { preprocessOption } from '@/components/2d/localData/chart/base'
import { annularChartList } from '@/components/2d/localData/chart/annular'
import { mulGaugeChartList } from '@/components/2d/localData/chart/mulGauge'
import { roseChartList } from '@/components/2d/localData/chart/rose'
import { compositeChartList } from '@/components/2d/localData/chart/composite'

function getAssets(url) {
  const publicPath = location.origin + '/'
  return publicPath + url
}

export const selectBarList2d: Array<SelectBarItem> = [
  {
    icon: require('../../../assets/images/editor_text_btn_dark.png'),
    name: '文本',
    type: 'text'
  },
  {
    icon: require('../../../assets/images/editor_shape_btn_dark.png'),
    name: '形状',
    type: 'shape'
  },
  {
    icon: require('../../../assets/images/editor_media_btn_dark.png'),
    name: '多媒体',
    type: 'media'
  },
  {
    icon: require('../../../assets/images/editor_chart_btn_dark.png'),
    name: '图表',
    type: 'chart'
  },
  {
    icon: require('../../../assets/images/table.png'),
    name: '表格',
    type: 'table'
  }
]
export const selectBarList3d: Array<SelectBarItem> = [
  {
    icon: require('../../../assets/images/editor_model_btn_dark.png'),
    name: '添加元素',
    type: 'element'
  },
  {
    icon: require('../../../assets/images/editor_sceneeffect_btn_dark.png'),
    name: '场景配置',
    type: 'scenes'
  },
  {
    icon: require('../../../assets/images/editor_postprocessing_btn_dark.png'),
    name: '后处理',
    type: 'afterProcess'
  }
]

export const selectBarData: Record<string, Array<SelectBarItem>> = {
  '2d': selectBarList2d,
  '3d': selectBarList3d
}

export interface SelectItem {
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

export const selectData: Record<dimensionSelectBarType2d, ViewSelectItem> = {
  text: {
    list: [
      {
        icon: require('../../../assets/images/editor_text_bigtitle_btn_dark.png'),
        name: '大标题',
        type: 'BigTitle',
        option: bigTitle
      },
      {
        icon: require('../../../assets/images/editor_text_smalltitle_btn_dark.png'),
        name: '小标题',
        type: 'SmallTitle',
        option: smallTitle
      },
      {
        icon: require('../../../assets/images/editor_text_title_btn_dark.png'),
        name: '标题',
        type: 'BaseTitle',
        option: baseTitle
      },
      {
        icon: require('../../../assets/images/editor_text_content_btn_dark.png'),
        name: '正文',
        type: 'TextContent',
        option: textContent
      }
    ],
    viewType: 'block'
  },
  shape: {
    list: [
      {
        icon: require('../../../assets/images/editor_shape_shape_btn_dark.png'),
        name: '基本形状',
        type: 'base',
        children: {
          list: baseShapeList,
          viewType: 'block'
        }
      },
      {
        icon: require('../../../assets/images/editor_shape_button_btn_dark.png'),
        name: '按钮',
        type: 'button'
      },
      {
        icon: require('../../../assets/images/editor_shape_icon_btn_dark.png'),
        name: '图标',
        type: 'base',
        children: {
          viewType: 'block',
          list: [
            {
              icon: './icons/救护车.svg',
              name: '救护车图标',
              type: 'BaseIconElement',
              option: {
                emitters: {},
                matrixOption: {
                  left: 0,
                  top: 0,
                  height: 100,
                  width: 200,
                  rotate: 0
                },
                src: getAssets('icons/救护车.svg')
              }
            },
            {
              icon: './icons/谣言三连.svg',
              name: '谣言三连图标',
              type: 'BaseIconElement',
              option: {
                emitters: {},
                matrixOption: {
                  left: 0,
                  top: 0,
                  height: 100,
                  width: 200,
                  rotate: 0
                },
                src: getAssets('icons/谣言三连.svg')
              }
            }
          ]
        }
      }
    ],
    viewType: 'block'
  },
  media: {
    list: [
      {
        icon: require('../../../assets/images/editor_media_video_btn_dark.png'),
        name: '视频',
        type: 'VideoMedia',
        option: videoOption
      },
      {
        icon: require('../../../assets/images/editor_media_picture_btn_dark.png'),
        name: '图片',
        type: 'ImageMedia',
        option: imageOption
      }
    ],
    viewType: 'block'
  },
  chart: {
    list: [
      {
        icon: require('../../../assets/images/editor_chart_histogram_btn_dark.png'),
        name: '柱状图',
        type: 'bar',
        children: {
          viewType: 'list',
          list: preprocessOption(barChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_histogram_btn_dark.png'),
        name: '条形图',
        type: 'bar',
        children: {
          viewType: 'list',
          list: preprocessOption(yBarChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_histogram_btn_dark.png'),
        name: '玉块图',
        type: 'bar',
        children: {
          viewType: 'list',
          list: preprocessOption(JadePieceList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_linechart_btn_dark.png'),
        name: '折线图',
        type: 'line',
        children: {
          viewType: 'list',
          list: preprocessOption(lineChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_linechart_btn_dark.png'),
        name: '区域图',
        type: 'line',
        children: {
          viewType: 'list',
          list: preprocessOption(areaChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_piechart_btn_dark.png'),
        name: '饼图',
        type: 'pie',
        children: {
          viewType: 'list',
          list: preprocessOption(pieChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_piechart_btn_dark.png'),
        name: '环形图',
        type: 'pie',
        children: {
          viewType: 'list',
          list: preprocessOption(annularChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_piechart_btn_dark.png'),
        name: '玫瑰图',
        type: 'pie',
        children: {
          viewType: 'list',
          list: preprocessOption(roseChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_histogram_btn_dark.png'),
        name: '复合图',
        type: 'bar',
        children: {
          viewType: 'list',
          list: preprocessOption(compositeChartList)
        }
      },

      {
        icon: require('../../../assets/images/editor_chart_piechart_btn_dark.png'),
        name: '多环图',
        type: 'gauge',
        children: {
          viewType: 'list',
          list: preprocessOption(mulGaugeChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_dashboard_btn_dark.png'),
        name: '仪表盘',
        type: 'gauge',
        children: {
          viewType: 'list',
          list: preprocessOption(gaugeChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_curvelinechart_btn_dark.png'),
        name: '曲线图',
        type: 'curve',
        children: {
          viewType: 'list',
          list: preprocessOption(curveChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_curvelinechart_btn_dark.png'),
        name: '雷达图',
        type: 'radar',
        children: {
          viewType: 'list',
          list: preprocessOption(radarChartList)
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_curvelinechart_btn_dark.png'),
        name: '散点图',
        type: 'scatter',
        children: {
          viewType: 'list',
          list: preprocessOption(scatterChartList)
        }
      }
    ],
    viewType: 'block'
  },
  table: {
    viewType: 'list',
    list: tableList
  }
}

export const layerIcon: { [key in dimensionSelectBarType2d]: string } = {
  shape: require('../../../assets/images/editor_roundedrectangle_icn_dark.png'),
  chart: require('../../../assets/images/editor_chart_icn_dark.png'),
  media: require('../../../assets/images/editor_scene_icn_dark.png'), // 暂无图片
  text: require('../../../assets/images/editor_title_icon_dark.png'),
  table: ''
}
