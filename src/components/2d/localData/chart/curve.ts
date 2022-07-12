import {BaseChart} from "./base";

let i = 1
class Curve extends BaseChart{
  name: string
  option: any
  icon = ''
  type='ChartCurve'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '折线图' + i++
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
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
      ...this.defaultOption,
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(this.defaultMatrixOpt, option.matrixOption),
      echartsOption: notMerge
        ? option.echartsOption
        : this.merge(defaultEchartsOpt, option.echartsOption),
    }
    this.mergeLabel(this.option)
  }
}


export const curveChartList = [
  new Curve({
    echartsOption: {
      color: [
        '#5470c6',
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
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
      series: [
        {
          data: [10, 40, 50, 80, 100, 25, 40],
          type: 'line',
          name: '图表一',
          smooth:true,
          label: {
            show: true,
            color: '#FFFFFF',
            fontFamily: 'microsoft YaHei',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 18
          }
        }
      ],
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
    },
  })
]


