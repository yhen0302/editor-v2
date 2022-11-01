import { Pie } from './pie'

export const annularChartList = [
  new Pie({
    echartsOption: {
    title: {
      text: '总考生数',
      left: 'center',
      top: '53%',
      padding: [24, 0],
      textStyle: {
        color: '#fff',
        fontSize: 18,
        align: 'center'
      }
    },
    series: [
      {
        name: '总考生数量',
        type: 'pie',
        radius: ['42%', '50%'],
        hoverAnimation: false,
        color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
        label: {
          formatter: '{white|{b}}\n{yellow|{c}}\n{blue|{d}%}',
          rich: {
            yellow: {
              color: '#ffc72b',
              fontSize: 30 / 2,
              padding: [5, 4],
              align: 'center'
            },
            total: {
              color: '#ffc72b',
              fontSize: 40 / 2,
              align: 'center'
            },
            white: {
              color: '#fff',
              align: 'center',
              fontSize: 14,
              padding: [21, 0]
            },
            blue: {
              color: '#49dff0',
              fontSize: 16,
              align: 'center'
            },
            hr: {
              borderColor: '#0b5263',
              width: '100%',
              borderWidth: 1,
              height: 0
            }
          }
        },
        labelLine: {
          normal: {
            length: 30,
            length2: 0,
            lineStyle: {
              color: '#0b5263'
            }
          }
        },
        data: [
          {
            value: 2154,
            name: '曲阜师范大学'
          },
          {
            value: 3854,
            name: '潍坊学院'
          },
          {
            value: 3515,
            name: '青岛职业技术学院'
          },
          {
            value: 3515,
            name: '淄博师范高等专科'
          },
          {
            value: 3854,
            name: '鲁东大学'
          },
          {
            value: 2154,
            name: '山东师范大学'
          }
        ]
      }
    ]
  }
  }),
  new Pie({
    echartsOption:{
      color:['#73DDFF', '#73ACFF', '#FDD56A', '#FDB36A', '#FD866A', '#9E87FF', '#58D5FF'],
      title: {
        text: 'pieChart',
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: 20
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [{
        type: 'pie',
        center: ['50%', '50%'],
        radius: ['24%', '45%'],
        clockwise: true,
        avoidLabelOverlap: true,
        hoverOffset: 15,
        label: {
          show: true,
          position: 'outside',
          formatter: '{a|{b}：{d}%}\n{hr|}',
          rich: {
            hr: {
              backgroundColor: 't',
              borderRadius: 3,
              width: 3,
              height: 3,
              padding: [3, 3, 0, -12]
            },
            a: {
              padding: [-30, 15, -20, 15]
            }
          }
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 30,
            lineStyle: {
              width: 1
            }
          }
        },
        data: [{
          'name': '一月',
          'value': 1.45
        }, {
          'name': '二月',
          'value': 2.93
        }, {
          'name': '三月',
          'value': 3.15
        }, {
          'name': '四月',
          'value': 4.78
        }, {
          'name': '五月',
          'value': 5.93
        }, {
          'name': '六月',
          'value': 5.73
        }
        ],
      }]
    }
  })
]