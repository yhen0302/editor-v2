import { BaseChart } from './base'

let i = 1
class Pie extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartPie'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '饼图' + i++
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
      grid: {
        top: '20%',
        bottom: '15%'
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
      legend: { show: false }
    }
    this.option = {
      ...this.defaultOption,
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(this.defaultMatrixOpt, option.matrixOption),
      echartsOption: notMerge
        ? option.echartsOption
        : this.merge(defaultEchartsOpt, option.echartsOption),

      dataType: 'table'
    }
    this.mergeLabel(this.option)
  }
}

export const pieChartList = [
  new Pie({
    echartsOption: {
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 274, name: 'Union Ads' },
            { value: 235, name: 'Video Ads' },
            { value: 400, name: 'Search Engine' }
          ].sort(function (a, b) {
            return a.value - b.value
          }),
          roseType: 'radius',
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      ]
    }
  }),
  new Pie({
    echartsOption: {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          label: { fontSize: 10 },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }),
  new Pie({
    echartsOption: {
      backgroundColor: '#031f2d',
      title: {
        text: '总考生数',
        left: 'center',
        top: '53%',
        padding: [24, 0],
        textStyle: {
          color: '#fff',
          fontSize: 18,
          align: 'center'
        }
      },
      series: [
        {
          name: '总考生数量',
          type: 'pie',
          radius: ['42%', '50%'],
          hoverAnimation: false,
          color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
          label: {
            formatter: '{white|{b}white}\n{yellow|{c}yellow}\n{blue|{d}%}',
            rich: {
              yellow: {
                color: '#ffc72b',
                fontSize: 30,
                padding: [5, 4],
                align: 'center'
              },
              total: {
                color: '#ffc72b',
                fontSize: 40,
                align: 'center'
              },
              white: {
                color: '#fff',
                align: 'center',
                fontSize: 14,
                padding: [21, 0]
              },
              blue: {
                color: '#49dff0',
                fontSize: 16,
                align: 'center'
              },
              hr: {
                borderColor: '#0b5263',
                width: '100%',
                borderWidth: 1,
                height: 0
              }
            }
          },
          labelLine: {
            normal: {
              length: 55,
              length2: 0,
              lineStyle: {
                color: '#0b5263'
              }
            }
          },
          data: [
            {
              value: 2154,
              name: '曲阜师范大学'
            },
            {
              value: 3854,
              name: '潍坊学院'
            },
            {
              value: 3515,
              name: '青岛职业技术学院'
            },
            {
              value: 3515,
              name: '淄博师范高等专科'
            },
            {
              value: 3854,
              name: '鲁东大学'
            },
            {
              value: 2154,
              name: '山东师范大学'
            }
          ]
        }
      ]
    }
  })
]
