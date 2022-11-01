import { BaseChart } from './base'

let i = 1

class Radar extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartRadar'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '雷达图' + i++
    const defaultMatrixOpt = {
      height: 200,
      width: 400
    }
    const superDefaultOption: any = Object.assign({}, this.defaultOption)
    const temp = superDefaultOption['echartsOption']
    delete temp['yAxis']
    delete temp['xAxis']
    this.option = this.merge(superDefaultOption, {
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(defaultMatrixOpt, option.matrixOption),
      echartsOption: option.echartsOption
    })
    this.mergeLabel(this.option)
  }
}

export const radarChartList = [
  new Radar({
    echartsOption: {
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales' },
          { name: 'Administration' },
          { name: 'Information Technology' },
          { name: 'Customer Support' },
          { name: 'Development' },
          { name: 'Marketing' }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          label: { show: false },
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [4200, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    }
  }),
  new Radar({
    echartsOption: {
      title: {
        text: '雷达图'
      },
      tooltip: {},
      legend: {
        top: 20,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: {
          color: '#fff'
        }
      },
      radar: {
        radius: '60%',
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            color: '#fff',
            opacity: 0.2
          }
        },
        splitLine: {
          lineStyle: {
            color: '#fff',
            opacity: 0.2
          }
        },
        splitArea: {
          areaStyle: {
            color: 'rgba(127,95,132,.3)',
            opacity: 1,
            shadowBlur: 45,
            shadowColor: 'rgba(0,0,0,.5)',
            shadowOffsetX: 0,
            shadowOffsetY: 15
          }
        },
        indicator: [
          {
            name: '类别1',
            max: 6000
          },
          {
            name: '类别2',
            max: 16000
          },
          {
            name: '类别3',
            max: 30000
          },
          {
            name: '类别4',
            max: 35000
          },
          {
            name: '类别5',
            max: 50000
          },
          {
            name: '类别6',
            max: 25000
          }
        ]
      },
      series: [
        {
          name: '预算 vs 开销',
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: '预算'
            },
            {
              value: [2500, 12000, 8000, 8500, 12000, 12000],
              name: '开销'
            }
          ],
          label: { show: false }
        }
      ],
      color: ['#ef4b4c', '#b1eadb']
    }
  }),
  new Radar({
    echartsOption: {
      radar: {
        indicator: [
          { name: '类别1', max: 6500 },
          { name: '类别2', max: 16000 },
          { name: '类别3', max: 30000 },
          { name: '类别4', max: 38000 },
          { name: '类别5', max: 52000 },
          { name: '类别6', max: 25000 }
        ],
        splitLine: {
          lineStyle: {
            color: ['#41424A', '#666768'],
            width: 2
          }
        },
        splitArea: {
          areaStyle: {
            color: ['#52535C', '#5A5A61']
          }
        },
        axisName: { color: '#FFFFFF' }
      },
      series: [
        {
          areaStyle: {
            opacity: .5
          },
          name: 'Budget vs spending',
          type: 'radar',
          label: { show: false },
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: '类目1'
            }
          ]
        }
      ]
    }
  }),
  new Radar({
    echartsOption: {
      radar: {
        shape: 'circle',
        splitNumber: 3,
        indicator: [
          { name: '类别1', max: 6500 },
          { name: '类别2', max: 16000 },
          { name: '类别3', max: 30000 },
          { name: '类别4', max: 38000 },
          { name: '类别5', max: 52000 },
          { name: '类别6', max: 25000 }
        ],
        axisLine: {
          lineStyle: {
            color: '#454545',
            type: [5, 20]
          }
        },
        splitLine: {
          show: false
        },
        splitArea: {
          areaStyle: {
            color: ['#5C5C5F', '#4A4A4A', '#363636']
          }
        },
        axisName: { color: '#FFFFFF' }
      },
      series: [
        {

          name: 'Budget vs spending',
          type: 'radar',
          symbol: 'path://M283.46,0C126.91,0,0,126.91,0,283.46s126.91,283.46,283.46,283.46s283.46-126.91,283.46-283.46  S440.02,0,283.46,0z M283.46,510.24c-125.24,0-226.77-101.53-226.77-226.77S158.22,56.69,283.46,56.69s226.77,101.53,226.77,226.77  S408.71,510.24,283.46,510.24z',
          symbolSize: 15,
          areaStyle: {
            opacity: .3
          },
          label: { show: false },
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            }
          ]
        }
      ]
    }
  })
]
