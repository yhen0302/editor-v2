const fillZero = (num = '', length = 0) => {
  const numStr: string = num.toString()
  return numStr.length < length ? '0'.repeat(length - numStr.length) + numStr : numStr
}

export function formatterDate(formatter = 'yyyy-MM-dd hh:mm:ss', date = new Date()) {
  const formatterObj: any = {
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
      return fillZero(formatterObj[regKey].toString().substr(0, args[0].length), args[0].length)
    })
  })

  return res
}

export function hexColorToRgba(hexColor: string, opacity: number) {
  const hexColorReg = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/g
  const matchRes = hexColorReg.exec(hexColor) as RegExpExecArray
  if (!matchRes) return 'transparent'
  return `rgba(${Number('0x' + matchRes[1])},${Number('0x' + matchRes[2])},${Number('0x' + matchRes[3])},${(opacity / 100).toFixed(2)})`
}

export function colorRGBtoHex(colors: Array<number>) {
  const r = colors[0]
  const g = colors[1]
  const b = colors[2]
  const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  return hex
}

export function hex2rgb(hex: string): Array<number> {
  if (hex == '') {
    return [0, 0, 0]
  }
  hex = hex.substring(1)
  hex = hex.toLowerCase()
  const b: any = []
  for (let x = 0; x < 3; x++) {
    b[0] = hex.substr(x * 2, 2)
    b[3] = '0123456789abcdef'
    b[1] = b[0].substr(0, 1)
    b[2] = b[0].substr(1, 1)
    b[20 + x] = b[3].indexOf(b[1]) * 16 + b[3].indexOf(b[2])
  }
  return [b[20], b[21], b[22]]
}

// 节流
export function throttled(fn: any, delay: number): (args?: any) => void {
  let timer: any = null
  let starttime = Date.now()
  return function (this: any) {
    const curTime = Date.now() // 当前时间
    const remaining = delay - (curTime - starttime) // 从上一次到现在，还剩下多少多余时间
    clearTimeout(timer)
    if (remaining <= 0) {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments)
      starttime = Date.now()
    } else {
      // eslint-disable-next-line prefer-rest-params
      timer = setTimeout(fn, remaining)
    }
  }
}

// 防抖
export function debounce(func: any, wait: number, immediate: boolean) {
  let timeout: any
  const exec = () => {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments

    if (timeout) clearTimeout(timeout) // timeout 不为null
    if (immediate) {
      const callNow = !timeout // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) {
        func.apply(exec, args)
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(exec, args)
      }, wait)
    }
  }

  exec()
}
