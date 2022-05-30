export const lineChartList = [
  {
    name: '图表样式x001',
    option: {
      matrixOption: {
        left: 0,
        top: 0,
        height: 100,
        width: 200,
        angle: 0
      },
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
          show:false,
          textStyle: {

            fontFamily: 'microsoft YaHei',
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'normal',
            fontStyle: 'normal',
            textAlign: 'auto'
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        grid: {
          top: '10%',
          bottom: '10%'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [10, 40, 50, 80, 100, 25, 40],
            type: 'line',
            smooth: true
          }
        ]
      }
    },
    icon: ''
  }
]
