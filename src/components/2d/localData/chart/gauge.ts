import { BaseChart } from './base'

let i = 1
export class Gauge extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartGauge'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '仪表盘' + i++
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


export const gaugeChartList = [
  new Gauge({
    matrixOption:{
      left: 0,
      top: 0,
      height: 300,
      width: 300,
      rotate: 0
    },
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
  }),
  new Gauge({
    matrixOption:{
      left: 0,
      top: 0,
      height: 300,
      width: 300,
      rotate: 0
    },
    echartsOption: {
      color: ['#7CAF8B', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
      series: [
        {
          type: 'gauge',

          progress: {
            show: true,
            width: 6,
            roundCap: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: [[1, '#FFF']],
              width: 6
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          pointer: { show: false },
          startAngle: 90,
          endAngle: -270,
          detail: {
            valueAnimation: true,
            fontSize: 18,
            offsetCenter: [0, 0]
          },
          data: [
            {
              value: 70
            }
          ]
        }
      ]
    }
  }),
]
