import {BaseChart} from "./base";

let i = 1
class Gauge  extends BaseChart{
  name: string
  option: any
  icon = ''
  type = 'ChartGauge'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '仪表盘' + i++
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
      dataType:'table'

    }
    this.mergeLabel(this.option)
  }
}

export const gaugeChartList = [
  new Gauge({
    echartsOption: {
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          detail: {
            formatter: '{value}'
          },
          data: [
            {
              value: 50,
              name: 'SCORE'
            }
          ]
        }
      ]
    }
  })
]
