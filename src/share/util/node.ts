import { hexColorToRgba, rgbaColorToHex, rgbaColorToRgbaObj } from './base'

export function getColor(node) {
  console.log(node)
  return node.option.color.style || node.option.color.color.color
}

export function toColor(color) {
  return {
    type: 'linear',
    color: new Color(color),
    colors: [
      {
        color: 'rgba(255, 255, 255, 1)',
        hex: '#ffffff',
        rgba: {
          r: 255,
          g: 255,
          b: 255,
          a: 1
        },
        pst: 100
      },
      {
        color: 'rgba(0, 0, 0, 1)',
        hex: '#000000',
        rgba: {
          r: 0,
          g: 0,
          b: 0,
          a: 1
        },
        pst: 0
      }
    ],
    style: 'linear-gradient(90deg, rgba(0, 0, 0, 1) 0%,rgba(156, 156, 156, 1) 100%);',
    deg: 90
  }
}

class Color {
  hex: string
  color: string
  rgba: { r: number; g: number; b: number; a: number }
  constructor(color: string) {
    if (/^#[a-fA-F0-9]{6}/.test(color)) {
      this.hex = color
      this.color = hexColorToRgba(color, 100)
    } else {
      this.hex = rgbaColorToHex(color)
      this.color = color
    }
    this.rgba = rgbaColorToRgbaObj(this.color)
  }
}
