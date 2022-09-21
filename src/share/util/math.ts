import { rectProperties } from '@/plugins/dragPlugin/convert'

export function rotatePointer(deg, offsetX, offsetY) {
  const sinVal = Math.sin(Number(getRadian(deg).toFixed(2)))
  const cosVal = Math.cos(Number(getRadian(deg).toFixed(2)))

  return {
    x: cosVal,
    y: sinVal
  }
}

export function getRadian(deg: number) {
  return (deg / 180) * Math.PI
}

export function getSinCos(radian: number) {
  return {
    sin: Math.sin(radian),
    cos: Math.cos(radian)
  }
}

export function isRotateHalfPI(angle: number) {
  return Math.round(angle) % 90 === 0
}
export function getCenterPointerCoordinate(rect): { x; y } {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

export const getPointerLineDistance = (x1, y1, a, b, c = 0) => {
  return (a * x1 + b * y1) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
}

export const getPointerLineDistanceByRotate = (offsetX, offsetY, rotate) => {
  const { sin, cos } = getSinCos(getRadian(rotate))
  // console.log(,offsetY,rotate)

  return getPointerLineDistance(offsetX, offsetY, cos, sin)
}
