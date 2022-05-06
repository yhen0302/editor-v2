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
