import { BaseChart } from './base'

let i = 1
class Radar extends BaseChart {
  name: string
  option: any
  icon = ''
  type = 'ChartRadar'

  constructor(option: any, notMerge = false) {
    super()
    this.name = '雷达图' + i++
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

export const radarChartList = [
  new Radar({
    echartsOption: {
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'Sales' },
          { name: 'Administration' },
          { name: 'Information Technology' },
          { name: 'Customer Support' },
          { name: 'Development' },
          { name: 'Marketing' }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          label:{show:false},
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: 'Allocated Budget'
            },
            {
              value: [4200, 14000, 28000, 26000, 42000, 21000],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    }
  }),
  new Radar({
    echartsOption:{
      title: {
        text: "雷达图",
      },
      tooltip: {},
      legend: {
        top: 20,
        itemWidth: 12,
        itemHeight: 12,
        data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"],
        textStyle: {
          color: "#fff",
        },
      },
      radar: {
        radius: "60%",
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            color: "#fff",
            opacity: 0.2,
          },
        },
        splitLine: {
          lineStyle: {
            color: "#fff",
            opacity: 0.2,
          },
        },
        splitArea: {
          areaStyle: {
            color: "rgba(127,95,132,.3)",
            opacity: 1,
            shadowBlur: 45,
            shadowColor: "rgba(0,0,0,.5)",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
        indicator: [
          {
            name: "Sales",
            max: 6000,
          },
          {
            name: "Administration",
            max: 16000,
          },
          {
            name: "Information Techology",
            max: 30000,
          },
          {
            name: "Customer Support",
            max: 35000,
          },
          {
            name: "Development",
            max: 50000,
          },
          {
            name: "Marketing",
            max: 25000,
          },
        ],
      },
      series: [
        {
          name: "预算 vs 开销（Budget vs spending）",
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: "rgba(0,0,0,.2)",
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: "预算分配（Allocated Budget）",
            },
            {
              value: [2500, 12000, 8000, 8500, 12000, 12000],
              name: "实际开销（Actual Spending）",
            },
          ],
          label:{show:false}
        },
      ],
      color: ["#ef4b4c", "#b1eadb"],
      backgroundColor: {
        type: "radial",
        x: 0.4,
        y: 0.4,
        r: 0.35,
        colorStops: [
          {
            offset: 0,
            color: "#895355", // 0% 处的颜色
          },
          {
            offset: 0.4,
            color: "#593640", // 100% 处的颜色
          },
          {
            offset: 1,
            color: "#39273d", // 100% 处的颜色
          },
        ],
        globalCoord: false, // 缺省为 false
      },
    }
  })

]
