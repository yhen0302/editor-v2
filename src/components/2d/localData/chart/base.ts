import { clone, getChartUrl } from '@/share/util/base'
import { SelectItem } from '@/components/2d/localData'
import { toColor } from '@/share/util/node'

export class BaseChart {
  protected type: string | undefined
  public defaultOption = {
    color:toColor('rgba(0,0,0,0)'),
    matrixOption: {
      left: 0,
      top: 0,
      height: 200,
      width: 400,
      rotate: 0
    },
    echartsOption: {
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
          show: false,
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
    },
    dataType: 'table',
    apiMapping: [] as {
      target: 'x' | 'y'
      path: string
      [k: string]: string
    }[],
    apiUrl: ''
  }

  merge(target = {}, custom = {}) {
    for (const key of Object.keys(target)) {
      if (!Object.prototype.hasOwnProperty.call(custom, key)) custom[key] = target[key]
      else {
        if (typeof custom[key] === 'object' && typeof target[key] === 'object') custom[key] = this.merge(target[key], custom[key])
      }
    }
    return custom
  }

  mergeLabel(option: any) {
    const label = {
      color: '#FFFFFF',
      fontFamily: 'microsoft YaHei',
      fontSize: 12,
      fontStyle: 'normal',
      fontWeight: 'normal',
      show: true,
      position: 'top'
    }
    for (const series of option.echartsOption.series) {
      if (!series.label) series.label = {}
      this.merge(clone(label), series.label)
    }
  }
}

export function preprocessOption(chartList){
  return chartList.map((item: SelectItem): SelectItem => {
    const option = clone(item.option.echartsOption, true)
    option.grid.bottom = '15%'
    option.grid.top = '15%'
    option.legend.show = false
    for (let i = 0; i < option.series.length; i++) {
      if (option.series[i]?.label) {
        option.series[i].label.show = false
      }
    }

    item.icon = getChartUrl(option)
    return item
  })
}