import { BaseChart } from './base'

let i = 1
class Bar extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartBar'

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
        type: 'category'
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
      dataType: 'table'
    }
    this.mergeLabel(this.option)
  }
}
class PolarBar extends Bar {
  type = 'ChartPolarBar'
}
class YCategoryBar extends Bar {
  type = 'ChartYCategoryBar'
}
class MultiPolarBar extends Bar {
  type = 'ChartMultiPolarBar'
}
export const barChartList = [
  new Bar({
    echartsOption: {
      xAxis: { data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
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
            fontSize: 12
          }
        }
      ]
    }
  }),
  new Bar({
    echartsOption: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          var tar = params[1]
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['Total', 'Rent', 'Utilities', 'Transportation', 'Meals', 'Other']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
          name: 'Life Cost',
          type: 'bar',
          stack: 'Total',
          data: [2900, 1200, 300, 200, 900, 300]
        }
      ]
    }
  }),
  new Bar({
    echartsOption: {
      backgroundColor: '#0D2753',
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(5, 213, 255, 1)' // 0% 处的颜色
            },
            {
              offset: 0.98,
              color: 'rgba(5, 213, 255, 0)' // 100% 处的颜色
            }
          ]
        }
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '20%',
        right: '10%',
        left: '10%',
        bottom: '15%'
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5', '6'],
        axisLine: {
          lineStyle: {
            color: 'rgba(66, 192, 255, .3)'
          }
        },
        axisLabel: {
          margin: 10,
          color: '#05D5FF',
          textStyle: {
            fontSize: 11
          }
        },
        axisTick: {
          show: false
        }
      },
      yAxis: {
        axisLabel: {
          padding: [3, 0, 0, 0],
          formatter: '{value}',
          color: 'rgba(95, 187, 235, 1)',
          textStyle: {
            fontSize: 11
          }
        },
        axisTick: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(66, 192, 255, .3)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0)'
          }
        }
      },
      series: [
        {
          type: 'bar',
          data: [35, 50, 30, 40, 50, 60],
          name: '图表一',
          barWidth: 10,
          itemStyle: {
            shadowColor: 'rgba(5, 213, 255, 1)',
            shadowBlur: 4,
            barBorderRadius: 11
          },
          label: {
            show: true,
            lineHeight: 10,
            formatter: '{c}',
            position: 'top',
            textStyle: {
              color: '#fff',
              fontSize: 10
            }
          }
        }
      ]
    }
  }),
  new Bar({
    echartsOption: {
      color: [
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#fccb05'
            },
            {
              offset: 1,
              color: '#f5804d'
            }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#8bd46e'
            },
            {
              offset: 1,
              color: '#09bcb7'
            }
          ]
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#248ff7'
            },
            {
              offset: 1,
              color: '#6851f1'
            }
          ]
        }
      ],
      backgroundColor: '#323a5e',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '14%',
        top: '16%',
        containLabel: true
      },
      legend: {
        right: 10,
        top: 12,
        textStyle: {
          color: '#fff'
        },
        itemWidth: 12,
        itemHeight: 10
        // itemGap: 35
      },
      xAxis: {
        type: 'category',
        data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
        axisLine: {
          lineStyle: {
            color: 'white'
          }
        },
        axisLabel: {
          textStyle: {
            fontFamily: 'Microsoft YaHei'
          }
        }
      },
      yAxis: {
        type: 'value',
        max: '1200',
        axisLine: {
          show: false,
          lineStyle: {
            color: 'white'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.3)'
          }
        },
        axisLabel: {}
      },
      series: [
        {
          name: '1',
          type: 'bar',
          barWidth: '15%',
          label: { show: false },
          itemStyle: {
            barBorderRadius: 11
          },
          data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
        },
        {
          name: '2',
          type: 'bar',
          barWidth: '15%',
          label: { show: false },
          itemStyle: {
            barBorderRadius: 11
          },
          data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
        },
        {
          name: '3',
          type: 'bar',
          barWidth: '15%',
          label: { show: false },
          itemStyle: {
            barBorderRadius: 11
          },
          data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
        }
      ]
    }
  }),
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
      backgroundColor: '#05224d',
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
  new Bar({
    echartsOption: {
      backgroundColor: '#00265f',
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [
          '喀什市',
          '疏附县',
          '疏勒县',
          '英吉沙县',
          '泽普县',
          '岳普湖县',
          '巴楚县',
          '伽师县',
          '叶城县',
          '莎车县 '
        ],
        axisLine: {
          show: true,
          lineStyle: {
            color: '#063374',
            width: 1,
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#00c7ff'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} %'
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#00c7ff',
            width: 1,
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#063374'
          }
        }
      },
      series: [
        {
          type: 'bar',
          data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
          //barWidth: 50, //柱子宽度
          //barGap: 1, //柱子之间间距
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              y2: 1,
              x2: 0,
              colorStops: [
                { offset: 0, color: '#00fcae' },
                { offset: 1, color: '#006388' }
              ]
            },
            opacity: 1
          }
        }
      ]
    }
  }),
  new Bar({
    echartsOption:{
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'aaa', 'bbbb']
      },
      yAxis: {
        type: 'value'
      },
      legend: {
        icon: 'circle',
        show: true,
        itemWidth: 4,
        itemHeight: 4
      },
      series: [
        {
          name: 'zhangsan',
          data: [120, 200, 150, -50, -30],
          type: 'bar',
          barWidth: 4,
          itemStyle: {
            borderRadius: 2
          }
        },
        {
          name: 'lisi',
          data: [120, 200, 150, -50, -30],
          type: 'bar',
          itemStyle: {
            borderRadius: 2
          },
          barGap: 0.5,
          barWidth: 4
        }
      ]
    }
  }),
  new PolarBar({
    echartsOption: {
      xAxis: { axisLine: { show: false } },
      polar: {
        radius: [30, '80%']
      },
      angleAxis: {
        max: 4,
        startAngle: 75
      },
      radiusAxis: {
        type: 'category',
        data: ['a', 'b', 'c', 'd']
      },
      series: [
        {
          type: 'bar',
          name: '图表一',
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        }
      ]
    }
  }),
  new YCategoryBar({
    echartsOption: {
      grid: { containLabel: true, left: '5%', top: '20%', bottom: '5%' },
      xAxis: {
        show: false, //是否显示x轴
        type: 'value'
      },
      yAxis: {
        type: 'category',
        inverse: true, //让y轴数据逆向
        axisLabel: {
          show: true,
          textStyle: {
            color: '#666' //y轴字体颜色
          }
          //定义富文本标签
        },
        splitLine: { show: false }, //横向的线
        axisTick: { show: false }, //y轴的端点
        axisLine: { show: false }, //y轴的线
        data: ['闽DZ0175', '闽DZ6027', '闽D83876', '闽DZ1377', '闽DZ8825']
      },
      series: [
        {
          name: '数据内框',
          type: 'bar',
          itemStyle: {
            barBorderRadius: 30,
            color: '#00b5eb'
          },
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(255, 255, 255, 0.14)',
            borderRadius: 30
          },
          barWidth: '18%',
          data: [11, 33, 77, 39, 55]
        }
      ]
    }
  }),
  new YCategoryBar({
    echartsOption: {
      color: ['#3CB371', '#3fa7d3', '#FF6347'],
      backgroundColor: '#ffffff',
      grid: { left: '5%', containLabel: true },
      legend: {
        data: ['优秀', '良好', '一般']
      },
      yAxis: {
        type: 'category',
        data: ['区局', '南宁市', '南宁市', '柳州市', '柳州市', '桂林市'],
        inside: true,
        axisLabel: { width: 70, overflow: 'truncate' }
      },
      xAxis: {
        type: 'value'
      },
      series: [
        {
          name: '优秀',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inside'
              },
              color: '#3CB371'
            }
          },
          data: [133, 333, 222, 541, 341, 133]
        },
        {
          name: '良好',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inside'
              },
              color: '#3fa7d3'
            }
          },
          data: [120, 132, 101, 134, 90, 120]
        },
        {
          name: '一般',
          type: 'bar',
          stack: '总量',
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'inside'
              },
              color: '#FF6347'
            }
          },
          data: [120, 132, 101, 134, 90, 120]
        }
      ]
    }
  })
]
