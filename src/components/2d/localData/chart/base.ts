import { clone } from '@/share/util/base'
const axisLineChartTypes = ['ChartLine', 'ChartCurve', 'ChartBar']

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
  }
}
export class BaseChart {
  defaultMatrixOpt = {
    left: 0,
    top: 0,
    height: 100,
    width: 200,
    angle: 0
  }

  protected type: string | undefined
  defaultOption = {
    dataType: 'table',
    apiMapping: [] as {
      target: 'x' | 'y'
      path: string
      [k: string]: string
    }[],
    apiUrl: ''
  }

  merge(target: any = {}, custom: any = {}) {
    for (const key of Object.keys(target)) {
      if (!custom[key]) custom[key] = target[key]
      else {
        if( typeof custom[key] === 'object')
        custom[key] = this.merge(target[key], custom[key])
      }
    }
    return custom
  }

  mergeLabel(option:any){
    const label = {
      color: "#FFFFFF",
      fontFamily: "microsoft YaHei",
      fontSize: 18,
      fontStyle: "normal",
      fontWeight: "normal",
      show: true,
    }
    for(const series of option.echartsOption.series){
      if(!series.label)series.label={}
      this.merge(clone(label),series.label)
    }
  }
}
