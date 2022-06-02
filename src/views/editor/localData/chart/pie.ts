let i = 1
class Pie {
  name: string
  option: any
  icon = ''
  type = 'ChartPie'

  constructor(option: any, notMerge = false) {
    this.name = '饼图' + i++
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
        : this.merge(defaultEchartsOpt, option.echartsOption)
    }
  }
  merge(target: any = {}, custom: any = {}) {
    for (const key of Object.keys(custom)) {
      target[key] = custom[key]
    }
    return target
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
  })
]
