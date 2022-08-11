import { BaseChart } from './base'

let i = 1
class Curve extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartCurve'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '折线图' + i++
    const defaultEchartsOpt = {
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
      title: {
        text: '标题123456',
        show: false,
        left: '10%',
        top: 20,
        right: 'auto',
        textStyle: {
          fontFamily: 'microsoft YaHei',
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 'normal',
          fontStyle: 'normal'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      grid: {
        top: '20%',
        bottom: '15%'
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#FFFFFF'],
            opacity: 1
          }
        }
      },
      unit: {
        text: '单位',
        show: false,
        left: '10%',
        top: 50,
        right: 'auto',
        textStyle: {
          fontFamily: 'microsoft YaHei',
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 'normal',
          fontStyle: 'normal'
        }
      },
      legend: { show: true }
    }
    this.option = {
      ...this.defaultOption,
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(this.defaultMatrixOpt, option.matrixOption),
      echartsOption: notMerge
        ? option.echartsOption
        : this.merge(defaultEchartsOpt, option.echartsOption)
    }
    this.mergeLabel(this.option)
  }
}

export const curveChartList = [
  new Curve({
    echartsOption: {
      color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
      title: {
        text: '标题123456',
        show: false,
        left: '10%',
        top: 20,
        right: 'auto',
        textStyle: {
          fontFamily: 'microsoft YaHei',
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 'normal',
          fontStyle: 'normal'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      grid: {
        top: '20%',
        bottom: '15%'
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: ['#FFFFFF'],
            opacity: 1
          }
        }
      },
      series: [
        {
          data: [10, 40, 50, 80, 100, 25, 40],
          type: 'line',
          name: '图表一',
          smooth: true,
          label: {
            show: true,
            color: '#FFFFFF',
            fontFamily: 'microsoft YaHei',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 18
          }
        }
      ],
      unit: {
        text: '单位',
        show: false,
        left: '10%',
        top: 50,
        right: 'auto',
        textStyle: {
          fontFamily: 'microsoft YaHei',
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 'normal',
          fontStyle: 'normal'
        }
      },
      legend: { show: true }
    }
  }),
  new Curve({
    echartsOption: {
      color: ['#66C7E9', '#71D093', '#37A2FF', '#FF0087', '#FFBF00'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        icon: 'rect',
        // show: true
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Line 4',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    }
  }),
  new Curve({
    echartsOption: {
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#9effff'
            },
            {
              offset: 1,
              color: '#9E87FF'
            }
          ]
        },
        {
          type: 'linear',
          x: 1,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#73DD39'
            },
            {
              offset: 1,
              color: '#73DDFF'
            }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#fe9a'
            },
            {
              offset: 1,
              color: '#fe9a8b'
            }
          ]
        }
      ],
      backgroundColor: '#fff',
      title: {
        text: '全国6月销售统计',
        textStyle: {
          fontSize: 12,
          fontWeight: 400
        },
        left: 'center',
        top: '5%'
      },
      legend: {
        icon: 'circle',
        top: '5%',
        right: '5%',
        itemWidth: 6,
        itemGap: 20,
        textStyle: {
          color: '#556677'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        textStyle: {
          color: '#5c6c7c'
        },
        padding: [10, 10],
        extraCssText: 'box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)'
      },
      grid: {
        top: '15%'
      },
      xAxis: {
        type: 'category',
        data: ['北京', '上海', '广州', '深圳', '香港', '澳门', '台湾'],
        axisLine: {
          lineStyle: {
            color: '#DCE2E8'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#556677'
          },
          // 默认x轴字体大小
          fontSize: 12,
          // margin:文字到x轴的距离
          margin: 15
        },
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#DCE2E8'
          }
        },
        axisLabel: {
          textStyle: {
            color: '#556677'
          }
        },
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '三幅',
          type: 'line',
          data: [40, 80, 60, 110, 150, 160, 120],
          symbolSize: 1,
          symbol: 'circle',
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          lineStyle: {
            width: 5,
            shadowColor: 'rgba(158,135,255, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 20
          },
        },
        {
          name: '鸿星尔克',
          type: 'line',
          data: [80, 120, 60, 80, 75, 150, 60],
          symbolSize: 1,
          symbol: 'circle',
          smooth: true,
          yAxisIndex: 0,
          showSymbol: false,
          lineStyle: {
            width: 5,
            shadowColor: 'rgba(115,221,255, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 20
          },
        },
        {
          name: '老北京布鞋',
          type: 'line',
          data: [150, 120, 170, 140, 500, 160, 110],
          symbolSize: 1,
          symbol: 'circle',
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 5,
            shadowColor: 'rgba(254,154,139, 0.3)',
            shadowBlur: 10,
            shadowOffsetY: 20
          },
        }
      ]
    }
  })

]
