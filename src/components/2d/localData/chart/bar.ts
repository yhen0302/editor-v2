import {BaseChart} from "./base";

let i = 1
class Bar extends BaseChart{
  name: string
  option: any
  icon = ''
  type='ChartBar'

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
      color: [{
        type: 'linear',
        x: 0,
        y:1,
        x2:0,
        y2: 0,
        colorStops: [{
          offset: 0, color: '#ff0000' // 0% 处的颜色
        }, {
          offset: 1, color: '#0000ff' // 100% 处的颜色
        }],
        global: false // 缺省为 false
      }, '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272'],
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
      matrixOption: notMerge
        ? option.matrixOption
        : this.merge(defaultMatrixOpt, option.matrixOption),
      echartsOption: notMerge
        ? option.echartsOption
        : this.merge(defaultEchartsOpt, option.echartsOption),
      dataType:'table'
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
  })
]
