import { Line } from './line'
import { Curve } from '@/components/2d/localData/chart/curve'

export const areaChartList = [
  new Line({
    echartsOption:{
      color: [  {
        type:'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{color:'#ffb02c',offset:0,},{color:'rgba(255,255,255,0)',offset:1,}]
      },{
        type:'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{color:'#19f1ec',offset:0,},{color:'rgba(255,255,255,0)',offset:1,}]
      }],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'x1',
          data: [80, 190, 150, 200, 210, 223, 258],
          type: 'line',
          stack: 'Total',
          areaStyle: {
            opacity:.15
          }
        },
        {
          name:'x2',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          stack: 'Total',
          areaStyle: {
            opacity:.15
          }
        },
      ]
    }
  }),
  new Curve({
    echartsOption: {
      color: ['#66C7E9', '#71D093', '#37A2FF', '#FF0087', '#FFBF00'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        icon: 'rect',
        // show: true
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Line 4',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    }
  }),
  new Curve({
    echartsOption:{
      color: [  {
        type:'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{color:'#ffb02c',offset:0,},{color:'rgba(255,255,255,0)',offset:1,}]
      },{
        type:'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{color:'#19f1ec',offset:0,},{color:'rgba(255,255,255,0)',offset:1,}]
      }],
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name:'x1',
          data: [80, 190, 150, 200, 210, 223, 258],
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity:.15
          }
        },
        {
          name:'x2',
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {
            opacity:.15
          }
        },
      ]
    }
  }),

]