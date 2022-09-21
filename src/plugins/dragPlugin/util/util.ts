export interface PxTargetObject {
  [key: string]: string | number
}

export function toPx(target: number | PxTargetObject): string | PxTargetObject {
  const cssUnitRE = /^-?\d+(\.\d+)?(px|rem|em|vh|vw|%|cm|mm)$/
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

export function cssUnitToNumber(target: string) {
  const cssUnitRE = /^-?\d+(\.\d+)?(px|rem|em|vh|vw|%|cm|mm)$/
  return cssUnitRE.test(target) ? parseInt(target) : 0
}

export function getCss(
  el: HTMLElement,
  css: keyof CSSStyleDeclaration | [keyof CSSStyleDeclaration]
): CSSStyleDeclaration[keyof CSSStyleDeclaration] | CSSStyleDeclaration {
  if (Array.isArray(css)) {
    const map = <CSSStyleDeclaration>{}
    const cssStyles = window.getComputedStyle(el)
    for (const key of css.values()) {
      // @ts-ignore
      map[key] = cssStyles[key]
    }
    return map
  } else {
    return window.getComputedStyle(el)[css]
  }
}

export function findParentPathHasEl(target: HTMLElement | null, el: HTMLElement | null): boolean {
  do {
    if (target === el) return true
    // eslint-disable-next-line no-cond-assign
  } while ((target = target?.parentElement || null))

  return false
}

// 防抖。
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce<T extends Function>(
  targetFn: T,
  delay: number,
  ctx?: any
  // eslint-disable-next-line @typescript-eslint/ban-types
): Function {
  let timer: number | null = null
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timer = setTimeout(targetFn.bind(ctx, ...args), delay)
  }
}

export function computedElementsRect(els: HTMLElement[], type: 'css' | 'bounding' = 'bounding') {
  const leftNumSet: Set<number> = new Set<number>(),
    rightNumSet: Set<number> = new Set<number>(),
    topNumSet: Set<number> = new Set<number>(),
    bottomNumSet: Set<number> = new Set<number>()
  for (const el of els) {
    let rect
    if (type === 'bounding') {
      rect = el.getBoundingClientRect()
    } else {
      // @ts-ignore
      rect = getCss(el, ['left', 'top', 'width', 'height']) as {
        left: any
        width: any
        top: any
        height: any
        [key: string]: any
      }
      for (const key of Object.keys(rect))
        // @ts-ignore
        rect[key] = cssUnitToNumber(rect[key])

      rect.right = rect.left + rect.width
      rect.bottom = rect.top + rect.height
    }
    // @ts-ignore
    const { left, right, bottom, top } = rect
    leftNumSet.add(left)
    rightNumSet.add(right)
    topNumSet.add(top)
    bottomNumSet.add(bottom)
  }
  const left = Math.min(...leftNumSet),
    right = Math.max(...rightNumSet),
    top = Math.min(...topNumSet),
    bottom = Math.max(...bottomNumSet)

  return {
    left,
    right,
    top,
    bottom,
    width: right - left,
    height: bottom - top
  }
}


export function triangleFnToAngle(sin, cos):number {
  if (cos > 0) {
    return (Math.acos(sin) / Math.PI) * 180
  } else if (cos < 0 && sin <= 0) {
    return 180 - (Math.asin(cos) / Math.PI) * 180
  } else if (sin > 0 && cos < 0) {
    return 360 + (Math.asin(cos) / Math.PI) * 180
  }
  return 0
}
