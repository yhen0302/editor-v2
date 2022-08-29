export function hexColorToRgba(hexColor: string, opacity = 100): string {
  const hexColorReg = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/g
  const matchRes = hexColorReg.exec(hexColor) as RegExpExecArray
  const a = opacity / 100

  if (!matchRes) return 'transparent'
  return `rgba(${Number('0x' + matchRes[1])},${Number('0x' + matchRes[2])},${Number(
    '0x' + matchRes[3]
  )},${a === 1 ? 1 : a.toFixed(2)})`
}

export function rgbaColorToRgbaObj(rgbaStr: string): {
  r: number
  g: number
  b: number
  a: number
} {
  const rgbaColorReg = /(?:\s*)(\d{1,3}(?:\.[\d]+)?)(?:\s*,?)/g
  let match
  const rgba = { r: 0, g: 0, b: 0, a: 0 },
    v = 'rgba'
  let i = 0
  // eslint-disable-next-line no-cond-assign
  while ((match = rgbaColorReg.exec(rgbaStr))) {
    rgba[v[i]] = parseInt(match[1])
    i++
  }
  return rgba
}
export function rgbaColorToHex(color: string): string {
  const rgbaColorReg = /(?:\s*)(\d{1,3})(?:\s*,)/g
  let hex = '#'
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = rgbaColorReg.exec(color))) {
    let subHex = parseInt(match[1]).toString(16)
    while (subHex.length < 2) {
      subHex = '0' + subHex
    }
    hex += subHex
  }
  return hex
}
