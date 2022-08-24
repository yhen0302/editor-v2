import { BaseChart } from './base'

let i = 1
class Gauge extends BaseChart {
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
      dataType: 'table'
    }
    this.mergeLabel(this.option)
  }
}

class MultiGauge extends Gauge{
    type = "ChartMultiGauge"
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
  }),
  new Gauge({
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
  new MultiGauge({
    type: 'multi-gauge-1',
    echartsOption:{
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
        {
          name: 'Pressure2',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
        {
          name: 'Pressure3',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
      ]
    }
  }),
  new MultiGauge({
    type: 'multi-gauge-2',
    echartsOption:{
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
        {
          name: 'Pressure3',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
        {
          name: 'Pressure4',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
        {
          name: 'Pressure2',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
        {
          name: 'Pressure2',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
        {
          name: 'Pressure2',
          type: 'gauge',
          startAngle:90,
          endAngle:-270,
          detail: {
            formatter: '{value}',
            offsetCenter:[0,0],
            fontSize:16,
          },
          progress:{show:true},
          splitLine:{show:false},
          axisTick:{show:false},
          axisLabel:{show:false},
          pointer:{show:false},
          data: [50]
        },
      ]
    }
  }),

]
