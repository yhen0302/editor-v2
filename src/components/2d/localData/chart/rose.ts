import { Pie } from './pie'

// 玫瑰图
export const roseChartList = [
  new Pie({
    echartsOption: {
      series: [
        {
          name: 'Nightingale Chart',
          type: 'pie',
          radius: ["10%", "80%"],
          center: ['50%', '50%'],
          roseType: 'area',
          data: [
            { value: 40, name: 'rose 1' },
            { value: 38, name: 'rose 2' },
            { value: 32, name: 'rose 3' },
            { value: 30, name: 'rose 4' },
            { value: 28, name: 'rose 5' },
            { value: 26, name: 'rose 6' },
          ]
        }
      ]
    }
  }),
  new Pie({
    echartsOption: {
      color: ['rgb(131,249,103)', '#FBFE27', '#FE5050', '#1DB7E5','#FBFE27','rgb(11,228,96)','#FE5050'],
      tooltip: {
        trigger: 'item',
      },
      series: [{
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        data: [{
          value: 285,
          name: '黑名单查询'
        },
          {
            value: 410,
            name: '红名单查询'
          },
          {
            value: 274,
            name: '法人行政处罚'
          },
          {
            value: 235,
            name: '其它查询'
          }
        ],
        roseType: 'radius',

        label: {
          formatter: '{c|{c}次}\n{b|{b}}',
          rich: {
            c: {
              color: 'rgb(241,246,104)',
              fontSize: 16,
              fontWeight:'bold',
              lineHeight: 5
            },
            b: {
              color: 'rgb(98,137,169)',
              fontSize: 12,
              height: 40
            },
          },
        },
        labelLine: {
          lineStyle: {
            color: 'rgb(98,137,169)',
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          shadowColor: 'rgba(0, 0, 0, 0.8)',
          shadowBlur: 50,
        }
      }]
    }
  })
]