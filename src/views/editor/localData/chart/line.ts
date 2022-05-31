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
          show: false,
          left: 10,
          top: 10,
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
          bottom: '20%'
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#FFFFFF'],
              opacity:1
            }
          }
        },
        series: [
          {
            data: [10, 40, 50, 80, 100, 25, 40],
            type: 'line',
            smooth: true,
            name:'图表一',
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
          left: 10,
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
        legend:{show:true}
      }
    },
    icon: ''
  }
]
