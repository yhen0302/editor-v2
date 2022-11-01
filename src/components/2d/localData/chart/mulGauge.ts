import { Gauge } from './gauge'

class MultiGauge extends Gauge{
  type = "ChartMultiGauge"
}

export const mulGaugeChartList = [
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