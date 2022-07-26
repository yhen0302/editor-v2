import {
  dimensionSelectBarType2d,
  dimensionSelectBarType3d,
  dimensionType,
  SelectBarItem,
  selectItemType2d,
  selectItemType3d
} from '../../../store/type'
import { clone, getChartUrl } from '../../../share/util/base'
import { baseTitle, bigTitle, smallTitle, textContent } from './text'
import { baseShapeList } from './shape'
import { imageOption, videoOption } from './media'
import { lineChartList } from './chart/line'
import { barChartList } from './chart/bar'
import { pieChartList } from './chart/pie'
import { gaugeChartList } from './chart/gauge'
import { curveChartList } from './chart/curve'

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
        type: 'base'
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
          list: barChartList.map((item: SelectItem): SelectItem => {
            const option = clone(item.option.echartsOption, true)
            option.grid.bottom = '15%'
            option.grid.top = '15%'
            option.legend.show = false
            option.series[0].label.show = false

            item.icon = getChartUrl(option)
            return item
          })
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_linechart_btn_dark.png'),
        name: '折线图',
        type: 'line',
        children: {
          viewType: 'list',
          list: lineChartList.map((item: SelectItem): SelectItem => {
            const option = clone(item.option.echartsOption, true)
            option.grid.bottom = '15%'
            option.grid.top = '15%'
            option.legend.show = false
            for (let i = 0; i < option.series.length; i++) {
              if (option.series[i]?.label) {
                option.series[i].label.show = false
              }
            }

            item.icon = getChartUrl(option)
            return item
          })
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_piechart_btn_dark.png'),
        name: '饼图',
        type: 'pie',
        children: {
          viewType: 'list',
          list: pieChartList.map((item: SelectItem): SelectItem => {
            const option = clone(item.option.echartsOption, true)
            option.grid.bottom = '15%'
            option.grid.top = '15%'
            option.legend.show = false
            option.series[0].label.show = false

            item.icon = getChartUrl(option)
            return item
          })
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_dashboard_btn_dark.png'),
        name: '仪表盘',
        type: 'gauge',
        children: {
          viewType: 'list',
          list: gaugeChartList.map((item: SelectItem): SelectItem => {
            const option = clone(item.option.echartsOption, true)
            option.grid.bottom = '15%'
            option.grid.top = '15%'
            option.legend.show = false

            item.icon = getChartUrl(option)
            return item
          })
        }
      },
      {
        icon: require('../../../assets/images/editor_chart_curvelinechart_btn_dark.png'),
        name: '曲线图',
        type: 'curve',
        children: {
          viewType: 'list',
          list: curveChartList.map((item: SelectItem): SelectItem => {
            const option = clone(item.option.echartsOption, true)
            option.grid.bottom = '15%'
            option.grid.top = '15%'
            option.legend.show = false
            option.series[0].label.show = false

            item.icon = getChartUrl(option)
            return item
          })
        }
      }
    ],
    viewType: 'block'
  },
  table: {
    viewType: 'list',
    list: [
      {
        icon: require('../../../assets/images/table-style1.png'),
        name: '表格样式-001-',
        type: 'BaseTable',
        option: {
          emitters: {},
          matrixOption: {
            left: 0,
            top: 0,
            height: 100,
            width: 200,
            angle: 0
          },
          tableData: [
            {
            name:'张三',
            age:18,
            sex:'男',
            hobby:'唱'
          },{
            name:'李四',
            age:2.5,
            sex:'男',
            hobby:'跳'
          },{
            name:'王五',
            age:18,
            sex:'男',
            hobby:'rap'
          },{
            name:'赵六',
            age:18,
            sex:'男',
            hobby:'篮球'
          }],
          tableMap:{
            name:'姓名',
            age:'年龄',
            hobby:'爱好',
            sex:'性别'
          },
          style:[],

        },
      }
    ]
  }
}

export const layerIcon: { [key in dimensionSelectBarType2d]: string } = {
  shape: require('../../../assets/images/editor_roundedrectangle_icn_dark.png'),
  chart: require('../../../assets/images/editor_chart_icn_dark.png'),
  media: require('../../../assets/images/editor_scene_icn_dark.png'), // 暂无图片
  text: require('../../../assets/images/editor_title_icon_dark.png'),
  table: ''
}
