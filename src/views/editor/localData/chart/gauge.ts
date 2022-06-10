let i = 1
class Gauge {
  name: string
  option: any
  icon = ''
  type = 'ChartGauge'

  constructor(option: any, notMerge = false) {
    this.name = '仪表盘' + i++
    const defaultMatrixOpt = {
      left: 0,
      top: 0,
      height: 100,
      width: 200,
      angle: 0
    }
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
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(defaultMatrixOpt, option.matrixOption),
      echartsOption: notMerge
        ? option.echartsOption
        : this.merge(defaultEchartsOpt, option.echartsOption),
      dataType:'table'

    }
  }
  merge(target: any = {}, custom: any = {}) {
    for (const key of Object.keys(custom)) {
      target[key] = custom[key]
    }
    return target
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
