import { Bar } from './bar'

class YCategoryBar extends Bar {
  type = 'ChartYCategoryBar'
}

export const yBarChartList = [
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
  }),
  new YCategoryBar({
    echartsOption:  {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        icon:"circle"
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['日用品', '豆制品', '调味品']
      },
      series: [
        {
          name: '2011',
          type: 'bar',
          barWidth:"15%",
          itemStyle:{
            borderRadius:100
          },
          data: [182, 234, 290, ]
        },
        {
          name: '2012',
          type: 'bar',
          barWidth:"15%",
          itemStyle:{
            borderRadius:100
          },
          data: [193, 234, 310,]
        }
      ]
    }
  })

]