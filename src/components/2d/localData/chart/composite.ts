import { Bar } from './bar'

export const compositeChartList = [
  new Bar({
    echartsOption: {
      color: [
        {
          type: 'linear',
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              color: 'rgba(255, 255, 255, 0.03)',
              offset: 0
            },
            {
              color: 'rgba(0, 255, 255, 1)',
              offset: 1
            }
          ]
        }
      ],
      grid: {
        top: '8%',
        left: '1%',
        right: '1%',
        bottom: '8%',
        containLabel: true
      },
      legend: {
        itemGap: 50,
        data: ['注册总量', '最新注册量'],
        textStyle: {
          color: '#f9f9f9',
          borderColor: '#fff'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#f9f9f9'
          }
        },
        axisLabel: {
          //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#d1e6eb',
            margin: 15
          }
        },
        axisTick: {
          show: false
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: '#0a3256'
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          margin: 20,
          textStyle: {
            color: '#d1e6eb'
          }
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          name: '注册总量',
          type: 'line',
          // smooth: true, //是否平滑曲线显示
          // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbol: 'emptyCircle',
          symbolSize: 6,
          lineStyle: {
            normal: {
              color: '#28ffb3' // 线条颜色
            },
            borderColor: '#f0f'
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              color: '#28ffb3'
            }
          },
          tooltip: {
            show: false
          },
          areaStyle: {
            //区域填充样式
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0,154,120,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,0,0, 0)'
                }
              ]
            }
          },
          data: [393, 438, 485, 631, 689, 824, 987]
        },
        {
          name: '最新注册量',
          type: 'bar',
          barWidth: 20,
          tooltip: {
            show: false
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff'
            }
          },
          data: [200, 382, 102, 267, 186, 315, 316]
        }
      ]
    }
  }),
]