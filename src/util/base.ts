import * as echarts from 'echarts'
import { ECBasicOption } from 'echarts/types/dist/shared'

const fillZero = (num = '', length = 0) => {
  const numStr: string = num.toString()
  return numStr.length < length
    ? '0'.repeat(length - numStr.length) + numStr
    : numStr
}

export function formatterDate(
  formatter = 'yyyy-MM-dd hh:mm:ss',
  date = new Date()
) {
  const formatterObj = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  let res = formatter

  Object.keys(formatterObj).forEach((regKey) => {
    res = res.replace(new RegExp(regKey), (...args) => {
      return fillZero(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        formatterObj[regKey].toString().substr(0, args[0].length),
        args[0].length
      )
    })
  })

  return res
}

export interface PxTargetObject {
  [key: string]: string | number
}

export function toPx(target: number | PxTargetObject): string | PxTargetObject {
  const cssUnitRE = /^\d+(px|rem|em|vh|vw|%|cm|mm)$/
  if (typeof target === 'number') {
    return target + 'px'
  } else if (typeof target === 'object') {
    const result: PxTargetObject = Object.assign({}, target)
    const excludeStyleKey = ['zoom', 'opacity', 'zIndex']
    for (const key of Object.keys(target)) {
      if (!excludeStyleKey.includes(key)) {
        if (!cssUnitRE.test(target[key].toString())) {
          result[key] = target[key] + 'px'
        }
      }
    }
    return result
  } else {
    return target
  }
}

export function getCss(
  el: HTMLElement | null,
  css: keyof CSSStyleDeclaration
): CSSStyleDeclaration[keyof CSSStyleDeclaration] {
  return el && window.getComputedStyle(el)[css]
}

export function cssUnitToNumber(target: string) {
  const cssUnitRE = /^\d+(\.\d+)?(px|rem|em|vh|vw|%|cm|mm)$/
  return cssUnitRE.test(target) ? parseInt(target) : 0
}

// 将某个类型转换为url
export function dataToUrl(data: BlobPart[], mimeType: string) {
  const blob = new Blob(data, { type: mimeType })
  return URL.createObjectURL(blob)
}

export function getChartUrl<Opt extends ECBasicOption>(option: Opt) {
  const div = document.createElement('div')
  div.style.width = '240px'
  div.style.height = '160px'

  const chart = echarts.init(div)
  chart.setOption({
    animation: false,
    grid: { left: 30, top: 15, right: 10, bottom: 30 }
  })
  chart.setOption(option)

  return chart.getConnectedDataURL({ type: 'png' })
}

// 防抖
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(fn: Function, delay: number, ctx: any = null) {
  let timer: number

  return function (this: any, ...args: any) {
    const that = this
    if (timer) clearTimeout(timer)
    timer = <number>(<unknown>setTimeout(function () {
      fn.call(ctx || that, ...args)
    }, delay))
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function clone<T extends Object>(object: T, deep = true): T {
  if (typeof object === 'object' && object !== null) {
    // 引用类型
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newObj = new object.constructor()

    for (const key of Object.keys(object)) {
      newObj[key] = deep
        ? clone(object[key as keyof typeof object], deep)
        : object[key as keyof typeof object]
    }

    return newObj
  } else return object // 基本数据类型
}

export function hexColorToRgba(hexColor: string, opacity: number) {
  const hexColorReg = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/g
  const matchRes = hexColorReg.exec(hexColor) as RegExpExecArray
  if (!matchRes) return 'transparent'
  return `rgba(${Number('0x' + matchRes[1])},${Number(
    '0x' + matchRes[2]
  )},${Number('0x' + matchRes[3])},${(opacity / 100).toFixed(2)})`
}

export function fileToBlobUrl(file: File) {
  return URL.createObjectURL(file)
}

const pointerExpression = /()/

const partPathReg = /(.*)(\.\[)?/
// eslint-disable-next-line @typescript-eslint/ban-types
export function valueHandle(obj: any, path: string): any {
  let i = 0,
    subPath = '',
    resolveRes: RegExpExecArray | null = null
  const cpPath = path
  let res = clone(obj) as any
  // [ ] .
  while (res && i < cpPath.length) {
    const str = cpPath[i]
    if (str === '.' || str === ']') {
      i++
      continue
    } else if (str === '[') {
      resolveRes = resolvePath(cpPath.substring(++i), ['[\\]]'])
    } else {
      resolveRes = resolvePath(cpPath.substring(i), ['[\\.\\[]'])
      resolveRes = resolveRes || /(.*$)/.exec(cpPath.substring(i))
    }
    if (resolveRes) {
      subPath = resolveRes[1]
      res = res[subPath]
      i += subPath.length
      resolveRes = null
    }
  }

  function resolvePath(
    path: string,
    terminators: string[]
  ): RegExpExecArray | null {
    return new RegExp(`(.*?)${terminators.join()}`).exec(path)
  }

  return res
}

export function getPromiseAjax(url:string){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest()
  })
}