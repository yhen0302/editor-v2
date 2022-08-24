import { clone } from '@/share/util/base'

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

  merge(target: {[key:string]:any} = {}, custom:  {[key:string]:any} = {}) {
    for (const key of Object.keys(target)) {
      if (!Object.prototype.hasOwnProperty.call(custom,key)) custom[key] = target[key]
      else {
        if (typeof custom[key] === 'object'&&typeof target[key] === 'object') custom[key] = this.merge(target[key], custom[key])
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
      position:"top"
    }
    for (const series of option.echartsOption.series) {
      if (!series.label) series.label = {}
      this.merge( clone(label),series.label,)
    }
  }
}
