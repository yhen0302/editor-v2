import { BaseChart } from './base'

let i = 1
class Bar extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartBar'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '柱状图' + i++
    const defaultMatrixOpt = {
      left: 0,
      top: 0,
      height: 100,
      width: 200,
      angle: 0
    }
    const defaultEchartsOpt = {
      color: [
        {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: '#ff0000' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0000ff' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272'
      ],
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
        type: 'category'
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
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(defaultMatrixOpt, option.matrixOption),
      echartsOption: notMerge
        ? option.echartsOption
        : this.merge(defaultEchartsOpt, option.echartsOption),
      dataType: 'table'
    }
    this.mergeLabel(this.option)
  }
}

export const barChartList = [
  new Bar({
    echartsOption: {
      series: [
        {
          data: [10, 40, 50, 80, 100, 25, 40],
          type: 'bar',
          smooth: true,
          name: '图表一',
          label: {
            show: true,
            color: '#FFFFFF',
            fontFamily: 'microsoft YaHei',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 18
          }
        }
      ]
    }
  }),
  new Bar({
    echartsOption: {
      backgroundColor: '#0D2753',
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
          barWidth: 10,
          itemStyle: {
            shadowColor: 'rgba(5, 213, 255, 1)',
            shadowBlur: 4,
            barBorderRadius: 11,

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
          type:'linear',
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
          type:'linear',
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
          type:'linear',
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
      backgroundColor: '#323a5e',
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
          itemStyle:{
            barBorderRadius: 11,
          },
          data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
        },
        {
          name: '2',
          type: 'bar',
          barWidth: '15%',
          label: { show: false },
          itemStyle:{
            barBorderRadius: 11,
          },
          data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
        },
        {
          name: '3',
          type: 'bar',
          barWidth: '15%',
          label: { show: false },
          itemStyle:{
            barBorderRadius: 11,
          },
          data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
        }
      ]
    }
  })
]
