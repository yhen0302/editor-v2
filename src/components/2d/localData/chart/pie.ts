import { BaseChart } from './base'

let i = 1
export class Pie extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartPie'
  defaultMatrixOpt={
    left: 0,
    top: 0,
    height: 300,
    width: 300,
    rotate: 0
  }
  constructor(option: any, notMerge = false) {
    super()
    this.name = '饼图' + i++
    const defaultMatrixOpt = {
      height: 200,
      width: 400,
    }
    const superDefaultOption:any = Object.assign({},this.defaultOption);
    const temp = superDefaultOption['echartsOption']
    delete temp['yAxis'];
    delete temp['xAxis'];

    this.option = this.merge(superDefaultOption,{
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(defaultMatrixOpt, option.matrixOption),
      echartsOption:option.echartsOption,
    })
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
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(51,192,205,.5)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(51,192,205,1)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(115,172,255,.5)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(115,172,255,1)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(158,135,255,.5)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(158,135,255,1)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(252,75,75,0.5)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(252,75,75,1)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        },
        {
          type: 'linear',
          x: 1,
          y: 1,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(253,138,106,.5)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(253,179,106,1)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
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
              color: 'rgba(254,206,67,.5)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(254,206,67,1)' // 100% 处的颜色
            }
          ],
          globalCoord: false // 缺省为 false
        }
      ],
      series: [
        {
          type: 'pie',
          radius: '60%',
          center: ['50%', '50%'],
          clockwise: true,
          avoidLabelOverlap: true,
          label: {
            show: true,
            position: 'outside',
            formatter: `{a{@[1]}|{b}:{d}%}\n{hr|}`,
            rich: (function () {
              let result = {}
              ;['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43'].forEach(
                (v, i) => {
                  result[`hr${i}`] = {
                    backgroundColor: [
                      '#33C0CD',
                      '#73ACFF',
                      '#9E87FF',
                      '#FE6969',
                      '#FDB36A',
                      '#FECE43'
                    ][i],
                    borderRadius: 3,
                    width: 3,
                    height: 3,
                    padding: [3, 3, 0, -12]
                  }
                  result[`a${i}`] = {
                    padding: [-11, 6, -20, 6],
                    color: ['#33C0CD', '#73ACFF', '#9E87FF', '#FE6969', '#FDB36A', '#FECE43'][i],
                    backgroundColor: 'transparent',
                    fontSize: 12
                  }
                }
              )
              return result
            })()
          },

          data: [
            {
              name: '北京',
              value: [25, 0],
              lineStyle: {
                width: 1,
                color: '#33C0CD'
              }
            },
            {
              name: '上海',
              value: [20, 1],
              lineStyle: {
                width: 1,
                color: '#73ACFF'
              }
            },
            {
              name: '广州',
              value: [18, 2],
              lineStyle: {
                width: 1,
                color: '#9E87FF'
              }
            },
            {
              name: '深圳',
              value: [15, 3],
              lineStyle: {
                width: 1,
                color: '#FE6969'
              }
            },
            {
              name: '未知',
              value: [13, 4],
              lineStyle: {
                width: 1,
                color: '#FDB36A'
              }
            },
            {
              name: '海外',
              value: [9, 5],
              lineStyle: {
                width: 1,
                color: '#FECE43'
              }
            }
          ],
          roseType: 'radius'
        }
      ]
    }
  }),
]