import { BaseChart } from './base'

let i = 1

export class Bar extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartBar'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '柱状图' + i++
    const defaultMatrixOpt = {
      height: 200,
      width: 400
    }
    this.option = this.merge(this.defaultOption, {
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(defaultMatrixOpt, option.matrixOption),
      echartsOption: option.echartsOption
    })
    this.mergeLabel(this.option)
  }
}

export const barChartList = [
  new Bar({
    echartsOption: {
      color: ['#D9E1CC'],
      xAxis: { data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      series: [
        {
          data: [10, 40, 50, 80, 100, 25, 40],
          type: 'bar',
          smooth: true,
          barWidth: '15%',
          showBackground: true,
          itemStyle: {
            borderRadius: 100
          },
          backgroundStyle: {
            borderRadius: 100
          },
          name: '图表一',
          label: {
            show: true,
            color: '#FFFFFF',
            fontFamily: 'microsoft YaHei',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 12
          }
        }
      ]
    }
  }),
  new Bar({
    echartsOption: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function(params) {
          var tar = params[1]
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['1', '2', '3', '4', '5', '6']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '类别1',
          type: 'bar',
          barWidth: '15%',

          itemStyle: {
            borderRadius: 100
          },
          data: [500, 1700, 1400, 1200, 300, 0]
        },
        {
          name: '类别2',
          type: 'bar',
          barWidth: '15%',
          itemStyle: {
            borderRadius: 100
          },
          data: [2900, 1200, 300, 200, 900, 300]
        }
      ]
    }
  }),
  new Bar({
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
              color: 'rgba(5, 213, 255, 1)' // 0% 处的颜色
            },
            {
              offset: 0.98,
              color: 'rgba(5, 213, 255, 0)' // 100% 处的颜色
            }
          ]
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '20%',
        right: '10%',
        left: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6'],
        axisLine: {
          lineStyle: {
            color: 'rgba(66, 192, 255, .3)'
          }
        },
        axisLabel: {
          margin: 10,
          color: '#05D5FF',
          textStyle: {
            fontSize: 11
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        axisLabel: {
          padding: [3, 0, 0, 0],
          formatter: '{value}',
          color: 'rgba(95, 187, 235, 1)',
          textStyle: {
            fontSize: 11
          }
        },
        axisTick: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(66, 192, 255, .3)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0)'
          }
        }
      },
      series: [
        {
          type: 'bar',
          data: [35, 50, 30, 40, 50, 60],
          name: '图表一',
          barWidth: 10,
          itemStyle: {
            shadowColor: 'rgba(5, 213, 255, 1)',
            shadowBlur: 4,
            barBorderRadius: 11
          },
          label: {
            show: true,
            lineHeight: 10,
            formatter: '{c}',
            position: 'top',
            textStyle: {
              color: '#fff',
              fontSize: 10
            }
          }
        }
      ]
    }
  }),
  new Bar({
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
              color: '#fccb05'
            },
            {
              offset: 1,
              color: '#f5804d'
            }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#8bd46e'
            },
            {
              offset: 1,
              color: '#09bcb7'
            }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#248ff7'
            },
            {
              offset: 1,
              color: '#6851f1'
            }
          ]
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '14%',
        top: '16%',
        containLabel: true
      },
      legend: {
        right: 10,
        top: 12,
        textStyle: {
          color: '#fff'
        },
        itemWidth: 12,
        itemHeight: 10
        // itemGap: 35
      },
      xAxis: {
        type: 'category',
        data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
        axisLabel: {
          textStyle: {
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      yAxis: {
        type: 'value',
        max: '1200',
        axisLine: {
          show: false,
          lineStyle: {
            color: 'white'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.3)'
          }
        },
        axisLabel: {}
      },
      series: [
        {
          name: '1',
          type: 'bar',
          barWidth: '15%',
          label: { show: false },
          itemStyle: {
            barBorderRadius: 11
          },
          data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
        },
        {
          name: '2',
          type: 'bar',
          barWidth: '15%',
          label: { show: false },
          itemStyle: {
            barBorderRadius: 11
          },
          data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
        },
        {
          name: '3',
          type: 'bar',
          barWidth: '15%',
          label: { show: false },
          itemStyle: {
            barBorderRadius: 11
          },
          data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
        }
      ]
    }
  }),
  new Bar({
    echartsOption: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'aaa', 'bbbb']
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        icon: 'circle',
        show: true,
        itemWidth: 4,
        itemHeight: 4
      },
      series: [
        {
          name: 'zhangsan',
          data: [120, 200, 150, -50, -30],
          type: 'bar',
          barWidth: 4,
          itemStyle: {
            borderRadius: 2
          }
        },
        {
          name: 'lisi',
          data: [120, 200, 150, -50, -30],
          type: 'bar',
          itemStyle: {
            borderRadius: 2
          },
          barGap: 0.5,
          barWidth: 4
        }
      ]
    }
  }),
  new Bar({
    echartsOption: {
      color: [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#fccb05' // 0% 处的颜色
        }, {
          offset: 1, color: '#f5804d' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }, {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0, color: '#8bd46e' // 0% 处的颜色
        }, {
          offset: 1, color: '#09bcb7' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }],
      grid: {
        left: '2%',
        right: '4%',
        bottom: '14%',
        top: '16%',
        containLabel: true
      },
      legend: {
        data: ['门禁常开告警', '门禁离线告警'],
        right: 10,
        top: 12,
        textStyle: {
          color: '#eee'
        },
        itemWidth: 12,
        itemHeight: 10
        // itemGap: 35
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5' ],
        axisLine: {
          lineStyle: {
            color: 'white'

          }
        },
        axisLabel: {
          // interval: 0,
          // rotate: 40,
          textStyle: {
            fontFamily: 'Microsoft YaHei'
          }
        }
      },

      yAxis: {
        type: 'value',
        max: '150',
        axisLine: {
          show: false,
          lineStyle: {
            color: 'white'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.3)'
          }
        },
        axisLabel: {}
      },
      series: [{
        name: '门禁常开告警',
        type: 'bar',
        barWidth: '15%',
        data: [10, 30, 40, 120, 50, ]
      },
        {
          name: '门禁离线告警',
          type: 'bar',
          barWidth: '15%',
          data: [5, 40, 60, 110, 40, ]
        }]
    }
  })
]
