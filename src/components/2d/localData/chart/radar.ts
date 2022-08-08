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
      legend: { show: true }
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
          label:{show:false},
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
  })
]
